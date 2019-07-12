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

//--------------------------------------
// Module
//--------------------------------------
const genPassword = require("./genPassword");
const program = require("commander");
const passwd  = new genPassword();

//--------------------------------------
// commander
//--------------------------------------
program
  .version("1.1.0")
  .option("-l, --length [bytes]",  "string length [bytes]", 8)
  .option("-s, --strength [mode]", "string strength [god|strong|normal|weak] and more", "strong")
  .option("-i, --item [number]",   "how many generate [number]", 1)
  .parse(process.argv);

//--------------------------------------
// Validation
//--------------------------------------
if( ! Number.isInteger( Number(program.length) ) ){
  error("-l, --length option is only integer.");
}
if( ! (genPassword.MIN_LENGTH <= Number(program.length) && Number(program.length) <= genPassword.MAX_LENGTH) ){
  error(`-l, --length option is need between ${genPassword.MIN_LENGTH} to ${genPassword.MAX_LENGTH}`);
}
if( ! passwd.existsStrength(program.strength) ){
  error("-s, --strength option is [god|strong|normal|weak] and more.");
}
if( ! Number.isInteger( Number(program.item) ) ){
  error("-i, --item option is only integer.");
}
if( ! (MIN_ITEM <= Number(program.item) && Number(program.item) <= MAX_ITEM) ){
  error(`-l, --length option is need between ${MIN_ITEM} to ${MAX_ITEM}`);
}

//--------------------------------------
// Generate password
//--------------------------------------
passwd.setOption({
    length: Number(program.length),
  strength: program.strength
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