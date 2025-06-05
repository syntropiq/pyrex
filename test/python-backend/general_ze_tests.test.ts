import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ze_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: # Issue 1647489.self.assertEqual(regex.findall("^|\w+", "foo ba"), ['', 'foo','bar'])
    expect(await re.findall("^|\\w+", "foo ba")).toStrictEqual(['', 'foo','bar']);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall("(?r)^|\w+", "foo ba"), ['bar','foo', ''])
    expect(await re.findall("(?r)^|\\w+", "foo ba")).toStrictEqual(['bar','foo', '']);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall("(?V1)^|\w+", "foo ba"), ['', 'foo','bar'])
    expect(await re.findall("(?V1)^|\\w+", "foo ba")).toStrictEqual(['', 'foo','bar']);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall("(?rV1)^|\w+", "foo ba"), ['bar','foo', ''])
    expect(await re.findall("(?rV1)^|\\w+", "foo ba")).toStrictEqual(['bar','foo', '']);
  });
});
