import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_sc_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.search test 1', async () => {
    // Python: # test_scoped_and_inline_flagsdef test_scoped_and_inline_flags(self):# Issues 433028, 433024, 433027.self.assertEqual(regex.search(r"(?i)A", "a").span(), (0, 2))
    expect(await re.search("(?i)A", "a")?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 2', async () => {
    // Python: self.assertEqual(regex.search(r"(?i:A)", "a").span(), (0, 2))
    expect(await re.search("(?i:A)", "a")?.span()).toStrictEqual((0, 2);
  });

  it('regex.search test 3', async () => {
    // Python: # Changed to positional flags in regex 2023.12.23.self.assertEqual(regex.search(r"A(?i)", "a"), null)
    expect(await re.search("A(?i)", "a")).toStrictEqual(null);
  });

  it('regex.search test 4', async () => {
    // Python: self.assertEqual(regex.search(r"(?V0)A", "a"), null)
    expect(await re.search("(?V0)A", "a")).toStrictEqual(null);
  });

  it('regex.search test 5', async () => {
    // Python: self.assertEqual(regex.search(r"(?V1)A", "a"), null)
    expect(await re.search("(?V1)A", "a")).toStrictEqual(null);
  });

  it('regex.search test 6', async () => {
    // Python: self.assertEqual(regex.search(r"(?-i)A", "a", flags=regex.I), null)
    expect(await re.search("(?-i)A", "a")).toStrictEqual(null);
  });

  it('regex.search test 7', async () => {
    // Python: self.assertEqual(regex.search(r"(?-i:A)", "a", flags=regex.I), null)
    expect(await re.search("(?-i:A)", "a")).toStrictEqual(null);
  });

  it('regex.search test 8', async () => {
    // Python: self.assertEqual(regex.search(r"A(?-i)", "a", flags=regex.I).span(),(0, 2))
    expect(await re.search("A(?-i)", "a")?.span()).toStrictEqual((0, 2);
  });
});
