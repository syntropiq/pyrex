import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_un_tests.py

describe('Python Backend - Regex (converted)', () => {

  it('test 1', async () => {
    
    // Use PyRex's Python backend for sub (patterns with (?V0) automatically use Python backend)
    const result = await re.subAsync("(?V0)(x)?(y)?", "\\2-\\1", "xy");
    expect(result).toBe("y-x-");
  });

  it('test 2', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V0)(x)?(y)?", "\\2-\\1", "xy");
    expect(result).toBe("y-x");
  });

  it('test 3', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V1)(x)?(y)?", "\\2-\\1", "xy");
    expect(result).toBe("y-x-");
  });

  it('test 4', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V0)(x)?(y)?", "\\2-\\1", "x");
    expect(result).toBe("-x-");
  });

  it('test 5', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V0)(x)?(y)?", "\\2-\\1", "x");
    expect(result).toBe("-x");
  });

  it('test 6', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V1)(x)?(y)?", "\\2-\\1", "x");
    expect(result).toBe("-x-");
  });

  it('test 7', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V0)(x)?(y)?", "\\2-\\1", "y");
    expect(result).toBe("y--");
  });

  it('test 8', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V0)(x)?(y)?", "\\2-\\1", "y");
    expect(result).toBe("y-");
  });

  it('test 9', async () => {
    
    // Use PyRex's Python backend for sub
    const result = await re.subAsync("(?V1)(x)?(y)?", "\\2-\\1", "y");
    expect(result).toBe("y--");
  });
});
