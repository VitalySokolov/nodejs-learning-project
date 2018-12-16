// import config from './config/config.json';
// import { Importer } from "./service/Importer";
// import { DirWatcher } from "./service/DirWatcher";
const config = require('./config/config.json');
const Importer = require("./service/Importer");
const DirWatcher = require("./service/DirWatcher");

const pathToCsvFiles = config.pathToCsvData;

const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher, pathToCsvFiles);

dirWatcher.watch(pathToCsvFiles);

console.log('==== Parse from app.js');
console.log(importer.importSync('data/example.csv'));
