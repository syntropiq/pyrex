import { describe, it, expect } from 'vitest';
import * as re from '../src/index.js';

describe('Basic JavaScript Regex Operations', () => {
  it('should compile and search with basic patterns', () => {
    const pattern = re.compile('test');
    const result = pattern.search('this is a test string');
    
    expect(result).not.toBeNull();
    expect(result?.group()).toBe('test');
    expect(result?.start()).toBe(10);
    expect(result?.end()).toBe(14);
  });

  it('should handle case-insensitive matching', () => {
    const result = re.search('TEST', 'this is a test string', 'i');
    
    expect(result).not.toBeNull();
    expect(result?.group()).toBe('test');
  });

  it('should support groups', () => {
    const result = re.search('(\\w+)\\s+(\\w+)', 'hello world');
    
    expect(result).not.toBeNull();
    expect(result?.group()).toBe('hello world');
    expect(result?.group(1)).toBe('hello');
    expect(result?.group(2)).toBe('world');
  });

  it('should split strings', () => {
    const result = re.split('\\s+', 'hello   world   test');
    
    expect(result).toEqual(['hello', 'world', 'test']);
  });

  it('should find all matches', () => {
    const result = re.findall('\\d+', 'there are 123 and 456 numbers');
    
    expect(result).toEqual(['123', '456']);
  });

  it('should substitute text', () => {
    const result = re.sub('\\d+', 'X', 'replace 123 and 456');
    
    expect(result).toBe('replace X and X');
  });

  it('should substitute with function', () => {
    const result = re.sub('\\d+', (match) => {
      return `[${match.group()}]`;
    }, 'replace 123 and 456');
    
    expect(result).toBe('replace [123] and [456]');
  });

  it('should escape special characters', () => {
    const escaped = re.escape('hello.world?');
    const result = re.search(escaped, 'hello.world?');
    
    expect(result).not.toBeNull();
    expect(result?.group()).toBe('hello.world?');
  });
});

describe('Pattern Analysis', () => {
  it('should detect JavaScript-compatible patterns', () => {
    const analysis = re.analyze('\\d+');
    
    expect(analysis.backend).toBe('javascript');
    expect(analysis.hasPythonFeatures).toBe(false);
  });

  it('should detect Python-only patterns', () => {
    const analysis = re.analyze('(?P<name>\\w+)', 'x');
    
    expect(analysis.backend).toBe('python');
    expect(analysis.hasPythonFeatures).toBe(true);
  });

  it('should detect patterns requiring Python backend', () => {
    expect(re.requiresPython('\\d+')).toBe(false);
    expect(re.requiresPython('(?P<name>\\w+)', 'x')).toBe(true);
  });
});

describe('Error Handling', () => {
  it('should throw error for Python-only patterns in sync mode', () => {
    expect(() => {
      re.compile('(?P<name>\\w+)', 'x');
    }).toThrow('Pattern uses Python-only features');
  });

  it('should provide helpful error messages', () => {
    try {
      re.compile('(?P<name>\\w+)', 'x');
    } catch (error) {
      expect(error.message).toContain('Use compileAsync()');
    }
  });
});