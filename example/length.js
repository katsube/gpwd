const genPassword = require('../index.js');
const passwd = new genPassword({
  length: 16,
});

const a = passwd
            .gen()   // generate password
            .get();  // get password

console.log(a);