import { describe, it, expect } from 'vitest';
import { re } from '../../src/index.js';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_re_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('test 1', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(.)", "\\1\\1", "x", { backend: 'python' })).toBe('xx');
  });
// Skipped test 2: incomplete arguments in Python: self.assertEqual(regex.sub('(.)', regex.escape(r"\1\1"), 'x'), r"\1\1")

  it('test 3', () => {
    
    // Use PyRex's Python backend for sub
    expect(re.sub("(.)", "\\\\1\\\\1", "x", { backend: 'python' })).toBe(r"\1\1");
  });

  it('test 4', () => {
    // Python: self.assertEqual(regex.sub('(.)', lambda m: r"\1\1", 'x'), r"\1\1")
    // Use PyRex's Python backend for sub
    expect(re.sub("(.)", // TODO: Manual conversion needed for callable replacement, "x", { backend: 'python' })).toBe(r"\1\1");
  });
});
