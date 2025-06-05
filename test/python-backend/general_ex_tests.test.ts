import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ex_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralEx(unittest.TestCase):# test_expanddef test_expand(self):self.assertEqual(regex.match("(?P<first>first) (?P<second>second)", "first second").expand(r"\2 \1 \g<second> \g<first>"),"second first second first",)
    expect(await re.match("(?P<first>first) (?P<second>second)", "first second", { backend: 'python' })?.expand(r"\2 \1 \g<second> \g<first>")).toStrictEqual("second first second first",);
  });
});
