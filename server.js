const { exec } = require('child_process');
const { resolve } = require('path');
const prompts = require('prompts');
const convertImage = require('./convert-image');
const tempFile = resolve(`./temp.png`);

prompts({
  type: 'text',
  message: 'Enter file path:',
  name: 'filePath',
  initial: './test.png'
}).then(({ filePath }) => convertImage(filePath, tempFile))
  .then(() => {
    const stream = exec(resolve(`./Tesseract-OCR/tesseract.exe ${tempFile} out -l eng+rus`), (error) => {
      if (error) {
        return console.error(error);
      }

      console.log('Done');
    });

    stream.stdout.pipe(process.stdout);
    stream.stderr.pipe(process.stderr);
  });
