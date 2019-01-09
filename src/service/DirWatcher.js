const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this._filesToWatch = [];
  }

  watch(dataPath, delay) {
    setInterval(() => this._readDataDir(dataPath), delay * 1000);
  }

  _readDataDir(dataPath) {
    fs.readdir(dataPath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      const csvFiles = files.filter((file) => path.extname(file) === '.csv');
      this._notifyOnDataChanges(csvFiles);
    });
  }

  _notifyOnDataChanges(currentDataFiles) {
    currentDataFiles
      .filter((file) => !this._filesToWatch.includes(file))
      .forEach((file) => {
        this.emit('dirwatcher:changed', file);
      });

    this._filesToWatch = currentDataFiles;
  }
}

module.exports = DirWatcher;
