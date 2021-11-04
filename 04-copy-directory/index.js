const fs = require('fs').promises;
const path = require('path');

let source = path.join(__dirname, '/files');
let destination = path.join(__dirname, '/files-copy');

copyDir(source, destination);
async function copyDir(source, destination) {
    const entries = await fs.readdir(source, {withFileTypes: true});
    await fs.mkdir(destination);
    for(let entry of entries){
        const srcPath = path.join(source, entry.name);
        const dstPath = path.join(destination, entry.name);
        if(entry.isDirectory()){
            await copyDir(srcPath, dstPath);
        } else{
            await fs.copyFile(srcPath, dstPath);
        }
    }
}

