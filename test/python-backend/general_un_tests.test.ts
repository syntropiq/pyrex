import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_un_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: import regeximport sysimport unittestclass TestGeneralUn(unittest.TestCase):# test_unmatched_in_subdef test_unmatched_in_sub(self):# Issue 1519638.if sys.version_info >= (3, 7, 0):self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "xy"), "y-x-")
    expect(await re.sub("(?V0)(x)?(y)?", "\\2-\\1", "xy")).toBe("y-x-");
  });

  it('regex.sub test 2', async () => {
    // Python: else:self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "xy"), "y-x")
    expect(await re.sub("(?V0)(x)?(y)?", "\\2-\\1", "xy")).toBe("y-x");
  });

  it('regex.sub test 3', async () => {
    // Python: self.assertEqual(regex.sub(r"(?V1)(x)?(y)?", r"\2-\1", "xy"), "y-x-")
    expect(await re.sub("(?V1)(x)?(y)?", "\\2-\\1", "xy")).toBe("y-x-");
  });

  it('regex.sub test 4', async () => {
    // Python: if sys.version_info >= (3, 7, 0):self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "x"), "-x-")
    expect(await re.sub("(?V0)(x)?(y)?", "\\2-\\1", "x")).toBe("-x-");
  });

  it('regex.sub test 5', async () => {
    // Python: else:self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "x"), "-x")
    expect(await re.sub("(?V0)(x)?(y)?", "\\2-\\1", "x")).toBe("-x");
  });

  it('regex.sub test 6', async () => {
    // Python: self.assertEqual(regex.sub(r"(?V1)(x)?(y)?", r"\2-\1", "x"), "-x-")
    expect(await re.sub("(?V1)(x)?(y)?", "\\2-\\1", "x")).toBe("-x-");
  });

  it('regex.sub test 7', async () => {
    // Python: if sys.version_info >= (3, 7, 0):self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "y"), "y--")
    expect(await re.sub("(?V0)(x)?(y)?", "\\2-\\1", "y")).toBe("y--");
  });

  it('regex.sub test 8', async () => {
    // Python: else:self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "y"), "y-")
    expect(await re.sub("(?V0)(x)?(y)?", "\\2-\\1", "y")).toBe("y-");
  });

  it('regex.sub test 9', async () => {
    // Python: self.assertEqual(regex.sub(r"(?V1)(x)?(y)?", r"\2-\1", "y"), "y--")
    expect(await re.sub("(?V1)(x)?(y)?", "\\2-\\1", "y")).toBe("y--");
  });
});
