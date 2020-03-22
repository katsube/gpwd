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
const DEFAULT_OPT = {
  length: 8,
  item: 1,
  caps: false,
  secure: false
};

//--------------------------------------
// Module
//--------------------------------------
const program = require("commander");
const util = require("../lib/util.js");
const genPassword = require("../index.js").human;
const passwd  = new genPassword();

// Config file
const config = util.getConfig(true);

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
  util.error("-l, --length option is only integer.");
}
// --length (between min to max)
if( ! (genPassword.MIN_LENGTH <= Number(program.length) && Number(program.length) <= genPassword.MAX_LENGTH) ){
  util.error(`-l, --length option is need between ${genPassword.MIN_LENGTH} to ${genPassword.MAX_LENGTH}`);
}
// --item (is number)
if( ! Number.isInteger( Number(program.item) ) ){
  util.error("-i, --item option is only integer.");
}
// --item (between min to max)
if( ! (MIN_ITEM <= Number(program.item) && Number(program.item) <= MAX_ITEM) ){
  util.error(`-i, --item option is need between ${MIN_ITEM} to ${MAX_ITEM}`);
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
