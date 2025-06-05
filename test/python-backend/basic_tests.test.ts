import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/basic_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: def test_basic_regex_sub(self):self.assertEqual(regex.sub("(?i)b+", "x", "bbbb BBBB"), "x x")
    expect(await re.sub("(?i)b+", "x", "bbbb BBBB")).toBe("x x");
  });

  it('regex.sub test 2', async () => {
    // Python: self.assertEqual(regex.sub("\d+", self.bump_num, "08.2 -2 23x99y"), "9.3 -3 24x100y")
    it.skip('regex.sub test 2 - Manual conversion needed for callable replacement', async () => {
      // Python: self.assertEqual(regex.sub("\d+", self.bump_num, "08.2 -2 23x99y"), "9.3 -3 24x100y")
      // Original: expect(await re.sub("\\d+", // TODO: Manual conversion needed for callable replacement, "08.2 -2 23x99y")).toBe("9.3 -3 24x100y");
    });
  });

  it('regex.sub test 3', async () => {
    // Python: self.assertEqual(regex.sub("\d+", self.bump_num, "08.2 -2 23x99y", 3), "9.3 -3 23x99y")
  it.skip('regex.sub test 3 - Manual conversion needed for callable replacement', async () => {
    // Python: self.assertEqual(regex.sub("\d+", self.bump_num, "08.2 -2 23x99y", 3), "9.3 -3 23x99y")
    // Original: expect(await re.sub("\\d+", // TODO: Manual conversion needed for callable replacement, "08.2 -2 23x99y")).toBe("9.3 -3 23x99y");
  });
  });

  it('regex.sub test 4', async () => {
    // Python: self.assertEqual(regex.sub(".", lambda m: "\1", "x"), "\\1")
  it.skip('regex.sub test 4 - Manual conversion needed for callable replacement', async () => {
    // Python: self.assertEqual(regex.sub(".", lambda m: "\1", "x"), "\\1")
    // Original: expect(await re.sub(".", // TODO: Manual conversion needed for callable replacement, "x")).toBe("\\1");
  });
  });

  it('regex.sub test 5', async () => {
    // Python: self.assertEqual(regex.sub(".", "\1", "x"), "\1")
    expect(await re.sub(".", "\\1", "x")).toBe("\1");
  });

  it('regex.sub test 6', async () => {
    // Python: self.assertEqual(regex.sub("(?P<a>x)", "\g<a>\g<a>", "xx"), "xxxx")
    expect(await re.sub("(?P<a>x)", "\\g<a>\\g<a>", "xx")).toBe("xxxx");
  });

  it('regex.sub test 7', async () => {
    // Python: self.assertEqual(regex.sub("(?P<a>x)", "\g<a>\g<1>", "xx"), "xxxx")
    expect(await re.sub("(?P<a>x)", "\\g<a>\\g<1>", "xx")).toBe("xxxx");
  });

  it('regex.sub test 8', async () => {
    // Python: self.assertEqual(regex.sub("(?P<unk>x)", "\g<unk>\g<unk>", "xx"), "xxxx")
    expect(await re.sub("(?P<unk>x)", "\\g<unk>\\g<unk>", "xx")).toBe("xxxx");
  });

  it('regex.sub test 9', async () => {
    // Python: self.assertEqual(regex.sub("(?P<unk>x)", "\g<1>\g<1>", "xx"), "xxxx")
    expect(await re.sub("(?P<unk>x)", "\\g<1>\\g<1>", "xx")).toBe("xxxx");
  });

  it('regex.sub test 10', async () => {
    // Python: self.assertEqual(regex.sub("a", "\1\1\1\1\1\x07\", "a"), "\1\1\1\1\1\x07\")
    expect(await re.sub("a", "\\1\\1\\1\\1\\1\\x07\\", "a")).toBe("\1\1\1\1\1\x07\");
  });

  it('regex.sub test 11', async () => {
    // Python: self.assertEqual(regex.sub("a", "\1\1\1\1\1\x07", "a"), "\1\1\1\1\1\x07")
    expect(await re.sub("a", "\\1\\1\\1\\1\\1\\x07", "a")).toBe("\1\1\1\1\1\x07");
  });

  it('regex.sub test 12', async () => {
    // Python: self.assertEqual(regex.sub("a", "\1\1\1\1\1\x07", "a"),chr(9) + chr(10) + chr(11) + chr(13) + chr(12) + chr(7),)
    expect(await re.sub("a", "\\1\\1\\1\\1\\1\\x07", "a")).toBe("\1\1\1\1\1\x07");
  });

  it('regex.sub test 13', async () => {
    // Python: self.assertEqual(regex.sub("^\s*", "X", "test"), "Xtest")
    expect(await re.sub("^\\s*", "X", "test")).toBe("Xtest");
  });

  it('regex.sub test 14', async () => {
    // Python: self.assertEqual(regex.sub("x", "\x0A", "x"), "\1")
    expect(await re.sub("x", "\\x0A", "x")).toBe("\1");
  });

  it('regex.sub test 15', async () => {
    // Python: self.assertEqual(regex.sub("x", "\u000A", "x"), "\1")
    expect(await re.sub("x", "\\u000A", "x")).toBe("\1");
  });

  it('regex.sub test 16', async () => {
    // Python: self.assertEqual(regex.sub("x", "\U0000000A", "x"), "\1")
    expect(await re.sub("x", "\\U0000000A", "x")).toBe("\1");
  });

  it('regex.sub test 17', async () => {
    // Python: self.assertEqual(regex.sub("x", "\N{LATIN CAPITAL LETTER A}", "x"), "A")
    expect(await re.sub("x", "\\N{LATIN CAPITAL LETTER A}", "x")).toBe("A");
  });

  it('regex.sub test 18', async () => {
    // Python: self.assertEqual(regex.sub("x", "\x0A", "x"), "\1")
    expect(await re.sub("x", "\\x0A", "x")).toBe("\1");
  });
});
