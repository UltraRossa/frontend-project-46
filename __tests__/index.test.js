import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { readFile } from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff with different formatters', () => {
  const testPathJson1 = getFixturePath('testFile1.json');
  const testPathJson2 = getFixturePath('testFile2.json');
  const testPathYaml1 = getFixturePath('testFile1.yaml');
  const testPathYaml2 = getFixturePath('testFile2.yaml');
  const testPathYml1 = getFixturePath('testFile1.yml');
  const testPathYml2 = getFixturePath('testFile2.yml');
  const expectedStylish = String(readFile(getFixturePath('expectedStylish.txt')));
  const expectedPlain = String(readFile(getFixturePath('expectedPlain.txt')));
  const expectedJson = String(readFile(getFixturePath('expectedJson.txt')));

  expect(genDiff(testPathYaml1, testPathJson2)).toEqual(expectedStylish);
  expect(genDiff(testPathYml1, testPathYaml2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(testPathYaml1, testPathJson2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPathJson1, testPathYml2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPathYml1, testPathYaml2, 'json')).toEqual(expectedJson);
});
