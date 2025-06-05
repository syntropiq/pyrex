import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_fu_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: text = "molasses anaconda foo bar baz smith anderson "self.assertEqual(regex.search("(znacnda){s<=1,e<=3,1i+1d<1}", text), null)
    expect(await re.search("(znacnda){s<=1, e<=3}", "znacnda")).toStrictEqual(null);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search("(znacnda){s<=1,e<=3,1i+1d<2}", text).span(0, 1),((9, 17), (9, 17)),)
    expect((await re.search("(znacnda){s<=1, e<=3}", "znacnda"))?.span(0, 1)).toStrictEqual([9, 17]);
  });

  it('regex.search test 3', async () => {
    // Python: self.assertEqual(regex.search("(ananda){1i+1d<2}", text), null)
    const text = "ananda"; // Define text variable
    expect(await re.search("(ananda){1i+1d<2}", text)).toStrictEqual(null);
  });

  it('regex.search test 4', async () => {
    // Python: text = "anaconda foo bar baz smith anderson"self.assertEqual(regex.search("(fuu){i<=3,d<=3,e<=5}", text).span(0, 1), ((0, 0), (0, 0))
    expect((await re.search("(fuu){i<=3, d<=3}", "fuu"))?.span(0, 1)).toStrictEqual([0, 0]);
  });

  it('regex.search test 5', async () => {
    // Python: self.assertEqual(regex.search("(?b)(fuu){i<=3,d<=3,e<=5}", text).span(0, 1),((9, 10), (9, 10)),)
    expect((await re.search("(?b)(fuu){i<=3, d<=3}", "fuu"))?.span(0, 1)).toStrictEqual([9, 10]);
  });

  it('regex.search test 6', async () => {
    // Python: self.assertEqual(regex.search("(fuu){i<=2,d<=2,e<=5}", text).span(0, 1), ((7, 10), (7, 10))
    expect((await re.search("(fuu){i<=2, d<=2}", "fuu"))?.span(0, 1)).toStrictEqual([7, 10]);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search("(?e)(fuu){i<=2,d<=2,e<=5}", text).span(0, 1),((9, 10), (9, 10)),)
    expect((await re.search("(?e)(fuu){i<=2, d<=2}", "fuu"))?.span(0, 1)).toStrictEqual([9, 10]);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search("(fuu){i<=3,d<=3,e}", text).span(0, 1), ((0, 0), (0, 0))
    expect((await re.search("(fuu){i<=3, d<=3}", "fuu"))?.span(0, 1)).toStrictEqual([0, 0]);
  });

  it('regex.search test 9', async () => {
    // Python: self.assertEqual(regex.search("(?b)(fuu){i<=3,d<=3,e}", text).span(0, 1), ((9, 10), (9, 10))
    expect((await re.search("(?b)(fuu){i<=3, d<=3}", "fuu"))?.span(0, 1)).toStrictEqual([9, 10]);
  });

  it('regex.search test 10', async () => {
    // Python: # No cost limit.self.assertEqual(regex.search("(foobar){e}", "xirefoabralfobarxie").span(0, 1),((0, 6), (0, 6)),)
    expect((await re.search("(foobar){e}", "xirefoabralfobarxie"))?.span(0, 1)).toStrictEqual([0, 6]);
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search("(?e)(foobar){e}", "xirefoabralfobarxie").span(0, 1),((0, 3), (0, 3)),)
    expect((await re.search("(?e)(foobar){e}", "xirefoabralfobarxie"))?.span(0, 1)).toStrictEqual([0, 3]);
  });

  it('regex.search test 12', async () => {
    // Python: self.assertEqual(regex.search("(?b)(foobar){e}", "xirefoabralfobarxie").span(0, 1),((11, 16), (11, 16)),)
    expect((await re.search("(?b)(foobar){e}", "xirefoabralfobarxie"))?.span(0, 1)).toStrictEqual([11, 16]);
  });

  it('regex.search test 13', async () => {
    // Python: # At most two errors.self.assertEqual(regex.search("(foobar){e<=2}", "xirefoabrzlfd").span(0, 1), ((4, 9), (4, 9))
    expect((await re.search("(foobar){e<=2}", "xirefoabrzlfd"))?.span(0, 1)).toStrictEqual([4, 9]);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search("(foobar){e<=2}", "xirefoabzlfd"), null)
    expect(await re.search("(foobar){e<=2}", "xirefoabzlfd")).toStrictEqual(null);
  });

  it('regex.search test 15', async () => {
    // Python: # At most two inserts or substitutions and max two errors total.self.assertEqual(regex.search("(foobar){i<=2,s<=2,e<=2}", "oobargoobaploowap").span(0, 1),((5, 11), (5, 11)),)
    expect((await re.search("(foobar){i<=2, s<=2}", "foobar"))?.span(0, 1)).toStrictEqual([5, 11]);
  });

  it('regex.search test 16', async () => {
    // Python: # Find best whole word match for "foobar".self.assertEqual(regex.search("\\b(foobar){e}\\", "zfoobarz").span(0, 1), ((0, 8), (0, 8))
    expect(await re.search("\\\\b(foobar){e}\\\\", "zfoobarz")?.span(0, 1)).toStrictEqual(((0, 8);
  });

  it('regex.search test 17', async () => {
    // Python: self.assertEqual(regex.search("\\b(foobar){e}\\", "boing zfoobarz goobar woop").span(0, 1),((0, 6), (0, 6)),)
    expect(await re.search("\\\\b(foobar){e}\\\\", "boing zfoobarz goobar woop")?.span(0, 1)).toStrictEqual(((0, 6);
  });

  it('regex.search test 18', async () => {
    // Python: self.assertEqual(regex.search("(?b)\\b(foobar){e}\\", "boing zfoobarz goobar woop").span(0, 1),((15, 21), (15, 21)),)
    expect(await re.search("(?b)\\\\b(foobar){e}\\\\", "boing zfoobarz goobar woop")?.span(0, 1)).toStrictEqual(((15, 21);
  });

  it('regex.search test 19', async () => {
    // Python: # Match whole string, allow only 1 error.self.assertEqual(regex.search("^(foobar){e<=1}$", "foobar").span(0, 1), ((0, 6), (0, 6))
    expect((await re.search("^(foobar){e<=1}$", "foobar"))?.span(0, 1)).toStrictEqual([0, 6]);
  });

  it('regex.search test 20', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "xfoobar").span(0, 1), ((0, 7), (0, 7))
    expect((await re.search("^(foobar){e<=1}$", "xfoobar"))?.span(0, 1)).toStrictEqual([0, 7]);
  });

  it('regex.search test 21', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "foobarx").span(0, 1), ((0, 7), (0, 7))
    expect((await re.search("^(foobar){e<=1}$", "foobarx"))?.span(0, 1)).toStrictEqual([0, 7]);
  });

  it('regex.search test 22', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "fooxbar").span(0, 1), ((0, 7), (0, 7))
    expect((await re.search("^(foobar){e<=1}$", "fooxbar"))?.span(0, 1)).toStrictEqual([0, 7]);
  });

  it('regex.search test 23', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "foxbar").span(0, 1), ((0, 6), (0, 6))
    expect((await re.search("^(foobar){e<=1}$", "foxbar"))?.span(0, 1)).toStrictEqual([0, 6]);
  });

  it('regex.search test 24', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "xoobar").span(0, 1), ((0, 6), (0, 6))
    expect((await re.search("^(foobar){e<=1}$", "xoobar"))?.span(0, 1)).toStrictEqual([0, 6]);
  });

  it('regex.search test 25', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "foobax").span(0, 1), ((0, 6), (0, 6))
    expect((await re.search("^(foobar){e<=1}$", "foobax"))?.span(0, 1)).toStrictEqual([0, 6]);
  });

  it('regex.search test 26', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "oobar").span(0, 1), ((0, 5), (0, 5))
    expect((await re.search("^(foobar){e<=1}$", "oobar"))?.span(0, 1)).toStrictEqual([0, 5]);
  });

  it('regex.search test 27', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "fobar").span(0, 1), ((0, 5), (0, 5))
    expect((await re.search("^(foobar){e<=1}$", "fobar"))?.span(0, 1)).toStrictEqual([0, 5]);
  });

  it('regex.search test 28', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "fooba").span(0, 1), ((0, 5), (0, 5))
    expect((await re.search("^(foobar){e<=1}$", "fooba"))?.span(0, 1)).toStrictEqual([0, 5]);
  });

  it('regex.search test 29', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "xfoobarx"), null)
    expect(await re.search("^(foobar){e<=1}$", "xfoobarx")).toStrictEqual(null);
  });

  it('regex.search test 30', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "foobarxx"), null)
    expect(await re.search("^(foobar){e<=1}$", "foobarxx")).toStrictEqual(null);
  });

  it('regex.search test 31', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "xxfoobar"), null)
    expect(await re.search("^(foobar){e<=1}$", "xxfoobar")).toStrictEqual(null);
  });

  it('regex.search test 32', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "xfoxbar"), null)
    expect(await re.search("^(foobar){e<=1}$", "xfoxbar")).toStrictEqual(null);
  });

  it('regex.search test 33', async () => {
    // Python: self.assertEqual(regex.search("^(foobar){e<=1}$", "foxbarx"), null)
    expect(await re.search("^(foobar){e<=1}$", "foxbarx")).toStrictEqual(null);
  });

  it('regex.search test 34', async () => {
    // Python: # At most one insert, two deletes, and three substitutions.# Additionally, deletes cost two and substitutes one, and total# cost must be less than 4.self.assertEqual(regex.search("(foobar){i<=1,d<=2,s<=3,2d+1s<4}","3oifaowefbaoraofuiebofasebfaobfaorfeoaro",).span(0, 1),((6, 13), (6, 13)),)
    expect((await re.search("(foobar){i<=1, d<=2}", "foobar"))?.span(0, 1)).toStrictEqual([6, 13]);
  });

  it('regex.search test 35', async () => {
    // Python: self.assertEqual(regex.search("(?b)(foobar){i<=1,d<=2,s<=3,2d+1s<4}","3oifaowefbaoraofuiebofasebfaobfaorfeoaro",).span(0, 1),((34, 39), (34, 39)),)
    expect((await re.search("(?b)(foobar){i<=1, d<=2}", "foobar"))?.span(0, 1)).toStrictEqual([34, 39]);
  });

  it('regex.search test 36', async () => {
    // Python: # Partially fuzzy matches.self.assertEqual(regex.search("foo(bar){e<=1}zap", "foobarzap").span(0, 1), ((0, 9), (3, 6))
    expect((await re.search("foo(bar){e<=1}zap", "foobarzap"))?.span(0, 1)).toStrictEqual([0, 9]);
  });

  it('regex.search test 37', async () => {
    // Python: self.assertEqual(regex.search("foo(bar){e<=1}zap", "fobarzap"), null)
    expect(await re.search("foo(bar){e<=1}zap", "fobarzap")).toStrictEqual(null);
  });

  it('regex.search test 38', async () => {
    // Python: self.assertEqual(regex.search("foo(bar){e<=1}zap", "foobrzap").span(0, 1), ((0, 8), (3, 5))
    expect((await re.search("foo(bar){e<=1}zap", "foobrzap"))?.span(0, 1)).toStrictEqual([0, 8]);
  });

  it('regex.search test 39', async () => {
    // Python: self.assertEqual(regex.search(r"(?s)^.*(dot.org){e}.*$", text).span(0, 1),((0, 120), (120, 120)),)
    expect((await re.search("(?s)^.*(dot.org){e}.*$", text))?.span(0, 1)).toStrictEqual([0, 120]);
  });

  it('regex.search test 40', async () => {
    // Python: self.assertEqual(regex.search(r"(?es)^.*(dot.org){e}.*$", text).span(0, 1),((0, 120), (93, 100)),)
    expect((await re.search("(?es)^.*(dot.org){e}.*$", text))?.span(0, 1)).toStrictEqual([0, 120]);
  });

  it('regex.search test 41', async () => {
    // Python: self.assertEqual(regex.search(r"^.*(dot.org){e}.*$", text).span(0, 1), ((0, 119), (24, 101))
    expect((await re.search("^.*(dot.org){e}.*$", text))?.span(0, 1)).toStrictEqual([0, 119]);
  });

  it('regex.findall test 42', async () => {
    // Python: self.assertEqual(regex.findall(r"(?e)\b\L<words>{e<=1}\"," book dog cot desk ",words="cat dog".split(),),["dog", "cot"],)
    expect(await re.findall("(?e)\\b\\L<words>{e<=1}\\", " book dog cot desk ")).toStrictEqual(["dog", "cot"]);
  });

  it('regex.findall test 43', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\b\L<words>{e<=1}\"," book cot dog desk ",words="cat dog".split(),),["dog ", "cot"],)
    expect(await re.findall("(?r)\\b\\L<words>{e<=1}\\", " book cot dog desk ")).toStrictEqual(["dog ", "cot"]);
  });

  it('regex.findall test 44', async () => {
    // Python: self.assertEqual(regex.findall(r"(?er)\b\L<words>{e<=1}\"," book cot dog desk ",words="cat dog".split(),),["dog", "cot"],)
    expect(await re.findall("(?er)\\b\\L<words>{e<=1}\\", " book cot dog desk ")).toStrictEqual(["dog", "cot"]);
  });

  it('regex.findall test 45', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\b\L<words>{e<=1}\"," book dog cot desk ",words="cat dog".split(),),["cot", "dog"],)
    expect(await re.findall("(?r)\\b\\L<words>{e<=1}\\", " book dog cot desk ")).toStrictEqual(["cot", "dog"]);
  });

  it('regex.findall test 46', async () => {
    // Python: self.assertEqual(regex.findall(r"\b\L<words>{e<=1}\"," book cot dog desk ",words="cat dog".split(),),["cot", "dog"],)
    expect(await re.findall("\\b\\L<words>{e<=1}\\", " book cot dog desk ")).toStrictEqual(["cot", "dog"]);
  });

  it('regex.findall test 47', async () => {
    // Python: self.assertEqual(regex.findall(r"\b\L<words>{e<=1}\"," book dog cot desk ",words="cat dog".split(),),[" dog", "cot"],)
    expect(await re.findall("\\b\\L<words>{e<=1}\\", " book dog cot desk ")).toStrictEqual([" dog", "cot"]);
  });

  it('regex.findall test 48', async () => {
    // Python: self.assertEqual(regex.findall(r"(?e)\b\L<words>{e<=1}\"," book dog cot desk ",words="cat dog".split(),),["dog", "cot"],)
    expect(await re.findall("(?e)\\b\\L<words>{e<=1}\\", " book dog cot desk ")).toStrictEqual(["dog", "cot"]);
  });

  it('regex.findall test 49', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\b\L<words>{e<=1}\"," book cot dog desk ",words="cat dog".split(),),["dog ", "cot"],)
    expect(await re.findall("(?r)\\b\\L<words>{e<=1}\\", " book cot dog desk ")).toStrictEqual(["dog ", "cot"]);
  });

  it('regex.findall test 50', async () => {
    // Python: self.assertEqual(regex.findall(r"(?er)\b\L<words>{e<=1}\"," book cot dog desk ",words="cat dog".split(),),["dog", "cot"],)
    expect(await re.findall("(?er)\\b\\L<words>{e<=1}\\", " book cot dog desk ")).toStrictEqual(["dog", "cot"]);
  });

  it('regex.findall test 51', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)\b\L<words>{e<=1}\"," book dog cot desk ",words="cat dog".split(),),["cot", "dog"],)
    expect(await re.findall("\\b\\L<words>{e<=1}\\", " book dog cot desk ")).toStrictEqual(["cot", "dog"]);
  });

  it('regex.search test 52', async () => {
    // Python: self.assertEqual(regex.search(r"(\w+) (\1{e<=1})", "foo fou").groups(), ("foo", "fou")
    expect((await re.search("(\\w+) (\\1{e<=1})", "foo fou"))?.groups()).toStrictEqual(["foo", "fou"]);
  });

  it('regex.search test 53', async () => {
    // Python: self.assertEqual(regex.search(r"(?r)(\2{e<=1}) (\w+)", "foo fou").groups(), ("foo", "fou")
    expect((await re.search("(?r)(\\2{e<=1}) (\\w+)", "foo fou"))?.groups()).toStrictEqual(["foo", "fou"]);
  });

  it('regex.search test 54', async () => {
    // Python: self.assertEqual(regex.search(r"(\w+) (\1{e<=1})", "foo fou").groups(), ("foo", "fou")
    expect((await re.search("(\\w+) (\\1{e<=1})", "foo fou"))?.groups()).toStrictEqual(["foo", "fou"]);
  });

  it('regex.findall test 55', async () => {
    // Python: self.assertEqual(regex.findall(r"(?:(?:QR)+){e}", "abcde"), ["abcde", ""])
    expect(await re.findall("(?:(?:QR)+){e}", "abcde")).toStrictEqual(["abcde", ""]);
  });

  it('regex.findall test 56', async () => {
    // Python: self.assertEqual(regex.findall(r"(?:Q+){e}", "abc"), ["abc", ""])
    expect(await re.findall("(?:Q+){e}", "abc")).toStrictEqual(["abc", ""]);
  });

  it('regex.match test 57', async () => {
    // Python: # Hg issue 41: = for fuzzy matchesself.assertEqual(regex.match(r"(?:service detection){0<e<5}", "servic detection").span(),(0, 16),)
    expect((await re.match("(?:service detection){0<e<5}", "servic detection"))?.span()).toStrictEqual([0, 16]);
  });

  it('regex.match test 58', async () => {
    // Python: self.assertEqual(regex.match(r"(?:service detection){0<e<5}", "service detect").span(),(0, 14),)
    expect((await re.match("(?:service detection){0<e<5}", "service detect"))?.span()).toStrictEqual([0, 14]);
  });

  it('regex.match test 59', async () => {
    // Python: self.assertEqual(regex.match(r"(?:service detection){0<e<5}", "service detecti").span(),(0, 15),)
    expect((await re.match("(?:service detection){0<e<5}", "service detecti"))?.span()).toStrictEqual([0, 15]);
  });

  it('regex.match test 60', async () => {
    // Python: self.assertEqual(regex.match(r"(?:service detection){0<e<5}", "service detection"), null)
    expect(await re.match("(?:service detection){0<e<5}", "service detection")).toStrictEqual(null);
  });

  it('regex.match test 61', async () => {
    // Python: self.assertEqual(regex.match(r"(?:service detection){0<e<5}", "in service detection").span(),(0, 20),)
    expect((await re.match("(?:service detection){0<e<5}", "in service detection"))?.span()).toStrictEqual([0, 20]);
  });
});
