import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_se_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(.)", "\\1", "abc")).toBe("abc");
  });

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?r)(.)", "\\1", "abc")).toBe("abc");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)([][])", "-", "a[b]c")).toBe("a-b-c");
  });
});
