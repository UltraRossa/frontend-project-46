import path from 'path';
import url from 'url';
import genDiff, { readFile } from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const testPathJson1 = getFixturePath('testFile1.json');
const testPathJson2 = getFixturePath('testFile2.json');
const testPathYaml1 = getFixturePath('testFile1.yaml');
const testPathYaml2 = getFixturePath('testFile2.yaml');
const testPathYml1 = getFixturePath('testFile1.yml');
const testPathYml2 = getFixturePath('testFile2.yml');
const expectedStylish = String(readFile(getFixturePath('expectedStylish.txt')));
const expectedPlain = String(readFile(getFixturePath('expectedPlain.txt')));
const expectedJson = String(readFile(getFixturePath('expectedJson.txt')));

test('gendiff with stylish formatter', () => {
  expect(genDiff(testPathYaml1, testPathJson2)).toEqual(expectedStylish);
  expect(genDiff(testPathYml1, testPathYaml2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(testPathJson1, testPathYml2)).toEqual(expectedStylish);
});

test('gendiff with plain formatter', () => {
  expect(genDiff(testPathYaml1, testPathJson2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPathYml1, testPathYaml2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPathJson1, testPathYml2, 'plain')).toEqual(expectedPlain);
});

test('gendiff with json formatter', () => {
  expect(genDiff(testPathYaml1, testPathJson2, 'json')).toEqual(expectedJson);
  expect(genDiff(testPathYml1, testPathYaml2, 'json')).toEqual(expectedJson);
  expect(genDiff(testPathJson1, testPathYml2, 'json')).toEqual(expectedJson);
});
