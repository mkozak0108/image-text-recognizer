import { ifElse, curry, is } from '../../node_modules/rambda/dist/rambda.esm.js';

const sendJSON = curry((url, method, object) => fetch(url, {
  method,
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify(object)
}));

const sendFile = curry((url, method, body) => fetch(url, {
  method,
  body
}));

export default {
  post: curry((url, body) => ifElse(is(File), sendFile(url, 'POST'), sendJSON(url, 'POST'))(body))
}
