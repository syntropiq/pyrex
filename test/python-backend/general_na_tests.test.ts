import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_na_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralNa(unittest.TestCase):PATTERN_CLASS = "<class '_regex.Pattern'>"# test_named_listsdef test_named_lists(self):options = ["one", "two", "three"]self.assertEqual(regex.match(r"333\L<bar>444", "333one444", bar=options).group(), "333one444")
    expect(await re.match("333\\L<bar>444", "333one444")?.group()).toStrictEqual("333one444");
  });

  it('regex.match test 2', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)333\L<bar>444", "333TWO444", bar=options).group(),"333TWO444",)
    expect(await re.match("(?i)333\\L<bar>444", "333TWO444")?.group()).toStrictEqual("333TWO444",);
  });

  it('regex.match test 3', async () => {
    // Python: self.assertEqual(regex.match(r"333\L<bar>444", "333four444", bar=options), null)
    expect(await re.match("333\\L<bar>444", "333four444")).toStrictEqual(null);
  });

  it('regex.match test 4', async () => {
    // Python: options = ["one", "two", "three"]self.assertEqual(regex.match(r"333\L<bar>444", "333one444", bar=options).group(),"333one444",)
    expect(await re.match("333\\L<bar>444", "333one444")?.group()).toStrictEqual("333one444",);
  });

  it('regex.match test 5', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)333\L<bar>444", "333TWO444", bar=options).group(),"333TWO444",)
    expect(await re.match("(?i)333\\L<bar>444", "333TWO444")?.group()).toStrictEqual("333TWO444",);
  });

  it('regex.match test 6', async () => {
    // Python: self.assertEqual(regex.match(r"333\L<bar>444", "333four444", bar=options), null)
    expect(await re.match("333\\L<bar>444", "333four444")).toStrictEqual(null);
  });

  it('regex.findall test 7', async () => {
    // Python: self.assertEqual(regex.findall(r"^\L<options>","solid QWERT",options=set(["good", "brilliant", "+s\\ol[i}d"]),),[],)
    expect(await re.findall("^\\L<options>", "solid QWERT")).toStrictEqual([],);
  });

  it('regex.findall test 8', async () => {
    // Python: self.assertEqual(regex.findall(r"^\L<options>","+solid QWERT",options=set(["good", "brilliant", "+solid"]),),["+solid"],)
    expect(await re.findall("^\\L<options>", "+solid QWERT")).toStrictEqual(["+solid"],);
  });

  it('regex.match test 9', async () => {
    // Python: options = ["STRASSE"]self.assertEqual(regex.match(r"(?fi)\L<words>", "stra\N{LATIN SMALL LETTER SHARP S}e", words=options).span(),(0, 6),)
    expect(await re.match("(?fi)\\L<words>", "stra\\N{LATIN SMALL LETTER SHARP S}e")?.span()).toStrictEqual((0, 6);
  });

  it('regex.match test 10', async () => {
    // Python: options = ["STRASSE", "stress"]self.assertEqual(regex.match(r"(?fi)\L<words>", "stra\N{LATIN SMALL LETTER SHARP S}e", words=options).span(),(0, 6),)
    expect(await re.match("(?fi)\\L<words>", "stra\\N{LATIN SMALL LETTER SHARP S}e")?.span()).toStrictEqual((0, 6);
  });

  it('regex.match test 11', async () => {
    // Python: options = ["stra\N{LATIN SMALL LETTER SHARP S}e"]self.assertEqual(regex.match(r"(?fi)\L<words>", "STRASSE", words=options).span(), (0, 7)
    expect(await re.match("(?fi)\\L<words>", "STRASSE")?.span()).toStrictEqual((0, 7);
  });

  it('regex.search test 12', async () => {
    // Python: options = ["kit"]self.assertEqual(regex.search(r"(?i)\L<words>", "SKITS", words=options).span(), (1, 4)
    expect(await re.search("(?i)\\L<words>", "SKITS")?.span()).toStrictEqual((1, 4);
  });

  it('regex.search test 13', async () => {
    // Python: self.assertEqual(regex.search(r"(?i)\L<words>","SK\N{LATIN CAPITAL LETTER I WITH DOT ABOVE}TS",words=options,).span(),(1, 4),)
    expect(await re.search("(?i)\\L<words>", "SK\\N{LATIN CAPITAL LETTER I WITH DOT ABOVE}TS")?.span()).toStrictEqual((1, 4);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search(r"(?fi)\b(\w+) +\1\", " stra\N{LATIN SMALL LETTER SHARP S}e STRASSE ").span(),(1, 15),)
    expect(await re.search("(?fi)\\b(\\w+) +\\1\\", " stra\\N{LATIN SMALL LETTER SHARP S}e STRASSE ")?.span()).toStrictEqual((1, 15);
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search(r"(?fi)\b(\w+) +\1\", " STRASSE stra\N{LATIN SMALL LETTER SHARP S}e ").span(),(1, 15),)
    expect(await re.search("(?fi)\\b(\\w+) +\\1\\", " STRASSE stra\\N{LATIN SMALL LETTER SHARP S}e ")?.span()).toStrictEqual((1, 15);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search(r"^\L<options>$", "", options=[]).span(), (0, 0))
    expect(await re.search("^\\L<options>$", "")?.span()).toStrictEqual((0, 0);
  });
});
