const fs = require('fs');
const path = require('path');

const destination = path.resolve(__dirname, 'project-dist', 'bundle.css');
const source = path.resolve(__dirname, 'styles');
const output = fs.createWriteStream(destination);

fs.readdir(source, {withFileTypes: true}, (err, items) =>{
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