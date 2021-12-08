export default (options) => {
  // initiate defaults
  const defaults = {
    alpha: false,
    length: 6,
    lowercase: false,
    numeric: true,
    uppercase: true,
  }

  // merge defaults and options
  options = Object.assign(defaults, options);

  // deconstruct options
  const { alpha, length, lowercase, numeric, uppercase } = options

  // initiate characters to choose from
  let characters = [];
  if (alpha && lowercase) characters = [...characters, ...'abcdefghijklmnopqrstuvwxyz'.split('')];
  if (alpha && uppercase) characters = [...characters, ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
  if (numeric) characters = [...characters, ...'0123456789'.split('')];

  // generate code
  const code = [...Array(length)].map((_) => {
    // get random index
    const index = Math.floor(Math.random() * characters.length);
    return characters[index]
  })

  return code.join('');
}