#!/usr/bin/env node
'use strict';

/**
 * Generate Password
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

//--------------------------------------
// Module
//--------------------------------------
const genPassword = require("./genPassword");
const program     = require('commander');

//--------------------------------------
// commander
//--------------------------------------
program
  .version("1.0.0")
  .option('-l, --length [bytes]',  'string length [bytes]', 8)
  .option('-s, --strength [mode]', 'string strength [god|strong|normal|weak]', 'normal')
  .option('-i, --item [number]',   'how many generate [number]', 1)
  .parse(process.argv);

//--------------------------------------
// Validation
//--------------------------------------
if( ! Number.isInteger( Number(program.length) ) ){
	error("-l, --length option is only integer.");
}
if( ! (genPassword.MIN_LENGTH <= Number(program.length) && Number(program.length) <= genPassword.MAX_LENGTH) ){
	error("-l, --length option is need between "+genPassword.MIN_LENGTH+" to "+genPassword.MAX_LENGTH);
}
if( ! program.strength.match(/^(god|strong|normal|weak)$/i) ){
	error("-s, --strength option is [god|strong|normal|weak]");
}
if( ! Number.isInteger( Number(program.item) ) ){
	error("-i, --item option is only integer.");
}
if( ! (1 <= Number(program.item) && Number(program.item) <= 65536) ){
	error("-l, --length option is need between 1 to 65536");
}

//--------------------------------------
// Generate password
//--------------------------------------
const passwd = new genPassword({
					  "length": Number(program.length)
					, "strength": program.strength.toUpperCase()
				});

for(let i=0; i<program.item; i++){
	passwd
		.gen()
		.echo();
}


/**
 * Display Error and exit
 *
 * @param {string} str
 */
function error(str){
	console.error("[Error] " + str);
	process.exit(1);
}