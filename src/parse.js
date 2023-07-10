import fs from 'fs';
import { load } from 'js-yaml';

export const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const getObjectFromJson = (filepath) => JSON.parse(readFile(filepath));

const getObjectFromYml = (filepath) => load(readFile(filepath));

const parse = (extension) => {
  switch (extension) {
    case '.json':
      return getObjectFromJson;
    case '.yaml':
      return getObjectFromYml;
    case '.yml':
      return getObjectFromYml;
    default:
      throw new Error(`Unknown order state: '${extension}'!`);
  }
};

export default parse;
