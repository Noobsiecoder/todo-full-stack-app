const checkObjectKeyExists = (objectValue, keyName) => keyName in objectValue;

const checkObjectLength = (objectValue, length) =>
  Object.keys(objectValue).length === length;

module.exports = { checkObjectKeyExists, checkObjectLength };
