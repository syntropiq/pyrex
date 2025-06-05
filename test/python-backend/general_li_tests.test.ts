import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_li_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralLi(unittest.TestCase):# test_line_boundarydef test_line_boundary(self):self.assertEqual(regex.findall(".+", "Line 1\1Line 2\1"), ["Line 1", "Line 2"])
    expect(await re.findall(".+", "Line 1\\1Line 2\\1")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(".+", "Line 1\1Line 2\1"), ["Line 1\1Line 2\1"])
    expect(await re.findall(".+", "Line 1\\1Line 2\\1")).toStrictEqual(["Line 1\1Line 2\1"]);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall(".+", "Line 1\1\1Line 2\1\1"), ["Line 1\1", "Line 2\1"])
    expect(await re.findall(".+", "Line 1\\1\\1Line 2\\1\\1")).toStrictEqual(["Line 1\1", "Line 2\1"]);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall("(?w).+", "Line 1\1Line 2\1"), ["Line 1", "Line 2"])
    expect(await re.findall("(?w).+", "Line 1\\1Line 2\\1")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.findall test 5', async () => {
    // Python: self.assertEqual(regex.findall("(?w).+", "Line 1\1Line 2\1"), ["Line 1", "Line 2"])
    expect(await re.findall("(?w).+", "Line 1\\1Line 2\\1")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.findall test 6', async () => {
    // Python: self.assertEqual(regex.findall("(?w).+", "Line 1\1\1Line 2\1\1"), ["Line 1", "Line 2"])
    expect(await re.findall("(?w).+", "Line 1\\1\\1Line 2\\1\\1")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search("^abc", "abc").start(), 0)
    expect(await re.search("^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search("^abc", "\1abc"), null)
    expect(await re.search("^abc", "\\1abc")).toStrictEqual(null);
  });

  it('regex.search test 9', async () => {
    // Python: self.assertEqual(regex.search("^abc", "\1abc"), null)
    expect(await re.search("^abc", "\\1abc")).toStrictEqual(null);
  });

  it('regex.search test 10', async () => {
    // Python: self.assertEqual(regex.search("(?w)^abc", "abc").start(), 0)
    expect(await re.search("(?w)^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search("(?w)^abc", "\1abc"), null)
    expect(await re.search("(?w)^abc", "\\1abc")).toStrictEqual(null);
  });

  it('regex.search test 12', async () => {
    // Python: self.assertEqual(regex.search("(?w)^abc", "\1abc"), null)
    expect(await re.search("(?w)^abc", "\\1abc")).toStrictEqual(null);
  });

  it('regex.search test 13', async () => {
    // Python: self.assertEqual(regex.search("abc$", "abc").start(), 0)
    expect(await re.search("abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search("abc$", "abc\1").start(), 0)
    expect(await re.search("abc$", "abc\\1")?.start()).toStrictEqual(0);
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search("abc$", "abc\1"), null)
    expect(await re.search("abc$", "abc\\1")).toStrictEqual(null);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search("(?w)abc$", "abc").start(), 0)
    expect(await re.search("(?w)abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 17', async () => {
    // Python: self.assertEqual(regex.search("(?w)abc$", "abc\1").start(), 0)
    expect(await re.search("(?w)abc$", "abc\\1")?.start()).toStrictEqual(0);
  });

  it('regex.search test 18', async () => {
    // Python: self.assertEqual(regex.search("(?w)abc$", "abc\1").start(), 0)
    expect(await re.search("(?w)abc$", "abc\\1")?.start()).toStrictEqual(0);
  });

  it('regex.search test 19', async () => {
    // Python: self.assertEqual(regex.search("(?m)^abc", "abc").start(), 0)
    expect(await re.search("(?m)^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 20', async () => {
    // Python: self.assertEqual(regex.search("(?m)^abc", "\1abc").start(), 1)
    expect(await re.search("(?m)^abc", "\\1abc")?.start()).toStrictEqual(1);
  });

  it('regex.search test 21', async () => {
    // Python: self.assertEqual(regex.search("(?m)^abc", "\1abc"), null)
    expect(await re.search("(?m)^abc", "\\1abc")).toStrictEqual(null);
  });

  it('regex.search test 22', async () => {
    // Python: self.assertEqual(regex.search("(?mw)^abc", "abc").start(), 0)
    expect(await re.search("(?mw)^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 23', async () => {
    // Python: self.assertEqual(regex.search("(?mw)^abc", "\1abc").start(), 1)
    expect(await re.search("(?mw)^abc", "\\1abc")?.start()).toStrictEqual(1);
  });

  it('regex.search test 24', async () => {
    // Python: self.assertEqual(regex.search("(?mw)^abc", "\1abc").start(), 1)
    expect(await re.search("(?mw)^abc", "\\1abc")?.start()).toStrictEqual(1);
  });

  it('regex.search test 25', async () => {
    // Python: self.assertEqual(regex.search("(?m)abc$", "abc").start(), 0)
    expect(await re.search("(?m)abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 26', async () => {
    // Python: self.assertEqual(regex.search("(?m)abc$", "abc\1").start(), 0)
    expect(await re.search("(?m)abc$", "abc\\1")?.start()).toStrictEqual(0);
  });

  it('regex.search test 27', async () => {
    // Python: self.assertEqual(regex.search("(?m)abc$", "abc\1"), null)
    expect(await re.search("(?m)abc$", "abc\\1")).toStrictEqual(null);
  });

  it('regex.search test 28', async () => {
    // Python: self.assertEqual(regex.search("(?mw)abc$", "abc").start(), 0)
    expect(await re.search("(?mw)abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 29', async () => {
    // Python: self.assertEqual(regex.search("(?mw)abc$", "abc\1").start(), 0)
    expect(await re.search("(?mw)abc$", "abc\\1")?.start()).toStrictEqual(0);
  });

  it('regex.search test 30', async () => {
    // Python: self.assertEqual(regex.search("(?mw)abc$", "abc\1").start(), 0)
    expect(await re.search("(?mw)abc$", "abc\\1")?.start()).toStrictEqual(0);
  });

  it('regex.findall test 31', async () => {
    // Python: # test_line_endingdef test_line_ending(self):self.assertEqual(regex.findall("\R", "\1\1\1\x0b\1\1\x85\u2028\u2029"),["\1\1", "\1", "\x0", "\1", "\1", "\x85", "\u2028", "\u2029"],)
    expect(await re.findall("\\R", "\\1\\1\\1\\x0b\\1\\1\\x85\\u2028\\u2029")).toStrictEqual(["\1\1", "\1", "\x0", "\1", "\1", "\x85", "\u2028", "\u2029"],);
  });

  it('regex.findall test 32', async () => {
    // Python: self.assertEqual(regex.findall("\R", "\1\1\1\x0b\1\1\x85"),["\1\1", "\1", "\x0", "\1", "\1"],)
    expect(await re.findall("\\R", "\\1\\1\\1\\x0b\\1\\1\\x85")).toStrictEqual(["\1\1", "\1", "\x0", "\1", "\1"],);
  });
});
