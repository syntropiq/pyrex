import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_qu_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("a", "b", "aaaaa", { backend: 'python' })).toBe('bbbbb');
  });

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("a", "b", "aaaaa", { backend: 'python' })).toBe('baaaa');
  });
});
