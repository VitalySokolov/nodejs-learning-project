const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONVERT_FROM_FILE = 'convertFromFile';
const CONVERT_TO_FILE = 'convertToFile';
const CSS_BUNDLE = 'cssBundle';
const OUTPUT_FILE = 'outputFile';
const TRANSFORM = 'transform';
const README = 'readme';
const REVERSE = 'reverse';
const FILENAME_IS_INVALID = 'ERROR. File is not provided or filename is invalid.';
const PATH_IS_INVALID = 'ERROR. Path is not provided or invalid.';

const yargs = require('yargs')
  .alias('a', 'action')
  .describe('a', `Choose an action to perform.
      To get more help enter 'readme' action.`)
  .choices('a',
    [CONVERT_FROM_FILE, CONVERT_TO_FILE, CSS_BUNDLE, OUTPUT_FILE,
      TRANSFORM, README, REVERSE])
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

const _getStdinReadline = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const _reverseString = (str) => str.split('').reverse().join('');

const _convertStringToUpperCase = (str) => str.toUpperCase();

const _processStdin = (operation) => {
  console.log('Please, type text for conversion:');
  const readLine = _getStdinReadline();

  readLine.on('line', (line) => {
    console.log(operation(line));
  });
};

const _validateStringParam = (param, errorMessage) => {
  if (!param || typeof param !== 'string') {
    console.log(errorMessage);
    return false;
  }

  return true;
};

const _validateCsvFileExtension = (csvFileName, help) => {
  if (path.extname(csvFileName) !== '.csv') {
    console.log('ERROR. File should have ".csv" extension');
    console.log(help);
    return false;
  }

  return true;
};

const _outputFormattedMultilineJson = (jsonArray, writeStream) => {
  writeStream.write('[\n  ');
  writeStream.write(JSON.stringify(jsonArray[0]));
  jsonArray.shift();
  jsonArray.forEach((line) => {
    writeStream.write(',\n  ');
    writeStream.write(JSON.stringify(line));
  });
  writeStream.write('\n]\n');
  writeStream.end();
};

const _convertFileFun = (fileName, writeStream, help) => {
  csv()
    .fromFile(fileName)
    .then((jsonArray) => {
      if (jsonArray.length === 0) {
        writeStream.write('\n');
        writeStream.end();
      } else if (jsonArray.length === 1) {
        writeStream.write(`${JSON.stringify(jsonArray[0])}\n`);
        writeStream.end();
      } else {
        _outputFormattedMultilineJson(jsonArray, writeStream);
      }
    })
    .catch((err) => {
      console.log(err.message);
      console.log(help);
    });
};

const _getCssFilesForPath = (pathToCss) => {
  try {
    let files = fs.readdirSync(pathToCss);
    files = files
      .filter((file) => path.extname(file) === '.css')
      .filter((file) => file !== 'bundle.css')
      .map((file) => path.join(pathToCss, file));

    if (files.length === 0) {
      console.log('ERROR. There are no css files in the given directory.');
      return [];
    }

    return files;
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

const _removeFile = (fileName) => {
  try {
    fs.unlinkSync(fileName);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Do nothing.
    } else {
      console.log(err.message);
      return false;
    }
  }

  return true;
};

const _writeAllFilesToBundleCss = (fileArray, bundleCssFile, help) => {
  const bundleCssStream = fs.createWriteStream(bundleCssFile, { flags: 'a' });
  const currentCssFile = fileArray.shift();
  bundleCssStream.on('finish', () => {
    if (fileArray.length > 0) {
      _writeAllFilesToBundleCss(fileArray, bundleCssFile, help);
    }
  });

  const readStream = fs.createReadStream(currentCssFile);
  readStream.on('error', (err) => {
    console.log(err.message);
    console.log(help);
  });

  readStream
    .pipe(bundleCssStream);
};

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

  if (!_validateStringParam(pathToCss, `${PATH_IS_INVALID}\n${help}`)) {
    return;
  }

  const files = _getCssFilesForPath(pathToCss);
  if (files.length === 0) {
    console.log(help);
    return;
  }

  const bundleCssFile = path.join(pathToCss, 'bundle.css');
  if (!_removeFile(bundleCssFile)) {
    console.log(help);
    return;
  }

  files.push(path.join(__dirname, 'nodejs18-hw3-css.css'));
  _writeAllFilesToBundleCss(files, bundleCssFile, help);
};

/**
 * Pipe the given file provided by --file option to process.stdout.
 */
const outputFileFunc = () => {
  const help = readmeObject.outputFile.join('\n');
  const fileName = argv.file;

  if (!_validateStringParam(fileName, `${FILENAME_IS_INVALID}\n${help}`)) {
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
  if (!_validateStringParam(fileName, `${FILENAME_IS_INVALID}\n${help}`)) {
    return;
  }

  if (!_validateCsvFileExtension(fileName, help)) {
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
  if (!_validateStringParam(csvFileName, `${FILENAME_IS_INVALID}\n${help}`)) {
    return;
  }

  if (!_validateCsvFileExtension(csvFileName, help)) {
    return;
  }

  const filePathObject = path.parse(csvFileName);
  filePathObject.base = null;
  filePathObject.ext = '.json';
  const jsonFileName = path.format(filePathObject);

  _convertFileFun(csvFileName, fs.createWriteStream(jsonFileName), help);
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

const { action } = argv;

switch (action) {
  case CONVERT_FROM_FILE:
    convertFromFileFunc();
    break;
  case CONVERT_TO_FILE:
    convertToFileFunc();
    break;
  case CSS_BUNDLE:
    cssBundleFunc();
    break;
  case OUTPUT_FILE:
    outputFileFunc();
    break;
  case REVERSE:
    reverseFunc();
    break;
  case README:
    readmeFunc();
    break;
  case TRANSFORM:
    transformFunc();
    break;
  default:
    throw new Error('Unknown command');
}
