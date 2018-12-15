/**
 * Generate Password class
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

module.exports = class genPassword {
	/**
	 * constructors
	 *
	 * @param {Object} opt
	 * @return void
	 */
	constructor(opt){
		this.passwd = null;
		this.opt    = opt;
	}

	/**
	 * echo password
	 */
	echo(){
		console.log(this.passwd);
	}

	/**
	 * return password
	 */
	get(){
		return(this.passwd);
	}

	/**
	 * Generate password
	 *
	 * @return Object
	 */
	gen(){
		let base = this._basestring();
		let len  = this.opt.length;
		let str  = "";

		for(let i=0; i<len; i++){
			let i = Math.floor( Math.random() * base.length * 10 ) % base.length;
			str += base[i];
		}

		this.passwd = str;
		return(this);
	}

	/**
	 * make base string
	 */
	_basestring(){
		let str = "";
		switch(this.opt.strength){
			case "GOD":
				str += "!\"#$%&'()*,;<=>?@\[]^`{|}~";
			case "STRONG":
				str += ".+/";
			case "NORMAL":
				str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				str += "0123456789";
				str += "_";
			case "WEAK":
			default:
				str += "abcdefghijklmnopqrstuvwxyz";
		}

		return(str);
	}
}