const fs = require('fs');
const path = require('path');
const filesFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');
fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) throw err;
});
fs.readdir(filesFolder,{withFileTypes:true},(err,files)=>{
    if (err) throw err;
    files.forEach(file => {
        fs.copyFile(path.join(filesFolder,file.name),path.join(copyFolder,file.name),(err)=>{
            if (err) throw err; 
        })
    });
})

