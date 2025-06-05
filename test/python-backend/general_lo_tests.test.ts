import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_lo_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralLo(unittest.TestCase):PATTERN_CLASS = "<class '_regex.Pattern'>"# test_lookbehinddef test_lookbehind(self):self.assertEqual(regex.search(r"123(?<=a\d+)", "a123").span(), (1, 4))
    expect(await re.search("123(?<=a\\d+)", "a123")?.span()).toStrictEqual((1, 4);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search(r"123(?<=a\d+)", "b123"), null)
    expect(await re.search("123(?<=a\\d+)", "b123")).toStrictEqual(null);
  });

  it('regex.search test 3', async () => {
    // Python: self.assertEqual(regex.search(r"123(?<!a\d+)", "a123"), null)
    expect(await re.search("123(?<!a\\d+)", "a123")).toStrictEqual(null);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search(r"123(?<!a\d+)", "b123").span(), (1, 4))
    expect(await re.search("123(?<!a\\d+)", "b123")?.span()).toStrictEqual((1, 4);
  });

  it('regex.match test 5', async () => {
    // Python: self.assertEqual(regex.match("(a)b(?<=c)(c)", "abc"), null)
    expect(await re.match("(a)b(?<=c)(c)", "abc")).toStrictEqual(null);
  });

  it('regex.match test 6', async () => {
    // Python: self.assertEqual(regex.match("(a)b(?=b)(c)", "abc"), null)
    expect(await re.match("(a)b(?=b)(c)", "abc")).toStrictEqual(null);
  });

  it('regex.match test 7', async () => {
    // Python: self.assertEqual(regex.match("(?:(a)|(x))b(?<=(?(2)x|c))c", "abc"), null)
    expect(await re.match("(?:(a)|(x))b(?<=(?(2)x|c))c", "abc")).toStrictEqual(null);
  });

  it('regex.match test 8', async () => {
    // Python: self.assertEqual(regex.match("(?:(a)|(x))b(?<=(?(2)b|x))c", "abc"), null)
    expect(await re.match("(?:(a)|(x))b(?<=(?(2)b|x))c", "abc")).toStrictEqual(null);
  });

  it('regex.match test 9', async () => {
    // Python: self.assertEqual(regex.match("(?:(a)|(x))b(?<=(?(1)c|x))c", "abc"), null)
    expect(await re.match("(?:(a)|(x))b(?<=(?(1)c|x))c", "abc")).toStrictEqual(null);
  });

  it('regex.match test 10', async () => {
    // Python: self.assertEqual(regex.match("(?:(a)|(x))b(?=(?(2)c|x))c", "abc"), null)
    expect(await re.match("(?:(a)|(x))b(?=(?(2)c|x))c", "abc")).toStrictEqual(null);
  });

  it('regex.match test 11', async () => {
    // Python: self.assertEqual(regex.match("(?:(a)|(x))b(?=(?(1)b|x))c", "abc"), null)
    expect(await re.match("(?:(a)|(x))b(?=(?(1)b|x))c", "abc")).toStrictEqual(null);
  });

  it('regex.match test 12', async () => {
    // Python: self.assertEqual(regex.match("(a)b(?<=(?(2)x|c))(c)", "abc"), null)
    expect(await re.match("(a)b(?<=(?(2)x|c))(c)", "abc")).toStrictEqual(null);
  });

  it('regex.match test 13', async () => {
    // Python: self.assertEqual(regex.match("(a)b(?<=(?(2)b|x))(c)", "abc"), null)
    expect(await re.match("(a)b(?<=(?(2)b|x))(c)", "abc")).toStrictEqual(null);
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match("(a)b(?<=(?(1)c|x))(c)", "abc"), null)
    expect(await re.match("(a)b(?<=(?(1)c|x))(c)", "abc")).toStrictEqual(null);
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match("(a)b(?=(?(2)b|x))(c)", "abc"), null)
    expect(await re.match("(a)b(?=(?(2)b|x))(c)", "abc")).toStrictEqual(null);
  });
});
