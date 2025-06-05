import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_po_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralPo(unittest.TestCase):# test_possessivedef test_possessive(self):# Single-character non-possessive.self.assertEqual(regex.search(r"a?a", "a").span(), (0, 1))
    expect(await re.search("a?a", "a", { backend: 'python' })?.span()).toStrictEqual((0, 1);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search(r"a*a", "aaa").span(), (0, 3))
    expect(await re.search("a*a", "aaa", { backend: 'python' })?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 3', async () => {
    // Python: self.assertEqual(regex.search(r"a+a", "aaa").span(), (0, 3))
    expect(await re.search("a+a", "aaa", { backend: 'python' })?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search(r"a{1,3}a", "aaa").span(), (0, 3))
    expect(await re.search("a{1, 3}a", { backend: 'python' })?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 5', async () => {
    // Python: # Multiple-character non-possessive.self.assertEqual(regex.search(r"(?:ab)?ab", "ab").span(), (0, 2))
    expect(await re.search("(?:ab)?ab", "ab", { backend: 'python' })?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 6', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)*ab", "ababab").span(), (0, 6))
    expect(await re.search("(?:ab)*ab", "ababab", { backend: 'python' })?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)+ab", "ababab").span(), (0, 6))
    expect(await re.search("(?:ab)+ab", "ababab", { backend: 'python' })?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab){1,3}ab", "ababab").span(), (0, 6))
    expect(await re.search("(?:ab){1, 3}ab", { backend: 'python' })?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 9', async () => {
    // Python: # Single-character possessive.self.assertEqual(regex.search(r"a?+a", "a"), None)
    expect(await re.search("a?+a", "a", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 10', async () => {
    // Python: self.assertEqual(regex.search(r"a*+a", "aaa"), None)
    expect(await re.search("a*+a", "aaa", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search(r"a++a", "aaa"), None)
    expect(await re.search("a++a", "aaa", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 12', async () => {
    // Python: self.assertEqual(regex.search(r"a{1,3}+a", "aaa"), None)
    expect(await re.search("a{1, 3}+a", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 13', async () => {
    // Python: # Multiple-character possessive.self.assertEqual(regex.search(r"(?:ab)?+ab", "ab"), None)
    expect(await re.search("(?:ab)?+ab", "ab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)*+ab", "ababab"), None)
    expect(await re.search("(?:ab)*+ab", "ababab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab)++ab", "ababab"), None)
    expect(await re.search("(?:ab)++ab", "ababab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ab){1,3}+ab", "ababab"), None)
    expect(await re.search("(?:ab){1, 3}+ab", { backend: 'python' })).toStrictEqual(None);
  });
});
