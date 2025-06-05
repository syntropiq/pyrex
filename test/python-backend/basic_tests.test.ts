import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/basic_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: def test_basic_regex_sub(self):self.assertEqual(regex.sub("(?i)b+", "x", "bbbb BBBB"), "x x")
    expect(await re.sub("(?i)b+", "x", "bbbb BBBB", { backend: 'python' })).toBe("x x");
  });

  it('regex.sub test 2', async () => {
    // Python: self.assertEqual(regex.sub(r"\d+", self.bump_num, "08.2 -2 23x99y"), "9.3 -3 24x100y")
    expect(await re.sub("\\d+", // TODO: Manual conversion needed for callable replacement, "08.2 -2 23x99y", { backend: 'python' })).toBe("9.3 -3 24x100y");
  });

  it('regex.sub test 3', async () => {
    // Python: self.assertEqual(regex.sub(r"\d+", self.bump_num, "08.2 -2 23x99y", 3), "9.3 -3 23x99y")
    expect(await re.sub("\\d+", // TODO: Manual conversion needed for callable replacement, "08.2 -2 23x99y", { backend: 'python' })).toBe("9.3 -3 23x99y");
  });

  it('regex.sub test 4', async () => {
    // Python: self.assertEqual(regex.sub(".", lambda m: r"\n", "x"), "\\n")
    expect(await re.sub(".", // TODO: Manual conversion needed for callable replacement, "x", { backend: 'python' })).toBe("\\n");
  });

  it('regex.sub test 5', async () => {
    // Python: self.assertEqual(regex.sub(".", r"\n", "x"), "\n")
    expect(await re.sub(".", "\\n", "x", { backend: 'python' })).toBe("\n");
  });

  it('regex.sub test 6', async () => {
    // Python: self.assertEqual(regex.sub("(?P<a>x)", r"\g<a>\g<a>", "xx"), "xxxx")
    expect(await re.sub("(?P<a>x)", "\\g<a>\\g<a>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('regex.sub test 7', async () => {
    // Python: self.assertEqual(regex.sub("(?P<a>x)", r"\g<a>\g<1>", "xx"), "xxxx")
    expect(await re.sub("(?P<a>x)", "\\g<a>\\g<1>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('regex.sub test 8', async () => {
    // Python: self.assertEqual(regex.sub("(?P<unk>x)", r"\g<unk>\g<unk>", "xx"), "xxxx")
    expect(await re.sub("(?P<unk>x)", "\\g<unk>\\g<unk>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('regex.sub test 9', async () => {
    // Python: self.assertEqual(regex.sub("(?P<unk>x)", r"\g<1>\g<1>", "xx"), "xxxx")
    expect(await re.sub("(?P<unk>x)", "\\g<1>\\g<1>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('regex.sub test 10', async () => {
    // Python: self.assertEqual(regex.sub("a", r"\t\n\v\r\f\a\b", "a"), "\t\n\v\r\f\a\b")
    expect(await re.sub("a", "\\t\\n\\v\\r\\f\\a\\b", "a", { backend: 'python' })).toBe("\t\n\v\r\f\a\b");
  });

  it('regex.sub test 11', async () => {
    // Python: self.assertEqual(regex.sub("a", "\t\n\v\r\f\a", "a"), "\t\n\v\r\f\a")
    expect(await re.sub("a", "\\t\\n\\v\\r\\f\\a", "a", { backend: 'python' })).toBe("\t\n\v\r\f\a");
  });

  it('regex.sub test 12', async () => {
    // Python: self.assertEqual(regex.sub("a", "\t\n\v\r\f\a", "a"),chr(9) + chr(10) + chr(11) + chr(13) + chr(12) + chr(7),)
    expect(await re.sub("a", "\\t\\n\\v\\r\\f\\a", "a", { backend: 'python' })).toBe(chr(9);
  });

  it('regex.sub test 13', async () => {
    // Python: self.assertEqual(regex.sub(r"^\s*", "X", "test"), "Xtest")
    expect(await re.sub("^\\s*", "X", "test", { backend: 'python' })).toBe("Xtest");
  });

  it('regex.sub test 14', async () => {
    // Python: self.assertEqual(regex.sub(r"x", r"\x0A", "x"), "\n")
    expect(await re.sub("x", "\\x0A", "x", { backend: 'python' })).toBe("\n");
  });

  it('regex.sub test 15', async () => {
    // Python: self.assertEqual(regex.sub(r"x", r"\u000A", "x"), "\n")
    expect(await re.sub("x", "\\u000A", "x", { backend: 'python' })).toBe("\n");
  });

  it('regex.sub test 16', async () => {
    // Python: self.assertEqual(regex.sub(r"x", r"\U0000000A", "x"), "\n")
    expect(await re.sub("x", "\\U0000000A", "x", { backend: 'python' })).toBe("\n");
  });

  it('regex.sub test 17', async () => {
    // Python: self.assertEqual(regex.sub(r"x", r"\N{LATIN CAPITAL LETTER A}", "x"), "A")
    expect(await re.sub("x", "\\N{LATIN CAPITAL LETTER A}", "x", { backend: 'python' })).toBe("A");
  });

  it('regex.sub test 18', async () => {
    // Python: self.assertEqual(regex.sub(rb"x", rb"\x0A", b"x"), b"\n")
    expect(await re.sub("x", "\\x0A", "x", { backend: 'python' })).toBe("\n");
  });
});
