import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_pa_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: self.assertEqual(regex.match("ab", "a", partial=True).span(), (0, 1))
    expect(await re.match("ab", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 2', async () => {
    // Python: self.assertEqual(regex.match(r"cats", "cat", partial=True).span(), (0, 3))
    expect(await re.match("cats", "cat")?.span()).toStrictEqual((0, 3);
  });

  it('regex.match test 3', async () => {
    // Python: self.assertEqual(regex.match(r"cats", "catch", partial=True), None)
    expect(await re.match("cats", "catch")).toStrictEqual(None);
  });

  it('regex.match test 4', async () => {
    // Python: self.assertEqual(regex.match(r"abc\w{3}", "abcdef", partial=True).span(), (0, 6)
    expect(await re.match("abc\\w{3}", "abcdef")?.span()).toStrictEqual((0, 6);
  });

  it('regex.match test 5', async () => {
    // Python: self.assertEqual(regex.match(r"abc\w{3}", "abcde", partial=True).span(), (0, 5))
    expect(await re.match("abc\\w{3}", "abcde")?.span()).toStrictEqual((0, 5);
  });

  it('regex.match test 6', async () => {
    // Python: self.assertEqual(regex.match(r"\L<words>", "post", partial=True, words=["post"]).span(),(0, 4),)
    expect(await re.match("\\L<words>", "post")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 7', async () => {
    // Python: self.assertEqual(regex.match(r"\L<words>", "pos", partial=True, words=["post"]).span(),(0, 3),)
    expect(await re.match("\\L<words>", "pos")?.span()).toStrictEqual((0, 3);
  });

  it('regex.match test 8', async () => {
    // Python: self.assertEqual(regex.match(r"(?fi)\L<words>", "POST", partial=True, words=["po\ufb06"]).span(),(0, 4),)
    expect(await re.match("(?fi)\\L<words>", "POST")?.span()).toStrictEqual((0, 4);
  });

  it('regex.match test 9', async () => {
    // Python: self.assertEqual(regex.match(r"(?fi)\L<words>", "POS", partial=True, words=["po\ufb06"]).span(),(0, 3),)
    expect(await re.match("(?fi)\\L<words>", "POS")?.span()).toStrictEqual((0, 3);
  });

  it('regex.match test 10', async () => {
    // Python: self.assertEqual(regex.match(r"(?fi)\L<words>", "po\ufb06", partial=True, words=["POS"]),None,)
    expect(await re.match("(?fi)\\L<words>", "po\\ufb06")).toStrictEqual(None,);
  });

  it('regex.match test 11', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "a", partial=True).span(), (0, 1))
    expect(await re.match("[a-z]*4R$", "a")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 12', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "ab", partial=True).span(), (0, 2))
    expect(await re.match("[a-z]*4R$", "ab")?.span()).toStrictEqual((0, 2);
  });

  it('regex.match test 13', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "ab4", partial=True).span(), (0, 3))
    expect(await re.match("[a-z]*4R$", "ab4")?.span()).toStrictEqual((0, 3);
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "a4", partial=True).span(), (0, 2))
    expect(await re.match("[a-z]*4R$", "a4")?.span()).toStrictEqual((0, 2);
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "a4R", partial=True).span(), (0, 3))
    expect(await re.match("[a-z]*4R$", "a4R")?.span()).toStrictEqual((0, 3);
  });

  it('regex.match test 16', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "4a", partial=True), None)
    expect(await re.match("[a-z]*4R$", "4a")).toStrictEqual(None);
  });

  it('regex.match test 17', async () => {
    // Python: self.assertEqual(regex.match(r"[a-z]*4R$", "a44", partial=True), None)
    expect(await re.match("[a-z]*4R$", "a44")).toStrictEqual(None);
  });
});
