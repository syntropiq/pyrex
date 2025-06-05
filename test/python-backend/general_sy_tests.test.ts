import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_sy_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: # The new behaviour of unmatched but valid groups is to treat them like# empty matches in the replacement template, like in Perl.self.assertEqual(regex.sub('(?P<a>x)|(?P<b>y)', r'\g<b>', 'xx'), '')
    expect(await re.sub("(?P<a>x)|(?P<b>y)", "\\g<b>", "xx")).toBe('');
  });

  it('regex.sub test 2', async () => {
    // Python: self.assertEqual(regex.sub('(?P<a>x)|(?P<b>y)', r'\2', 'xx'), '')
    expect(await re.sub("(?P<a>x)|(?P<b>y)", "\\2", "xx")).toBe('');
  });
});
