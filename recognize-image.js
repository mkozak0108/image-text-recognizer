const { exec } = require('child_process');
const { resolve } = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const command = `out -l eng+rus`;
const devPath = resolve(`./Tesseract-OCR/tesseract.exe`);

const handler = (res, rej) => (error) => {
  if (error) {
    return rej(error);
  }

  res();
};

const runDev = (filePath) => {
  return new Promise((res, rej) => {
    const stream = exec(`${devPath} ${filePath} ${command}`, handler(res, rej));
    stream.stdout.pipe(process.stdout);
    stream.stderr.pipe(process.stderr);
  });
};


const runProd = (filePath) => {
  return new Promise((res, rej) => {
    exec(`tesseract ${filePath} ${command}`, handler(res, rej));
  });
};

module.exports = isDev ? runDev : runProd;
