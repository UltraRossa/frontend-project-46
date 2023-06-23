import genDiff from '../src/index.js';
import { readFile, getFixturePath } from '../src/utils.js';

test('differ plain JSON files', () => {
  const testPath1 = getFixturePath('testFile1.JSON');
  const testPath2 = getFixturePath('testFile2.JSON');
  const expected = String(readFile(getFixturePath('expectedFile.txt')));
  expect(genDiff(testPath1, testPath2)).toEqual(expected);
});
