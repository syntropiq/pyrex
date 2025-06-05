import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_fo_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.match test 1', async () => {
    // Python: self.assertEqual(regex.match(r"(\w+) (\w+)", "foo bar").expandf("{0} => {2} {1}"),"foo bar => bar foo",)
    expect(await re.match("(\\w+) (\\w+)", "foo bar", { backend: 'python' })?.expandf("{0} => {2} {1}")).toStrictEqual("foo bar => bar foo",);
  });
});
