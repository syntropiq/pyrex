import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_li_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralLi(unittest.TestCase):# test_line_boundarydef test_line_boundary(self):self.assertEqual(regex.findall(r".+", "Line 1\nLine 2\n"), ["Line 1", "Line 2"])
    expect(await re.findall(".+", "Line 1\\nLine 2\\n")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(r".+", "Line 1\rLine 2\r"), ["Line 1\rLine 2\r"])
    expect(await re.findall(".+", "Line 1\\rLine 2\\r")).toStrictEqual(["Line 1\rLine 2\r"]);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall(r".+", "Line 1\r\nLine 2\r\n"), ["Line 1\r", "Line 2\r"])
    expect(await re.findall(".+", "Line 1\\r\\nLine 2\\r\\n")).toStrictEqual(["Line 1\r", "Line 2\r"]);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall(r"(?w).+", "Line 1\nLine 2\n"), ["Line 1", "Line 2"])
    expect(await re.findall("(?w).+", "Line 1\\nLine 2\\n")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.findall test 5', async () => {
    // Python: self.assertEqual(regex.findall(r"(?w).+", "Line 1\rLine 2\r"), ["Line 1", "Line 2"])
    expect(await re.findall("(?w).+", "Line 1\\rLine 2\\r")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.findall test 6', async () => {
    // Python: self.assertEqual(regex.findall(r"(?w).+", "Line 1\r\nLine 2\r\n"), ["Line 1", "Line 2"])
    expect(await re.findall("(?w).+", "Line 1\\r\\nLine 2\\r\\n")).toStrictEqual(["Line 1", "Line 2"]);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search(r"^abc", "abc").start(), 0)
    expect(await re.search("^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search(r"^abc", "\nabc"), None)
    expect(await re.search("^abc", "\\nabc")).toStrictEqual(None);
  });

  it('regex.search test 9', async () => {
    // Python: self.assertEqual(regex.search(r"^abc", "\rabc"), None)
    expect(await re.search("^abc", "\\rabc")).toStrictEqual(None);
  });

  it('regex.search test 10', async () => {
    // Python: self.assertEqual(regex.search(r"(?w)^abc", "abc").start(), 0)
    expect(await re.search("(?w)^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search(r"(?w)^abc", "\nabc"), None)
    expect(await re.search("(?w)^abc", "\\nabc")).toStrictEqual(None);
  });

  it('regex.search test 12', async () => {
    // Python: self.assertEqual(regex.search(r"(?w)^abc", "\rabc"), None)
    expect(await re.search("(?w)^abc", "\\rabc")).toStrictEqual(None);
  });

  it('regex.search test 13', async () => {
    // Python: self.assertEqual(regex.search(r"abc$", "abc").start(), 0)
    expect(await re.search("abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search(r"abc$", "abc\n").start(), 0)
    expect(await re.search("abc$", "abc\\n")?.start()).toStrictEqual(0);
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search(r"abc$", "abc\r"), None)
    expect(await re.search("abc$", "abc\\r")).toStrictEqual(None);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search(r"(?w)abc$", "abc").start(), 0)
    expect(await re.search("(?w)abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 17', async () => {
    // Python: self.assertEqual(regex.search(r"(?w)abc$", "abc\n").start(), 0)
    expect(await re.search("(?w)abc$", "abc\\n")?.start()).toStrictEqual(0);
  });

  it('regex.search test 18', async () => {
    // Python: self.assertEqual(regex.search(r"(?w)abc$", "abc\r").start(), 0)
    expect(await re.search("(?w)abc$", "abc\\r")?.start()).toStrictEqual(0);
  });

  it('regex.search test 19', async () => {
    // Python: self.assertEqual(regex.search(r"(?m)^abc", "abc").start(), 0)
    expect(await re.search("(?m)^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 20', async () => {
    // Python: self.assertEqual(regex.search(r"(?m)^abc", "\nabc").start(), 1)
    expect(await re.search("(?m)^abc", "\\nabc")?.start()).toStrictEqual(1);
  });

  it('regex.search test 21', async () => {
    // Python: self.assertEqual(regex.search(r"(?m)^abc", "\rabc"), None)
    expect(await re.search("(?m)^abc", "\\rabc")).toStrictEqual(None);
  });

  it('regex.search test 22', async () => {
    // Python: self.assertEqual(regex.search(r"(?mw)^abc", "abc").start(), 0)
    expect(await re.search("(?mw)^abc", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 23', async () => {
    // Python: self.assertEqual(regex.search(r"(?mw)^abc", "\nabc").start(), 1)
    expect(await re.search("(?mw)^abc", "\\nabc")?.start()).toStrictEqual(1);
  });

  it('regex.search test 24', async () => {
    // Python: self.assertEqual(regex.search(r"(?mw)^abc", "\rabc").start(), 1)
    expect(await re.search("(?mw)^abc", "\\rabc")?.start()).toStrictEqual(1);
  });

  it('regex.search test 25', async () => {
    // Python: self.assertEqual(regex.search(r"(?m)abc$", "abc").start(), 0)
    expect(await re.search("(?m)abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 26', async () => {
    // Python: self.assertEqual(regex.search(r"(?m)abc$", "abc\n").start(), 0)
    expect(await re.search("(?m)abc$", "abc\\n")?.start()).toStrictEqual(0);
  });

  it('regex.search test 27', async () => {
    // Python: self.assertEqual(regex.search(r"(?m)abc$", "abc\r"), None)
    expect(await re.search("(?m)abc$", "abc\\r")).toStrictEqual(None);
  });

  it('regex.search test 28', async () => {
    // Python: self.assertEqual(regex.search(r"(?mw)abc$", "abc").start(), 0)
    expect(await re.search("(?mw)abc$", "abc")?.start()).toStrictEqual(0);
  });

  it('regex.search test 29', async () => {
    // Python: self.assertEqual(regex.search(r"(?mw)abc$", "abc\n").start(), 0)
    expect(await re.search("(?mw)abc$", "abc\\n")?.start()).toStrictEqual(0);
  });

  it('regex.search test 30', async () => {
    // Python: self.assertEqual(regex.search(r"(?mw)abc$", "abc\r").start(), 0)
    expect(await re.search("(?mw)abc$", "abc\\r")?.start()).toStrictEqual(0);
  });

  it('regex.findall test 31', async () => {
    // Python: # test_line_endingdef test_line_ending(self):self.assertEqual(regex.findall(r"\R", "\r\n\n\x0b\f\r\x85\u2028\u2029"),["\r\n", "\n", "\x0b", "\f", "\r", "\x85", "\u2028", "\u2029"],)
    expect(await re.findall("\\R", "\\r\\n\\n\\x0b\\f\\r\\x85\\u2028\\u2029")).toStrictEqual(["\r\n", "\n", "\x0b", "\f", "\r", "\x85", "\u2028", "\u2029"],);
  });

  it('regex.findall test 32', async () => {
    // Python: self.assertEqual(regex.findall(rb"\R", b"\r\n\n\x0b\f\r\x85"),[b"\r\n", b"\n", b"\x0b", b"\f", b"\r"],)
    expect(await re.findall("\\R", "\\r\\n\\n\\x0b\\f\\r\\x85")).toStrictEqual([b"\r\n", b"\n", b"\x0b", b"\f", b"\r"],);
  });
});
