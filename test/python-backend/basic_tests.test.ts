import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/basic_tests.py

describe('Python Backend - Regex (converted)', () => {

  it('test 1', async () => {
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?i)b+", "x", "bbbb BBBB")).toBe("x x");
  });

  it('test 2', async () => {
    // Python: self.assertEqual(regex.sub(".", lambda m: r"\n", "x"), "\\n")
    // Use PyRex's Python backend for sub
    // TODO: Manual conversion needed for callable replacement
    expect(await re.subAsync(".", "\\n", "x")).toBe("\\n");
  });
    // Python: self.assertEqual(regex.sub(".", lambda m: r"\n", "x"), "\\n")
    // Use PyRex's Python backend for sub
    // TODO: Manual conversion needed for callable replacement
    expect(re.subAsync(".", "\\n", "x")).resolves.toBe("\\n");
  });

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub(".", "\\n", "x")).toBe("\n");
  });

  it('test 4', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<a>x)", "\\g<a>\\g<a>", "xx")).toBe("xxxx");
  });

  it('test 5', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<a>x)", "\\g<a>\\g<1>", "xx")).toBe("xxxx");
  });

  it('test 6', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<unk>x)", "\\g<unk>\\g<unk>", "xx")).toBe("xxxx");
  });

  it('test 7', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(?P<unk>x)", "\\g<1>\\g<1>", "xx")).toBe("xxxx");
  });

  it('test 8', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("a", "\\t\\n\\v\\r\\f\\a\\b", "a")).toBe("\t\n\v\r\f\a\b");
  });

  it('test 9', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("a", "\\t\\n\\v\\r\\f\\a", "a")).toBe("\t\n\v\r\f\a");
  });

  it('test 10', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("^\\s*", "X", "test")).toBe("Xtest");
  });

  it('test 11', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x0A", "x")).toBe("\n");
  });

  it('test 12', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\u000A", "x")).toBe("\n");
  });

  it('test 13', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\U0000000A", "x")).toBe("\n");
  });

  it('test 14', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\N{LATIN CAPITAL LETTER A}", "x")).toBe("A");
  });

  it('test 15', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("x", "\\x0A", "x")).toBe("\n");
  });
});
