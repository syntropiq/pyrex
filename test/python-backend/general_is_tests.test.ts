import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_is_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: # test_issue_18468def test_issue_18468(self):self.assertTypedEqual(regex.sub("y", "a", "xyz"), "xaz")
    expect(await re.sub("y", "a", "xyz")).toBe("xaz");
  });
// Skipped test 2: incomplete arguments in Python: self.assertTypedEqual(regex.sub("y", StrSubclass("a"), StrSubclass("xyz")), "xaz")

  it('regex.sub test 3', async () => {
    // Python: self.assertTypedEqual(regex.sub("y", "a", "xyz"), "xaz")
    expect(await re.sub("y", "a", "xyz")).toBe("xaz");
  });
// Skipped test 4: incomplete arguments in Python: self.assertTypedEqual(regex.sub("y", BytesSubclass("a"), BytesSubclass("xyz")), "xaz")
// Skipped test 5: incomplete arguments in Python: self.assertTypedEqual(regex.sub("y", bytearray("a"), bytearray("xyz")), "xaz")
// Skipped test 6: incomplete arguments in Python: self.assertTypedEqual(regex.sub("y", memoryview("a"), memoryview("xyz")), "xaz")

  it('regex.findall test 7', async () => {
    // Python: for string in "a:b::c:::d", StrSubclass("a:b::c:::d"):self.assertTypedEqual(regex.findall(":+", string), [":", "::", ":::"])
    expect(await re.findall(":+", string)).toStrictEqual([":", "::", ":::"]);
  });

  it('regex.findall test 8', async () => {
    // Python: self.assertTypedEqual(regex.findall("(:+)", string), [":", "::", ":::"])
    expect(await re.findall("(:+)", string)).toStrictEqual([":", "::", ":::"]);
  });

  it('regex.findall test 9', async () => {
    // Python: self.assertTypedEqual(regex.findall("(:)(:*)", string), [(":", ""), (":", ":"), (":", "::")])
    expect(await re.findall("(:)(:*)", string)).toStrictEqual([(":", "");
  });

  it('regex.findall test 10', async () => {
    // Python: for string in ("a:b::c:::d",BytesSubclass("a:b::c:::d"),bytearray("a:b::c:::d"),memoryview("a:b::c:::d"),):self.assertTypedEqual(regex.findall(":+", string), [":", "::", ":::"])
    expect(await re.findall(":+", string)).toStrictEqual([":", "::", ":::"]);
  });

  it('regex.findall test 11', async () => {
    // Python: self.assertTypedEqual(regex.findall("(:+)", string), [":", "::", ":::"])
    expect(await re.findall("(:+)", string)).toStrictEqual([":", "::", ":::"]);
  });

  it('regex.findall test 12', async () => {
    // Python: self.assertTypedEqual(regex.findall("(:)(:*)", string),[(":", ""), (":", ":"), (":", "::")],)
    expect(await re.findall("(:)(:*)", string)).toStrictEqual([(":", "");
  });

  it('regex.match test 13', async () => {
    // Python: for string in "a", StrSubclass("a"):self.assertEqual(regex.match("a", string).groups(), ())
    expect(await re.match("a", string)?.groups()).toStrictEqual(();
  });

  it('regex.match test 14', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).groups(), ("a",))
    expect(await re.match("(a)", string)?.groups()).toStrictEqual(("a",);
  });

  it('regex.match test 15', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).group(0), "a")
    expect(await re.match("(a)", string)?.group(0)).toStrictEqual("a");
  });

  it('regex.match test 16', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).group(1), "a")
    expect(await re.match("(a)", string)?.group(1)).toStrictEqual("a");
  });

  it('regex.match test 17', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).group(1, 1), ("a", "a"))
    expect(await re.match("(a)", string)?.group(1, 1)).toStrictEqual(("a", "a");
  });

  it('regex.match test 18', async () => {
    // Python: for string in ("a", BytesSubclass("a"), bytearray("a"), memoryview("a")):self.assertEqual(regex.match("a", string).groups(), ())
    expect(await re.match("a", string)?.groups()).toStrictEqual(();
  });

  it('regex.match test 19', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).groups(), ("a",))
    expect(await re.match("(a)", string)?.groups()).toStrictEqual(("a",);
  });

  it('regex.match test 20', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).group(0), "a")
    expect(await re.match("(a)", string)?.group(0)).toStrictEqual("a");
  });

  it('regex.match test 21', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).group(1), "a")
    expect(await re.match("(a)", string)?.group(1)).toStrictEqual("a");
  });

  it('regex.match test 22', async () => {
    // Python: self.assertEqual(regex.match("(a)", string).group(1, 1), ("a", "a"))
    expect(await re.match("(a)", string)?.group(1, 1)).toStrictEqual(("a", "a");
  });
});
