/**
 * Test for genPassword.js
 *
 * Author: M.katsube
 */

//--------------------------------------
// Module
//--------------------------------------
const genPassword = require('gpwd');

//--------------------------------------
// Test data
//--------------------------------------
const LEN = [
    32
  , genPassword.MAX_LENGTH
  , genPassword.MIN_LENGTH
];
const PATTERN = {
        weak: /^[a-z]*$/
    , normal: /^[a-zA-Z0-9]*$/
    , strong: /^[a-zA-Z0-9_\.\-]*$/
    ,    god: /^[a-zA-Z0-9\.\-_\+/!\"#\$%&'\(\)\*,;<=>?@\[\]\^`{\|}~]*$/

    , alpha: /^[a-z]*$/
    , ALPHA: /^[A-Z]*$/
    , Alpha: /^[a-zA-Z]*$/
    , alnum: /^[a-z0-9]*$/
    , ALnum: /^[A-Z0-9]*$/
    , Alnum: /^[a-zA-Z0-9]*$/
    ,   num: /^[0-9]*$/
    , char1: /^[\.\-_]*$/
    , char2: /^[\+/!\"#\$%&'\(\)\*,;<=>?@\[\]\^`{\|}~]*$/
    , base64: /^[a-zA-Z0-9/\+=]*$/
};

//--------------------------------------
// Test
//--------------------------------------
test('static XXX_LENGTH', () => {
  expect(genPassword.MIN_LENGTH).toBeGreaterThanOrEqual(1);
  expect(genPassword.MAX_LENGTH).toBeLessThanOrEqual(65536);
});

test('password echo', () => {
  const spyLog = jest.spyOn(console, 'log')
  spyLog.mockImplementation(x => x)

  const passwd = new genPassword();
  passwd.echo();
  expect(console.log).toBeCalled();
  expect(spyLog.mock.calls[0][0]).toBe(passwd.get());
});

test('password length', () => {
  for(let i=0; i<LEN.length; i++){
    const passwd = new genPassword({
      length: LEN[i]
    });
    expect(passwd.gen().get().length).toBe(LEN[i]);
  }

  const passwd = new genPassword();
  expect(passwd.gen().get().length).toBe(8);
});

test('password strength', () => {
  for( let i=0; i<10000; i++ ){
    for(let mode in PATTERN){
      const passwd = new genPassword({
        strength: mode
      });
      expect(passwd.gen().get()).toMatch(PATTERN[mode]);
    }

    const passwd = new genPassword();
    expect(passwd.gen().get()).toMatch(PATTERN["strong"]);
  }
});

test('password length and strength', () => {
  for( let i=0; i<10; i++ ){
    for(let j=0; j<LEN.length; j++){
      for(let mode in PATTERN){
        const passwd = new genPassword({
            strength: mode
          , length: LEN[j]
        });
        expect(passwd.gen().get().length).toBe(LEN[j]);
        expect(passwd.gen().get()).toMatch(PATTERN[mode]);
      }
    }
  }
});

test('setOption()', () => {
  const defaultOpt = {length:8, strength:"strong", base:undefined, secure:undefined};

  // check default value
  const passwd = new genPassword();
  expect( passwd.getOption() ).toMatchObject(defaultOpt);
  expect( passwd.getOption("length") ).toBe(defaultOpt.length);
  expect( passwd.getOption("strength") ).toBe(defaultOpt.strength);
  expect( passwd.getOption("base") ).toBe(defaultOpt.base);
  expect( passwd.getOption("secure") ).toBe(defaultOpt.secure);

  // no argument === no change
  passwd.setOption();
  expect( passwd.getOption() ).toMatchObject(defaultOpt);

  // base is visible charactor only
  passwd.setOption({base:"\n"});
  expect( passwd.getOption("base") ).toBe(defaultOpt.base);

  // change option
  passwd.setOption({length:16});
  expect( passwd.getOption() ).toMatchObject({length:16, strength:defaultOpt.strength, base:defaultOpt.base});
  passwd.setOption({strength:"normal"});
  expect( passwd.getOption() ).toMatchObject({length:16, strength:"normal", base:defaultOpt.base});
  passwd.setOption({base:"01"});
  expect( passwd.getOption() ).toMatchObject({length:16, strength:"normal", base:"01"});
  passwd.setOption({secure:true});
  expect( passwd.getOption() ).toMatchObject({length:16, strength:"normal", base:"01", secure:true});
  passwd.setOption({length:128, strength:"god", base:"01", secure:true});
  expect( passwd.getOption() ).toMatchObject({length:128, strength:"god", base:"01", secure:true});
});

test('-b, --base', () => {
  const passwd = new genPassword();

  passwd.setOption({base:"01"});
  expect(passwd.gen().get()).toMatch(/^[01]*$/);
  passwd.setOption({base:"0123456789ABCDEF"});
  expect(passwd.gen().get()).toMatch(/^[0-9A-F]*$/);

  passwd.setOption({base:"0123456789ABCDEF", strength:"god"});
  expect(passwd.gen().get()).toMatch(/^[0-9A-F]*$/);
});

test('--secure', () => {
  const passwd = new genPassword({secure:true});
  for(let i=0; i<1000; i++){
    expect(passwd.gen().get()).toMatch(PATTERN["strong"]);
  }
});

test('--seed', () => {
  for(let i=0; i<3; i++){
    const passwd = new genPassword({seed:1234, strength:'strong', length:8});
    expect(passwd.gen().get()).toBe("qMPQwzZQ");
    expect(passwd.gen().get()).toBe("7i2gD_Av");
    expect(passwd.gen().get()).toBe("2Pt_j4S1");
  }
});