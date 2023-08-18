const genPassword = require('../index.js');
const passwd = new genPassword({
  strength: "god",  // strong, normal, weak
});

const a = passwd
            .gen()   // generate password
            .get();  // get password

console.log(a);