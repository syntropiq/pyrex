import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_ze_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.findall test 1', async () => {
    // Python: # Issue 1647489.self.assertEqual(regex.findall(r"^|\w+", "foo bar"), ['', 'foo','bar'])
    expect(await re.findall("^|\\w+", "foo bar", { backend: 'python' })).toStrictEqual(['', 'foo','bar']);
  });

  it('regex.findall test 2', async () => {
    // Python: self.assertEqual(regex.findall(r"(?r)^|\w+", "foo bar"), ['bar','foo', ''])
    expect(await re.findall("(?r)^|\\w+", "foo bar", { backend: 'python' })).toStrictEqual(['bar','foo', '']);
  });

  it('regex.findall test 3', async () => {
    // Python: self.assertEqual(regex.findall(r"(?V1)^|\w+", "foo bar"), ['', 'foo','bar'])
    expect(await re.findall("(?V1)^|\\w+", "foo bar", { backend: 'python' })).toStrictEqual(['', 'foo','bar']);
  });

  it('regex.findall test 4', async () => {
    // Python: self.assertEqual(regex.findall(r"(?rV1)^|\w+", "foo bar"), ['bar','foo', ''])
    expect(await re.findall("(?rV1)^|\\w+", "foo bar", { backend: 'python' })).toStrictEqual(['bar','foo', '']);
  });
});
