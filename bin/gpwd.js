#!/usr/bin/env node
"use strict";

/**
 * Generate Password
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

//--------------------------------------
// Constant
//--------------------------------------
const MIN_ITEM = 1;
const MAX_ITEM = 65534;
const MIN_BASE_LEN = 2;
const MAX_BASE_LEN = 64;
const CONFIG_FILENAME = '.gpwd.json';
const DEFAULT_OPT = {
  length: 8,
  item: 1,
  strength: "strong",
  base: undefined,
  secure: false
};

//--------------------------------------
// Module
//--------------------------------------
const fs = require("fs");
const path = require("path");
const genPassword = require("../index.js");
const program = require("commander");
const passwd  = new genPassword();

// Config file
const config = getConfig();

//--------------------------------------
// commander
//--------------------------------------
program
  .version("1.4.0")
  .option("-l, --length [bytes]",  "string length [bytes]")
  .option("-i, --item [number]",   "how many generate [number]")
  .option("-s, --strength [mode]", "string strength [god|strong|normal|weak] and more")
  .option("-b, --base [string]",   "base charactor [string]. Higher priority than -s,--strength option")
  .option("--secure", "use secure random numbers")
  .parse(process.argv);

//--------------------------------------
// Set Default Value
//--------------------------------------
const options = program.opts();
if( options.length === undefined ){
  options.length = ("length" in config)?  config.length:DEFAULT_OPT.length;
}
if( options.item === undefined ){
  options.item = ("item" in config)?  config.item:DEFAULT_OPT.item;
}
if( options.strength === undefined ){
  options.strength = ("strength" in config)?  config.strength:DEFAULT_OPT.strength;
}
if( options.base === undefined ){
  options.base = ("base" in config)?  config.base:DEFAULT_OPT.base;
}
if( options.secure === undefined ){
  options.secure = ("secure" in config)?  config.secure:DEFAULT_OPT.secure;
}

//--------------------------------------
// Validation
//--------------------------------------
// --length (is number)
if( ! Number.isInteger( Number(options.length) ) ){
  error("-l, --length option is only integer.");
}
// --length (between min to max)
if( ! (genPassword.MIN_LENGTH <= Number(options.length) && Number(options.length) <= genPassword.MAX_LENGTH) ){
  error(`-l, --length option is need between ${genPassword.MIN_LENGTH} to ${genPassword.MAX_LENGTH}`);
}
// --strength
if( ! passwd.existsStrength(options.strength) ){
  error("-s, --strength option is [god|strong|normal|weak] and more.");
}
// --item (is number)
if( ! Number.isInteger( Number(options.item) ) ){
  error("-i, --item option is only integer.");
}
// --item (between min to max)
if( ! (MIN_ITEM <= Number(options.item) && Number(options.item) <= MAX_ITEM) ){
  error(`-l, --length option is need between ${MIN_ITEM} to ${MAX_ITEM}`);
}
// --base (charactor type)
if( (options.base !== undefined) && ( ! options.base.match(/^[a-zA-Z0-9\.\-_\+/!\"#\$%&'\(\)\*,;<=>?@\[\]\^`{\|}~]*$/) )){
  error("-b, --base option is only use [a-zA-Z0-9.-_+/!\"#$%&'()*,;<=>?@[]^`{|}~]");
}
// --base (string length)
if( (options.base !== undefined) && !(MIN_BASE_LEN <= options.base.length && options.base.length <= MAX_BASE_LEN) ){
  error(`-b, --base option is need between ${MIN_BASE_LEN} to ${MAX_BASE_LEN} string length`);
}

//--------------------------------------
// Generate password
//--------------------------------------
passwd.setOption({
    length: Number(options.length),
  strength: options.strength,
      base: options.base,
    secure: options.secure
});

for(let i=0; i<options.item; i++){
  passwd
    .gen()
    .echo();
}


/**
 * Return configuration
 *
 * @return {Object|boolean}
 */
function getConfig(){
  // Get Home directory path
  const home = getHomeDirevtory();
  if( home === false){
    return({});
  }

  // Get configuration
  const file = path.join(home, CONFIG_FILENAME);
  if( fs.existsSync(file) ){
    try{
      return( require(file) );
    }
    catch(err){
      error(err);
    }
  }

  return({});
}

/**
 * Return HOME Directory path
 *
 * @return {string|boolean}
 */
function getHomeDirevtory(){
  let path = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  if( fs.existsSync(path) ){
    return(path);
  }
  else{
    return(false);
  }
}

/**
 * Display Error and exit
 *
 * @param {string} str error message
 * @returns {void}
 */
function error(str){
  console.error("[Error] " + str);
  process.exit(1);
}
