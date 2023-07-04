import stylish from './stylish.js';
import plain from './plain.js';

const setFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error(`Unknown order state: '${formatName}'!`);
  }
};

export default setFormatter;
