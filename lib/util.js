/**
 * Utility for genPassword
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

 //--------------------------------------
// Constant
//--------------------------------------
const CONFIG_FILENAME = '.gpwd.json';

//--------------------------------------
// Module
//--------------------------------------
const fs = require("fs");
const path = require("path");

/**
 * Return HOME Directory path
 *
 * @return {string|boolean}
 */
function getHomeDirectory(){
  let path = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  if( fs.existsSync(path) ){
    return(path);
  }
  else{
    return(false);
  }
}

/**
 * Return configuration
 *
 * @param {boolean} [is_human=false]
 * @return {Object}
 */
function getConfig(is_human=false){
  // Get Home directory path
  const home = getHomeDirectory();
  if( home === false){
    return({});
  }

  // Get configuration
  const file = path.join(home, CONFIG_FILENAME);
  if( fs.existsSync(file) ){
    try{
      const config = require(file);
      if( is_human === false ){
        return(config);
      }
      else if( "human" in config ){
        return(config.human);
      }
    }
    catch(err){
      error(err);
    }
  }

  return({});
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


//--------------------------------------
// exports
//--------------------------------------
module.exports.getConfig = getConfig;
module.exports.getHomeDirectory = getHomeDirectory;
module.exports.error = error;
