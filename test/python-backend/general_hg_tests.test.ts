import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_hg_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: # Hg issue 31: atomic and normal groups in recursive patternsself.assertEqual(regex.findall(r"\((?:(?>[^()]+)|(?R))*\)", "a(bcd(e)f)g(h)"),["(bcd(e)f)", "(h)"],)
    expect(await re.findall("\\((?:(?>[^()]+)|(?R))*\\)", "a(bcd(e)f)g(h)")).toStrictEqual(["(bcd(e);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(r"\((?:(?:[^()]+)|(?R))*\)", "a(bcd(e)f)g(h)"),["(bcd(e)f)", "(h)"],)
    expect(await re.findall("\\((?:(?:[^()]+)|(?R))*\\)", "a(bcd(e)f)g(h)")).toStrictEqual(["(bcd(e);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall(r"\((?:(?>[^()]+)|(?R))*\)", "a(b(cd)e)f)g)h"), ["(b(cd)e)"])
    expect(await re.findall("\\((?:(?>[^()]+)|(?R))*\\)", "a(b(cd)e)f)g)h")).toStrictEqual(["(b(cd);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall(r"\((?:(?>[^()]+)|(?R))*\)", "a(bc(d(e)f)gh"), ["(d(e)f)"])
    expect(await re.findall("\\((?:(?>[^()]+)|(?R))*\\)", "a(bc(d(e)f)gh")).toStrictEqual(["(d(e);
  });

  it('regex.findall test 5', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\((?:(?>[^()]+)|(?R))*\)", "a(bc(d(e)f)gh"), ["(d(e)f)"])
    expect(await re.findall("(?r)\\((?:(?>[^()]+)|(?R))*\\)", "a(bc(d(e)f)gh")).toStrictEqual(["(d(e);
  });

  it('regex.search test 6', async () => {
    // Python: # Hg issue 32: regex.search("a(bc)d", "abcd", regex.I|regex.V1) returns# nullself.assertEqual(regex.search("a(bc)d", "abcd", regex.I | regex.V1).group(0), "abcd")
    expect(await re.search("a(bc)d", "abcd")?.group(0)).toStrictEqual("abcd");
  });

  it('regex.search test 7', async () => {
    // Python: # returns nullself.assertEqual(regex.search(r"([\da-f:]+)$", "E", regex.I | regex.V1).group(0), "E")
    expect(await re.search("([\\da-f:]+)$", "E")?.group(0)).toStrictEqual("E");
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search(r"([\da-f:]+)$", "e", regex.I | regex.V1).group(0), "e")
    expect(await re.search("([\\da-f:]+)$", "e")?.group(0)).toStrictEqual("e");
  });

  it('regex.search test 9', async () => {
    // Python: self.assertEqual(regex.search("^(?=ab(de))(abd)(e)", "abde").groups(), ("de", "abd", "e")
    expect(await re.search("^(?=ab(de))(abd)(e)", "abde")?.groups()).toStrictEqual(("de", "abd", "e");
  });

  it('regex.search test 10', async () => {
    // Python: # Hg issue 36: regex.search("^(a|)\1{2}", "") returns nullself.assertEqual(regex.search(r"^(a|)\1{2}", "").group(0, 1), ("", ""))
    expect(await re.search("^(a|)\\1{2}", "")?.group(0, 1)).toStrictEqual(("", "");
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search("^(a){0,0}", "abc").group(0, 1), ("", null))
    expect(await re.search("^(a){0, 0}")?.group(0, 1)).toStrictEqual(("", null);
  });

  it('regex.search test 12', async () => {
    // Python: # Hg issue 38: regex.search("(?>.*/)", "a/") returns nullself.assertEqual(regex.search("(?>.*/)", "a/").group(0), "a/")
    expect(await re.search("(?>.*/)", "a/")?.group(0)).toStrictEqual("a/");
  });

  it('regex.search test 13', async () => {
    // Python: # Hg issue 39: regex.search("((?i)blah)\\s+\\1", "blah BLAH") doesn't# return null# Changed to positional flags in regex 2023.12.23.self.assertEqual(regex.search(r"((?i)blah)\s+\1", "blah BLAH"), null)
    expect(await re.search("((?i)blah)\\s+\\1", "blah BLAH")).toStrictEqual(null);
  });

  it('regex.search test 14', async () => {
    // Python: # returns "bcd" instead of "abcd"self.assertEqual(regex.search(r"(\()?[^()]+(?(1)\)|)", "(abcd").group(0), "abcd")
    expect(await re.search("(\\()?[^()]+(?(1)\\)|)", "(abcd")?.group(0)).toStrictEqual("abcd");
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search("(a*)*", "a").span(1), (1, 1))
    expect(await re.search("(a*)*", "a")?.span(1)).toStrictEqual((1, 1);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search("(a*)*", "aa").span(1), (2, 2))
    expect(await re.search("(a*)*", "aa")?.span(1)).toStrictEqual((2, 2);
  });

  it('regex.search test 17', async () => {
    // Python: self.assertEqual(regex.search("(a*)*", "aaa").span(1), (3, 3))
    expect(await re.search("(a*)*", "aaa")?.span(1)).toStrictEqual((3, 3);
  });

  it('regex.search test 18', async () => {
    // Python: # Hg issue 43: regex.compile("a(?#xxx)*") causes "_regex_core.error:# nothing to repeat"self.assertEqual(regex.search("a(?#xxx)*", "aaa").group(), "aaa")
    expect(await re.search("a(?#xxx)*", "aaa")?.group()).toStrictEqual("aaa");
  });

  it('regex.search test 19', async () => {
    // Python: # Hg issue 44: regex.compile("(?=abc){3}abc") causes# "_regex_core.error: nothing to repeat"self.assertEqual(regex.search("(?=abc){3}abc", "abcabcabc").span(), (0, 3))
    expect(await re.search("(?=abc){3}abc", "abcabcabc")?.span()).toStrictEqual((0, 3);
  });

  it('regex.search test 20', async () => {
    // Python: # Hg issue 45: regex.compile("^(?:a(?:(?:))+)+") causes# "_regex_core.error: nothing to repeat"self.assertEqual(regex.search("^(?:a(?:(?:))+)+", "a").span(), (0, 1))
    expect(await re.search("^(?:a(?:(?:))+)+", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.search test 21', async () => {
    // Python: self.assertEqual(regex.search("^(?:a(?:(?:))+)+", "aa").span(), (0, 2))
    expect(await re.search("^(?:a(?:(?:))+)+", "aa")?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 22', async () => {
    // Python: # Hg issue 46: regex.compile("a(?x: b c )d") causes# "_regex_core.error: missing )"self.assertEqual(regex.search("a(?x: b c )d", "abcd").group(0), "abcd")
    expect(await re.search("a(?x: b c )d", "abcd")?.group(0)).toStrictEqual("abcd");
  });

  it('regex.search test 23', async () => {
    // Python: # Hg issue 47: regex.compile("a#comment\n*", flags=regex.X) causes# "_regex_core.error: nothing to repeat"self.assertEqual(regex.search("a#comment\n*", "aaa", flags=regex.X).group(0), "aaa")
    expect(await re.search("a#comment\\n*", "aaa")?.group(0)).toStrictEqual("aaa");
  });

  it('regex.search test 24', async () => {
    // Python: self.assertEqual(regex.search(r"(?V1)(a(?(1)\1)){1}", "aaaaaaaaaa").span(0, 1),((0, 1), (0, 1)),)
    expect(await re.search("(?V1)(a(?(1)\\1)){1}", "aaaaaaaaaa")?.span(0, 1)).toStrictEqual(((0, 1);
  });

  it('regex.search test 25', async () => {
    // Python: self.assertEqual(regex.search(r"(?V1)(a(?(1)\1)){2}", "aaaaaaaaaa").span(0, 1),((0, 3), (1, 3)),)
    expect(await re.search("(?V1)(a(?(1)\\1)){2}", "aaaaaaaaaa")?.span(0, 1)).toStrictEqual(((0, 3);
  });

  it('regex.search test 26', async () => {
    // Python: self.assertEqual(regex.search(r"(?V1)(a(?(1)\1)){3}", "aaaaaaaaaa").span(0, 1),((0, 6), (3, 6)),)
    expect(await re.search("(?V1)(a(?(1)\\1)){3}", "aaaaaaaaaa")?.span(0, 1)).toStrictEqual(((0, 6);
  });

  it('regex.search test 27', async () => {
    // Python: self.assertEqual(regex.search(r"(?V1)(a(?(1)\1)){4}", "aaaaaaaaaa").span(0, 1),((0, 10), (6, 10)),)
    expect(await re.search("(?V1)(a(?(1)\\1)){4}", "aaaaaaaaaa")?.span(0, 1)).toStrictEqual(((0, 10);
  });

  it('regex.search test 28', async () => {
    // Python: # Hg issue 49: regex.search("(a)(?<=b(?1))", "baz", regex.V1) returns# null incorrectlyself.assertEqual(regex.search("(?V1)(a)(?<=b(?1))", "baz").group(0), "a")
    expect(await re.search("(?V1)(a)(?<=b(?1))", "baz")?.group(0)).toStrictEqual("a");
  });

  it('regex.findall test 29', async () => {
    // Python: # Hg issue 50: not all keywords are found by named list with# overlapping keywords when full Unicode casefolding is requiredself.assertEqual(regex.findall(r"(?fi)\L<keywords>","POST, Post, post, po\u017ft, po\ufb06, and po\ufb05",keywords=["post", "pos"],),["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],)
    expect(await re.findall("(?fi)\\L<keywords>", "POST)).toStrictEqual(["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],);
  });

  it('regex.findall test 30', async () => {
    // Python: self.assertEqual(regex.findall(r"(?fi)pos|post", "POST, Post, post, po\u017ft, po\ufb06, and po\ufb05"),["POS", "Pos", "pos", "po\u017f", "po\ufb06", "po\ufb05"],)
    expect(await re.findall("(?fi)pos|post", "POST)).toStrictEqual(["POS", "Pos", "pos", "po\u017f", "po\ufb06", "po\ufb05"],);
  });

  it('regex.findall test 31', async () => {
    // Python: self.assertEqual(regex.findall(r"(?fi)post|pos", "POST, Post, post, po\u017ft, po\ufb06, and po\ufb05"),["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],)
    expect(await re.findall("(?fi)post|pos", "POST)).toStrictEqual(["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],);
  });

  it('regex.findall test 32', async () => {
    // Python: self.assertEqual(regex.findall(r"(?fi)post|another","POST, Post, post, po\u017ft, po\ufb06, and po\ufb05",),["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],)
    expect(await re.findall("(?fi)post|another", "POST)).toStrictEqual(["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],);
  });

  it('regex.search test 33', async () => {
    // Python: # returns null incorrectlyself.assertEqual(regex.search("(?V1)((a)(?1)|(?2))", "a").group(0, 1, 2), ("a", "a", null)
    expect(await re.search("(?V1)((a)(?1)|(?2))", "a")?.group(0, 1, 2)).toStrictEqual(("a", "a", null);
  });

  it('regex.search test 34', async () => {
    // Python: # Hg issue 52: regex.search("(\\1xx|){6}", "xx",# flags=regex.V1).span(0,1) returns incorrect valueself.assertEqual(regex.search(r"(?V1)(\1xx|){6}", "xx").span(0, 1), ((0, 2), (2, 2))
    expect(await re.search("(?V1)(\\1xx|){6}", "xx")?.span(0, 1)).toStrictEqual(((0, 2);
  });

  it('regex.search test 35', async () => {
    // Python: # Hg issue 53: regex.search("(a|)+", "a") causes MemoryErrorself.assertEqual(regex.search("(a|)+", "a").group(0, 1), ("a", ""))
    expect(await re.search("(a|)+", "a")?.group(0, 1)).toStrictEqual(("a", "");
  });

  it('regex.search test 36', async () => {
    // Python: # Hg issue 54: regex.search("(a|)*\\d", "a"*80) causes MemoryErrorself.assertEqual(regex.search(r"(a|)*\d", "a" * 80), null)
    expect(await re.search("(a|)*\\d", "a" * 80)).toStrictEqual(null);
  });

  it('regex.search test 37', async () => {
    // Python: # Hg issue 55: regex.search("^(?:a?b?)*$", "ac") take a very long time.self.assertEqual(regex.search("^(?:a?b?)*$", "ac"), null)
    expect(await re.search("^(?:a?b?)*$", "ac")).toStrictEqual(null);
  });

  it('regex.search test 38', async () => {
    // Python: # Hg issue 59: regex.search("\\Z", "a\na\n") returns null incorrectlyself.assertEqual(regex.search("\\Z", "a\na\n").span(0), (4, 4))
    expect(await re.search("\\\\Z", "a\\na\\n")?.span(0)).toStrictEqual((4, 4);
  });

  it('regex.search test 39', async () => {
    // Python: # returns null incorrectlyself.assertEqual(regex.search("(q1|.)*(q2|.)*(x(a|bc)*y){2,}", "xayxay").group(0), "xayxay")
    expect(await re.search("(q1|.)*(q2|.)*(x(a|bc)*y){2, }")?.group(0)).toStrictEqual("xayxay");
  });

  it('regex.search test 40', async () => {
    // Python: # Hg issue 61: regex.search("[^a]", "A", regex.I).group(0) returns ''# incorrectlyself.assertEqual(regex.search("(?i)[^a]", "A"), null)
    expect(await re.search("(?i)[^a]", "A")).toStrictEqual(null);
  });

  it('regex.search test 41', async () => {
    // Python: # Hg issue 63: regex.search("[[:ascii:]]", "\N{KELVIN SIGN}",# flags=regex.I|regex.V1) doesn't return nullself.assertEqual(regex.search("(?i)[[:ascii:]]", "\N{KELVIN SIGN}"), null)
    expect(await re.search("(?i)[[:ascii:]]", "\\N{KELVIN SIGN}")).toStrictEqual(null);
  });

  it('regex.search test 42', async () => {
    // Python: self.assertEqual(regex.search("((a|b(?1)c){3,5})", "baaaaca").group(0, 1, 2),("aaaa", "aaaa", "a"),)
    expect(await re.search("((a|b(?1)c){3, 5})")?.group(0, 1, 2)).toStrictEqual(("aaaa", "aaaa", "a");
  });

  it('regex.findall test 43', async () => {
    // Python: # Hg issue 71: non-greedy quantifier in lookbehindself.assertEqual(regex.findall(r"(?<=:\S+ )\w+", ":9 abc :10 def"), ["abc", "def"])
    expect(await re.findall("(?<=:\\S+ )\\w+", ":9 abc :10 def")).toStrictEqual(["abc", "def"]);
  });

  it('regex.findall test 44', async () => {
    // Python: self.assertEqual(regex.findall(r"(?<=:\S* )\w+", ":9 abc :10 def"), ["abc", "def"])
    expect(await re.findall("(?<=:\\S* )\\w+", ":9 abc :10 def")).toStrictEqual(["abc", "def"]);
  });

  it('regex.findall test 45', async () => {
    // Python: self.assertEqual(regex.findall(r"(?<=:\S+? )\w+", ":9 abc :10 def"), ["abc", "def"])
    expect(await re.findall("(?<=:\\S+? )\\w+", ":9 abc :10 def")).toStrictEqual(["abc", "def"]);
  });

  it('regex.findall test 46', async () => {
    // Python: self.assertEqual(regex.findall(r"(?<=:\S*? )\w+", ":9 abc :10 def"), ["abc", "def"])
    expect(await re.findall("(?<=:\\S*? )\\w+", ":9 abc :10 def")).toStrictEqual(["abc", "def"]);
  });

  it('regex.search test 47', async () => {
    // Python: # Hg issue 73: conditional patternsself.assertEqual(regex.search(r"(?:fe)?male", "female").group(), "female")
    expect(await re.search("(?:fe)?male", "female")?.group()).toStrictEqual("female");
  });

  it('regex.search test 48', async () => {
    // Python: # Hg issue 78: "Captures" doesn't work for recursive callsself.assertEqual(regex.search(r"(?<rec>\((?:[^()]++|(?&rec))*\))", "aaa(((1+0)+1)+1)bb").captures("rec"),["(1+0)", "((1+0)+1)", "(((1+0)+1)+1)"],)
    expect(await re.search("(?<rec>\\((?:[^()]++|(?&rec))*\\))", "aaa(((1+0)+1)+1)bb")?.captures("rec")).toStrictEqual(["(1+0);
  });

  it('regex.findall test 49', async () => {
    // Python: # Hg issue 83: slash handling in presence of a quantifierself.assertEqual(regex.findall(r"c..+/c", "cA/c\ncAb/c"), ["cAb/c"])
    expect(await re.findall("c..+/c", "cA/c\\ncAb/c")).toStrictEqual(["cAb/c"]);
  });

  it('regex.match test 50', async () => {
    // Python: # Hg issue 88: regex.match() hangsself.assertEqual(regex.match(r".*a.*ba.*aa", "ababba"), null)
    expect(await re.match(".*a.*ba.*aa", "ababba")).toStrictEqual(null);
  });

  it('regex.match test 51', async () => {
    // Python: # Hg issue 87: Allow duplicate names of groupsself.assertEqual(regex.match(r"(?<x>a(?<x>b))", "a").spans("x"), [(1, 2), (0, 2)])
    expect(await re.match("(?<x>a(?<x>b))", "a")?.spans("x")).toStrictEqual([(1, 2);
  });
// Skipped test 52: incomplete arguments in Python: # Hg issue 91: match.expand is extremely slow# Check that the replacement cache works.self.assertEqual(regex.sub(r"(-)", lambda m: m.expand(r"x"), "a-b-c"), "axbxc")

  it('regex.search test 53', async () => {
    // Python: # Hg issue 100: strange results from regex.searchself.assertEqual(regex.search("^([^z]*(?:WWWi|W))?$", "WWWi").groups(), ("WWWi",)
    expect(await re.search("^([^z]*(?:WWWi|W))?$", "WWWi")?.groups()).toStrictEqual(("WWWi",);
  });

  it('regex.search test 54', async () => {
    // Python: self.assertEqual(regex.search("^([^z]*(?:WWWi|w))?$", "WWWi").groups(), ("WWWi",)
    expect(await re.search("^([^z]*(?:WWWi|w))?$", "WWWi")?.groups()).toStrictEqual(("WWWi",);
  });

  it('regex.search test 55', async () => {
    // Python: self.assertEqual(regex.search("^([^z]*?(?:WWWi|W))?$", "WWWi").groups(), ("WWWi",)
    expect(await re.search("^([^z]*?(?:WWWi|W))?$", "WWWi")?.groups()).toStrictEqual(("WWWi",);
  });

  it('regex.sub test 56', async () => {
    // Python: if sys.version_info >= (3, 7, 0):self.assertEqual(regex.sub("(?V0).*", "x", "test"), "xx")
    expect(await re.sub("(?V0).*", "x", "test")).toBe("xx");
  });

  it('regex.sub test 57', async () => {
    // Python: else:self.assertEqual(regex.sub("(?V0).*", "x", "test"), "x")
    expect(await re.sub("(?V0).*", "x", "test")).toBe("x");
  });

  it('regex.sub test 58', async () => {
    // Python: self.assertEqual(regex.sub("(?V1).*", "x", "test"), "xx")
    expect(await re.sub("(?V1).*", "x", "test")).toBe("xx");
  });

  it('regex.sub test 59', async () => {
    // Python: if sys.version_info >= (3, 7, 0):self.assertEqual(regex.sub("(?V0).*?", "|", "test"), "|||||||||")
    expect(await re.sub("(?V0).*?", "|", "test")).toBe("|||||||||");
  });

  it('regex.sub test 60', async () => {
    // Python: else:self.assertEqual(regex.sub("(?V0).*?", "|", "test"), "|t|e|s|t|")
    expect(await re.sub("(?V0).*?", "|", "test")).toBe("|t|e|s|t|");
  });

  it('regex.sub test 61', async () => {
    // Python: self.assertEqual(regex.sub("(?V1).*?", "|", "test"), "|||||||||")
    expect(await re.sub("(?V1).*?", "|", "test")).toBe("|||||||||");
  });

  it('regex.sub test 62', async () => {
    // Python: # Hg issue 112: re: OK, but regex: SystemErrorself.assertEqual(regex.sub(r"^(@)\n(?!.*?@)(.*)", r"\1\n==========\n\2", "@\n", flags=regex.DOTALL),"@\n==========\n",)
    expect(await re.sub("^(@)\\n(?!.*?@)(.*)", "\\1\\n==========\\n\\2", "@\\n")).toBe("@\n==========\n",);
  });

  it('regex.findall test 63', async () => {
    // Python: # Hg issue 115: Infinite loop when processing backreferencesself.assertEqual(regex.findall(r"\bof ([a-z]+) of \1\", "To make use of one of these modules"),[],)
    expect(await re.findall("\\bof ([a-z]+) of \\1\\", "To make use of one of these modules")).toStrictEqual([],);
  });

  it('regex.sub test 64', async () => {
    // Python: # Hg issue 125: Reference to entire match (\g&lt;0&gt;) in# Pattern.sub() doesn't work as of 2014.09.22 release.self.assertEqual(regex.sub(r"x", r"\g<0>", "x"), "x")
    expect(await re.sub("x", "\\g<0>", "x")).toBe("x");
  });

  it('regex.findall test 65', async () => {
    // Python: # Hg issue 131: nested sets behaviourself.assertEqual(regex.findall(r"(?V1)[[b-e]--cd]", "abcdef"), ["", "e"])
    expect(await re.findall("(?V1)[[b-e]--cd]", "abcdef")).toStrictEqual(["", "e"]);
  });

  it('regex.findall test 66', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)[b-e--cd]", "abcdef"), ["", "e"])
    expect(await re.findall("(?V1)[b-e--cd]", "abcdef")).toStrictEqual(["", "e"]);
  });

  it('regex.findall test 67', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)[[bcde]--cd]", "abcdef"), ["", "e"])
    expect(await re.findall("(?V1)[[bcde]--cd]", "abcdef")).toStrictEqual(["", "e"]);
  });

  it('regex.findall test 68', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)[bcde--cd]", "abcdef"), ["", "e"])
    expect(await re.findall("(?V1)[bcde--cd]", "abcdef")).toStrictEqual(["", "e"]);
  });

  it('regex.match test 69', async () => {
    // Python: # Issue 23692.self.assertEqual(regex.match("(?:()|(?(1)()|z)){2}(?(2)a|z)", "a").group(0, 1, 2),("a", "", ""),)
    expect(await re.match("(?:()|(?(1)()|z)){2}(?(2)a|z)", "a")?.group(0, 1, 2)).toStrictEqual(("a", "", "");
  });

  it('regex.match test 70', async () => {
    // Python: self.assertEqual(regex.match("(?:()|(?(1)()|z)){0,2}(?(2)a|z)", "a").group(0, 1, 2),("a", "", ""),)
    expect(await re.match("(?:()|(?(1)()|z)){0, 2}(?(2)a|z)")?.group(0, 1, 2)).toStrictEqual(("a", "", "");
  });

  it('regex.search test 71', async () => {
    // Python: # Hg issue 139: Regular expression with multiple wildcards where first# should match empty string does not always work.self.assertEqual(regex.search("([^L]*)([^R]*R)", "LtR").groups(), ("", "LtR"))
    expect(await re.search("([^L]*)([^R]*R)", "LtR")?.groups()).toStrictEqual(("", "LtR");
  });

  it('regex.sub test 72', async () => {
    // Python: # Hg issue 140: Replace with REVERSE and groups has unexpected# behavior.self.assertEqual(regex.sub(r"(.)", r"x\1y", "a"), "xayxby")
    expect(await re.sub("(.)", "x\\1y", "a")).toBe("xayxby");
  });

  it('regex.sub test 73', async () => {
    // Python: self.assertEqual(regex.sub(r"(?r)(.)", r"x\1y", "a"), "xayxby")
    expect(await re.sub("(?r)(.)", "x\\1y", "a")).toBe("xayxby");
  });

  it('regex.search test 74', async () => {
    // Python: # Hg issue 143: Partial matches have incorrect span if prefix is '.'# wildcard.self.assertEqual(regex.search("OXRG", "OOGOX", partial=True).span(), (3, 5))
    expect(await re.search("OXRG", "OOGOX")?.span()).toStrictEqual((3, 5);
  });

  it('regex.search test 75', async () => {
    // Python: self.assertEqual(regex.search(".XRG", "OOGOX", partial=True).span(), (3, 5))
    expect(await re.search(".XRG", "OOGOX")?.span()).toStrictEqual((3, 5);
  });

  it('regex.search test 76', async () => {
    // Python: self.assertEqual(regex.search(".{1,3}XRG", "OOGOX", partial=True).span(), (1, 5)
    expect(await re.search(".{1, 3}XRG")?.span()).toStrictEqual((1, 5);
  });

  it('regex.match test 77', async () => {
    // Python: # Hg issue 144: Latest version problem with matching 'R|R'.self.assertEqual(regex.match("R|R", "R").span(), (0, 1))
    expect(await re.match("R|R", "R")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 78', async () => {
    // Python: # Hg issue 146: Forced-fail (?!) works improperly in conditional.self.assertEqual(regex.match(r"(.)(?(1)(?!))", "xy"), null)
    expect(await re.match("(.)(?(1)(?!))", "xy")).toStrictEqual(null);
  });

  it('regex.findall test 79', async () => {
    // Python: # Groups cleared after failure.self.assertEqual(regex.findall(r"(y)?(\d)(?(1)\b\B)", "ax1y2z3"),[("", "1"), ("", "2"), ("", "3")],)
    expect(await re.findall("(y)?(\\d)(?(1)\\b\\B)", "ax1y2z3")).toStrictEqual([("", "1");
  });

  it('regex.findall test 80', async () => {
    // Python: self.assertEqual(regex.findall(r"(y)?+(\d)(?(1)\b\B)", "ax1y2z3"),[("", "1"), ("", "2"), ("", "3")],)
    expect(await re.findall("(y)?+(\\d)(?(1)\\b\\B)", "ax1y2z3")).toStrictEqual([("", "1");
  });

  it('regex.search test 81', async () => {
    // Python: # Hg issue 151: Request: \K.self.assertEqual(regex.search(r"(ab\Kcd)", "abcd").group(0, 1), ("cd", "abcd"))
    expect(await re.search("(ab\\Kcd)", "abcd")?.group(0, 1)).toStrictEqual(("cd", "abcd");
  });

  it('regex.findall test 82', async () => {
    // Python: self.assertEqual(regex.findall(r"\w\w\K\w\w", "abcdefgh"), ["cd", "gh"])
    expect(await re.findall("\\w\\w\\K\\w\\w", "abcdefgh")).toStrictEqual(["cd", "gh"]);
  });

  it('regex.findall test 83', async () => {
    // Python: self.assertEqual(regex.findall(r"(\w\w\K\w\w)", "abcdefgh"), ["abcd", "efgh"])
    expect(await re.findall("(\\w\\w\\K\\w\\w)", "abcdefgh")).toStrictEqual(["abcd", "efgh"]);
  });

  it('regex.search test 84', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)(ab\Kcd)", "abcd").group(0, 1), ("a", "abcd")
    expect(await re.search("(?r)(ab\\Kcd)", "abcd")?.group(0, 1)).toStrictEqual(("a", "abcd");
  });

  it('regex.findall test 85', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\w\w\K\w\w", "abcdefgh"), ["ef", "a"])
    expect(await re.findall("(?r)\\w\\w\\K\\w\\w", "abcdefgh")).toStrictEqual(["ef", "a"]);
  });

  it('regex.findall test 86', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)(\w\w\K\w\w)", "abcdefgh"), ["efgh", "abcd"])
    expect(await re.findall("(?r)(\\w\\w\\K\\w\\w)", "abcdefgh")).toStrictEqual(["efgh", "abcd"]);
  });

  it('regex.search test 87', async () => {
    // Python: self.assertEqual(regex.search(r"(?&routine)(?(DEFINE)(?<routine>.))", "a").group("routine"),null,)
    expect(await re.search("(?&routine)(?(DEFINE)(?<routine>.))", "a")?.group("routine")).toStrictEqual(null,);
  });

  it('regex.search test 88', async () => {
    // Python: self.assertEqual(regex.search(r"(?&routine)(?(DEFINE)(?<routine>.))", "a").captures("routine"),["a"],)
    expect(await re.search("(?&routine)(?(DEFINE)(?<routine>.))", "a")?.captures("routine")).toStrictEqual(["a"],);
  });

  it('regex.search test 89', async () => {
    // Python: self.assertEqual(regex.search(r"\d+(*PRUNE)\d", "123"), null)
    expect(await re.search("\\d+(*PRUNE)\\d", "123")).toStrictEqual(null);
  });

  it('regex.search test 90', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)\d(*PRUNE)\d+", "123"), null)
    expect(await re.search("(?r)\\d(*PRUNE)\\d+", "123")).toStrictEqual(null);
  });

  it('regex.match test 91', async () => {
    // Python: # Hg issue 156: regression on atomic groupingself.assertEqual(regex.match("1(?>2)", "12").span(), (0, 2))
    expect(await re.match("1(?>2)", "12")?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 92', async () => {
    // Python: # Hg issue 161: Unexpected fuzzy match resultsself.assertEqual(regex.search("(abcdefgh){e}", "******abcdefghijklmnopqrtuvwxyz", regex.BESTMATCH).span(),(6, 14),)
    expect(await re.search("(abcdefgh){e}", "******abcdefghijklmnopqrtuvwxyz")?.span()).toStrictEqual((6, 14);
  });

  it('regex.search test 93', async () => {
    // Python: self.assertEqual(regex.search("(abcdefghi){e}", "******abcdefghijklmnopqrtuvwxyz", regex.BESTMATCH).span(),(6, 15),)
    expect(await re.search("(abcdefghi){e}", "******abcdefghijklmnopqrtuvwxyz")?.span()).toStrictEqual((6, 15);
  });

  it('regex.match test 94', async () => {
    // Python: # Hg issue 163: allow lookarounds in conditionals.self.assertEqual(regex.match(r"(?:(?=\d)\d+\b|\w+)", "123abc").span(), (0, 6))
    expect(await re.match("(?:(?=\\d)\\d+\\b|\\w+)", "123abc")?.span()).toStrictEqual((0, 6);
  });

  it('regex.match test 95', async () => {
    // Python: self.assertEqual(regex.match(r"(?(?=\d)\d+\b|\w+)", "123abc"), null)
    expect(await re.match("(?(?=\\d)\\d+\\b|\\w+)", "123abc")).toStrictEqual(null);
  });

  it('regex.search test 96', async () => {
    // Python: self.assertEqual(regex.search(r"(?(?<=love\s)you|(?<=hate\s)her)", "I love you").span(),(7, 10),)
    expect(await re.search("(?(?<=love\\s)you|(?<=hate\\s)her)", "I love you")?.span()).toStrictEqual((7, 10);
  });

  it('regex.findall test 97', async () => {
    // Python: self.assertEqual(regex.findall(r"(?(?<=love\s)you|(?<=hate\s)her)","I love you but I don't hate her either",),["you", "her"],)
    expect(await re.findall("(?(?<=love\\s)you|(?<=hate\\s)her)", "I love you but I don't hate her either")).toStrictEqual(["you", "her"],);
  });

  it('regex.search test 98', async () => {
    // Python: # Hg issue 180: bug of POSIX matching.self.assertEqual(regex.search(r"(?p)a*(.*?)", "aaabb").group(0, 1), ("aaabb", "bb")
    expect(await re.search("(?p)a*(.*?)", "aaabb")?.group(0, 1)).toStrictEqual(("aaabb", "bb");
  });

  it('regex.search test 99', async () => {
    // Python: self.assertEqual(regex.search(r"(?p)a*(.*)", "aaabb").group(0, 1), ("aaabb", "bb")
    expect(await re.search("(?p)a*(.*)", "aaabb")?.group(0, 1)).toStrictEqual(("aaabb", "bb");
  });

  it('regex.sub test 100', async () => {
    // Python: self.assertEqual(regex.sub(r"(?p)a*(.*?)", r"\1", "aaabb"), "bb")
    expect(await re.sub("(?p)a*(.*?)", "\\1", "aaabb")).toBe("bb");
  });

  it('regex.sub test 101', async () => {
    // Python: self.assertEqual(regex.sub(r"(?p)a*(.*)", r"\1", "aaabb"), "bb")
    expect(await re.sub("(?p)a*(.*)", "\\1", "aaabb")).toBe("bb");
  });

  it('regex.match test 102', async () => {
    // Python: # Hg issue 192: Named lists reverse matching doesn't work with# IGNORECASE and V1self.assertEqual(regex.match(r"(?irV0)\L<kw>", "21", kw=["1"]).span(), (1, 2))
    expect(await re.match("(?irV0)\\L<kw>", "21")?.span()).toStrictEqual((1, 2);
  });

  it('regex.match test 103', async () => {
    // Python: self.assertEqual(regex.match(r"(?irV1)\L<kw>", "21", kw=["1"]).span(), (1, 2))
    expect(await re.match("(?irV1)\\L<kw>", "21")?.span()).toStrictEqual((1, 2);
  });

  it('regex.search test 104', async () => {
    // Python: # Hg issue 193: Alternation and .REVERSE flag.self.assertEqual(regex.search("a|", "111a222").span(), (3, 4))
    expect(await re.search("a|", "111a222")?.span()).toStrictEqual((3, 4);
  });

  it('regex.search test 105', async () => {
    // Python: self.assertEqual(regex.search("(?r)a|", "111a222").span(), (3, 4))
    expect(await re.search("(?r)a|", "111a222")?.span()).toStrictEqual((3, 4);
  });

  it('regex.search test 106', async () => {
    // Python: # Hg issue 194: .FULLCASE and Backreferenceself.assertEqual(regex.search(r"(?if)<(CLI)><\1>", "<cli><cli>").span(), (0, 10)
    expect(await re.search("(?if)<(CLI)><\\1>", "<cli><cli>")?.span()).toStrictEqual((0, 10);
  });

  it('regex.search test 107', async () => {
    // Python: self.assertEqual(regex.search(r"(?if)<(CLI)><\1>", "<cli><clI>").span(), (0, 10)
    expect(await re.search("(?if)<(CLI)><\\1>", "<cli><clI>")?.span()).toStrictEqual((0, 10);
  });

  it('regex.search test 108', async () => {
    // Python: self.assertEqual(regex.search(r"(?ifr)<\1><(CLI)>", "<cli><clI>").span(), (0, 10)
    expect(await re.search("(?ifr)<\\1><(CLI)>", "<cli><clI>")?.span()).toStrictEqual((0, 10);
  });

  it('regex.match test 109', async () => {
    // Python: # Hg issue 196: Fuzzy matching on repeated regex not working as# expectedself.assertEqual(regex.match("(x{6}){e<=1}", "xxxxxx", flags=regex.BESTMATCH).span(), (0, 6)
    expect(await re.match("(x{6}){e<=1}", "xxxxxx")?.span()).toStrictEqual((0, 6);
  });

  it('regex.match test 110', async () => {
    // Python: self.assertEqual(regex.match("(x{6}){e<=1}", "xxxxx", flags=regex.BESTMATCH).span(), (0, 5)
    expect(await re.match("(x{6}){e<=1}", "xxxxx")?.span()).toStrictEqual((0, 5);
  });

  it('regex.match test 111', async () => {
    // Python: self.assertEqual(regex.match("(x{6}){e<=1}", "x", flags=regex.BESTMATCH), null)
    expect(await re.match("(x{6}){e<=1}", "x")).toStrictEqual(null);
  });

  it('regex.match test 112', async () => {
    // Python: self.assertEqual(regex.match("(?r)(x{6}){e<=1}", "xxxxxx", flags=regex.BESTMATCH).span(),(0, 6),)
    expect(await re.match("(?r)(x{6}){e<=1}", "xxxxxx")?.span()).toStrictEqual((0, 6);
  });

  it('regex.match test 113', async () => {
    // Python: self.assertEqual(regex.match("(?r)(x{6}){e<=1}", "xxxxx", flags=regex.BESTMATCH).span(),(0, 5),)
    expect(await re.match("(?r)(x{6}){e<=1}", "xxxxx")?.span()).toStrictEqual((0, 5);
  });

  it('regex.match test 114', async () => {
    // Python: self.assertEqual(regex.match("(?r)(x{6}){e<=1}", "x", flags=regex.BESTMATCH), null)
    expect(await re.match("(?r)(x{6}){e<=1}", "x")).toStrictEqual(null);
  });

  it('regex.findall test 115', async () => {
    // Python: # Hg issue 201: ENHANCEMATCH crashes interpreterself.assertEqual(regex.findall(r"((brown)|(lazy)){1<=e<=3} ((dog)|(fox)){1<=e<=3}","The quick borwn fax jumped over the lzy hog",regex.ENHANCEMATCH,),[("borwn", "borwn", "", "fax", "", "fax"),("lzy", "", "lzy", "hog", "hog", ""),],)
    expect(await re.findall("((brown)|(lazy)){1<=e<=3} ((dog)|(fox)){1<=e<=3}", "The quick borwn fax jumped over the lzy hog")).toStrictEqual([("borwn", "borwn", "", "fax", "", "fax");
  });

  it('regex.search test 116', async () => {
    // Python: # Hg issue 203: partial matching bugself.assertEqual(regex.search(r"\d\d\d-\d\d-\d\d\d\d","My SSN is 999-89-76, but don't tell.",partial=True,).span(),(36, 36),)
    expect(await re.search("\\d\\d\\d-\\d\\d-\\d\\d\\d\\d", "My SSN is 999-89-76)?.span()).toStrictEqual((36, 36);
  });

  it('regex.search test 117', async () => {
    // Python: # Hg issue 208: Named list, (?ri) flags, Backreferenceself.assertEqual(regex.search(r"(?r)\1dog..(?<=(\L<aa>))$", "ccdogcc", aa=["bc", "cc"]).span(),(0, 7),)
    expect(await re.search("(?r)\\1dog..(?<=(\\L<aa>))$", "ccdogcc")?.span()).toStrictEqual((0, 7);
  });

  it('regex.search test 118', async () => {
    // Python: self.assertEqual(regex.search(r"(?ir)\1dog..(?<=(\L<aa>))$", "ccdogcc", aa=["bc", "cc"]).span(),(0, 7),)
    expect(await re.search("(?ir)\\1dog..(?<=(\\L<aa>))$", "ccdogcc")?.span()).toStrictEqual((0, 7);
  });

  it('regex.search test 119', async () => {
    // Python: # Hg issue 210: Fuzzy matching and Backreferenceself.assertEqual(regex.search(r"(2)(?:\1{5}){e<=1}", "3222212").span(), (1, 7))
    expect(await re.search("(2)(?:\\1{5}){e<=1}", "3222212")?.span()).toStrictEqual((1, 7);
  });

  it('regex.search test 120', async () => {
    // Python: self.assertEqual(regex.search(r"(\d)(?:\1{5}){e<=1}", "3222212").span(), (1, 7))
    expect(await re.search("(\\d)(?:\\1{5}){e<=1}", "3222212")?.span()).toStrictEqual((1, 7);
  });

  it('regex.match test 121', async () => {
    // Python: # Hg issue 211: Segmentation fault with recursive matches and atomic# groupsself.assertEqual(regex.match(r"""\A(?P<whole>(?>\((?&whole)\)|[+\-]))\Z""", "((-))").span(),(0, 5),)
    expect(await re.match("""\\A(?P<whole>(?>\\((?&whole)\\)|[+\\-]))\\Z""", "((-))")?.span()).toStrictEqual((0, 5);
  });

  it('regex.match test 122', async () => {
    // Python: self.assertEqual(regex.match(r"""\A(?P<whole>(?>\((?&whole)\)|[+\-]))\Z""", "((-)+)"), null)
    expect(await re.match("""\\A(?P<whole>(?>\\((?&whole)\\)|[+\\-]))\\Z""", "((-)+)")).toStrictEqual(null);
  });

  it('regex.match test 123', async () => {
    // Python: # Hg issue 212: Unexpected matching difference with .*? between re and# regexself.assertEqual(regex.match(r"x.*? (.).*\1(.*)\1", "x  |y| z|").span(), (0, 9))
    expect(await re.match("x.*? (.).*\\1(.*)\\1", "x  |y| z|")?.span()).toStrictEqual((0, 9);
  });

  it('regex.match test 124', async () => {
    // Python: self.assertEqual(regex.match(r"\.sr (.*?) (.)(.*)\2(.*)\2(.*)",r'.sr  h |<nw>|<span class="locked">|',).span(),(0, 35),)
    expect(await re.match("\\.sr (.*?) (.)(.*)\\2(.*)\\2(.*)", ".sr  h |<nw>|<span class="locked">|")?.span()).toStrictEqual((0, 35);
  });

  it('regex.match test 125', async () => {
    // Python: # Hg issue 220: Misbehavior of group capture with OR operandself.assertEqual(regex.match(r"\w*(ea)\w*|\w*e(?!a)\w*", "easier").groups(), ("ea",)
    expect(await re.match("\\w*(ea)\\w*|\\w*e(?!a)\\w*", "easier")?.groups()).toStrictEqual(("ea",);
  });

  it('regex.search test 126', async () => {
    // Python: # Hg issue 225: BESTMATCH in fuzzy match not workingself.assertEqual(regex.search("(^1234$){i,d}", "12234", regex.BESTMATCH).span(), (0, 5)
    expect(await re.search("(^1234$){i, d}")?.span()).toStrictEqual((0, 5);
  });

  it('regex.search test 127', async () => {
    // Python: self.assertEqual(regex.search("(^1234$){s,i,d}", "12234", regex.BESTMATCH).span(), (0, 5)
    expect(await re.search("(^1234$){s, i)?.span()).toStrictEqual((0, 5);
  });

  it('regex.search test 128', async () => {
    // Python: # Hg issue 226: Error matching at start of stringself.assertEqual(regex.search("(^123$){s,i,d}", "xxxxxxxx123", regex.BESTMATCH).span(),(0, 11),)
    expect(await re.search("(^123$){s, i)?.span()).toStrictEqual((0, 11);
  });

  it('regex.search test 129', async () => {
    // Python: # Hg issue 227: Incorrect behavior for ? operator with UNICODE +# IGNORECASEself.assertEqual(regex.search(r"a?yz", "xxxxyz", flags=regex.FULLCASE | regex.IGNORECASE).span(),(4, 6),)
    expect(await re.search("a?yz", "xxxxyz")?.span()).toStrictEqual((4, 6);
  });

  it('regex.findall test 130', async () => {
    // Python: self.assertEqual(regex.findall(r"(?:(?![a-d]).)+", "abcdefgh"), ["efgh"])
    expect(await re.findall("(?:(?![a-d]).)+", "abcdefgh")).toStrictEqual(["efgh"]);
  });

  it('regex.findall test 131', async () => {
    // Python: self.assertEqual(regex.findall(r"""(?(DEFINE)(?P<mydef>(?:(?![a-d]).)))(?&mydef)+""", "abcdefgh"),["efgh"],)
    expect(await re.findall("""(?(DEFINE)(?P<mydef>(?:(?![a-d]).)))(?&mydef)+""", "abcdefgh")).toStrictEqual(["efgh"],);
  });

  it('regex.findall test 132', async () => {
    // Python: # Hg issue 238: Not fully re backward compatibleself.assertEqual(regex.findall(r"((\w{1,3})(\.{2,10})){1,3}",'"Erm....yes. T..T...Thank you for that."',),[("Erm....", "Erm", "...."), ("T...", "T", "...")],)
    expect(await re.findall("((\\w{1, 3})(\\.{2)).toStrictEqual([("Erm....", "Erm", "....");
  });

  it('regex.findall test 133', async () => {
    // Python: self.assertEqual(regex.findall(r"((\w{1,3})(\.{2,10})){3}", '"Erm....yes. T..T...Thank you for that."'),[],)
    expect(await re.findall("((\\w{1, 3})(\\.{2)).toStrictEqual([],);
  });

  it('regex.findall test 134', async () => {
    // Python: self.assertEqual(regex.findall(r"((\w{1,3})(\.{2,10})){2}", '"Erm....yes. T..T...Thank you for that."'),[("T...", "T", "...")],)
    expect(await re.findall("((\\w{1, 3})(\\.{2)).toStrictEqual([("T...", "T", "...");
  });

  it('regex.findall test 135', async () => {
    // Python: self.assertEqual(regex.findall(r"((\w{1,3})(\.{2,10})){1}", '"Erm....yes. T..T...Thank you for that."'),[("Erm....", "Erm", "...."), ("T..", "T", ".."), ("T...", "T", "...")],)
    expect(await re.findall("((\\w{1, 3})(\\.{2)).toStrictEqual([("Erm....", "Erm", "....");
  });

  it('regex.search test 136', async () => {
    // Python: # Hg issue 247: Unexpected result with fuzzy matching and lookahead# expressionself.assertEqual(regex.search(r"(?:ESTONIA(?!\w)){e<=1}", "ESTONIAN WORKERS").group(),"ESTONIAN",)
    expect(await re.search("(?:ESTONIA(?!\\w)){e<=1}", "ESTONIAN WORKERS")?.group()).toStrictEqual("ESTONIAN",);
  });

  it('regex.search test 137', async () => {
    // Python: self.assertEqual(regex.search(r"(?:ESTONIA(?=\W)){e<=1}", "ESTONIAN WORKERS").group(),"ESTONIAN",)
    expect(await re.search("(?:ESTONIA(?=\\W)){e<=1}", "ESTONIAN WORKERS")?.group()).toStrictEqual("ESTONIAN",);
  });

  it('regex.search test 138', async () => {
    // Python: self.assertEqual(regex.search(r"(?:(?<!\w)ESTONIA){e<=1}", "BLUB NESTONIA").group(),"NESTONIA",)
    expect(await re.search("(?:(?<!\\w)ESTONIA){e<=1}", "BLUB NESTONIA")?.group()).toStrictEqual("NESTONIA",);
  });

  it('regex.search test 139', async () => {
    // Python: self.assertEqual(regex.search(r"(?:(?<=\W)ESTONIA){e<=1}", "BLUB NESTONIA").group(),"NESTONIA",)
    expect(await re.search("(?:(?<=\\W)ESTONIA){e<=1}", "BLUB NESTONIA")?.group()).toStrictEqual("NESTONIA",);
  });

  it('regex.search test 140', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)(?:ESTONIA(?!\w)){e<=1}", "ESTONIAN WORKERS").group(),"ESTONIAN",)
    expect(await re.search("(?r)(?:ESTONIA(?!\\w)){e<=1}", "ESTONIAN WORKERS")?.group()).toStrictEqual("ESTONIAN",);
  });

  it('regex.search test 141', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)(?:ESTONIA(?=\W)){e<=1}", "ESTONIAN WORKERS").group(),"ESTONIAN",)
    expect(await re.search("(?r)(?:ESTONIA(?=\\W)){e<=1}", "ESTONIAN WORKERS")?.group()).toStrictEqual("ESTONIAN",);
  });

  it('regex.search test 142', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)(?:(?<!\w)ESTONIA){e<=1}", "BLUB NESTONIA").group(),"NESTONIA",)
    expect(await re.search("(?r)(?:(?<!\\w)ESTONIA){e<=1}", "BLUB NESTONIA")?.group()).toStrictEqual("NESTONIA",);
  });

  it('regex.search test 143', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)(?:(?<=\W)ESTONIA){e<=1}", "BLUB NESTONIA").group(),"NESTONIA",)
    expect(await re.search("(?r)(?:(?<=\\W)ESTONIA){e<=1}", "BLUB NESTONIA")?.group()).toStrictEqual("NESTONIA",);
  });

  it('regex.search test 144', async () => {
    // Python: # Hg issue 248: Unexpected result with fuzzy matching and more than one# non-greedy quantifierself.assertEqual(regex.search(r"(?:A.*B.*CDE){e<=2}", "A B CYZ").group(), "A B CYZ")
    expect(await re.search("(?:A.*B.*CDE){e<=2}", "A B CYZ")?.group()).toStrictEqual("A B CYZ");
  });

  it('regex.search test 145', async () => {
    // Python: self.assertEqual(regex.search(r"(?:A.*B.*?CDE){e<=2}", "A B CYZ").group(), "A B CYZ")
    expect(await re.search("(?:A.*B.*?CDE){e<=2}", "A B CYZ")?.group()).toStrictEqual("A B CYZ");
  });

  it('regex.search test 146', async () => {
    // Python: self.assertEqual(regex.search(r"(?:A.*?B.*CDE){e<=2}", "A B CYZ").group(), "A B CYZ")
    expect(await re.search("(?:A.*?B.*CDE){e<=2}", "A B CYZ")?.group()).toStrictEqual("A B CYZ");
  });

  it('regex.search test 147', async () => {
    // Python: self.assertEqual(regex.search(r"(?:A.*?B.*?CDE){e<=2}", "A B CYZ").group(), "A B CYZ")
    expect(await re.search("(?:A.*?B.*?CDE){e<=2}", "A B CYZ")?.group()).toStrictEqual("A B CYZ");
  });

  it('regex.search test 148', async () => {
    // Python: # Hg issue 251: Segfault with a particular expressionself.assertEqual(regex.search(r"(?(?=A)A|B)", "A").span(), (0, 1))
    expect(await re.search("(?(?=A)A|B)", "A")?.span()).toStrictEqual((0, 1);
  });

  it('regex.search test 149', async () => {
    // Python: self.assertEqual(regex.search(r"(?(?=A)A|B)", "B").span(), (0, 1))
    expect(await re.search("(?(?=A)A|B)", "B")?.span()).toStrictEqual((0, 1);
  });

  it('regex.search test 150', async () => {
    // Python: self.assertEqual(regex.search(r"(?(?=A)A|)", "B").span(), (0, 0))
    expect(await re.search("(?(?=A)A|)", "B")?.span()).toStrictEqual((0, 0);
  });

  it('regex.search test 151', async () => {
    // Python: self.assertEqual(regex.search(r"(?(?=X)X|)", "").span(), (0, 0))
    expect(await re.search("(?(?=X)X|)", "")?.span()).toStrictEqual((0, 0);
  });

  it('regex.search test 152', async () => {
    // Python: self.assertEqual(regex.search(r"(?(?=X))", "").span(), (0, 0))
    expect(await re.search("(?(?=X))", "")?.span()).toStrictEqual((0, 0);
  });

  it('regex.search test 153', async () => {
    // Python: # Hg issue 252: Empty capture strings when using DEFINE group reference# within look-behind expressionself.assertEqual(regex.search(r"(?(DEFINE)(?<func>.))(?&func)", "abc").groups(), (null,)
    expect(await re.search("(?(DEFINE)(?<func>.))(?&func)", "abc")?.groups()).toStrictEqual((null,);
  });

  it('regex.search test 154', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.))(?&func)", "abc").groupdict(),{"func": null},)
    expect(await re.search("(?(DEFINE)(?<func>.))(?&func)", "abc")?.groupdict()).toStrictEqual({"func": null},);
  });

  it('regex.search test 155', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.))(?&func)", "abc").capturesdict(),{"func": ["a"]},)
    expect(await re.search("(?(DEFINE)(?<func>.))(?&func)", "abc")?.capturesdict()).toStrictEqual({"func": ["a"]},);
  });

  it('regex.search test 156', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groups(),(null,),)
    expect(await re.search("(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc")?.groups()).toStrictEqual((null,);
  });

  it('regex.search test 157', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groupdict(),{"func": null},)
    expect(await re.search("(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc")?.groupdict()).toStrictEqual({"func": null},);
  });

  it('regex.search test 158', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").capturesdict(),{"func": ["a"]},)
    expect(await re.search("(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc")?.capturesdict()).toStrictEqual({"func": ["a"]},);
  });

  it('regex.search test 159', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groups(),(null,),)
    expect(await re.search("(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc")?.groups()).toStrictEqual((null,);
  });

  it('regex.search test 160', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groupdict(),{"func": null},)
    expect(await re.search("(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc")?.groupdict()).toStrictEqual({"func": null},);
  });

  it('regex.search test 161', async () => {
    // Python: self.assertEqual(regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").capturesdict(),{"func": ["a"]},)
    expect(await re.search("(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc")?.capturesdict()).toStrictEqual({"func": ["a"]},);
  });

  it('regex.search test 162', async () => {
    // Python: # Hg issue 276: Partial Matches yield incorrect matches and boundsself.assertEqual(regex.search(r"[a-z]+ [a-z]*?:", "foo bar", partial=True).span(), (0, 7)
    expect(await re.search("[a-z]+ [a-z]*?:", "foo bar")?.span()).toStrictEqual((0, 7);
  });

  it('regex.search test 163', async () => {
    // Python: self.assertEqual(regex.search(r"(?r):[a-z]*? [a-z]+", "foo bar", partial=True).span(), (0, 7)
    expect(await re.search("(?r):[a-z]*? [a-z]+", "foo bar")?.span()).toStrictEqual((0, 7);
  });

  it('regex.findall test 164', async () => {
    // Python: # Hg issue 312: \X not matching graphemes with zero-width-joinsself.assertEqual(regex.findall(r"\X", "\U0001f468\u200d\U0001f469\u200d\U0001f467\u200d\U0001f466"),["\U0001f468\u200d\U0001f469\u200d\U0001f467\u200d\U0001f466"],)
    expect(await re.findall("\\X", "\\U0001f468\\u200d\\U0001f469\\u200d\\U0001f467\\u200d\\U0001f466")).toStrictEqual(["\U0001f468\u200d\U0001f469\u200d\U0001f467\u200d\U0001f466"],);
  });

  it('regex.search test 165', async () => {
    // Python: # Hg issue 329: Wrong group matches when question mark quantifier is used within a look behindself.assertEqual(regex.search(r"""(?(DEFINE)(?<mydef>(?<wrong>THIS_SHOULD_NOT_MATCHx?)|(?<right>right))).*(?<=(?&mydef).*)""","x right",).capturesdict(),{"mydef": ["right"], "wrong": [], "right": ["right"]},)
    expect(await re.search("""(?(DEFINE)(?<mydef>(?<wrong>THIS_SHOULD_NOT_MATCHx?)|(?<right>right))).*(?<=(?&mydef).*)""", "x right")?.capturesdict()).toStrictEqual({"mydef": ["right"], "wrong": [], "right": ["right"]},);
  });

  it('regex.search test 166', async () => {
    // Python: # Git issue 371: Specifying character set when fuzzy-matching allows characters not in the setself.assertEqual(regex.search(r"\b(?e)(?:\d{6,20}){i<=5:[\-\\\/]}\","cat dog starting at 00:01132.000. hello world",),null,)
    expect(await re.search("\\b(?e)(?:\\d{6, 20}){i<=5:[\\-\\\\\\/]}\\")).toStrictEqual(null,);
  });

  it('regex.findall test 167', async () => {
    // Python: # Git issue 394: Unexpected behaviour in fuzzy matching with limited character set with IGNORECASE flagself.assertEqual(regex.findall(r"(\d+){i<=2:[ab]}", "123X4Y5"), ["123", "4", "5"])
    expect(await re.findall("(\\d+){i<=2:[ab]}", "123X4Y5")).toStrictEqual(["123", "4", "5"]);
  });

  it('regex.findall test 168', async () => {
    // Python: self.assertEqual(regex.findall(r"(?i)(\d+){i<=2:[ab]}", "123X4Y5"), ["123", "4", "5"])
    expect(await re.findall("(?i)(\\d+){i<=2:[ab]}", "123X4Y5")).toStrictEqual(["123", "4", "5"]);
  });

  it('regex.match test 169', async () => {
    // Python: # Git issue 415: Fuzzy character restrictions don't apply to insertions at "right edge"self.assertEqual(regex.match(r"t(?:es){s<=1:\d}t", "te5t").group(), "te5t")
    expect(await re.match("t(?:es){s<=1:\\d}t", "te5t")?.group()).toStrictEqual("te5t");
  });

  it('regex.match test 170', async () => {
    // Python: self.assertEqual(regex.match(r"t(?:es){s<=1:\d}t", "tezt"), null)
    expect(await re.match("t(?:es){s<=1:\\d}t", "tezt")).toStrictEqual(null);
  });

  it('regex.match test 171', async () => {
    // Python: self.assertEqual(regex.match(r"t(?:es){i<=1:\d}t", "tes5t").group(), "tes5t")
    expect(await re.match("t(?:es){i<=1:\\d}t", "tes5t")?.group()).toStrictEqual("tes5t");
  });

  it('regex.match test 172', async () => {
    // Python: self.assertEqual(regex.match(r"t(?:es){i<=1:\d}t", "teszt"), null)
    expect(await re.match("t(?:es){i<=1:\\d}t", "teszt")).toStrictEqual(null);
  });

  it('regex.match test 173', async () => {
    // Python: self.assertEqual(regex.match(r"t(es){i<=1,0<e<=1}t", "tes5t").group(), "tes5t")
    expect(await re.match("t(es){i<=1, 0<e<=1}t")?.group()).toStrictEqual("tes5t");
  });
// Skipped test 174: incomplete arguments in Python: # Git issue 421: Fatal Python error: Segmentation faultself.assertEqual(regex.compile(r"(\d+ week|\d+ days)").split("7 days"), ["", "7 days", ""])
// Skipped test 175: incomplete arguments in Python: self.assertEqual(regex.compile(r"(\d+ week|\d+ days)").split("10 days"), ["", "10 days", ""])
// Skipped test 176: incomplete arguments in Python: self.assertEqual(regex.compile(r"[ ]* Name[ ]*\* ").search("  Name *"), null)
// Skipped test 177: incomplete arguments in Python: self.assertEqual(regex.compile("a|\\.*pb\\.py").search(".geojs"), null)

  it('regex.sub test 178', async () => {
    // Python: # Git issue 439: Unmatched groups: sub vs subfself.assertEqual(regex.sub(r"(test1)|(test2)", r"matched: \1\2", "test1"), "matched: test1")
    expect(await re.sub("(test1)|(test2)", "matched: \\1\\2", "test1")).toBe("matched: test1");
  });

  it('regex.search test 179', async () => {
    // Python: self.assertEqual(regex.search(r"(test1)|(test2)", "matched: test1").expand(r"matched: \1\2"),"matched: test1",),self.assertEqual(regex.search(r"(test1)|(test2)", "matched: test1").expandf(r"matched: {1}{2}"),"matched: test1",)
    expect(await re.search("(test1)|(test2)", "matched: test1")?.expand(r"matched: \1\2")).toStrictEqual("matched: test1",);
  });

  it('regex.search test 180', async () => {
    // Python: # Git issue 442: Fuzzy regex matching doesn't seem to test insertions correctlyself.assertEqual(regex.search(r"(?:\bha\b){i:[ ]}", "having"), null)
    expect(await re.search("(?:\\bha\\b){i:[ ]}", "having")).toStrictEqual(null);
  });

  it('regex.search test 181', async () => {
    // Python: self.assertEqual(regex.search(r"(?:\bha\b){i:[ ]}", "having", flags=regex.I), null)
    expect(await re.search("(?:\\bha\\b){i:[ ]}", "having")).toStrictEqual(null);
  });

  it('regex.match test 182', async () => {
    // Python: # Git issue 467: Scoped inline flags 'a', 'u' and 'L' affect global flagsself.assertEqual(regex.match(r"(?a:\w)\w", "d\N{CYRILLIC SMALL LETTER ZHE}").span(), (0, 2)
    expect(await re.match("(?a:\\w)\\w", "d\\N{CYRILLIC SMALL LETTER ZHE}")?.span()).toStrictEqual((0, 2);
  });

  it('regex.match test 183', async () => {
    // Python: self.assertEqual(regex.match(r"(?a:\w)(?u:\w)", "d\N{CYRILLIC SMALL LETTER ZHE}").span(),(0, 2),)
    expect(await re.match("(?a:\\w)(?u:\\w)", "d\\N{CYRILLIC SMALL LETTER ZHE}")?.span()).toStrictEqual((0, 2);
  });

  it('regex.match test 184', async () => {
    // Python: # Git issue 473: Emoji classified as letterself.assertEqual(regex.match(r"^\p{LC}+$", "\N{SMILING CAT FACE WITH OPEN MOUTH}"), null)
    expect(await re.match("^\\p{LC}+$", "\\N{SMILING CAT FACE WITH OPEN MOUTH}")).toStrictEqual(null);
  });

  it('regex.match test 185', async () => {
    // Python: self.assertEqual(regex.match(r"^\p{So}+$", "\N{SMILING CAT FACE WITH OPEN MOUTH}").span(),(0, 1),)
    expect(await re.match("^\\p{So}+$", "\\N{SMILING CAT FACE WITH OPEN MOUTH}")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 186', async () => {
    // Python: # Git issue 474: regex has no equivalent to `re.Match.groups()` for capturesself.assertEqual(regex.match(r"(.)+", "abc").allcaptures(), (["abc"], ["a", "", "c"])
    expect(await re.match("(.)+", "abc")?.allcaptures()).toStrictEqual((["abc"], ["a", "", "c"]);
  });

  it('regex.match test 187', async () => {
    // Python: self.assertEqual(regex.match(r"(.)+", "abc").allspans(), ([(0, 3)], [(0, 1), (1, 2), (2, 3)])
    expect(await re.match("(.)+", "abc")?.allspans()).toStrictEqual(([(0, 3);
  });

  it('regex.match test 188', async () => {
    // Python: # Git issue 479: Segmentation fault when using conditional patternself.assertEqual(regex.match(r"(?(?<=A)|(?(?![^B])C|D))", "A"), null)
    expect(await re.match("(?(?<=A)|(?(?![^B])C|D))", "A")).toStrictEqual(null);
  });

  it('regex.search test 189', async () => {
    // Python: self.assertEqual(regex.search(r"(?(?<=A)|(?(?![^B])C|D))", "A").span(), (1, 1))
    expect(await re.search("(?(?<=A)|(?(?![^B])C|D))", "A")?.span()).toStrictEqual((1, 1);
  });

  it('regex.search test 190', async () => {
    // Python: # Git issue 494: Backtracking failure matching regex ^a?(a?)b?c\1$ against string abcaself.assertEqual(regex.search(r"^a?(a?)b?c\1$", "abca").span(), (0, 4))
    expect(await re.search("^a?(a?)b?c\\1$", "abca")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 191', async () => {
    // Python: # Git issue 498: Conditional negative lookahead inside positive lookahead fails to matchself.assertEqual(regex.match(r"(?(?=a).|..)", "a").span(), (0, 1))
    expect(await re.match("(?(?=a).|..)", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 192', async () => {
    // Python: self.assertEqual(regex.match(r"(?(?=b).|..)", "a").span(), (0, 2))
    expect(await re.match("(?(?=b).|..)", "a")?.span()).toStrictEqual((0, 2);
  });

  it('regex.match test 193', async () => {
    // Python: self.assertEqual(regex.match(r"(?(?!a).|..)", "a").span(), (0, 2))
    expect(await re.match("(?(?!a).|..)", "a")?.span()).toStrictEqual((0, 2);
  });

  it('regex.match test 194', async () => {
    // Python: self.assertEqual(regex.match(r"(?(?!b).|..)", "a").span(), (0, 1))
    expect(await re.match("(?(?!b).|..)", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 195', async () => {
    // Python: # Git issue 525: segfault when fuzzy matching empty listself.assertEqual(regex.match(r"(\L<foo>){e<=5}", "blah", foo=[]).span(), (0, 0))
    expect(await re.match("(\\L<foo>){e<=5}", "blah")?.span()).toStrictEqual((0, 0);
  });
// Skipped test 196: incomplete arguments in Python: # Git issue 527: `VERBOSE`/`X` flag breaks `\N` escapesself.assertEqual(regex.compile(r"\N{LATIN SMALL LETTER A}").match("a").span(), (0, 1)

  it('regex.compile test 197', async () => {
    // Python: self.assertEqual(regex.compile(r"\N{LATIN SMALL LETTER A}", flags=regex.X).match("a").span(),(0, 1),)
    expect(await re.compile("\\N{LATIN SMALL LETTER A}", flags=regex.X)?.match("a").span()).toStrictEqual((0, 1);
  });

  it('regex.match test 198', async () => {
    // Python: # Git issue 539: Bug: Partial matching fails on a simple exampleself.assertEqual(regex.match(r"[^/]*b/ccc", "b/ccc", partial=True).span(), (0, 5)
    expect(await re.match("[^/]*b/ccc", "b/ccc")?.span()).toStrictEqual((0, 5);
  });

  it('regex.match test 199', async () => {
    // Python: self.assertEqual(regex.match(r"[^/]*b/ccc", "b/cc", partial=True), null)
    expect(await re.match("[^/]*b/ccc", "b/cc")).toStrictEqual(null);
  });

  it('regex.match test 200', async () => {
    // Python: self.assertEqual(regex.match(r"[^/]*b/ccc", "b/cc", partial=True).span(), (0, 4)
    expect(await re.match("[^/]*b/ccc", "b/cc")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 201', async () => {
    // Python: self.assertEqual(regex.match(r"[^/]*b/xyz", "b/xy", partial=True).span(), (0, 4)
    expect(await re.match("[^/]*b/xyz", "b/xy")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 202', async () => {
    // Python: self.assertEqual(regex.match(r"[^/]*b/xyz", "b/yz", partial=True), null)
    expect(await re.match("[^/]*b/xyz", "b/yz")).toStrictEqual(null);
  });

  it('regex.match test 203', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[^/]*b/ccc", "b/ccc", partial=True).span(), (0, 5)
    expect(await re.match("(?i)[^/]*b/ccc", "b/ccc")?.span()).toStrictEqual((0, 5);
  });

  it('regex.match test 204', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[^/]*b/ccc", "b/cc", partial=True), null)
    expect(await re.match("(?i)[^/]*b/ccc", "b/cc")).toStrictEqual(null);
  });

  it('regex.match test 205', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[^/]*b/ccc", "b/cc", partial=True).span(), (0, 4)
    expect(await re.match("(?i)[^/]*b/ccc", "b/cc")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 206', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[^/]*b/xyz", "b/xy", partial=True).span(), (0, 4)
    expect(await re.match("(?i)[^/]*b/xyz", "b/xy")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 207', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[^/]*b/xyz", "b/yz", partial=True), null)
    expect(await re.match("(?i)[^/]*b/xyz", "b/yz")).toStrictEqual(null);
  });

  it('regex.search test 208', async () => {
    // Python: self.assertEqual(regex.search(r"(?ifu)(H\N{LATIN SMALL LETTER O WITH DIAERESIS}gskolan?)[\\s\\S]*p","Yrkesh\N{LATIN SMALL LETTER O WITH DIAERESIS}gskola . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen",),null,)
    expect(await re.search("(?ifu)(H\\N{LATIN SMALL LETTER O WITH DIAERESIS}gskolan?)[\\\\s\\\\S]*p", "Yrkesh\\N{LATIN SMALL LETTER O WITH DIAERESIS}gskola . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen")).toStrictEqual(null,);
  });
});
