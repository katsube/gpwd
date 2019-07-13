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

//--------------------------------------
// Module
//--------------------------------------
const genPassword = require("../index.js");
const program = require("commander");
const passwd  = new genPassword();

//--------------------------------------
// commander
//--------------------------------------
program
  .version("1.3.0")
  .option("-l, --length [bytes]",  "string length [bytes]", 8)
  .option("-i, --item [number]",   "how many generate [number]", 1)
  .option("-s, --strength [mode]", "string strength [god|strong|normal|weak] and more", "strong")
  .option("-b, --base [string]",   "base charactor [string]. Higher priority than -s,--strength option")
  .option("--secure", "use secure random numbers")
  .parse(process.argv);

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
// --strength
if( ! passwd.existsStrength(program.strength) ){
  error("-s, --strength option is [god|strong|normal|weak] and more.");
}
// --item (is number)
if( ! Number.isInteger( Number(program.item) ) ){
  error("-i, --item option is only integer.");
}
// --item (between min to max)
if( ! (MIN_ITEM <= Number(program.item) && Number(program.item) <= MAX_ITEM) ){
  error(`-l, --length option is need between ${MIN_ITEM} to ${MAX_ITEM}`);
}
// --base (charactor type)
if( (program.base !== undefined) && ( ! program.base.match(/^[a-zA-Z0-9\.\-_\+/!\"#\$%&'\(\)\*,;<=>?@\[\]\^`{\|}~]*$/) )){
  error("-b, --base option is only use [a-zA-Z0-9.-_+/!\"#$%&'()*,;<=>?@[]^`{|}~]");
}
// --base (string length)
if( (program.base !== undefined) && !(MIN_BASE_LEN <= program.base.length && program.base.length <= MAX_BASE_LEN) ){
  error(`-b, --base option is need between ${MIN_BASE_LEN} to ${MAX_BASE_LEN} string length`);
}

//--------------------------------------
// Generate password
//--------------------------------------
passwd.setOption({
    length: Number(program.length),
  strength: program.strength,
      base: program.base,
    secure: program.secure
});

for(let i=0; i<program.item; i++){
  passwd
    .gen()
    .echo();
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