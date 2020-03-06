const convertChar = num => {
  if (!/(^[1-9]\d*$)/.test(num)) {
    return false;
  } else {
    if (num <= 26) {
      return String.fromCharCode(64 + parseInt(num));
    }
  }
};

export {
  convertChar
}