import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_bu_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?P<unk>x)", "\\g<1>\\g<1>\\b", "xx")).toBe("xx\bxx\b");
  });

  it('test 2', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('test 3', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('test 4', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('test 5', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("\\r\\n", "\\n", "abc\\r\\ndef\\r\\n")).toBe("abc\ndef\n");
  });

  it('test 6', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?V0)x*", "-", "abxd")).toBe("-a-b--d-");
  });

  it('test 7', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?V0)x*", "-", "abxd")).toBe("-a-b-d-");
  });

  it('test 8', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("(?V1)x*", "-", "abxd")).toBe("-a-b--d-");
  });

  it('test 9', async () => {
    
    // Use PyRex's Python backend for sub
    expect(await re.subAsync("x+", "-", "abxd")).toBe("ab-d");
  });
});
