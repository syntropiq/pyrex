import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';

describe('JavaScript Regex Operations (Unit Tests)', () => {
  describe('Basic Pattern Compilation and Search', () => {
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

    it('should return null for non-matching patterns', () => {
      const result = re.search('notfound', 'this is a test string');
      expect(result).toBeNull();
    });
  });

  describe('Group Handling', () => {
    it('should support basic groups', () => {
      const result = re.search('(\\w+)\\s+(\\w+)', 'hello world');
      
      expect(result).not.toBeNull();
      expect(result?.group()).toBe('hello world');
      expect(result?.group(1)).toBe('hello');
      expect(result?.group(2)).toBe('world');
    });

    it('should handle multiple group access', () => {
      const result = re.search('(\\w+)\\s+(\\w+)\\s+(\\w+)', 'one two three');
      
      expect(result).not.toBeNull();
      const groups = result?.group(1, 2, 3) as string[];
      expect(groups).toEqual(['one', 'two', 'three']);
    });

    it('should return null for non-existent groups', () => {
      const result = re.search('(\\w+)', 'hello');
      
      expect(result).not.toBeNull();
      expect(result?.group(2)).toBeNull();
    });
  });

  describe('String Operations', () => {
    it('should split strings correctly', () => {
      const result = re.split('\\s+', 'hello   world   test');
      expect(result).toEqual(['hello', 'world', 'test']);
    });

    it('should find all matches', () => {
      const result = re.findall('\\d+', 'there are 123 and 456 numbers');
      expect(result).toEqual(['123', '456']);
    });

    it('should handle empty findall results', () => {
      const result = re.findall('\\d+', 'no numbers here');
      expect(result).toEqual([]);
    });
  });

  describe('Text Substitution', () => {
    it('should substitute text with strings', () => {
      const result = re.sub('\\d+', 'X', 'replace 123 and 456');
      expect(result).toBe('replace X and X');
    });

    it('should substitute with function replacements', () => {
      const result = re.sub('\\d+', (match) => {
        return `[${match.group()}]`;
      }, 'replace 123 and 456');
      
      expect(result).toBe('replace [123] and [456]');
    });

    it('should handle substitution with no matches', () => {
      const result = re.sub('\\d+', 'X', 'no numbers here');
      expect(result).toBe('no numbers here');
    });
  });

  describe('Special Character Handling', () => {
    it('should escape special characters', () => {
      const escaped = re.escape('hello.world?');
      const result = re.search(escaped, 'hello.world?');
      
      expect(result).not.toBeNull();
      expect(result?.group()).toBe('hello.world?');
    });

    it('should not match unescaped special characters literally', () => {
      const result = re.search('hello.world', 'helloXworld');
      expect(result).not.toBeNull(); // . matches X
      
      const escapedResult = re.search(re.escape('hello.world'), 'helloXworld');
      expect(escapedResult).toBeNull(); // Escaped . doesn't match X
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      const result = re.search('test', '');
      expect(result).toBeNull();
    });

    it('should handle empty patterns', () => {
      const result = re.search('', 'test string');
      expect(result).not.toBeNull();
      expect(result?.group()).toBe('');
      expect(result?.start()).toBe(0);
    });

    it('should handle patterns with no groups', () => {
      const result = re.search('test', 'this is a test');
      expect(result).not.toBeNull();
      expect(result?.groups()).toEqual([]);
    });
  });
});