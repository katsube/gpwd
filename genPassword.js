/**
 * Generate Password class
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

'use strict';
module.exports = class genPassword {

  /**
   * constructors
   *
   * @constructor
   * @param {object} opt option value {length:8, strength:"normal"}
   * @returns {void}
   */
  constructor(opt=null){
    this.passwd = null;
    this.basestring = {
      alpha: "abcdefghijklmnopqrstuvwxyz",
      ALPHA: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      Alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      alnum: "abcdefghijklmnopqrstuvwxyz0123456789",
      ALnum: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      Alnum: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        num: "0123456789",
       char1: ".-_",
       char2: "+/!\"#$%&'()*,;<=>?@[]^`{|}~",
      base64: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=",

         god: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-_+/!\"#$%&'()*,;<=>?@[]^`{|}~",
      strong: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-_",
      normal: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        weak: "abcdefghijklmnopqrstuvwxyz"
    };

    this.opt = {length:8, strength:"strong"};
    if( opt !== null ){
      this.setOption(opt)
    }
  }


  /**
   * minimum password length
   */
  static get MIN_LENGTH(){
    return(1);
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
   * @param {object} [option] value {length:8, strength:"normal"}
   * @returns {void}
   */
  setOption(opt={}){
    if( ("length" in opt) && (typeof(opt.length) === "number") ){
      this.opt.length = opt.length;
    }
    if( ("strength" in opt) && (typeof(opt.strength) === "string") ){
      if( this.existsStrength(opt.strength) ){
        this.opt.strength = opt.strength;
      }
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
    const base = this._getBasestring();
    const len  = this.opt.length;
    let str  = "";

    for(let i=0; i<len; i++){
      let i = Math.floor( Math.random() * base.length * 10 ) % base.length;
      str += base[i];
    }

    this.passwd = str;
    return(this);
  }

  /**
   * check exists strength
   *
   * @param {string} strength
   * @returns {boolean}
   */
  existsStrength(strength){
    return( strength in this.basestring );
  }

  /**
   * get basestring
   *
   * @private
   * @param {string} [str] strength
   * @returns {string|null}
   */
  _getBasestring(str=null){
    const strength = (str===null)? this.opt.strength:str;

    if( this.existsStrength( strength ) ){
      return( this.basestring[strength] );
    }
    else{
      return( null );
    }
  }
}