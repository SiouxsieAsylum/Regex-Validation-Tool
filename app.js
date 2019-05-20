const nrv = require('./number-regex-validator')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Input the regex you would like to validate: ', (regex) => {
	nrv.NumberValidator(regex);
	readline.close();

})