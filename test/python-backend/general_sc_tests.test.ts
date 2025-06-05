import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_sc_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: # test_scoped_and_inline_flagsdef test_scoped_and_inline_flags(self):# Issues 433028, 433024, 433027.self.assertEqual(regex.search(r"(?i)Ab", "ab").span(), (0, 2))
    expect(await re.search("(?i)Ab", "ab", { backend: 'python' })?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search(r"(?i:A)b", "ab").span(), (0, 2))
    expect(await re.search("(?i:A)b", "ab", { backend: 'python' })?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 3', async () => {
    // Python: # Changed to positional flags in regex 2023.12.23.self.assertEqual(regex.search(r"A(?i)b", "ab"), None)
    expect(await re.search("A(?i)b", "ab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search(r"(?V0)Ab", "ab"), None)
    expect(await re.search("(?V0)Ab", "ab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 5', async () => {
    // Python: self.assertEqual(regex.search(r"(?V1)Ab", "ab"), None)
    expect(await re.search("(?V1)Ab", "ab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 6', async () => {
    // Python: self.assertEqual(regex.search(r"(?-i)Ab", "ab", flags=regex.I), None)
    expect(await re.search("(?-i)Ab", "ab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search(r"(?-i:A)b", "ab", flags=regex.I), None)
    expect(await re.search("(?-i:A)b", "ab", { backend: 'python' })).toStrictEqual(None);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search(r"A(?-i)b", "ab", flags=regex.I).span(),(0, 2))
    expect(await re.search("A(?-i)b", "ab", { backend: 'python' })?.span()).toStrictEqual((0, 2);
  });
});
