import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_un_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)(x)?(y)?", "\\2-\\1", "xy", { backend: 'python' })).toBe("y-x-");
  });

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)(x)?(y)?", "\\2-\\1", "xy", { backend: 'python' })).toBe("y-x");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1)(x)?(y)?", "\\2-\\1", "xy", { backend: 'python' })).toBe("y-x-");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)(x)?(y)?", "\\2-\\1", "x", { backend: 'python' })).toBe("-x-");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)(x)?(y)?", "\\2-\\1", "x", { backend: 'python' })).toBe("-x");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1)(x)?(y)?", "\\2-\\1", "x", { backend: 'python' })).toBe("-x-");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)(x)?(y)?", "\\2-\\1", "y", { backend: 'python' })).toBe("y--");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V0)(x)?(y)?", "\\2-\\1", "y", { backend: 'python' })).toBe("y-");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?V1)(x)?(y)?", "\\2-\\1", "y", { backend: 'python' })).toBe("y--");
  });
});
