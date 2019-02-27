const fs = require('fs');
const { encode } = require('node-base64-image');
const { resolve } = require('path');
const outPath = resolve('./out.txt');

module.exports = filePath => new Promise((res, rej) =>
  encode(resolve(filePath), { string: true, local: true }, (err, string) => err ? rej(err) : res(string)))
  .then((imageData) => ({ imageData, out: fs.readFileSync(outPath, { encoding: 'UTF-8' }) }));
