const fs = require('fs');
const path = require('path')
const notes = './01-read-file/text.txt'
const stream = new fs.ReadStream(path.join(__dirname,'text.txt'), 'utf-8');
stream.on('readable', function () {
    const data = stream.read();
    if (data !== null) {
        console.log(data);
    }

});
