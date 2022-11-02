const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '/secret-folder'), {withFileTypes: true}, (err, items) => {
  if(err){
    console.log(err);
  } else{
    for(let item of items){
      if(item.isDirectory() !== true){
        getFiles(item);
      }
    }
  }
});
async function getFiles(item) {
  let pathName = path.join(__dirname,`/secret-folder/${item.name}`);
  let size = 0;
  size = await fs.promises.stat(pathName).then(stat => {return stat.size;});
  console.log(path.basename(item.name , path.extname(item.name)), '-', path.extname(item.name).split('.').join(''), '-', size, 'б');
}




