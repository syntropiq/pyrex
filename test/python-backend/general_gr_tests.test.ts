import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_gr_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralGr(unittest.TestCase):# test_groupdictdef test_groupdict(self):self.assertEqual(regex.match("(?P<first>first) (?P<second>second)", "first second").groupdict(),{"first": "first", "second": "second"},)
    expect(await re.match("(?P<first>first) (?P<second>second)", "first second", { backend: 'python' })?.groupdict()).toStrictEqual({"first": "first", "second": "second"},);
  });

  it('regex.match test 2', async () => {
    // Python: # test_graphemedef test_grapheme(self):self.assertEqual(regex.match(r"\X", "\xe0").span(), (0, 1))
    expect(await re.match("\\X", "\\xe0", { backend: 'python' })?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 3', async () => {
    // Python: self.assertEqual(regex.match(r"\X", "a\u0300").span(), (0, 2))
    expect(await re.match("\\X", "a\\u0300", { backend: 'python' })?.span()).toStrictEqual((0, 2);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall(r"\X", "a\xe0a\u0300e\xe9e\u0301"),["a", "\xe0", "a\u0300", "e", "\xe9", "e\u0301"],)
    expect(await re.findall("\\X", "a\\xe0a\\u0300e\\xe9e\\u0301", { backend: 'python' })).toStrictEqual(["a", "\xe0", "a\u0300", "e", "\xe9", "e\u0301"],);
  });

  it('regex.findall test 5', async () => {
    // Python: self.assertEqual(regex.findall(r"\X{3}", "a\xe0a\u0300e\xe9e\u0301"),["a\xe0a\u0300", "e\xe9e\u0301"],)
    expect(await re.findall("\\X{3}", "a\\xe0a\\u0300e\\xe9e\\u0301", { backend: 'python' })).toStrictEqual(["a\xe0a\u0300", "e\xe9e\u0301"],);
  });

  it('regex.findall test 6', async () => {
    // Python: self.assertEqual(regex.findall(r"\X", "\r\r\n\u0301A\u0301"),["\r", "\r\n", "\u0301", "A\u0301"],)
    expect(await re.findall("\\X", "\\r\\r\\n\\u0301A\\u0301", { backend: 'python' })).toStrictEqual(["\r", "\r\n", "\u0301", "A\u0301"],);
  });
});
