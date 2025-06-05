import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ge_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: self.assertEqual(regex.search("b(c)", "abcdef").span(), (1, 3))
    expect(await re.search("b(c)", "abcdef")?.span()).toStrictEqual((1, 3);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search("b(c)", "abcdef").span(1), (2, 3))
    expect(await re.search("b(c)", "abcdef")?.span(1)).toStrictEqual((2, 3);
  });

  it('regex.match test 3', async () => {
    // Python: self.assertEqual(regex.match("(a)", "a").regs, ((0, 1), (0, 1)))
    expect(await re.match("(a)", "a").regs)).toStrictEqual((0, 1);
  });
});
