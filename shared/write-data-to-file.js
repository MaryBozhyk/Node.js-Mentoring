const fs = require('fs');

function updateFileData(fileName, context) {
    fs.writeFile(fileName, JSON.stringify(context), 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    })
}

module.exports = {
    updateFileData
}