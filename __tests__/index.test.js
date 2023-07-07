import genDiff from '../index.js';
import { readFile, getFixturePath } from '../src/utils.js';

test('gendiff with different formatters', () => {
  const testPath1 = getFixturePath('testFile1.json');
  const testPath2 = getFixturePath('testFile2.json');
  const testPath3 = getFixturePath('testFile1.yaml');
  const testPath4 = getFixturePath('testFile2.yaml');
  const testPath5 = getFixturePath('testFile1.yml');
  const testPath6 = getFixturePath('testFile2.yml');
  const expectedStylish = String(readFile(getFixturePath('expectedStylish.txt')));
  const expectedPlain = String(readFile(getFixturePath('expectedPlain.txt')));
  const expectedJson = String(readFile(getFixturePath('expectedJson.txt')));

  expect(genDiff(testPath3, testPath6)).toEqual(expectedStylish);
  expect(genDiff(testPath5, testPath4, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(testPath3, testPath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPath1, testPath6, 'plain')).toEqual(expectedPlain);
  expect(genDiff(testPath5, testPath4, 'json')).toEqual(expectedJson);
});
