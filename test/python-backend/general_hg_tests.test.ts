import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_hg_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {
// Skipped test 1: incomplete arguments in Python: self.assertEqual(regex.sub(r"(-)", lambda m: m.expand(r"x"), "a-b-c"), "axbxc")

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*", "x", "test")).toBe("xx");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*", "x", "test")).toBe("x");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1).*", "x", "test")).toBe("xx");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*?", "|", "test")).toBe("|||||||||");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0).*?", "|", "test")).toBe("|t|e|s|t|");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1).*?", "|", "test")).toBe("|||||||||");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\g<0>", "x")).toBe("x");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(.)", "x\\1y", "ab")).toBe("xayxby");
  });

  it('test 10', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?r)(.)", "x\\1y", "ab")).toBe("xayxby");
  });

  it('test 11', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?p)a*(.*?)", "\\1", "aaabbb")).toBe("bbb");
  });

  it('test 12', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?p)a*(.*)", "\\1", "aaabbb")).toBe("bbb");
  });
});
