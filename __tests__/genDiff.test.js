import genDiff from '../src/index.js';
import { readFile, normalizePath } from '../src/utils.js';

// const getFixturePath = (filename) => path.join('__fixtures__', filename);
// const testPath1 = getFixturePath('testFile1.JSON');
// const testPath2 = getFixturePath('testFile2.JSON');

test('differ plain JSON files', () => {
  const testPath1 = normalizePath('__fixtures__/testFile1.JSON');
  const testPath2 = normalizePath('__fixtures__/testFile2.JSON');
  const expected = String(readFile(normalizePath('__fixtures__/expectedFile.txt')));
  expect(genDiff(testPath1, testPath2)).toEqual(expected);
});
