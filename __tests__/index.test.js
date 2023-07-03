import genDiff from '../src/index.js';
import { readFile, getFixturePath } from '../src/utils.js';

test('differ files', () => {
  const expected = String(readFile(getFixturePath('expectedFile.txt')));

  const testPath1 = getFixturePath('testFile1.JSON');
  const testPath2 = getFixturePath('testFile2.JSON');
  expect(genDiff(testPath1, testPath2)).toEqual(expected);

  const testPath3 = getFixturePath('testFile1.yaml');
  const testPath4 = getFixturePath('testFile2.yaml');
  expect(genDiff(testPath3, testPath4)).toEqual(expected);

  const testPath5 = getFixturePath('testFile1.yml');
  const testPath6 = getFixturePath('testFile2.yml');
  expect(genDiff(testPath5, testPath6)).toEqual(expected);
});
