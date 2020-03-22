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
const program = require("commander");
const util = require("../lib/util.js");
const genPassword = require("../index.js");
const passwd  = new genPassword();

// Config file
const config = util.getConfig();

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
if( program.length === undefined ){
  program.length = ("length" in config)?  config.length:DEFAULT_OPT.length;
}
if( program.item === undefined ){
  program.item = ("item" in config)?  config.item:DEFAULT_OPT.item;
}
if( program.strength === undefined ){
  program.strength = ("strength" in config)?  config.strength:DEFAULT_OPT.strength;
}
if( program.base === undefined ){
  program.base = ("base" in config)?  config.base:DEFAULT_OPT.base;
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
// --strength
if( ! passwd.existsStrength(program.strength) ){
  util.error("-s, --strength option is [god|strong|normal|weak] and more.");
}
// --item (is number)
if( ! Number.isInteger( Number(program.item) ) ){
  util.error("-i, --item option is only integer.");
}
// --item (between min to max)
if( ! (MIN_ITEM <= Number(program.item) && Number(program.item) <= MAX_ITEM) ){
  util.error(`-i, --item option is need between ${MIN_ITEM} to ${MAX_ITEM}`);
}
// --base (charactor type)
if( (program.base !== undefined) && ( ! program.base.match(/^[a-zA-Z0-9\.\-_\+/!\"#\$%&'\(\)\*,;<=>?@\[\]\^`{\|}~]*$/) )){
  util.error("-b, --base option is only use [a-zA-Z0-9.-_+/!\"#$%&'()*,;<=>?@[]^`{|}~]");
}
// --base (string length)
if( (program.base !== undefined) && !(MIN_BASE_LEN <= program.base.length && program.base.length <= MAX_BASE_LEN) ){
  util.error(`-b, --base option is need between ${MIN_BASE_LEN} to ${MAX_BASE_LEN} string length`);
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
