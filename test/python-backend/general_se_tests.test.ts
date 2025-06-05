import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_se_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralSe(unittest.TestCase):PATTERN_CLASS = "<class '_regex.Pattern'>"# test_search_star_plusdef test_search_star_plus(self):self.assertEqual(regex.search("a*", "xxx").span(0), (0, 0))
    expect(await re.search("a*", "xxx")?.span(0)).toStrictEqual((0, 0);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search("x*", "axx").span(), (0, 0))
    expect(await re.search("x*", "axx")?.span()).toStrictEqual((0, 0);
  });

  it('regex.search test 3', async () => {
    // Python: self.assertEqual(regex.search("x+", "axx").span(0), (1, 3))
    expect(await re.search("x+", "axx")?.span(0)).toStrictEqual((1, 3);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search("x+", "axx").span(), (1, 3))
    expect(await re.search("x+", "axx")?.span()).toStrictEqual((1, 3);
  });

  it('regex.search test 5', async () => {
    // Python: self.assertEqual(regex.search("x", "aaa"), None)
    expect(await re.search("x", "aaa")).toStrictEqual(None);
  });

  it('regex.match test 6', async () => {
    // Python: self.assertEqual(regex.match("a*", "xxx").span(0), (0, 0))
    expect(await re.match("a*", "xxx")?.span(0)).toStrictEqual((0, 0);
  });

  it('regex.match test 7', async () => {
    // Python: self.assertEqual(regex.match("a*", "xxx").span(), (0, 0))
    expect(await re.match("a*", "xxx")?.span()).toStrictEqual((0, 0);
  });

  it('regex.match test 8', async () => {
    // Python: self.assertEqual(regex.match("x*", "xxxa").span(0), (0, 3))
    expect(await re.match("x*", "xxxa")?.span(0)).toStrictEqual((0, 3);
  });

  it('regex.match test 9', async () => {
    // Python: self.assertEqual(regex.match("x*", "xxxa").span(), (0, 3))
    expect(await re.match("x*", "xxxa")?.span()).toStrictEqual((0, 3);
  });

  it('regex.match test 10', async () => {
    // Python: self.assertEqual(regex.match("a+", "xxx"), None)
    expect(await re.match("a+", "xxx")).toStrictEqual(None);
  });

  it('regex.findall test 11', async () => {
    // Python: # test_search_anchordef test_search_anchor(self):self.assertEqual(regex.findall(r"\G\w{2}", "abcd ef"), ["ab", "cd"])
    expect(await re.findall("\\G\\w{2}", "abcd ef")).toStrictEqual(["ab", "cd"]);
  });

  it('regex.findall test 12', async () => {
    // Python: # test_search_reversedef test_search_reverse(self):self.assertEqual(regex.findall(r"(?r).", "abc"), ["c", "b", "a"])
    expect(await re.findall("(?r).", "abc")).toStrictEqual(["c", "b", "a"]);
  });

  it('regex.findall test 13', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r).", "abc", overlapped=True), ["c", "b", "a"])
    expect(await re.findall("(?r).", "abc")).toStrictEqual(["c", "b", "a"]);
  });

  it('regex.findall test 14', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)..", "abcde"), ["de", "bc"])
    expect(await re.findall("(?r)..", "abcde")).toStrictEqual(["de", "bc"]);
  });

  it('regex.findall test 15', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)..", "abcde", overlapped=True), ["de", "cd", "bc", "ab"])
    expect(await re.findall("(?r)..", "abcde")).toStrictEqual(["de", "cd", "bc", "ab"]);
  });

  it('regex.findall test 16', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)(.)(-)(.)", "a-b-c", overlapped=True),[("b", "-", "c"), ("a", "-", "b")],)
    expect(await re.findall("(?r)(.)(-)(.)", "a-b-c")).toStrictEqual([("b", "-", "c");
  });

  it('regex.findall test 17', async () => {
    // Python: self.assertEqual(regex.findall(r"^|\w+", "foo bar"), ["", "foo", "bar"])
    expect(await re.findall("^|\\w+", "foo bar")).toStrictEqual(["", "foo", "bar"]);
  });

  it('regex.findall test 18', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)^|\w+", "foo bar"), ["", "foo", "bar"])
    expect(await re.findall("(?V1)^|\\w+", "foo bar")).toStrictEqual(["", "foo", "bar"]);
  });

  it('regex.findall test 19', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)^|\w+", "foo bar"), ["bar", "foo", ""])
    expect(await re.findall("(?r)^|\\w+", "foo bar")).toStrictEqual(["bar", "foo", ""]);
  });

  it('regex.findall test 20', async () => {
    // Python: self.assertEqual(regex.findall(r"(?rV1)^|\w+", "foo bar"), ["bar", "foo", ""])
    expect(await re.findall("(?rV1)^|\\w+", "foo bar")).toStrictEqual(["bar", "foo", ""]);
  });

  it('regex.findall test 21', async () => {
    // Python: self.assertEqual(regex.findall(r"\G\w{2}", "abcd ef"), ["ab", "cd"])
    expect(await re.findall("\\G\\w{2}", "abcd ef")).toStrictEqual(["ab", "cd"]);
  });

  it('regex.findall test 22', async () => {
    // Python: self.assertEqual(regex.findall(r".{2}(?<=\G.*)", "abcd"), ["ab", "cd"])
    expect(await re.findall(".{2}(?<=\\G.*)", "abcd")).toStrictEqual(["ab", "cd"]);
  });

  it('regex.findall test 23', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\G\w{2}", "abcd ef"), [])
    expect(await re.findall("(?r)\\G\\w{2}", "abcd ef")).toStrictEqual([]);
  });

  it('regex.findall test 24', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\w{2}\G", "abcd ef"), ["ef"])
    expect(await re.findall("(?r)\\w{2}\\G", "abcd ef")).toStrictEqual(["ef"]);
  });

  it('regex.findall test 25', async () => {
    // Python: self.assertEqual(regex.findall(r"q*", "qqwe"), ["qq", "", "", ""])
    expect(await re.findall("q*", "qqwe")).toStrictEqual(["qq", "", "", ""]);
  });

  it('regex.findall test 26', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)q*", "qqwe"), ["qq", "", "", ""])
    expect(await re.findall("(?V1)q*", "qqwe")).toStrictEqual(["qq", "", "", ""]);
  });

  it('regex.findall test 27', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)q*", "qqwe"), ["", "", "qq", ""])
    expect(await re.findall("(?r)q*", "qqwe")).toStrictEqual(["", "", "qq", ""]);
  });

  it('regex.findall test 28', async () => {
    // Python: self.assertEqual(regex.findall(r"(?rV1)q*", "qqwe"), ["", "", "qq", ""])
    expect(await re.findall("(?rV1)q*", "qqwe")).toStrictEqual(["", "", "qq", ""]);
  });

  it('regex.findall test 29', async () => {
    // Python: self.assertEqual(regex.findall(".", "abcd", pos=1, endpos=3), ["b", "c"])
    expect(await re.findall(".", "abcd")).toStrictEqual(["b", "c"]);
  });

  it('regex.findall test 30', async () => {
    // Python: self.assertEqual(regex.findall(".", "abcd", pos=1, endpos=-1), ["b", "c"])
    expect(await re.findall(".", "abcd")).toStrictEqual(["b", "c"]);
  });

  it('regex.findall test 31', async () => {
    // Python: self.assertEqual(regex.findall("(?r).", "abcd", pos=1, endpos=3), ["c", "b"])
    expect(await re.findall("(?r).", "abcd")).toStrictEqual(["c", "b"]);
  });

  it('regex.findall test 32', async () => {
    // Python: self.assertEqual(regex.findall("(?r).", "abcd", pos=1, endpos=-1), ["c", "b"])
    expect(await re.findall("(?r).", "abcd")).toStrictEqual(["c", "b"]);
  });

  it('regex.findall test 33', async () => {
    // Python: self.assertEqual(regex.findall(r"[ab]", "aB", regex.I), ["a", "B"])
    expect(await re.findall("[ab]", "aB")).toStrictEqual(["a", "B"]);
  });

  it('regex.findall test 34', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)[ab]", "aB", regex.I), ["B", "a"])
    expect(await re.findall("(?r)[ab]", "aB")).toStrictEqual(["B", "a"]);
  });

  it('regex.findall test 35', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r).{2}", "abc"), ["bc"])
    expect(await re.findall("(?r).{2}", "abc")).toStrictEqual(["bc"]);
  });

  it('regex.findall test 36', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r).{2}", "abc", overlapped=True), ["bc", "ab"])
    expect(await re.findall("(?r).{2}", "abc")).toStrictEqual(["bc", "ab"]);
  });

  it('regex.findall test 37', async () => {
    // Python: self.assertEqual(regex.findall(r"(\w+) (\w+)", "first second third fourth fifth"),[("first", "second"), ("third", "fourth")],)
    expect(await re.findall("(\\w+) (\\w+)", "first second third fourth fifth")).toStrictEqual([("first", "second");
  });

  it('regex.findall test 38', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)(\w+) (\w+)", "first second third fourth fifth"),[("fourth", "fifth"), ("second", "third")],)
    expect(await re.findall("(?r)(\\w+) (\\w+)", "first second third fourth fifth")).toStrictEqual([("fourth", "fifth");
  });

  it('regex.search test 39', async () => {
    // Python: self.assertEqual(regex.search("abcdef", "abcdef").span(), (0, 6))
    expect(await re.search("abcdef", "abcdef")?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 40', async () => {
    // Python: self.assertEqual(regex.search("(?r)abcdef", "abcdef").span(), (0, 6))
    expect(await re.search("(?r)abcdef", "abcdef")?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 41', async () => {
    // Python: self.assertEqual(regex.search("(?i)abcdef", "ABCDEF").span(), (0, 6))
    expect(await re.search("(?i)abcdef", "ABCDEF")?.span()).toStrictEqual((0, 6);
  });

  it('regex.search test 42', async () => {
    // Python: self.assertEqual(regex.search("(?ir)abcdef", "ABCDEF").span(), (0, 6))
    expect(await re.search("(?ir)abcdef", "ABCDEF")?.span()).toStrictEqual((0, 6);
  });

  it('regex.sub test 43', async () => {
    // Python: self.assertEqual(regex.sub(r"(.)", r"\1", "abc"), "abc")
    expect(await re.sub("(.)", "\\1", "abc")).toBe("abc");
  });

  it('regex.sub test 44', async () => {
    // Python: self.assertEqual(regex.sub(r"(?r)(.)", r"\1", "abc"), "abc")
    expect(await re.sub("(?r)(.)", "\\1", "abc")).toBe("abc");
  });

  it('regex.match test 45', async () => {
    // Python: # test_setdef test_set(self):self.assertEqual(regex.match(r"[a]", "a").span(), (0, 1))
    expect(await re.match("[a]", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 46', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[a]", "A").span(), (0, 1))
    expect(await re.match("(?i)[a]", "A")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 47', async () => {
    // Python: self.assertEqual(regex.match(r"[a-b]", r"a").span(), (0, 1))
    expect(await re.match("[a-b]", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 48', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[a-b]", r"A").span(), (0, 1))
    expect(await re.match("(?i)[a-b]", "A")?.span()).toStrictEqual((0, 1);
  });

  it('regex.sub test 49', async () => {
    // Python: self.assertEqual(regex.sub(r"(?V0)([][])", r"-", "a[b]c"), "a-b-c")
    expect(await re.sub("(?V0)([][])", "-", "a[b]c")).toBe("a-b-c");
  });

  it('regex.findall test 50', async () => {
    // Python: self.assertEqual(regex.findall(r"[\p{Alpha}]", "a0"), ["a"])
    expect(await re.findall("[\\p{Alpha}]", "a0")).toStrictEqual(["a"]);
  });

  it('regex.findall test 51', async () => {
    // Python: self.assertEqual(regex.findall(r"(?i)[\p{Alpha}]", "A0"), ["A"])
    expect(await re.findall("(?i)[\\p{Alpha}]", "A0")).toStrictEqual(["A"]);
  });

  it('regex.findall test 52', async () => {
    // Python: self.assertEqual(regex.findall(r"[a\p{Alpha}]", "ab0"), ["a", "b"])
    expect(await re.findall("[a\\p{Alpha}]", "ab0")).toStrictEqual(["a", "b"]);
  });

  it('regex.findall test 53', async () => {
    // Python: self.assertEqual(regex.findall(r"[a\P{Alpha}]", "ab0"), ["a", "0"])
    expect(await re.findall("[a\\P{Alpha}]", "ab0")).toStrictEqual(["a", "0"]);
  });

  it('regex.findall test 54', async () => {
    // Python: self.assertEqual(regex.findall(r"(?i)[a\p{Alpha}]", "ab0"), ["a", "b"])
    expect(await re.findall("(?i)[a\\p{Alpha}]", "ab0")).toStrictEqual(["a", "b"]);
  });

  it('regex.findall test 55', async () => {
    // Python: self.assertEqual(regex.findall(r"(?i)[a\P{Alpha}]", "ab0"), ["a", "0"])
    expect(await re.findall("(?i)[a\\P{Alpha}]", "ab0")).toStrictEqual(["a", "0"]);
  });

  it('regex.findall test 56', async () => {
    // Python: self.assertEqual(regex.findall(r"[a-b\p{Alpha}]", "abC0"), ["a", "b", "C"])
    expect(await re.findall("[a-b\\p{Alpha}]", "abC0")).toStrictEqual(["a", "b", "C"]);
  });

  it('regex.findall test 57', async () => {
    // Python: self.assertEqual(regex.findall(r"(?i)[a-b\p{Alpha}]", "AbC0"), ["A", "b", "C"])
    expect(await re.findall("(?i)[a-b\\p{Alpha}]", "AbC0")).toStrictEqual(["A", "b", "C"]);
  });

  it('regex.findall test 58', async () => {
    // Python: self.assertEqual(regex.findall(r"[\p{Alpha}]", "a0"), ["a"])
    expect(await re.findall("[\\p{Alpha}]", "a0")).toStrictEqual(["a"]);
  });

  it('regex.findall test 59', async () => {
    // Python: self.assertEqual(regex.findall(r"[\P{Alpha}]", "a0"), ["0"])
    expect(await re.findall("[\\P{Alpha}]", "a0")).toStrictEqual(["0"]);
  });

  it('regex.findall test 60', async () => {
    // Python: self.assertEqual(regex.findall(r"[^\p{Alpha}]", "a0"), ["0"])
    expect(await re.findall("[^\\p{Alpha}]", "a0")).toStrictEqual(["0"]);
  });

  it('regex.findall test 61', async () => {
    // Python: self.assertEqual(regex.findall(r"[^\P{Alpha}]", "a0"), ["a"])
    expect(await re.findall("[^\\P{Alpha}]", "a0")).toStrictEqual(["a"]);
  });

  it('regex.findall test 62', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)[[a-z]--[aei]]", "abc"), ["b", "c"])
    expect(await re.findall("(?V1)[[a-z]--[aei]]", "abc")).toStrictEqual(["b", "c"]);
  });

  it('regex.findall test 63', async () => {
    // Python: self.assertEqual(regex.findall(r"(?iV1)[[a-z]--[aei]]", "abc"), ["b", "c"])
    expect(await re.findall("(?iV1)[[a-z]--[aei]]", "abc")).toStrictEqual(["b", "c"]);
  });

  it('regex.findall test 64', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)[\w--a]", "abc"), ["b", "c"])
    expect(await re.findall("(?V1)[\\w--a]", "abc")).toStrictEqual(["b", "c"]);
  });

  it('regex.findall test 65', async () => {
    // Python: self.assertEqual(regex.findall(r"(?iV1)[\w--a]", "abc"), ["b", "c"])
    expect(await re.findall("(?iV1)[\\w--a]", "abc")).toStrictEqual(["b", "c"]);
  });
});
