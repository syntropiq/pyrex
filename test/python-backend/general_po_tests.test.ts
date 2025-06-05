import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_po_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralPo(unittest.TestCase):# test_possessivedef test_possessive(self):# Single-character non-possessive.self.assertEqual(regex.search(r"a?a", "a").span(), (0, 1))
    expect(await re.search("a?a", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search(r"a*a", "aaa").span(), (0, 3))
    expect(await re.search("a*a", "aaa")?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 3', async () => {
    // Python: self.assertEqual(regex.search(r"a+a", "aaa").span(), (0, 3))
    expect(await re.search("a+a", "aaa")?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search(r"a{1,3}a", "aaa").span(), (0, 3))
    expect(await re.search("a{1, 3}a")?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 5', async () => {
    // Python: # Multiple-character non-possessive.self.assertEqual(regex.search(r"(?:ab)?a", "a").span(), (0, 2))
    expect(await re.search("(?:ab)?a", "a")?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 6', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)*a", "ababa").span(), (0, 6))
    expect(await re.search("(?:ab)*a", "ababa")?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)+a", "ababa").span(), (0, 6))
    expect(await re.search("(?:ab)+a", "ababa")?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab){1,3}a", "ababa").span(), (0, 6))
    expect(await re.search("(?:ab){1, 3}a")?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 9', async () => {
    // Python: # Single-character possessive.self.assertEqual(regex.search(r"a?+a", "a"), null)
    expect(await re.search("a?+a", "a")).toStrictEqual(null);
  });

  it('regex.search test 10', async () => {
    // Python: self.assertEqual(regex.search(r"a*+a", "aaa"), null)
    expect(await re.search("a*+a", "aaa")).toStrictEqual(null);
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search(r"a++a", "aaa"), null)
    expect(await re.search("a++a", "aaa")).toStrictEqual(null);
  });

  it('regex.search test 12', async () => {
    // Python: self.assertEqual(regex.search(r"a{1,3}+a", "aaa"), null)
    expect(await re.search("a{1, 3}+a")).toStrictEqual(null);
  });

  it('regex.search test 13', async () => {
    // Python: # Multiple-character possessive.self.assertEqual(regex.search(r"(?:ab)?+a", "a"), null)
    expect(await re.search("(?:ab)?+a", "a")).toStrictEqual(null);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)*+a", "ababa"), null)
    expect(await re.search("(?:ab)*+a", "ababa")).toStrictEqual(null);
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)++a", "ababa"), null)
    expect(await re.search("(?:ab)++a", "ababa")).toStrictEqual(null);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab){1,3}+a", "ababa"), null)
    expect(await re.search("(?:ab){1, 3}+a")).toStrictEqual(null);
  });
});
