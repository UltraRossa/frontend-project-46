import genDiff from '../src/index.js';
import { readFile, getFixturePath } from '../src/utils.js';

test('differ files with stylish formatter', () => {
  const expectedStylish = String(readFile(getFixturePath('expectedStylish.txt')));

  const testPath1 = getFixturePath('testFile1.JSON');
  const testPath2 = getFixturePath('testFile2.JSON');
  expect(genDiff(testPath1, testPath2, 'stylish')).toEqual(expectedStylish);

  const testPath3 = getFixturePath('testFile1.yaml');
  const testPath4 = getFixturePath('testFile2.yaml');
  expect(genDiff(testPath3, testPath4, 'stylish')).toEqual(expectedStylish);

  const testPath5 = getFixturePath('testFile1.yml');
  const testPath6 = getFixturePath('testFile2.yml');
  expect(genDiff(testPath5, testPath6, 'stylish')).toEqual(expectedStylish);
});

test('differ files with plain formatter', () => {
  const expectedPlain = String(readFile(getFixturePath('expectedPlain.txt')));

  const testPath1 = getFixturePath('testFile1.JSON');
  const testPath2 = getFixturePath('testFile2.JSON');
  expect(genDiff(testPath1, testPath2, 'plain')).toEqual(expectedPlain);

  const testPath3 = getFixturePath('testFile1.yaml');
  const testPath4 = getFixturePath('testFile2.yaml');
  expect(genDiff(testPath3, testPath4, 'plain')).toEqual(expectedPlain);

  const testPath5 = getFixturePath('testFile1.yml');
  const testPath6 = getFixturePath('testFile2.yml');
  expect(genDiff(testPath5, testPath6, 'plain')).toEqual(expectedPlain);
});
