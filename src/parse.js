import { load } from 'js-yaml';
import path from 'path';
import { readFile } from './utils.js';

const parse = (filepath) => {
  const extension = path.extname(filepath);

  switch (extension) {
    case '.json':
      return JSON.parse(readFile(filepath));
    case '.yaml':
      return load(readFile(filepath));

    case '.yml':
      return load(readFile(filepath));
    default:
      throw new Error(`Unknown order state: '${extension}'!`);
  }
};

export default parse;
