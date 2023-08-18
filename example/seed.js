const genPassword = require('../index.js');
const passwd = new genPassword({
  seed: 12345,
  length: 16
});

for(let i=0; i<3; i++){
  const a = passwd
              .gen()   // generate password
              .get();  // get password

  console.log(a);
}