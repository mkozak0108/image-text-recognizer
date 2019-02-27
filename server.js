const { resolve } = require('path');
const express = require('express');
const fileParser = require('express-multipart-file-parser');
const { promisify } = require('util');
const fs = require('fs');

const convertImage = require('./convert-image');
const recognizeImage = require('./recognize-image');
const recognizedImageToJSON = require('./recognized-image-to-json');

const tempFile = resolve(`./temp.png`);
const port = process.env.PORT || 3000;
const app = express();
const writeFile = promisify(fs.writeFile);

app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(fileParser);
app.post('/recognized-image', (req, res) => {
  const { buffer } = req.files[0];
  writeFile(tempFile, buffer)
    .then(() => convertImage(tempFile, tempFile))
    .then(() => recognizeImage(tempFile))
    .then(() => recognizedImageToJSON(tempFile))
    .then(result => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    })
});

app.listen(port);
console.log(`App started at ${port}`);
