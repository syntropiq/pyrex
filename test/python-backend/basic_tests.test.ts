import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/basic_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?i)b+", "x", "bbbb BBBB", { backend: 'python' })).toBe("x x");
  });

  it('test 2', () => {
    // Python: self.assertEqual(regex.sub(".", lambda m: r"\n", "x"), "\\n")
    // Use PyRex's Python backend for sub
    expect(re.sub(".", // TODO: Manual conversion needed for callable replacement, "x", { backend: 'python' })).toBe("\\n");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub(".", "\\n", "x", { backend: 'python' })).toBe("\n");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<a>x)", "\\g<a>\\g<a>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<a>x)", "\\g<a>\\g<1>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<unk>x)", "\\g<unk>\\g<unk>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<unk>x)", "\\g<1>\\g<1>", "xx", { backend: 'python' })).toBe("xxxx");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("a", "\\t\\n\\v\\r\\f\\a\\b", "a", { backend: 'python' })).toBe("\t\n\v\r\f\a\b");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("a", "\\t\\n\\v\\r\\f\\a", "a", { backend: 'python' })).toBe("\t\n\v\r\f\a");
  });

  it('test 10', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("^\\s*", "X", "test", { backend: 'python' })).toBe("Xtest");
  });

  it('test 11', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x0A", "x", { backend: 'python' })).toBe("\n");
  });

  it('test 12', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\u000A", "x", { backend: 'python' })).toBe("\n");
  });

  it('test 13', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\U0000000A", "x", { backend: 'python' })).toBe("\n");
  });

  it('test 14', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\N{LATIN CAPITAL LETTER A}", "x", { backend: 'python' })).toBe("A");
  });

  it('test 15', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x0A", "x", { backend: 'python' })).toBe("\n");
  });
});
