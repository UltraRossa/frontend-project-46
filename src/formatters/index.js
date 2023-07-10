import stylish from './stylish.js';
import plain from './plain.js';

const format = (formatName, diff) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unknown order state: '${formatName}'!`);
  }
};

export default format;
