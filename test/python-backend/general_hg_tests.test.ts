import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_hg_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {
// Skipped test 1: incomplete arguments in Python: self.assertEqual(regex.sub(r"(-)", lambda m: m.expand(r"x"), "a-b-c"), "axbxc")

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*", "x", "test", { backend: 'python' })).toBe("xx");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*", "x", "test", { backend: 'python' })).toBe("x");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1).*", "x", "test", { backend: 'python' })).toBe("xx");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*?", "|", "test", { backend: 'python' })).toBe("|||||||||");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*?", "|", "test", { backend: 'python' })).toBe("|t|e|s|t|");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1).*?", "|", "test", { backend: 'python' })).toBe("|||||||||");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\g<0>", "x", { backend: 'python' })).toBe("x");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(.)", "x\\1y", "ab", { backend: 'python' })).toBe("xayxby");
  });

  it('test 10', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?r)(.)", "x\\1y", "ab", { backend: 'python' })).toBe("xayxby");
  });

  it('test 11', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?p)a*(.*?)", "\\1", "aaabbb", { backend: 'python' })).toBe("bbb");
  });

  it('test 12', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?p)a*(.*)", "\\1", "aaabbb", { backend: 'python' })).toBe("bbb");
  });
});
