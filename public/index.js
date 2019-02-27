import { Ajax } from './src/helpers/index.js';

const url = '/recognized-image';
const post = Ajax.post(url);
const onLoading = () => window.result.innerHTML = `<h2>Loading...</h2>`;
const showError = (err) => window.result.innerHTML = `<h1 style="color: #f21603;">${err.message}</h1>`;
const showResult = ({ imageData, out }) => window.result.innerHTML = `
  <img src="data:image/png;base64,${imageData}"/>
  <pre>${out}</pre> 
`;

const onFileChange = event => {
  const [file] = event.target.files;

  onLoading();
  return post(file)
    .then(resp => resp.json())
    .then(showResult)
    .catch(err => showError(err))
};

window.input.addEventListener('change', onFileChange);
