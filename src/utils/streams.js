const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const convertFromFile = 'convertFromFile';
const convertToFile = 'convertToFile';
const cssBundle = 'cssBundle';
const outputFile = 'outputFile';
const transform = 'transform';
const readme = 'readme';
const reverse = 'reverse';

const yargs = require('yargs')
    .alias('a', 'action')
    .describe('a', `Choose an action to perform.
      To get more help enter 'readme' action.`)
    .choices('a',
        [convertFromFile, convertToFile, cssBundle, outputFile,
          transform, readme, reverse])
    .demandOption('action')
    .alias('f', 'file')
    .describe('f', 'Specify a file')
    .alias('p', 'path')
    .describe('p', 'Specify a path to css files')
    .help('h')
    .alias('h', 'help')
    .version(false);

const { argv } = yargs;

const readmeObject = require('./readme');

/**
 * Reverts each line from stdin.
 */
const reverseFunc = () => {
  _processStdin(_reverseString);
};

/**
 * Converts each line from stdin to Upper case.
 */
const transformFunc = () => {
  _processStdin(_convertStringToUpperCase);
};

/**
 * Concats all css files in the provided dir to the bundle.css file.
 */
const cssBundleFunc = () => {
  const help = readmeObject.cssBundle.join('\n');
  const pathToCss = argv.path;

  if (!_checkPath(pathToCss, help)) {
    return;
  }

  let files;

  try {
    files = fs.readdirSync(pathToCss);
    files = files
        .filter((file) => file !== 'bundle.css')
        .map((file) => path.join(pathToCss, file));
  } catch (err) {
    console.log(err.message);
    console.log(help);
    return;
  }

  const bundleCssFile = path.join(pathToCss, 'bundle.css');
  try {
    fs.unlinkSync(bundleCssFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Do nothing.
    } else {
      console.log(err.message);
      console.log(help);
      return;
    }
  }

  const bundleCssStream = fs.createWriteStream(bundleCssFile, { flags: 'a' });
  files.push(path.join(__dirname, 'nodejs18-hw3-css.css'));

  files
      .filter((file) => path.extname(file) === '.css')
      .forEach((cssFile) => {
        const readStream = fs.createReadStream(cssFile);
        readStream.on('error', (err) => {
          console.log(err.message);
          console.log(help);
        });

        readStream
            .pipe(bundleCssStream);
      });
};

/**
 * Output readme file.
 */
const readmeFunc = () => {
  const topics = Object.keys(readmeObject);
  console.log('============================================================');

  topics.forEach((topic) => {
    console.log(topic.toUpperCase());
    console.log(readmeObject[topic].join('\n'));
    console.log('\n==========================================================');
  });
};

/**
 * Pipe the given file provided by --file option to process.stdout.
 */
const outputFileFunc = () => {
  const help = readmeObject.outputFile.join('\n');
  const fileName = argv.file;

  if (!_checkFileName(fileName, help)) {
    return;
  }

  const src = fs.createReadStream(fileName);
  src.on('error', (err) => {
    console.log('ERROR. File is not exist.', err.message);
    console.log(readmeObject.outputFile.join('\n'));
  });

  src
      .pipe(process.stdout);
};

/**
 * Convert file provided by --file option from csv to json and output data
 * to process.stdout.
 * --file option is required for this command.
 */
const convertFromFileFunc = () => {
  const help = readmeObject.convertFromFile.join('\n');
  const fileName = argv.file;
  if (!_checkFileName(fileName, help)) {
    return;
  }

  if (path.extname(fileName) !== '.csv') {
    console.log('ERROR. File should have ".csv" extension');
    console.log(help);
    return;
  }

  _convertFileFun(fileName, process.stdout, help);
};

/**
 * Convert file provided by --file option from csv to json and output data
 * to a result file with the same name but json extension.
 */
const convertToFileFunc = () => {
  const help = readmeObject.convertToFile.join('\n');
  const csvFileName = argv.file;
  if (!_checkFileName(csvFileName, help)) {
    return;
  }

  if (path.extname(csvFileName) !== '.csv') {
    console.log('ERROR. File should have ".csv" extension');
    console.log(help);
    return;
  }

  const filePathObject = path.parse(csvFileName);
  filePathObject.base = null;
  filePathObject.ext = '.json';
  const jsonFileName = path.format(filePathObject);

  _convertFileFun(csvFileName, fs.createWriteStream(jsonFileName), help);
};

const _getStdinReadline = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const _reverseString = (str) => str.split('').reverse().join('');

const _convertStringToUpperCase = (str) => str.toUpperCase();

const _processStdin = (operation) => {
  const readLine = _getStdinReadline();

  readLine.on('line', (line) => {
    console.log(operation(line));
  });
};

const _checkFileName = (fileName, help) => {
  if (!fileName || typeof fileName !== 'string') {
    console.log('ERROR. File is not provided or filename is invalid.');
    console.log(help);
    return false;
  }

  return true;
};

const _checkPath = (pathToFiles, help) => {
  if (!pathToFiles || typeof pathToFiles !== 'string') {
    console.log('ERROR. Path is not provided or invalid.');
    console.log(help);
    return false;
  }

  return true;
};

const _convertFileFun = (fileName, writeStream, help) => {
  const readStream = fs.createReadStream(fileName);
  readStream.on('error', (err) => {
    console.log(err.message);
    console.log(help);
  });

  readStream
      .pipe(csv())
      .pipe(writeStream);
};

const { action } = argv;

switch (action) {
  case convertFromFile:
    convertFromFileFunc();
    break;
  case convertToFile:
    convertToFileFunc();
    break;
  case cssBundle:
    cssBundleFunc();
    break;
  case outputFile:
    outputFileFunc();
    break;
  case reverse:
    reverseFunc();
    break;
  case readme:
    readmeFunc();
    break;
  case transform:
    transformFunc();
    break;
  default:
    throw new Error('Unknown command');
}
