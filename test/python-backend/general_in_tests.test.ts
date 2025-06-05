import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_in_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: self.assertEqual(regex.match(r"a(?i)", "A"), None)
    expect(await re.match("a(?i)", "A", { backend: 'python' })).toStrictEqual(None);
  });
});
