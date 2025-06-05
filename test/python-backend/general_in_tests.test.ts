import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_in_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: self.assertEqual(regex.match("a(?i)", "A"), null)
    expect(await re.match("a(?i)", "A")).toStrictEqual(null);
  });
});
