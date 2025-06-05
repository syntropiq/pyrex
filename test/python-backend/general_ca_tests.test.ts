import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ca_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralCa(unittest.TestCase):# test_case_foldingdef test_case_folding(self):self.assertEqual(regex.search("(?fi)ss", "SS").span(), (0, 2))
    expect((await re.search("(?fi)ss", "SS"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search("(?fi)SS", "ss").span(), (0, 2))
    expect((await re.search("(?fi)SS", "ss"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 3', async () => {
    // Python: self.assertEqual(regex.search("(?fi)SS", "\N{LATIN SMALL LETTER SHARP S}").span(), (0, 1)
    expect((await re.search("(?fi)SS", "\\N{LATIN SMALL LETTER SHARP S}"))?.span()).toStrictEqual([0, 1]);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search("(?fi)\N{LATIN SMALL LETTER SHARP S}", "SS").span(), (0, 2)
    expect((await re.search("(?fi)\\N{LATIN SMALL LETTER SHARP S}", "SS"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 5', async () => {
    // Python: self.assertEqual(regex.search("(?fi)\N{LATIN SMALL LIGATURE ST}", "ST").span(), (0, 2)
    expect((await re.search("(?fi)\\N{LATIN SMALL LIGATURE ST}", "ST"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 6', async () => {
    // Python: self.assertEqual(regex.search("(?fi)ST", "\N{LATIN SMALL LIGATURE ST}").span(), (0, 1)
    expect((await re.search("(?fi)ST", "\\N{LATIN SMALL LIGATURE ST}"))?.span()).toStrictEqual([0, 1]);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search("(?fi)ST", "\N{LATIN SMALL LIGATURE LONG S T}").span(), (0, 1)
    expect((await re.search("(?fi)ST", "\\N{LATIN SMALL LIGATURE LONG S T}"))?.span()).toStrictEqual([0, 1]);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search("(?fi)SST", "\N{LATIN SMALL LETTER SHARP S}t").span(), (0, 2)
    expect((await re.search("(?fi)SST", "\\N{LATIN SMALL LETTER SHARP S}t"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 9', async () => {
    // Python: self.assertEqual(regex.search("(?fi)SST", "s\N{LATIN SMALL LIGATURE LONG S T}").span(),(0, 2),)
    expect((await re.search("(?fi)SST", "s\\N{LATIN SMALL LIGATURE LONG S T}"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 10', async () => {
    // Python: self.assertEqual(regex.search("(?fi)SST", "s\N{LATIN SMALL LIGATURE ST}").span(), (0, 2)
    expect((await re.search("(?fi)SST", "s\\N{LATIN SMALL LIGATURE ST}"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 11', async () => {
    // Python: self.assertEqual(regex.search("(?fi)\N{LATIN SMALL LIGATURE ST}", "SST").span(), (1, 3)
    expect((await re.search("(?fi)\\N{LATIN SMALL LIGATURE ST}", "SST"))?.span()).toStrictEqual([1, 3]);
  });

  it('regex.search test 12', async () => {
    // Python: self.assertEqual(regex.search("(?fi)SST", "s\N{LATIN SMALL LIGATURE ST}").span(), (0, 2)
    expect((await re.search("(?fi)SST", "s\\N{LATIN SMALL LIGATURE ST}"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 13', async () => {
    // Python: self.assertEqual(regex.search("(?fi)FFI", "\N{LATIN SMALL LIGATURE FFI}").span(), (0, 1)
    expect((await re.search("(?fi)FFI", "\\N{LATIN SMALL LIGATURE FFI}"))?.span()).toStrictEqual([0, 1]);
  });

  it('regex.search test 14', async () => {
    // Python: self.assertEqual(regex.search("(?fi)FFI", "\N{LATIN SMALL LIGATURE FF}i").span(), (0, 2)
    expect((await re.search("(?fi)FFI", "\\N{LATIN SMALL LIGATURE FF}i"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 15', async () => {
    // Python: self.assertEqual(regex.search("(?fi)FFI", "f\N{LATIN SMALL LIGATURE FI}").span(), (0, 2)
    expect((await re.search("(?fi)FFI", "f\\N{LATIN SMALL LIGATURE FI}"))?.span()).toStrictEqual([0, 2]);
  });

  it('regex.search test 16', async () => {
    // Python: self.assertEqual(regex.search("(?fi)\N{LATIN SMALL LIGATURE FFI}", "FFI").span(), (0, 3)
    expect((await re.search("(?fi)\\N{LATIN SMALL LIGATURE FFI}", "FFI"))?.span()).toStrictEqual([0, 3]);
  });

  it('regex.search test 17', async () => {
    // Python: self.assertEqual(regex.search("(?fi)\N{LATIN SMALL LIGATURE FF}i", "FFI").span(), (0, 3)
    expect((await re.search("(?fi)\\N{LATIN SMALL LIGATURE FF}i", "FFI"))?.span()).toStrictEqual([0, 3]);
  });

  it('regex.search test 18', async () => {
    // Python: self.assertEqual(regex.search("(?fi)f\N{LATIN SMALL LIGATURE FI}", "FFI").span(), (0, 3)
    expect((await re.search("(?fi)f\\N{LATIN SMALL LIGATURE FI}", "FFI"))?.span()).toStrictEqual([0, 3]);
  });

  it('regex.findall test 19', async () => {
    // Python: self.assertEqual(regex.findall("(?iV0)\m(?:word){e<=3}\M(?<!\m(?:word){e<=1}\M)","word word2 word word3 word word234 word23 word",),["word234", "word23"],)
    expect(await re.findall("(?iV0)\\m(?:word){e<=3}\\M(?<!\\m(?:word){e<=1}\\M)", "word word2 word word3 word word234 word23 word")).toStrictEqual(["word234", "word23"]);
  });

  it('regex.findall test 20', async () => {
    // Python: self.assertEqual(regex.findall("(?iV1)\m(?:word){e<=3}\M(?<!\m(?:word){e<=1}\M)","word word2 word word3 word word234 word23 word",),["word234", "word23"],)
    expect(await re.findall("(?iV1)\\m(?:word){e<=3}\\M(?<!\\m(?:word){e<=1}\\M)", "word word2 word word3 word word234 word23 word")).toStrictEqual(["word234", "word23"]);
  });

  it('regex.search test 21', async () => {
    // Python: self.assertEqual(regex.search("(?fi)a\N{LATIN SMALL LIGATURE FFI}ne", "  affine  ").span(),(2, 8),)
    expect((await re.search("(?fi)a\\N{LATIN SMALL LIGATURE FFI}ne", "  affine  "))?.span()).toStrictEqual([2, 8]);
  });

  it('regex.search test 22', async () => {
    // Python: self.assertEqual(regex.search("(?fi)a(?:\N{LATIN SMALL LIGATURE FFI}|x)ne", "  affine  ").span(),(2, 8),)
    expect((await re.search("(?fi)a(?:\\N{LATIN SMALL LIGATURE FFI}|x)ne", "  affine  "))?.span()).toStrictEqual([2, 8]);
  });

  it('regex.search test 23', async () => {
    // Python: self.assertEqual(regex.search("(?fi)a(?:\N{LATIN SMALL LIGATURE FFI}|xy)ne", "  affine  ").span(),(2, 8),)
    expect((await re.search("(?fi)a(?:\\N{LATIN SMALL LIGATURE FFI}|xy)ne", "  affine  "))?.span()).toStrictEqual([2, 8]);
  });

  it('regex.search test 24', async () => {
    // Python: self.assertEqual(regex.search("(?fi)a\L<options>ne","affine",options=["\N{LATIN SMALL LIGATURE FFI}"],).span(),(0, 6),)
    expect((await re.search("(?fi)a\\L<options>ne", "affine"))?.span()).toStrictEqual([0, 6]);
  });

  it('regex.search test 25', async () => {
    // Python: self.assertEqual(regex.search("(?fi)a\L<options>ne","a\N{LATIN SMALL LIGATURE FFI}ne",options=["ffi"],).span(),(0, 4),)
    expect((await re.search("(?fi)a\\L<options>ne", "a\\N{LATIN SMALL LIGATURE FFI}ne"))?.span()).toStrictEqual([0, 4]);
  });

  it('regex.search test 26', async () => {
    // Python: # test_capturesdef test_captures(self):self.assertEqual(regex.search("(\w)+", "abc").captures(1), ["a", "", "c"])
    expect((await re.search("(\\w)+", "abc"))?.captures(1)).toStrictEqual(["a", "", "c"]);
  });

  it('regex.search test 27', async () => {
    // Python: self.assertEqual(regex.search("(\w{3})+", "abcdef").captures(0, 1),(["abcdef"], ["abc", "def"]),)
    expect((await re.search("(\\w{3})+", "abcdef"))?.captures(0, 1)).toStrictEqual([["abcdef"], ["abc", "def"]]);
  });

  it('regex.search test 28', async () => {
    // Python: self.assertEqual(regex.search("^(\d{1,3})(?:\.(\d{1,3})){3}$", "192.168.0.1").captures(1, 2),(["192",],["168", "0", "1"],),)
    expect((await re.search("^(\\d{1,3})(?:\\.(\\d{1,3})){3}$", "192.168.0.1"))?.captures(1, 2)).toStrictEqual([["192"], ["168", "0", "1"]]);
  });

  it('regex.match test 29', async () => {
    // Python: self.assertEqual(regex.match("^([0-9A-F]{2}){4} ([a-z]\d){5}$", "3FB52A0C a2c4g3k9d3").captures(1, 2),(["3F", "B5", "2A", "0C"], ["a2", "c4", "g3", "k9", "d3"]),)
    expect((await re.match("^([0-9A-F]{2}){4} ([a-z]\\d){5}$", "3FB52A0C a2c4g3k9d3"))?.captures(1, 2)).toStrictEqual([["3F", "B5", "2A", "0C"], ["a2", "c4", "g3", "k9", "d3"]]);
  });

  it('regex.match test 30', async () => {
    // Python: self.assertEqual(regex.match("([a-z]W)([a-z]X)+([a-z]Y)", "aWbXcXdXeXfY").captures(1, 2, 3),(["aW"], ["bX", "cX", "dX", "eX"], ["fY"]),)
    expect((await re.match("([a-z]W)([a-z]X)+([a-z]Y)", "aWbXcXdXeXfY"))?.captures(1, 2, 3)).toStrictEqual([["aW"], ["bX", "cX", "dX", "eX"], ["fY"]]);
  });

  it('regex.search test 31', async () => {
    // Python: self.assertEqual(regex.search(".*?(?=(.)+)", "a").captures(1), [""])
    expect((await re.search(".*?(?=(.)+)", "a"))?.captures(1)).toStrictEqual([""]);
  });

  it('regex.search test 32', async () => {
    // Python: self.assertEqual(regex.search(".*?(?>(.){0,2})d", "abcd").captures(1), ["", "c"])
    expect((await re.search(".*?(?>(.){0,2})d", "abcd"))?.captures(1)).toStrictEqual(["", "c"]);
  });

  it('regex.search test 33', async () => {
    // Python: self.assertEqual(regex.search("(.)+", "a").captures(1), ["a"])
    expect((await re.search("(.)+", "a"))?.captures(1)).toStrictEqual(["a"]);
  });
});
