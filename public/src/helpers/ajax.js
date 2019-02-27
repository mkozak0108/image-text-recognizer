import { ifElse, curry, is } from '../../../node_modules/rambda/dist/rambda.esm.js';
import showError from './show-error.js';

const sendJSON = curry((url, method, object) => fetch(url, {
  method,
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify(object)
}).catch(showError));

const sendFile = curry((url, method, file) => {
  const formData = new FormData();
  formData.append('image', file);

  return fetch(url, {
    method,
    body: formData
  }).catch(showError);
});

export default {
  post: curry((url, body) => ifElse(is(File), sendFile(url, 'POST'), sendJSON(url, 'POST'))(body))
}
