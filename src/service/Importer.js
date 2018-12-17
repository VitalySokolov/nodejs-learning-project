const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const csvSync = require('csvjson');

class Importer {
  constructor(watcher, pathToDataDir) {
    this.watcher = watcher;
    this.pathToCsvData = pathToDataDir;

    this.init();
  }

  static import(pathToCsvFile) {
    return csv().fromFile(pathToCsvFile);
  }

  static importSync(pathToCsvFile) {
    if (!fs.existsSync(pathToCsvFile)) {
      return 'File not found';
    }

    const dataJson = fs.readFileSync(pathToCsvFile, 'utf8');
    return csvSync.toObject(dataJson);
  }

  init() {
    this.watcher.on('dirwatcher:changed', (filename) => {
      this.constructor.import(path.join(this.pathToCsvData, filename))
        .then((dataJson) => {
          console.log('====== PARSE DATA FILE =====');
          console.log(dataJson);
        })
        .catch((error) => console.log(error));
    });
  }

  start(delay) {
    this.watcher.watch(this.pathToCsvData, delay);
  }
}

module.exports = Importer;
