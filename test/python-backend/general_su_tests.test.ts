import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_su_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\0", "x", { backend: 'python' })).toBe("\0");
  });

  it('test 2', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x00", "x", { backend: 'python' })).toBe("\000");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x01", "x", { backend: 'python' })).toBe("\001");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\008", "x", { backend: 'python' })).toBe("\0" + "8");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\009", "x", { backend: 'python' })).toBe("\0" + "9");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x49", "x", { backend: 'python' })).toBe("\111");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x4f", "x", { backend: 'python' })).toBe("\117");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x491", "x", { backend: 'python' })).toBe("\1111");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x491", "x", { backend: 'python' })).toBe("\111" + "1");
  });

  it('test 10', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\00", "x", { backend: 'python' })).toBe('\x00');
  });

  it('test 11', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\07", "x", { backend: 'python' })).toBe('\x07');
  });

  it('test 12', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\08", "x", { backend: 'python' })).toBe("\0" + "8");
  });

  it('test 13', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\09", "x", { backend: 'python' })).toBe("\0" + "9");
  });

  it('test 14', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\0a", "x", { backend: 'python' })).toBe("\0" + "a");
  });

  it('test 15', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x100", "x", { backend: 'python' })).toBe("\u0100");
  });

  it('test 16', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x1ff", "x", { backend: 'python' })).toBe("\u01FF");
  });

  it('test 17', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", br'\\x100", "x", { backend: 'python' })).toBe("\x00");
  });

  it('test 18', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", br'\\x1ff", "x", { backend: 'python' })).toBe("\xFF");
  });
});
