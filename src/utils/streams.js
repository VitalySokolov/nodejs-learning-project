const csv = require('csvtojson');
const fs = require('fs');
const readline = require('readline');

const convertFromFile = 'convertFromFile';
const convertToFile = 'convertToFile';
const cssBundle = 'cssBundle';
const outputFile = 'outputFile';
const transform = 'transform';
const transformToFile = 'transformToFile';
const reverse = 'reverse';

const yargs = require('yargs')
    .alias('a', 'action')
    .describe('a', 'choose an action to perform')
    .choices('a',
        [convertFromFile, convertToFile, cssBundle, outputFile,
          transform, transformToFile, reverse])
    .demandOption('action')
    .alias('f', 'file')
    .describe('f', 'specify a file')
    .alias('p', 'path')
    .describe('p', 'specify a path to css files')
    .help('h')
    .alias('h', 'help')
    .version(false);
const argv = yargs.argv;

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

const _getStdinReadline = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
};

const _reverseString = (str) => str.split('').reverse().join('');

const _convertStringToUpperCase = (str) => str.toUpperCase();

const _processStdin = (operation) => {
  const rl = _getStdinReadline();

  rl.on('line', (line) => {
    console.log(operation(line));
  });
};

const outputFileFunc = () => {
  const fileName = argv.file;
  if (!fileName || typeof fileName !== 'string') {
    console.log('ERROR No ARG');
    return;
  }

  const src = fs.createReadStream(fileName);
  src.on('error', (err) => {
    console.log('ERROR File Not Exist', err.message);
  });

  src
    .pipe(process.stdout);
};

const convertFromFileFunc = () => {
  const fileName = argv.file;

  csv().fromFile(fileName)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
};

const action = argv.action;

switch (action) {
  case convertFromFile:
    convertFromFileFunc();
    break;
  case convertToFile:
    console.log(convertToFile);
    break;
  case cssBundle:
    console.log(cssBundle);
    break;
  case outputFile:
    outputFileFunc();
    break;
  case reverse:
    reverseFunc();
    break;
  case transform:
    transformFunc();
    break;
  case transformToFile:
    console.log(transformToFile);
    break;
  default:
    console.log('Unknown command');
}
