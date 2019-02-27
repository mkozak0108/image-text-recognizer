import { Ajax, showError, createImageNode } from './src/helpers';

const url = '/123';
const post = Ajax.post(url);

const showImageToResult = file => window.result.appendChild(createImageNode(file));

const onFileChange = event => {
  const [file] = event.target.files;

  const post = () => fetch('./123.png');

  return post(file)
    .then(resp => resp.blob())
    .then(showImageToResult)
    .catch(showError)
};

window.input.addEventListener('change', onFileChange);
