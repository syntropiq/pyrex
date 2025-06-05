import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_at_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralAt(unittest.TestCase):# test_atomicdef test_atomic(self):# Issue 433030.self.assertEqual(regex.search(r"(?>a*)a", "aa"), null)
    expect(await re.search("(?>a*)a", "aa")).toStrictEqual(null);
  });
});
