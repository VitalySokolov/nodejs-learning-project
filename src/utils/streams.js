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

const transformFunc = () => {
  // console.log(argv._);
  const text = argv._[0];
  if (!text) {
    console.log('No text');
  }
  console.log(transform);
};

const action = argv.action;

switch (action) {
  case convertFromFile:
    console.log(convertFromFile);
    break;
  case convertToFile:
    console.log(convertToFile);
    break;
  case cssBundle:
    console.log(cssBundle);
    break;
  case outputFile:
    console.log(outputFile);
    break;
  case reverse:
    console.log(reverse);
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


console.log(yargs.showHelp());