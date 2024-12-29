const randomBoolean = () => Math.random() < 0.5;
const isEscapeKey = (evt) => evt.key === 'Escape';
const toLowerCaseFirstLetter = (str) => `${str[0].toLowerCase()}${str.slice(1)}`;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

export {randomBoolean, isEscapeKey, toLowerCaseFirstLetter, getRandomElement};
