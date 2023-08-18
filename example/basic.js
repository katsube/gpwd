const genPassword = require('../index.js');
const passwd = new genPassword();

const a = passwd
            .gen()   // generate password
            .get();  // get password

console.log(a);