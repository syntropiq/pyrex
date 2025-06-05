import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_bu_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<unk>x)", "\\g<1>\\g<1>\\b", "xx", { backend: 'python' })).toBe("xx\bxx\b");
  });

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n", { backend: 'python' })).toBe("abc\ndef\n");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n", { backend: 'python' })).toBe("abc\ndef\n");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n", { backend: 'python' })).toBe("abc\ndef\n");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n", { backend: 'python' })).toBe("abc\ndef\n");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)x*", "-", "abxd", { backend: 'python' })).toBe("-a-b--d-");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)x*", "-", "abxd", { backend: 'python' })).toBe("-a-b-d-");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1)x*", "-", "abxd", { backend: 'python' })).toBe("-a-b--d-");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x+", "-", "abxd", { backend: 'python' })).toBe("ab-d");
  });
});
