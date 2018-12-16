// import path from 'path';
// import csv from 'csvtojson';
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

class Importer {

  constructor(watcher, path) {
    this.watcher = watcher;
    this.pathToCsvData = path;

    this.init();
  }

  import(path) {
    return csv().fromFile(path);
  }

  importSync(path) {
    const dataJson = fs.readFileSync(path, 'utf8');
    return dataJson;
  }

  init() {
    this.watcher.on('dirwatcher:changed', (filename) => {
      this.import(path.join(this.pathToCsvData, filename))
        .then(dataJson => {
          console.log('====== PARSE FILE =====');
          console.log(dataJson);
        });
    });
  }
}

module.exports = Importer;
