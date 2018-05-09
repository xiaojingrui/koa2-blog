const fs = require('fs');

const readDir = (list_dir) => {
    return new Promise((resolve, reject) => {
        let files = fs.readdirSync(list_dir);
        if (Array.isArray(files)) {
            resolve(files);
        } else {
            reject();
        }
        
    })
}

module.exports = readDir;