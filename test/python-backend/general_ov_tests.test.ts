import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ov_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralOv(unittest.TestCase):def test_overlapped(self):self.assertEqual(regex.findall(r"..", "abcde"), ["ab", "cd"])
    expect(await re.findall("..", "abcde")).toStrictEqual(["ab", "cd"]);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(r"..", "abcde", overlapped=True), ["ab", "bc", "cd", "de"])
    expect(await re.findall("..", "abcde")).toStrictEqual(["ab", "bc", "cd", "de"]);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)..", "abcde"), ["de", "bc"])
    expect(await re.findall("(?r)..", "abcde")).toStrictEqual(["de", "bc"]);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)..", "abcde", overlapped=True), ["de", "cd", "bc", "ab"])
    expect(await re.findall("(?r)..", "abcde")).toStrictEqual(["de", "cd", "bc", "ab"]);
  });

  it('regex.findall test 5', async () => {
    // Python: self.assertEqual(regex.findall(r"(.)(-)(.)", "a-b-c", overlapped=True),[("a", "-", "b"), ("b", "-", "c")],)
    expect(await re.findall("(.)(-)(.)", "a-b-c")).toStrictEqual([("a", "-", "b");
  });
});
