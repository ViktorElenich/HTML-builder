const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');

let src = path.join(__dirname, '/assets');
let des = path.join(__dirname, '/project-dist', '/assets');

/* Копируем папку assets */
copyDir(src, des);
async function copyDir(source, destination) {
    const entries = await fsPromises.readdir(source, {withFileTypes: true});
    await fsPromises.mkdir(destination, {recursive: true});
    for(let entry of entries){
        const srcPath = path.join(source, entry.name);
        const dstPath = path.join(destination, entry.name);
        if(entry.isDirectory()){
            await copyDir(srcPath, dstPath);
        } else{
            await fsPromises.copyFile(srcPath, dstPath);
        }
    }
}
/* Собираем style.css */
const desCss = path.resolve(__dirname, 'project-dist', 'style.css');
const srcCss = path.resolve(__dirname, 'styles');
const output = fs.createWriteStream(desCss);

fs.readdir(srcCss, {withFileTypes: true}, (err, items) =>{
    if(err){
        console.log(err);
    } else{
        items.forEach(item => {
            if(item.isFile()){
                const fileName = item.name.toString();
                const extName = item.name.toString().split('.')[1];
                if(extName == 'css'){
                    fs.readFile(path.join(__dirname, 'styles', fileName), 'utf-8', (err, data) =>{
                        if(err) throw err;
                        const mergeFiles = [];
                        const style = data.toString();
                        mergeFiles.push(style);
                        for(let i= 0; i < mergeFiles.length; i++){
                            output.write(mergeFiles[i]);
                        }
                    })
                }
            }
        })
    }
})
/* Собираем index.html */
const readFile = fs.createReadStream(path.join(__dirname, 'template.html'));
const writeFile = fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'));

readFile.on('data', async (data)=>{
    const result = await htmlBuild();
    writeFile.write(result);

    async function htmlBuild() {
        let html = data.toString();
        const regularTags = html.match(/{{(.*)}}/gi);
        for(let item of regularTags){
            const tagName = item.match(/\w+/);
            const tagNameFile = tagName[0];
            const component = await fsPromises.readFile(path.join(__dirname, 'components', `${tagNameFile}.html`));
            html = html.replace(item, component.toString());
        }
        return html;
    }
})



