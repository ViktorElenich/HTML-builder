const fs = require('fs');
const path = require('path');
const rl = require('readline');
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Enter your text: ')
readline.on('line', (input)=>{
    if(input === 'exit'){
        readline.close()
    } else{
        fs.appendFile('02-write-file/text.txt', `${input}\n`, ()=>{
            console.log(`Your enter: ${input}`);
        })
    }    
})
process.on('beforeExit', (code) => {
    console.log('Have a nice day, bue');
})
