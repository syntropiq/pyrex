import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_pr_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralPr(unittest.TestCase):# test_propertiesdef test_properties(self):self.assertEqual(regex.match(b'(?ai)\xC0', b'\xE0'), null)
    expect(await re.match("(?ai)\\xC0", "\\xE0")).toStrictEqual(null);
  });

  it('regex.match test 2', async () => {
    // Python: self.assertEqual(regex.match(br'(?ai)\xC0', b'\xE0'), null)
    expect(await re.match(br'(?ai)\\xC0", "\\xE0")).toStrictEqual(null);
  });

  it('regex.match test 3', async () => {
    // Python: self.assertEqual(regex.match(br'(?a)\w', b'\xE0'), null)
    expect(await re.match(br'(?a)\\w", "\\xE0")).toStrictEqual(null);
  });

  it('regex.match test 4', async () => {
    // Python: self.assertEqual(regex.match(br'(?L)\d', b'?'), null)
    expect(await re.match(br'(?L)\\d", "?")).toStrictEqual(null);
  });

  it('regex.match test 5', async () => {
    // Python: self.assertEqual(regex.match(br'(?L)\s', b'?'), null)
    expect(await re.match(br'(?L)\\s", "?")).toStrictEqual(null);
  });

  it('regex.match test 6', async () => {
    // Python: self.assertEqual(regex.match(br'(?L)\w', b'?'), null)
    expect(await re.match(br'(?L)\\w", "?")).toStrictEqual(null);
  });

  it('regex.match test 7', async () => {
    // Python: self.assertEqual(regex.match(br'(?L)\D', b'0'), null)
    expect(await re.match(br'(?L)\\D", "0")).toStrictEqual(null);
  });

  it('regex.match test 8', async () => {
    // Python: self.assertEqual(regex.match(br'(?L)\S', b' '), null)
    expect(await re.match(br'(?L)\\S", " ")).toStrictEqual(null);
  });

  it('regex.match test 9', async () => {
    // Python: self.assertEqual(regex.match(br'(?L)\W', b'a'), null)
    expect(await re.match(br'(?L)\\W", "a")).toStrictEqual(null);
  });

  it('regex.match test 10', async () => {
    // Python: self.assertEqual(regex.match(r"\d", "?"), null)
    expect(await re.match("\\d", "?")).toStrictEqual(null);
  });

  it('regex.match test 11', async () => {
    // Python: self.assertEqual(regex.match(r"\s", "?"), null)
    expect(await re.match("\\s", "?")).toStrictEqual(null);
  });

  it('regex.match test 12', async () => {
    // Python: self.assertEqual(regex.match(r"\w", "?"), null)
    expect(await re.match("\\w", "?")).toStrictEqual(null);
  });

  it('regex.match test 13', async () => {
    // Python: self.assertEqual(regex.match(r"\D", "0"), null)
    expect(await re.match("\\D", "0")).toStrictEqual(null);
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match(r"\S", " "), null)
    expect(await re.match("\\S", " ")).toStrictEqual(null);
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match(r"\W", "A"), null)
    expect(await re.match("\\W", "A")).toStrictEqual(null);
  });

  it('regex.match test 16', async () => {
    // Python: self.assertEqual(regex.match(r"\X", "\xE0").span(), (0, 1))
    expect(await re.match("\\X", "\\xE0")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 17', async () => {
    // Python: self.assertEqual(regex.match(r"\X", "a\u0300").span(), (0, 2))
    expect(await re.match("\\X", "a\\u0300")?.span()).toStrictEqual((0, 2);
  });

  it('regex.findall test 18', async () => {
    // Python: self.assertEqual(regex.findall(r"\X","a\xE0a\u0300e\xE9e\u0301"), ['a', '\xe0', 'a\u0300', 'e','\xe9', 'e\u0301'])
    expect(await re.findall("\\X", "a\\xE0a\\u0300e\\xE9e\\u0301")).toStrictEqual(['a', '\xe0', 'a\u0300', 'e','\xe9', 'e\u0301']);
  });

  it('regex.findall test 19', async () => {
    // Python: self.assertEqual(regex.findall(r"\X{3}","a\xE0a\u0300e\xE9e\u0301"), ['a\xe0a\u0300', 'e\xe9e\u0301'])
    expect(await re.findall("\\X{3}", "a\\xE0a\\u0300e\\xE9e\\u0301")).toStrictEqual(['a\xe0a\u0300', 'e\xe9e\u0301']);
  });

  it('regex.findall test 20', async () => {
    // Python: self.assertEqual(regex.findall(r"\X", "\r\r\n\u0301A\u0301"),['\r', '\r\n', '\u0301', 'A\u0301'])
    expect(await re.findall("\\X", "\\r\\r\\n\\u0301A\\u0301")).toStrictEqual(['\r', '\r\n', '\u0301', 'A\u0301']);
  });
});
