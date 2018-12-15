/**
 * Generate Password
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

let version = "1.0.0";
let program = require('commander');
program
  .version(version)
  .option('-l, --length [bytes]', 'string length [bytes]', 8)
  .option('-s, --strength [mode]', 'string strength [god|strong|normal|weak]', 'normal')
  .option('-i, --item [number]', 'how many generate [number]', 1)
  .parse(process.argv);


let genPassword = require("./genPassword");
let passwd = new genPassword({
					  "length": program.length
					, "strength": program.strength.toUpperCase()
				});

for(let i=0; i<program.item; i++){
	passwd.gen().echo();
}
