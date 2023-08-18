const genPassword = require('../index.js');
const passwd = new genPassword({
  secure: true,
});

const a = passwd
            .gen()   // generate password
            .get();  // get password

console.log(a);