#!/usr/bin/env node
"use strict";

/**
 * Generate English dictionary
 *
 * @author  M.Katsube <katsubemakito@gmail.com>
 * @license MIT
 */

//--------------------------------------
// Module
//--------------------------------------
const os = require("os");
const path = require("path");
const fs = require("fs");
const reqp = require("request-promise-native");
const cheerio = require("cheerio");
const nedb = require('nedb');

//--------------------------------------
// Constant
//--------------------------------------
const URL_WIKTIONARY = [
  "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/PG/2006/04/1-10000",
  "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/PG/2006/04/10001-20000",
  "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/PG/2006/04/20001-30000",
  "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/PG/2006/04/30001-40000"
];

const FILE_DICTIONARY = path.join(__dirname, '../data/dictionary/english.nedb');

const SKIP_WORDLEN = 2;

//--------------------------------------
// Generate dictionary
//--------------------------------------
(async ()=>{
  // Downlad
  console.log("[Download Start]");
  const files = await getWikitionary();
  console.log("done");

  // Scraping
  console.log("[Scraping Start]");
  let words = [];
  for(let i=0; i<files.length; i++){
    const word = await getEnglishWord(files[i]);
    words.push(...word);
  }

  // Remove duplication
  const prdlist = words.filter((x, i, self)=>{
    return self.indexOf(x) === i;
  });
  console.log("done");

  // Save
  console.log("[Write file Start]");
  await saveWords(FILE_DICTIONARY, prdlist);
})();



/**
 * Download Wikitionary Page
 *
 * @return {array}
 */
async function getWikitionary(){
  const len = URL_WIKTIONARY.length;
  const tmpdir = os.tmpdir();
  let files = [];

  for(let i=1; i<=len; i++){
    const url = URL_WIKTIONARY[i-1];
    console.log(`  (${i}/${len}) - ${url}`);
    await reqp(url)
      .then((html)=>{
        const file = path.join(tmpdir, `gpwd_wikitionary_${i}.html`);
        fs.writeFileSync(file, html);
        files.push(file);
      })
      .catch((err)=>{
        error(err.message);
      });
  };

  return(files);
};


/**
 * Scraping Wikitionary page
 *
 * @param {string} file - HTML file path
 * @return {array}
 */
async function getEnglishWord(file){
  let result = [];

  const buff = fs.readFileSync(file, "utf8");
  const $ = cheerio.load(buff);
  $("table tbody tr").each((_, elem)=>{
    const word = $(elem).find("td a").text().trim();
    if( (word.length > SKIP_WORDLEN) && (word.match(/^[a-zA-Z0-9]{1,}$/))){
      result.push(word);
    }
  });

  return(result);
}

/**
 * Save scraping words
 *
 * @param {string} file  - file path
 * @param {array}  words - words list
 * @return {void}
 */
async function saveWords(file, words){
  const backup = file + ".back";
  if( fs.existsSync(file) ){
    fs.renameSync(file, backup);
  }

  const db = new nedb({
      filename: file,
      autoload: true}
  );
  db.ensureIndex({ fieldName: "w", unique:true }, (err)=>{
    if(err !== null) error(err);
  });
  db.ensureIndex({ fieldName: "l" }, (err)=>{
    if(err !== null) error(err);
  });

  const len = words.length;
  for( let i=0; i<len; i++ ){
    const doc = {
      w: words[i],
      l: words[i].length
    };

    db.insert(doc, (err, newDoc)=>{
      if( err !== null){
        console.log(err)
      }
    });
  }
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
