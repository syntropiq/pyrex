import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_bu_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: import regeximport unittestimport sysclass TestGeneralBu(unittest.TestCase):FLAGS_WITH_COMPILED_PAT = "cannot process flags argument with a compiled pattern"PATTERN_CLASS = "<class '_regex.Pattern'>"BAD_SET = "unterminated character set"# test_bug_449964def test_bug_449964(self):# Fails for group followed by other escape.self.assertEqual(regex.sub(r"(?P<unk>x)", r"\g<1>\g<1>\b", "xx"), "xx\bxx\b")
    expect(await re.sub("(?P<unk>x)", "\\g<1>\\g<1>\\b", "xx")).toBe("xx\bxx\b");
  });

  it('regex.sub test 2', async () => {
    // Python: # test_bug_449000def test_bug_449000(self):# Test for sub() on escaped characters.self.assertEqual(regex.sub(r"\r\n", r"\n", "abc\r\ndef\r\n"), "abc\ndef\n")
    expect(await re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('regex.sub test 3', async () => {
    // Python: self.assertEqual(regex.sub("\r\n", r"\n", "abc\r\ndef\r\n"), "abc\ndef\n")
    expect(await re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('regex.sub test 4', async () => {
    // Python: self.assertEqual(regex.sub(r"\r\n", "\n", "abc\r\ndef\r\n"), "abc\ndef\n")
    expect(await re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('regex.sub test 5', async () => {
    // Python: self.assertEqual(regex.sub("\r\n", "\n", "abc\r\ndef\r\n"), "abc\ndef\n")
    expect(await re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('regex.sub test 6', async () => {
    // Python: # test_bug_114660def test_bug_114660(self):self.assertEqual(regex.sub(r"(\S)\s+(\S)", r"\1 \2", "hello  there"), "hello there")
    expect(await re.sub("(\\S)\\s+(\\S)", "\\1 \\2", "hello  there")).toBe("hello there");
  });

  it('regex.sub test 7', async () => {
    // Python: # test_bug_462270def test_bug_462270(self):# Test for empty sub() behaviour, see SF bug #462270if sys.version_info >= (3, 7, 0):self.assertEqual(regex.sub("(?V0)x*", "-", "abxd"), "-a-b--d-")
    expect(await re.sub("(?V0)x*", "-", "abxd")).toBe("-a-b--d-");
  });

  it('regex.sub test 8', async () => {
    // Python: else:self.assertEqual(regex.sub("(?V0)x*", "-", "abxd"), "-a-b-d-")
    expect(await re.sub("(?V0)x*", "-", "abxd")).toBe("-a-b-d-");
  });

  it('regex.sub test 9', async () => {
    // Python: self.assertEqual(regex.sub("(?V1)x*", "-", "abxd"), "-a-b--d-")
    expect(await re.sub("(?V1)x*", "-", "abxd")).toBe("-a-b--d-");
  });

  it('regex.sub test 10', async () => {
    // Python: self.assertEqual(regex.sub("x+", "-", "abxd"), "ab-d")
    expect(await re.sub("x+", "-", "abxd")).toBe("ab-d");
  });

  it('regex.search test 11', async () => {
    // Python: # test_bug_14462def test_bug_14462(self):# chr(255) is a valid identifier in Python 3.group_name = "\xff"self.assertEqual(regex.search(r"(?P<" + group_name + ">a)", "abc").group(group_name), "a")
    const group_name = "\\xff"; // Define group_name as a string
    expect((await re.search("(?P<" + group_name + ">a)", "abc"))?.group(group_name)).toStrictEqual("a");
  });

  it('regex.findall test 12', async () => {
    // Python: # test_bug_117612def test_bug_117612(self):self.assertEqual(regex.findall(r"(a|(b))", "aba"), [("a", ""), ("b", "b"), ("a", "")])
    expect(await re.findall("(a|(b))", "aba")).toStrictEqual([["a", null], ["b", "b"], ["a", null]]);
  });

  it('regex.match test 13', async () => {
    // Python: # test_bug_113254def test_bug_113254(self):self.assertEqual(regex.match(r"(a)|(b)", "b").start(1), -1)
    expect((await re.match("(a)|(b)", "b"))?.start(1)).toStrictEqual(-1);
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match(r"(a)|(b)", "b").end(1), -1)
    expect((await re.match("(a)|(b)", "b"))?.end(1)).toStrictEqual(-1);
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match(r"(a)|(b)", "b").span(1), (-1, -1))
    expect((await re.match("(a)|(b)", "b"))?.span(1)).toStrictEqual([-1, -1]);
  });

  it('regex.match test 16', async () => {
    // Python: # test_bug_418626def test_bug_418626(self):# Bugs 418626 at al. -- Testing Greg Chapman's addition of op code# SRE_OP_MIN_REPEAT_ONE for eliminating recursion on simple uses of# pattern '*?' on a long string.self.assertEqual(regex.match(".*?c", 10000 * "ab" + "cd").end(0), 20001)
    expect((await re.match(".*?c", "ab".repeat(10000) + "cd"))?.end(0)).toStrictEqual(20001);
  });

  it('regex.match test 17', async () => {
    // Python: self.assertEqual(regex.match(".*?cd", 5000 * "ab" + "c" + 5000 * "ab" + "cde").end(0), 20003)
    expect((await re.match(".*?cd", "ab".repeat(5000) + "c" + "ab".repeat(5000) + "cde"))?.end(0)).toStrictEqual(20003);
  });

  it('regex.match test 18', async () => {
    // Python: self.assertEqual(regex.match(".*?cd", 20000 * "abc" + "de").end(0), 60001)
    expect((await re.match(".*?cd", "abc".repeat(20000) + "de"))?.end(0)).toStrictEqual(60001);
  });

  it('regex.search test 19', async () => {
    // Python: # Non-simple '*?' still used to hit the recursion limit, before the# non-recursive scheme was implemented.self.assertEqual(regex.search("(a|b)*?c", 10000 * "ab" + "cd").end(0), 20001)
    expect((await re.search("(a|b)*?c", "ab".repeat(10000) + "cd"))?.end(0)).toStrictEqual(20001);
  });
// Skipped test 20: incomplete arguments in Python: # test_bug_931848def test_bug_931848(self):pattern = "[\u002e\u3002\uff0e\uff61]"self.assertEqual(regex.compile(pattern).split("a.b.c"), ["a", "b", "c"])
});
