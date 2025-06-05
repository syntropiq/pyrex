import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_mo_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: self.assertEqual(regex.sub("\x08|:+", "-", "a::bc"), "-a---bc-")
    expect(await re.sub("\\x08|:+", "-", "a::bc")).toBe("-a---bc-");
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall("\x08|:+", "a::bc"), ["", "", "::", "", ""])
    expect(await re.findall("\\x08|:+", "a::bc")).toStrictEqual(["", "", "::", "", ""]);
  });
});
