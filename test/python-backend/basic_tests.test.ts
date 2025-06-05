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
    expect(await re.subAsync(".", "\\n", "x")).toBe("\\n");
  });

  it('test 3', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync(".", "\\n", "x")).toBe("\n");
  });

  it('test 4', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?P<a>x)", "\\g<a>\\g<a>", "xx")).toBe("xxxx");
  });

  it('test 5', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?P<a>x)", "\\g<a>\\g<1>", "xx")).toBe("xxxx");
  });

  it('test 6', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?P<unk>x)", "\\g<unk>\\g<unk>", "xx")).toBe("xxxx");
  });

  it('test 7', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?P<unk>x)", "\\g<1>\\g<1>", "xx")).toBe("xxxx");
  });

  it('test 8', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("a", "\\t\\n\\v\\r\\f\\a\\b", "a")).toBe("\t\n\v\r\f\a\b");
  });

  it('test 9', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("a", "\\t\\n\\v\\r\\f\\a", "a")).toBe("\t\n\v\r\f\a");
  });

  it('test 10', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("^\\s*", "X", "test")).toBe("Xtest");
  });

  it('test 11', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("x", "\\x0A", "x")).toBe("\n");
  });

  it('test 12', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("x", "\\u000A", "x")).toBe("\n");
  });

  it('test 13', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("x", "\\U0000000A", "x")).toBe("\n");
  });

  it('test 14', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("x", "\\N{LATIN CAPITAL LETTER A}", "x")).toBe("A");
  });

  it('test 15', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("x", "\\x0A", "x")).toBe("\n");
  });
});
