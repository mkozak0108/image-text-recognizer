const { pipe } = require('rambda');
const gm = require('gm');

const crop = gm => gm.resize(2160, 1080).crop('300^', 340, 1350, 420);
const extent = gm => gm.gravity('center').background('#000').extent('400^', 400, );
const purpleToBlack = gm => gm.fuzz('40%').fill('#000').opaque('#1D1B28');
const fontToWhite = gm => gm.fill('#fff').fuzz('60%').opaque('#fff').opaque('#C9CDF2').opaque('#8A8FC6');
const whiteToGreen = gm => gm.fuzz('10%').fill('#2f2').opaque('#fff');
const blackToWhite = gm => gm.fuzz('10%').fill('#fff').opaque('#000');
const greenToBlurryBlack = gm => gm.fill('#111').opaque('#2f2').blur(15);


module.exports = (imagePath, out) => new Promise((res, rej) => pipe(
  gm,
  crop,
  extent,
  purpleToBlack,
  fontToWhite,
  whiteToGreen,
  blackToWhite,
  greenToBlurryBlack
)(imagePath)
  .write(out, err => err ? rej(err) : res()));
