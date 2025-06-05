import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_re_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: # test_re_findalldef test_re_findall(self):self.assertEqual(regex.findall(":+", "abc"), [])
    expect(await re.findall(":+", "abc")).toStrictEqual([]);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(":+", "a:b::c:::d"), [':', '::', ':::'])
    expect(await re.findall(":+", "a:b::c:::d")).toStrictEqual([':', '::', ':::']);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall("(:+)", "a:b::c:::d"), [':', '::',':::'])
    expect(await re.findall("(:+)", "a:b::c:::d")).toStrictEqual([':', '::',':::']);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall("(:)(:*)", "a:b::c:::d"), [(':', ''),(':', ':'), (':', '::')])
    expect(await re.findall("(:)(:*)", "a:b::c:::d")).toStrictEqual([(':', '');
  });

  it('regex.findall test 5', async () => {
    // Python: self.assertEqual(regex.findall("\((?P<test>.{0,5}?TEST)\)","(MY TEST)"), ["MY TEST"])
    expect(await re.findall("\\((?P<test>.{0, 5}?TEST)\\)")).toStrictEqual(["MY TEST"]);
  });

  it('regex.findall test 6', async () => {
    // Python: self.assertEqual(regex.findall("\((?P<test>.{0,3}?TEST)\)","(MY TEST)"), ["MY TEST"])
    expect(await re.findall("\\((?P<test>.{0, 3}?TEST)\\)")).toStrictEqual(["MY TEST"]);
  });

  it('regex.findall test 7', async () => {
    // Python: self.assertEqual(regex.findall("\((?P<test>.{0,3}?T)\)", "(MY T)"),["MY T"])
    expect(await re.findall("\\((?P<test>.{0, 3}?T)\\)")).toStrictEqual(["MY T"]);
  });

  it('regex.findall test 8', async () => {
    // Python: self.assertEqual(regex.findall("[^a]{2}[A-Z]", "\1  S"), ['  S'])
    expect(await re.findall("[^a]{2}[A-Z]", "\\1  S")).toStrictEqual(['  S']);
  });

  it('regex.findall test 9', async () => {
    // Python: self.assertEqual(regex.findall("[^a]{2,3}[A-Z]", "\1  S"), ['\1  S'])
    expect(await re.findall("[^a]{2, 3}[A-Z]")).toStrictEqual(['\1  S']);
  });

  it('regex.findall test 10', async () => {
    // Python: self.assertEqual(regex.findall("[^a]{2,3}[A-Z]", "\1   S"), ['   S'])
    expect(await re.findall("[^a]{2, 3}[A-Z]")).toStrictEqual(['   S']);
  });

  it('regex.findall test 11', async () => {
    // Python: self.assertEqual(regex.findall("X(Y[^Y]+?){1,2}( |Q)+DEF","XYABCYPPQ\1Q DEF"), [('YPPQ\1', ' ')])
    expect(await re.findall("X(Y[^Y]+?){1, 2}( |Q)+DEF")).toStrictEqual([('YPPQ\1', ' ');
  });

  it('regex.findall test 12', async () => {
    // Python: self.assertEqual(regex.findall("(\1Test(\1+.+?){0,2}?)?\1+End","\1Test\1xyz\1xyz\1End"), [('\1Test\1xyz\1xyz', '\1xyz')])
    expect(await re.findall("(\\1Test(\\1+.+?){0, 2}?)?\\1+End")).toStrictEqual([('\1Test\1xyz\1xyz', '\1xyz');
  });

  it('regex.match test 13', async () => {
    // Python: self.assertEqual(regex.match(r'(a)', 'a').group(1, 1), ('a', 'a'))
    expect(await re.match("(a)", "a")?.group(1, 1)).toStrictEqual(('a', 'a');
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match(r'^(\()?([^()]+)(?(1)\))$', 'a)'), null)
    expect(await re.match("^(\\()?([^()]+)(?(1)\\))$", "a)")).toStrictEqual(null);
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match(r'^(\()?([^()]+)(?(1)\))$', '(a'), null)
    expect(await re.match("^(\\()?([^()]+)(?(1)\\))$", "(a")).toStrictEqual(null);
  });

  it('regex.match test 16', async () => {
    // Python: self.assertEqual(regex.match(r'^(\|)?([^()]+)\1$', 'a|'), null)
    expect(await re.match("^(\\|)?([^()]+)\\1$", "a|")).toStrictEqual(null);
  });

  it('regex.match test 17', async () => {
    // Python: self.assertEqual(regex.match(r'^(\|)?([^()]+)\1$', '|a'), null)
    expect(await re.match("^(\\|)?([^()]+)\\1$", "|a")).toStrictEqual(null);
  });

  it('regex.findall test 18', async () => {
    // Python: self.assertEqual(regex.findall("(?i)(.{1,40}?),(.{1,40}?)(?:;)+(.{1,80}).{1,40}?\3(\ |;)+(.{1,80}?)\1","TEST, BEST; LEST ; Lest 123 Test, Best"), [('TEST', ' BEST',' LEST', ' ', '123 ')])
    expect(await re.findall("(?i)(.{1, 40}?)).toStrictEqual((.{1,40}?);
  });

  it('regex.match test 19', async () => {
    // Python: # test_repeat_minmaxdef test_repeat_minmax(self):self.assertEqual(regex.match("^(\w){1}$", "abc"), null)
    expect(await re.match("^(\\w){1}$", "abc")).toStrictEqual(null);
  });

  it('regex.match test 20', async () => {
    // Python: self.assertEqual(regex.match("^(\w){1}?$", "abc"), null)
    expect(await re.match("^(\\w){1}?$", "abc")).toStrictEqual(null);
  });

  it('regex.match test 21', async () => {
    // Python: self.assertEqual(regex.match("^(\w){1,2}$", "abc"), null)
    expect(await re.match("^(\\w){1, 2}$")).toStrictEqual(null);
  });

  it('regex.match test 22', async () => {
    // Python: self.assertEqual(regex.match("^(\w){1,2}?$", "abc"), null)
    expect(await re.match("^(\\w){1, 2}?$")).toStrictEqual(null);
  });

  it('regex.match test 23', async () => {
    // Python: self.assertEqual(regex.match("^x{1}$", "xxx"), null)
    expect(await re.match("^x{1}$", "xxx")).toStrictEqual(null);
  });

  it('regex.match test 24', async () => {
    // Python: self.assertEqual(regex.match("^x{1}?$", "xxx"), null)
    expect(await re.match("^x{1}?$", "xxx")).toStrictEqual(null);
  });

  it('regex.match test 25', async () => {
    // Python: self.assertEqual(regex.match("^x{1,2}$", "xxx"), null)
    expect(await re.match("^x{1, 2}$")).toStrictEqual(null);
  });

  it('regex.match test 26', async () => {
    // Python: self.assertEqual(regex.match("^x{1,2}?$", "xxx"), null)
    expect(await re.match("^x{1, 2}?$")).toStrictEqual(null);
  });

  it('regex.match test 27', async () => {
    // Python: self.assertEqual(regex.match("^x{}$", "xxx"), null)
    expect(await re.match("^x{}$", "xxx")).toStrictEqual(null);
  });
// Skipped test 28: incomplete arguments in Python: self.assertEqual(regex.match(regex.escape(chr(i)), chr(i)).span(),(0, 1))
// Skipped test 29: incomplete arguments in Python: self.assertEqual(regex.match(regex.escape(b), b).span(), (0, 1))

  it('regex.search test 30', async () => {
    // Python: # test_repeated_repeatsdef test_repeated_repeats(self):# Issue 2537.self.assertEqual(regex.search("(?:a+)+", "aaa").span(), (0, 3))
    expect(await re.search("(?:a+)+", "aaa")?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 31', async () => {
    // Python: self.assertEqual(regex.search("(?:(?:ab)+c)+", "abcabc").span(), (0,6))
    expect(await re.search("(?:(?:ab)+c)+", "abcabc")?.span()).toStrictEqual((0,6);
  });

  it('regex.search test 32', async () => {
    // Python: # Hg issue 286.self.assertEqual(regex.search("(?:a+){2,}", "aaa").span(), (0, 3))
    expect(await re.search("(?:a+){2, }")?.span()).toStrictEqual((0, 3);
  });

  it('regex.sub test 33', async () => {
    // Python: # test_replacementdef test_replacement(self):self.assertEqual(regex.sub("test\?", "result\\?\\.\x07\1", "test?"),"result\\?\\.\x07\1")
    expect(await re.sub("test\\?", "result\\\\?\\\\.\\x07\\1", "test?")).toBe("result\\?\\.\x07\1");
  });

  it('regex.sub test 34', async () => {
    // Python: self.assertEqual(regex.sub('(.)', "\1\1", 'x'), 'xx')
    expect(await re.sub("(.)", "\\1\\1", "x")).toBe('xx');
  });
// Skipped test 35: incomplete arguments in Python: self.assertEqual(regex.sub('(.)', regex.escape("\1\1"), 'x'), "\1\1")

  it('regex.sub test 36', async () => {
    // Python: self.assertEqual(regex.sub('(.)', "\\1\\1", 'x'), "\1\1")
    expect(await re.sub("(.)", "\\\\1\\\\1", "x")).toBe("\1\1");
  });

  it('regex.sub test 37', async () => {
    // Python: self.assertEqual(regex.sub('(.)', lambda m: "\1\1", 'x'), "\1\1")
    expect(await re.sub("(.)", // TODO: Manual conversion needed for callable replacement, "x")).toBe("\1\1");
  });

  it('regex.search test 38', async () => {
    // Python: self.assertEqual(regex.search("(\w)(?:(?R)|(\w?))\1", "dontmatchme"),null)
    expect(await re.search("(\\w)(?:(?R)|(\\w?))\\1", "dontmatchme")).toStrictEqual(null);
  });

  it('regex.search test 39', async () => {
    // Python: self.assertEqual(regex.search("(?r)\2(?:(\w?)|(?R))(\w)","dontmatchme"), null)
    expect(await re.search("(?r)\\2(?:(\\w?)|(?R))(\\w)", "dontmatchme")).toStrictEqual(null);
  });

  it('regex.search test 40', async () => {
    // Python: self.assertEqual(regex.search("\(((?>[^()]+)|(?R))*\)","(ab(cd)ef)").captures(1), ["a", "cd", "(cd)", "ef"])
    expect(await re.search("\\(((?>[^()]+)|(?R))*\\)", "(ab(cd)ef)")?.captures(1)).toStrictEqual(["a", "cd", "(cd);
  });

  it('regex.search test 41', async () => {
    // Python: self.assertEqual(regex.search("(?r)\(((?R)|(?>[^()]+))*\)","(ab(cd)ef)").captures(1), ["ef", "cd", "(cd)", "a"])
    expect(await re.search("(?r)\\(((?R)|(?>[^()]+))*\\)", "(ab(cd)ef)")?.captures(1)).toStrictEqual(["ef", "cd", "(cd);
  });
});
