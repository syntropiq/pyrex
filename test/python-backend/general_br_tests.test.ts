import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_br_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralBr(unittest.TestCase):# test_branch_resetdef test_branch_reset(self):self.assertEqual(regex.match(r"(?:(a)|(b))(c)", "ac").groups(), ("a", None, "c")
    expect(await re.match("(?:(a)|(b))(c)", "ac", { backend: 'python' })?.groups()).toStrictEqual(("a", None, "c");
  });

  it('regex.match test 2', async () => {
    // Python: self.assertEqual(regex.match(r"(?:(a)|(b))(c)", "bc").groups(), (None, "b", "c")
    expect(await re.match("(?:(a)|(b))(c)", "bc", { backend: 'python' })?.groups()).toStrictEqual((None, "b", "c");
  });

  it('regex.match test 3', async () => {
    // Python: self.assertEqual(regex.match(r"(?:(?<a>a)|(?<b>b))(?<c>c)", "ac").groups(), ("a", None, "c")
    expect(await re.match("(?:(?<a>a)|(?<b>b))(?<c>c)", "ac", { backend: 'python' })?.groups()).toStrictEqual(("a", None, "c");
  });

  it('regex.match test 4', async () => {
    // Python: self.assertEqual(regex.match(r"(?:(?<a>a)|(?<b>b))(?<c>c)", "bc").groups(), (None, "b", "c")
    expect(await re.match("(?:(?<a>a)|(?<b>b))(?<c>c)", "bc", { backend: 'python' })?.groups()).toStrictEqual((None, "b", "c");
  });

  it('regex.match test 5', async () => {
    // Python: self.assertEqual(regex.match(r"(?<a>a)(?:(?<b>b)|(?<c>c))(?<d>d)", "abd").groups(),("a", "b", None, "d"),)
    expect(await re.match("(?<a>a)(?:(?<b>b)|(?<c>c))(?<d>d)", "abd", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", None, "d");
  });

  it('regex.match test 6', async () => {
    // Python: self.assertEqual(regex.match(r"(?<a>a)(?:(?<b>b)|(?<c>c))(?<d>d)", "acd").groups(),("a", None, "c", "d"),)
    expect(await re.match("(?<a>a)(?:(?<b>b)|(?<c>c))(?<d>d)", "acd", { backend: 'python' })?.groups()).toStrictEqual(("a", None, "c", "d");
  });

  it('regex.match test 7', async () => {
    // Python: self.assertEqual(regex.match(r"(a)(?:(b)|(c))(d)", "abd").groups(), ("a", "b", None, "d")
    expect(await re.match("(a)(?:(b)|(c))(d)", "abd", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", None, "d");
  });

  it('regex.match test 8', async () => {
    // Python: self.assertEqual(regex.match(r"(a)(?:(b)|(c))(d)", "acd").groups(), ("a", None, "c", "d")
    expect(await re.match("(a)(?:(b)|(c))(d)", "acd", { backend: 'python' })?.groups()).toStrictEqual(("a", None, "c", "d");
  });

  it('regex.match test 9', async () => {
    // Python: self.assertEqual(regex.match(r"(a)(?|(b)|(b))(d)", "abd").groups(), ("a", "b", "d")
    expect(await re.match("(a)(?|(b)|(b))(d)", "abd", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", "d");
  });

  it('regex.match test 10', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)|(?<b>b))(c)", "ac").groups(), ("a", None, "c")
    expect(await re.match("(?|(?<a>a)|(?<b>b))(c)", "ac", { backend: 'python' })?.groups()).toStrictEqual(("a", None, "c");
  });

  it('regex.match test 11', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)|(?<b>b))(c)", "bc").groups(), (None, "b", "c")
    expect(await re.match("(?|(?<a>a)|(?<b>b))(c)", "bc", { backend: 'python' })?.groups()).toStrictEqual((None, "b", "c");
  });

  it('regex.match test 12', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)|(?<a>b))(c)", "ac").groups(), ("a", "c")
    expect(await re.match("(?|(?<a>a)|(?<a>b))(c)", "ac", { backend: 'python' })?.groups()).toStrictEqual(("a", "c");
  });

  it('regex.match test 13', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)|(?<a>b))(c)", "bc").groups(), ("b", "c")
    expect(await re.match("(?|(?<a>a)|(?<a>b))(c)", "bc", { backend: 'python' })?.groups()).toStrictEqual(("b", "c");
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(?<a>d))(e)", "abe").groups(),("a", "b", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(?<b>c)(?<a>d))(e)", "abe", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", "e");
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(?<a>d))(e)", "cde").groups(),("d", "c", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(?<b>c)(?<a>d))(e)", "cde", { backend: 'python' })?.groups()).toStrictEqual(("d", "c", "e");
  });

  it('regex.match test 16', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(d))(e)", "abe").groups(),("a", "b", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(?<b>c)(d))(e)", "abe", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", "e");
  });

  it('regex.match test 17', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(d))(e)", "cde").groups(),("d", "c", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(?<b>c)(d))(e)", "cde", { backend: 'python' })?.groups()).toStrictEqual(("d", "c", "e");
  });

  it('regex.match test 18', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(c)(d))(e)", "abe").groups(),("a", "b", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(c)(d))(e)", "abe", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", "e");
  });

  it('regex.match test 19', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(c)(d))(e)", "cde").groups(),("c", "d", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(c)(d))(e)", "cde", { backend: 'python' })?.groups()).toStrictEqual(("c", "d", "e");
  });

  it('regex.match test 20', async () => {
    // Python: # Hg issue 87: Allow duplicate names of groupsself.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "abe").groups(),("a", "b", "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "abe", { backend: 'python' })?.groups()).toStrictEqual(("a", "b", "e");
  });

  it('regex.match test 21', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "abe").capturesdict(),{"a": ["a"], "b": ["b"]},)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "abe", { backend: 'python' })?.capturesdict()).toStrictEqual({"a": ["a"], "b": ["b"]},);
  });

  it('regex.match test 22', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "cde").groups(),("d", None, "e"),)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "cde", { backend: 'python' })?.groups()).toStrictEqual(("d", None, "e");
  });

  it('regex.match test 23', async () => {
    // Python: self.assertEqual(regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "cde").capturesdict(),{"a": ["c", "d"], "b": []},)
    expect(await re.match("(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "cde", { backend: 'python' })?.capturesdict()).toStrictEqual({"a": ["c", "d"], "b": []},);
  });
});
