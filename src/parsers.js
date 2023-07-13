import { load } from 'js-yaml';

const parse = (file, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
      return load(file);
    case '.yml':
      return load(file);
    default:
      throw new Error(`Unknown file extension: '${extension}'!`);
  }
};

export default parse;
