const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const csvSync = require('csvjson');

class Importer {
  constructor(watcher, pathToDataDir) {
    this._watcher = watcher;
    this._pathToCsvData = pathToDataDir;

    this._init();
  }

  static import(pathToCsvFile) {
    return csv().fromFile(pathToCsvFile);
  }

  static importSync(pathToCsvFile) {
    if (!fs.existsSync(pathToCsvFile)) {
      return { error: 'File not found' };
    }

    const csvData = fs.readFileSync(pathToCsvFile, 'utf8');
    return csvSync.toObject(csvData);
  }

  _init() {
    this._watcher.on('dirwatcher:changed', (filename) => {
      this.constructor.import(path.join(this._pathToCsvData, filename))
        .then((dataJson) => {
          console.log('====== PARSE DATA FILE =====');
          console.log(dataJson);
        })
        .catch((error) => console.log(error));
    });
  }

  start(delay) {
    this._watcher.watch(this._pathToCsvData, delay);
  }
}

module.exports = Importer;
