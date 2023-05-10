const fs = require('fs');
const path = require('path');


const projectFolder = path.join(__dirname, 'project-dist');
const assetsFolder = path.join(__dirname, 'assets');
const assetsProject = path.join(__dirname, 'project-dist', 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const components = path.join(__dirname, 'components');
const newFileStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const stream = new fs.ReadStream(path.join(__dirname, 'template.html'), 'utf-8');
const newFileIndex = (path.join(__dirname, 'project-dist', 'index.html'));



fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) throw err;
});
fs.mkdir(assetsProject, { recursive: true }, (err) => {
  if (err) throw err;
});

function copyFolder(origin, copy) {
  fs.readdir(path.join(origin), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.isDirectory()) {
        fs.mkdir(path.join(copy, file.name), { recursive: true }, (err) => {
          if (err) throw err;
        });
        copyFolder(path.join(origin, file.name), path.join(copy, file.name));
      }
      if (file.isFile()) {
        fs.copyFile(path.join(origin, file.name), path.join(copy, file.name), (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
copyFolder(assetsFolder, assetsProject);

fs.readdir(stylesFolder, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.stat(path.join(stylesFolder, file), (err, stats) => {
      if (err) throw err;
      const extName = path.extname(file);
      if (stats.isFile() && extName === '.css') {
        const stream = fs.createReadStream(path.join(stylesFolder, file));
        stream.on('data', data => {
          newFileStyle.write(data);
        });
      }
    });
  });
});


stream.on('readable', function () {
  let data = stream.read();
  if (data !== null) {
    const tags = data.match(/{{\w+}}/g);
    tags.forEach((tag, i) => {
      const tagFile = path.join(components, `${tag.slice(2, -2)}.html`);
      console.log(tagFile);
      console.log(tag);
      fs.readFile(tagFile, 'utf-8', (err, tagData) => {
        if (err) throw err;
        data = data.replace(tag, tagData);
        if (i === tags.length - 1) {
          
          const createIndex = fs.createWriteStream(newFileIndex);
          createIndex.write(data);
        
        }
      });
    });
  }
});

