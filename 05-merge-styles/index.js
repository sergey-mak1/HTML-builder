const fs = require('fs');
const path = require('path');
const folderStyles = path.join(__dirname, 'styles')

const newFile = fs.createWriteStream(path.join(__dirname, '/project-dist/bundle.css'))

fs.readdir(folderStyles, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        fs.stat(path.join(folderStyles, file), (err, stats) => {
            if (err) throw err;
            const extName = path.extname(file)
            if (stats.isFile() && extName === '.css') {
                const stream = fs.createReadStream(path.join(folderStyles,file))
                stream.on('data',data => {
                    newFile.write(data)
                })
            }
        })
    })});