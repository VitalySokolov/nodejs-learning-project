// import EventEmitter from 'events';
// import fs from 'fs';
const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {

  watch(path, delay) {
    //read
    fs.readdir(path, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      files.forEach((file) => this.emit('dirwatcher:changed', file))
    });

    //watch
    fs.watch(path, (event, filename) => {
      if (event === 'rename') {
        this.emit('dirwatcher:changed', filename);
      }
    });
  }
}

module.exports = DirWatcher;
