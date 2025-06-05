import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_qu_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: import regeximport unittestimport sysclass TestGeneralQu(unittest.TestCase):# test_qualified_re_subdef test_qualified_re_sub(self):self.assertEqual(regex.sub('a', 'b', 'aaaaa'), 'bbbbb')
    expect(await re.sub("a", "", "aaaaa")).toBe('bbbbb');
  });

  it('regex.sub test 2', async () => {
    // Python: self.assertEqual(regex.sub('a', 'b', 'aaaaa', 1), 'baaaa')
    expect(await re.sub("a", "", "aaaaa")).toBe('baaaa');
  });
});
