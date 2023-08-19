/**
 * Generate Password class
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */
'use strict';

//---------------------------------------------------------
// Module
//---------------------------------------------------------
const Crypto = require('crypto');
const pseudoRandom = require('pseudo-random.js');

//---------------------------------------------------------
// Class
//---------------------------------------------------------
module.exports = class genPassword {
  //------------------------------
  // property
  //------------------------------
  #passwd = null;
  #basestring = {
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
  #opt = {
    length: 8,
    strength: "strong",
    base: undefined,
    secure: undefined,
    seed: undefined
  };
  #pRandom = null;

  /**
   * constructors
   *
   * @constructor
   * @param {object} opt option value {length:8, strength:"normal"}
   * @returns {void}
   */
  constructor(opt=null){
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
      return(this.#opt);
    }
    else if( key in this.#opt ){
      return(this.#opt[key]);
    }
  }

  /**
   * setter this.option
   *
   * @param {object} [option] value {length:8, strength:"normal", base:"xxxxxx", secure:true}
   * @returns {void}
   */
  setOption(opt={}){
    if( ("length" in opt) && (typeof(opt.length) === "number") ){
      this.#opt.length = opt.length;
    }
    if( ("strength" in opt) && (typeof(opt.strength) === "string") ){
      if( this.existsStrength(opt.strength) ){
        this.#opt.strength = opt.strength;
      }
    }
    if( ("base" in opt) && (opt.base !== undefined) && (opt.base.match(/^[a-zA-Z0-9\.\-_\+/!\"#\$%&'\(\)\*,;<=>?@\[\]\^`{\|}~]*$/)) ){
      this.#opt.base = opt.base;
    }
    if( ("secure" in opt) && (opt.secure === true) ){
      this.#opt.secure = true;
    }
    if( ("seed" in opt) && (typeof(opt.seed) === "number") ){
      this.#opt.seed = opt.seed;
      this.#pRandom = new pseudoRandom(opt.seed);
    }
  }

  /**
   * echo password
   *
   * @returns {void}
   */
  echo(){
    console.log(this.#passwd);
  }

  /**
   * return password
   *
   * @returns {string}
   */
  get(){
    return(this.#passwd);
  }

  /**
   * Generate password
   *
   * @returns {object}
   */
  gen(){
    const base   = this.#getBasestring();
    const len    = this.#opt.length;
    const secure = this.#opt.secure;
    const seed   = this.#opt.seed;
    let str = "";

    for(let i=0; i<len; i++){
      let idx;
      if( seed !== undefined ){
        // console.log("seed");
        idx = Math.floor(this.#pRandom.next() * base.length * 10) % base.length;
      }
      else if( secure !== undefined ){
        // console.log("secure");
        idx = this.#getSecureRandom() % base.length;
      }
      else{
        // console.log("random");
        idx = Math.floor( Math.random() * base.length * 10 ) % base.length;
      }

      str += base[idx];
    }

    this.#passwd = str;
    return(this);
  }

  /**
   * check exists strength
   *
   * @param {string} strength
   * @returns {boolean}
   */
  existsStrength(strength){
    return( strength in this.#basestring );
  }

  /**
   * get basestring
   *
   * @private
   * @param {string} [str] strength
   * @returns {string|null}
   */
  #getBasestring(str=null){
    const strength = (str===null)? this.#opt.strength:str;
    const base = this.#opt.base;

    if( base !== undefined ){
      return( base );
    }
    else if( this.existsStrength( strength ) ){
      return( this.#basestring[strength] );
    }
    else{
      return( null );
    }
  }

  /**
   * Secure Math.random()
   *
   * @private
   * @returns {integer}
   */
  #getSecureRandom(){
    const buff = Crypto.randomBytes(8);
    const hex  = buff.toString("hex");

    return ( parseInt(hex,16) );
  }
}