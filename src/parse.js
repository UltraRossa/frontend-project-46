import { load } from 'js-yaml';
import path from 'path';
import { readFile } from './utils.js';

const parseJson = (filepath) => JSON.parse(readFile(filepath));

const parseYaml = (filepath) => load(readFile(filepath));

const parse = (filepath) => {
  const extension = path.extname(filepath);

  switch (extension) {
    case '.JSON':
      return parseJson(filepath);
    case '.yaml':
      return parseYaml(filepath);
    case '.yml':
      return parseYaml(filepath);
    default:
      throw new Error(`Unknown order state: '${extension}'!`);
  }
};

export default parse;
