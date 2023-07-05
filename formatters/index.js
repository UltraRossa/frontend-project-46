import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const setFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown order state: '${formatName}'!`);
  }
};

export default setFormatter;
