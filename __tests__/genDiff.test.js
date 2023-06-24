import genDiff from '../src/index.js';
import { readFile, getFixturePath } from '../src/utils.js';

test('differ plain JSON files', () => {
  const testPath1 = getFixturePath('testFile1.JSON');
  const testPath2 = getFixturePath('testFile2.JSON');
  const expected = String(readFile(getFixturePath('expectedFile.txt')));
  expect(genDiff(testPath1, testPath2)).toEqual(expected);
});

test('differ plain YAML files with .yaml extension', () => {
  const testPath1 = getFixturePath('testFile1.yaml');
  const testPath2 = getFixturePath('testFile2.yaml');
  const expected = String(readFile(getFixturePath('expectedFile.txt')));
  expect(genDiff(testPath1, testPath2)).toEqual(expected);
});

test('differ plain YAML files with .yml extension', () => {
  const testPath1 = getFixturePath('testFile1.yml');
  const testPath2 = getFixturePath('testFile2.yml');
  const expected = String(readFile(getFixturePath('expectedFile.txt')));
  expect(genDiff(testPath1, testPath2)).toEqual(expected);
});
