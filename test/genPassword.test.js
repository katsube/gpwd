/**
 * Test for genPassword.js
 */

const genPassword = require('../genPassword');
const LEN = [
	32
  , genPassword.MAX_LENGTH
  , genPassword.MIN_LENGTH
];
const PATTERN = {
			WEAK: /^[a-z]*$/
		, NORMAL: /^[a-zA-Z0-9_]*$/
		, STRONG: /^[a-zA-Z0-9_.+/]*$/
		,    GOD: /^[a-zA-Z0-9_.+/!"#$%&'()*,;<=>?@\[\]^`{|}~]*$/
};

test('static XXX_LENGTH', () => {
  expect(genPassword.MIN_LENGTH).toBeGreaterThanOrEqual(1);
  expect(genPassword.MAX_LENGTH).toBeLessThanOrEqual(65536);
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
		expect(passwd.gen().get()).toMatch(PATTERN["NORMAL"]);
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
