import genDiff from '../src/index.js';
import { readFile, getFixturePath } from '../src/utils.js';

let testPath1;
let testPath2;
let testPath3;
let testPath4;
let testPath5;
let testPath6;

beforeAll(() => {
  testPath1 = getFixturePath('testFile1.json');
  testPath2 = getFixturePath('testFile2.json');
  testPath3 = getFixturePath('testFile1.yaml');
  testPath4 = getFixturePath('testFile2.yaml');
  testPath5 = getFixturePath('testFile1.yml');
  testPath6 = getFixturePath('testFile2.yml');
});

test('gendiff with different formatters', () => {
  const expectedStylish = String(readFile(getFixturePath('expectedStylish.txt')));
  const expectedPlain = String(readFile(getFixturePath('expectedPlain.txt')));
  const expectedJson = String(readFile(getFixturePath('expectedJson.txt')));
  expect(genDiff(testPath3, testPath6)).toEqual(expectedStylish);
  expect(genDiff(testPath5, testPath4, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(testPath3, testPath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPath1, testPath6, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPath5, testPath4, 'json')).toEqual(expectedJson);
});
