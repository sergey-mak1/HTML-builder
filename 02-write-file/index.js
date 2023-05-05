const process = require('node:process');
const fs = require('fs');
const path = require('path');
const file = fs.createWriteStream(path.join(__dirname, 'file.txt'));
process.stdout.write('Привет, напиши пару строк: ');
process.stdin.on('data', (text) =>{
  if(text.toString().trim()!=='exit'){
    file.write(text);
  }
  else{
    process.exit();
  }
});
process.on('SIGINT',process.exit);
process.on('exit',()=>process.stdout.write('GOOD BYE!'));

