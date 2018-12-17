const config = require('./config/config.json');
const Importer = require('./service/Importer');
const DirWatcher = require('./service/DirWatcher');

const pathToCsvFiles = config.pathToCsvData;

const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher, pathToCsvFiles);

importer.start(config.csvProcessingDelay);

console.log('==== SYNC PARSE DATA FILE ====');
console.log(Importer.importSync('data/example1.csv'));
