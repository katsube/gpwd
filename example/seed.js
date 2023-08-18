const genPassword = require('../index.js');
const passwd = new genPassword({
  seed: 12345,
  length: 16
});

const a = passwd
            .gen()   // generate password
            .get();  // get password

console.log(a);