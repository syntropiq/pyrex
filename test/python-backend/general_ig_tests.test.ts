import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ig_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: # Issue 3511.self.assertEqual(regex.match(r"[Z-a]", "_").span(), (0, 1))
    expect(await re.match("[Z-a]", "_")?.span()).toStrictEqual((0, 1);
  });

  it('regex.match test 2', async () => {
    // Python: self.assertEqual(regex.match(r"(?i)[Z-a]", "_").span(), (0, 1))
    expect(await re.match("(?i)[Z-a]", "_")?.span()).toStrictEqual((0, 1);
  });
});
