const csv = require('csvtojson');
const fs = require('fs');

const writable = fs.createWriteStream('data.txt', {encoding: 'utf8'});

fs.createReadStream('./data.csv', {
    autoClose: true,
}).pipe(csv({needEmitAll: false}))
    .on('data', (rowData) => writable.write(rowData))
    .on("error", (error) => console.error(error))
    .on('end', () => writable.end());

writable.on('error', (error) => console.error(error))