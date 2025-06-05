import { describe, it, expect } from 'vitest';
import { re, IGNORECASE, I, MULTILINE, M, DOTALL, S, RegexError } from '../../src/index.js';

describe('Python Compatibility Features', () => {
  it('should export Python-style flag constants', () => {
    // Test that we have all the Python re module flag constants
    expect(re.IGNORECASE).toBe('i');
    expect(re.I).toBe('i');
    expect(re.MULTILINE).toBe('m');
    expect(re.M).toBe('m');
    expect(re.DOTALL).toBe('s');
    expect(re.S).toBe('s');
    expect(re.VERBOSE).toBe('x');
    expect(re.X).toBe('x');
    expect(re.ASCII).toBe('a');
    expect(re.A).toBe('a');
    expect(re.UNICODE).toBe('u');
    expect(re.U).toBe('u');
    expect(re.LOCALE).toBe('l');
    expect(re.L).toBe('l');
    expect(re.DEBUG).toBe('d');
    
    // Also test direct exports
    expect(IGNORECASE).toBe('i');
    expect(I).toBe('i');
    expect(MULTILINE).toBe('m');
    expect(M).toBe('m');
    expect(DOTALL).toBe('s');
    expect(S).toBe('s');
  });

  it('should provide Python-style error class', () => {
    expect(re.error).toBe(RegexError);
    expect(typeof RegexError).toBe('function');
    
    // Test error creation
    const error = new RegexError('Test error', 'invalid pattern');
    expect(error.name).toBe('RegexError');
    expect(error.message).toBe('Test error: invalid pattern');
    expect(error instanceof Error).toBe(true);
  });

  it('should handle Python-style flag usage', async () => {
    // Test case-insensitive matching using Python-style constants
    const result1 = await re.search('hello', 'HELLO WORLD', re.IGNORECASE);
    expect(result1).not.toBeNull();
    expect(result1?.group()).toBe('HELLO');
    
    // Test using short alias
    const result2 = await re.search('hello', 'HELLO WORLD', re.I);
    expect(result2).not.toBeNull();
    expect(result2?.group()).toBe('HELLO');
  });

  it('should handle multiline patterns with Python flags', async () => {
    const text = 'line1\nline2\nline3';
    
    // Test multiline flag
    const result = await re.findall('^line', text, re.MULTILINE);
    expect(result).toEqual(['line', 'line', 'line']);
  });

  it('should demonstrate real Python migration scenario', async () => {
    // Simulate typical Python regex code that someone would migrate
    // Original Python: re.sub(r'test', 'REPLACED', text, flags=re.IGNORECASE)
    
    const text = 'This is a TEST string with Test words';
    const result = await re.sub(
      'test',
      'REPLACED',
      text,
      undefined, // count
      re.IGNORECASE
    );
    
    // Should replace case-insensitively
    expect(result).toBe('This is a REPLACED string with REPLACED words');
  });

  it('should validate all essential re module exports', () => {
    // Verify the re object has all essential Python re module features
    const expectedMethods = [
      'compile', 'search', 'match', 'fullmatch', 'split', 
      'findall', 'finditer', 'sub', 'subn', 'escape'
    ];
    
    const expectedConstants = [
      'IGNORECASE', 'I', 'MULTILINE', 'M', 'DOTALL', 'S',
      'VERBOSE', 'X', 'ASCII', 'A', 'UNICODE', 'U', 'LOCALE', 'L', 'DEBUG'
    ];
    
    const expectedUtilities = ['error', 'requiresPython', 'analyze'];
    
    [...expectedMethods, ...expectedConstants, ...expectedUtilities].forEach(prop => {
      expect(re).toHaveProperty(prop);
      expect(re[prop as keyof typeof re]).toBeDefined();
    });
  });

  it('should maintain backward compatibility with legacy async functions', () => {
    // Verify legacy async aliases still exist
    expect(re.searchAsync).toBe(re.search);
    expect(re.subAsync).toBe(re.sub);
    expect(re.matchAsync).toBe(re.match);
    expect(re.splitAsync).toBe(re.split);
  });
});