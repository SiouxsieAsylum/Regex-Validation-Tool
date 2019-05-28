const nrv = require('./number-regex-validator')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'What kind of regex are you validating? '
});

const main = () => {
	readline.prompt();

	readline.on('line', (line) => {
		switch(line.trim().toLowerCase()){
			case 'number':
				number();
				break;
		}
	})
}

const number = () =>{
		readline.question('Input the regex you would like to validate: ', (regex) => {
		nrv.NumberValidator(regex);
		readline.close();
		//how can I make this interactive?
		process.exit()
	})
} 

main();