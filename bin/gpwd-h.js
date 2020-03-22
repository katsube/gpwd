#!/usr/bin/env node
"use strict";

/**
 * Generate Password to Human
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

//--------------------------------------
// Constant
//--------------------------------------
const MIN_ITEM = 1;
const MAX_ITEM = 65534;
const CONFIG_FILENAME = '.gpwd.json';
const DEFAULT_OPT = {
  length: 8,
  item: 1,
  caps: false,
  secure: false
};

//--------------------------------------
// Module
//--------------------------------------
const fs = require("fs");
const path = require("path");
const program = require("commander");
const genPassword = require("../index.js").human;
const passwd  = new genPassword();

// Config file
const config = getConfig();

//--------------------------------------
// commander
//--------------------------------------
program
  .version("1.4.0")
  .option("-l, --length [bytes]", "string length [bytes]")
  .option("-i, --item [number]",  "how many generate [number]")
  .option("--caps", "capitalize the first letter of each word")
  .option("--secure", "use secure random numbers")
  .parse(process.argv);

//--------------------------------------
// Set Default Value
//--------------------------------------
if( program.length === undefined ){
  program.length = ("length" in config)?  config.length:DEFAULT_OPT.length;
}
if( program.item === undefined ){
  program.item = ("item" in config)?  config.item:DEFAULT_OPT.item;
}
if( program.caps === undefined ){
  program.caps = ("caps" in config)?  config.caps:DEFAULT_OPT.caps;
}
if( program.secure === undefined ){
  program.secure = ("secure" in config)?  config.secure:DEFAULT_OPT.secure;
}

//--------------------------------------
// Validation
//--------------------------------------
// --length (is number)
if( ! Number.isInteger( Number(program.length) ) ){
  error("-l, --length option is only integer.");
}
// --length (between min to max)
if( ! (genPassword.MIN_LENGTH <= Number(program.length) && Number(program.length) <= genPassword.MAX_LENGTH) ){
  error(`-l, --length option is need between ${genPassword.MIN_LENGTH} to ${genPassword.MAX_LENGTH}`);
}
// --item (is number)
if( ! Number.isInteger( Number(program.item) ) ){
  error("-i, --item option is only integer.");
}
// --item (between min to max)
if( ! (MIN_ITEM <= Number(program.item) && Number(program.item) <= MAX_ITEM) ){
  error(`-i, --item option is need between ${MIN_ITEM} to ${MAX_ITEM}`);
}

//--------------------------------------
// Generate password
//--------------------------------------
passwd.setOption({
    length: Number(program.length),
    caps: program.caps,
    secure: program.secure
});

for(let i=0; i<program.item; i++){
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
      const config = require(file);
      if( "human" in config ){
        return(config.human);
      }
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
