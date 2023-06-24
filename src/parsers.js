import { load } from 'js-yaml';
import path from 'path';
import { readFile, normalizePath } from './utils.js';

const jsonParse = (filepath) => JSON.parse(readFile(normalizePath(filepath)));

const yamlParse = (filepath) => load(readFile(normalizePath(filepath)));

const parse = (filepath) => {
  const extension = path.extname(filepath);

  switch (extension) {
    case '.JSON':
      return jsonParse(filepath);
    case '.yaml':
      return yamlParse(filepath);
    case '.yml':
      return yamlParse(filepath);
    default:
      throw new Error(`Unknown order state: '${extension}'!`);
  }
};

export default parse;
