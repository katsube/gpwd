/**
 * Generate Password to Human class
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */
'use strict';

//---------------------------------------------------------
// Module
//---------------------------------------------------------
const Crypto = require('crypto');

//---------------------------------------------------------
// Class
//---------------------------------------------------------
module.exports = class genPasswordHuman {

  /**
   * constructors
   *
   * @constructor
   * @param {object} opt option value {length:8, strength:"normal"}
   * @returns {void}
   */
  constructor(opt=null){
    this.passwd = null;

    this.opt = {length:8, caps:undefined, secure:undefined};
    if( opt !== null ){
      this.setOption(opt)
    }
  }


  /**
   * minimum password length
   */
  static get MIN_LENGTH(){
    return(3);
  }
  /**
   * maximum password length
   */
  static get MAX_LENGTH(){
    return(65536);
  }


  /**
   * getter this.option
   *
   * @param {string} [key]
   * @returns {mixed}
   */
  getOption(key=null){
    if( key === null ){
      return(this.opt);
    }
    else if( key in this.opt ){
      return(this.opt[key]);
    }
  }

  /**
   * setter this.option
   *
   * @param {object} [option] value {length:8, caps:true, secure:true}
   * @returns {void}
   */
  setOption(opt={}){
    if( ("length" in opt) && (typeof(opt.length) === "number") ){
      this.opt.length = opt.length;
    }
    if( ("caps" in opt) && (typeof(opt.caps) === "boolean") ){
      this.opt.caps = opt.caps;
    }
    if( ("secure" in opt) && (typeof(opt.secure) === "boolean") ){
      this.opt.secure = opt.secure;
    }
  }

  /**
   * echo password
   *
   * @returns {void}
   */
  echo(){
    console.log(this.passwd);
  }

  /**
   * return password
   *
   * @returns {string}
   */
  get(){
    return(this.passwd);
  }

  /**
   * Generate password
   *
   * @returns {object}
   */
  gen(){
    if( ! this.opt.secure ){
      this.passwd = "foobar";
    }
    else{
      this.passwd = "foobar(secure)";
    }
    return(this);
  }

  /**
   * Secure Math.random()
   *
   * @private
   * @returns {integer}
   */
  _getSecureRandom(){
    const buff = Crypto.randomBytes(8);
    const hex  = buff.toString("hex");

    return ( parseInt(hex,16) );
  }
}