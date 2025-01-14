const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname,'secret-folder');
fs.readdir(secretFolder, (err, files) => {
  if(err) throw err;
  files.forEach(file => {
    fs.stat(path.join(secretFolder, file), (err, stats) => {
      const name =  path.basename(file, path.extname(file));
      const extname = path.extname(file).substring(1);
      const size = (parseFloat(stats.size/1024)).toFixed(3);
      if (stats.isFile() === true) {
        console.log(name + ' - ' + extname + ' - ' + size + 'kb');
      }
    });
  });
});