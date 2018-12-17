const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.filesToWatch = [];
  }

  watch(dataPath, delay) {
    setInterval(() => this.readDataDir(dataPath), delay * 1000);
  }

  readDataDir(dataPath) {
    fs.readdir(dataPath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      const csvFiles = files.filter((file) => path.extname(file) === '.csv');
      this.notifyOnDataChanges(csvFiles);
    });
  }

  notifyOnDataChanges(currentDataFiles) {
    currentDataFiles
      .filter((file) => !this.filesToWatch.includes(file))
      .forEach((file) => {
        this.emit('dirwatcher:changed', file);
      });

    this.filesToWatch = currentDataFiles;
  }
}

module.exports = DirWatcher;
