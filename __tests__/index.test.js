import genDiff from '../src/index.js';
import { readFile, getFixturePath } from '../src/utils.js';

let testPath1;
let testPath2;
let testPath3;
let testPath4;
let testPath5;
let testPath6;

beforeAll(() => {
  testPath1 = getFixturePath('testFile1.JSON');
  testPath2 = getFixturePath('testFile2.JSON');
  testPath3 = getFixturePath('testFile1.yaml');
  testPath4 = getFixturePath('testFile2.yaml');
  testPath5 = getFixturePath('testFile1.yml');
  testPath6 = getFixturePath('testFile2.yml');
});

test('differ files with stylish formatter', () => {
  const expectedStylish = String(readFile(getFixturePath('expectedStylish.txt')));
  expect(genDiff(testPath1, testPath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(testPath3, testPath4, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(testPath5, testPath6, 'stylish')).toEqual(expectedStylish);
});

test('differ files with plain formatter', () => {
  const expectedPlain = String(readFile(getFixturePath('expectedPlain.txt')));
  expect(genDiff(testPath1, testPath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPath3, testPath4, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPath5, testPath6, 'plain')).toEqual(expectedPlain);
});
