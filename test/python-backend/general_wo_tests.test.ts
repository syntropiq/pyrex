import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_wo_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralWo(unittest.TestCase):# test_word_classdef test_word_class(self):self.assertEqual(regex.findall(r"\w+", " \u0939\u093f\u0928\u094d\u0926\u0940,"),["\u0939\u093f\u0928\u094d\u0926\u0940"],)
    expect(await re.findall("\\w+", " \\u0939\\u093f\\u0928\\u094d\\u0926\\u0940)).toStrictEqual(["\u0939\u093f\u0928\u094d\u0926\u0940"],);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(r"\W+", " \u0939\u093f\u0928\u094d\u0926\u0940,"), [" ", ","])
    expect(await re.findall("\\W+", " \\u0939\\u093f\\u0928\\u094d\\u0926\\u0940)).toStrictEqual([" ", ","]);
  });
});
