import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_sp_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: self.assertEqual(regex.search(r"^\Aabc\Z$", "\nabc\n", regex.M), None)
    expect(await re.search("^\\Aabc\\Z$", "\\nabc\\n", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search(rb"^\Aabc\Z$", b"\nabc\n", regex.M), None)
    expect(await re.search("^\\Aabc\\Z$", "\\nabc\\n", { backend: 'python' })).toStrictEqual(None);
  });
});
