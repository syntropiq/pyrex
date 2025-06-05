import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as re from '../../src/index.js';
import { PythonPattern } from '../../src/backends/python.js';
import { TestPatternManager, TestPatterns, TestStrings } from '../utils/test-helpers.js';

describe('Python Pattern Operations (Unit Tests)', () => {
  let patternManager: TestPatternManager;
  let testPattern: PythonPattern;

  beforeEach(async () => {
    patternManager = new TestPatternManager();
    testPattern = patternManager.track(await re.compileAsync(TestPatterns.SIMPLE_WORD) as PythonPattern);
  });

  afterEach(async () => {
    await patternManager.cleanupAll();
  });

  describe('Search Operations', () => {
    it('should handle search operations correctly', async () => {
      const result = await testPattern.search(TestStrings.HELLO_WORLD);
      expect(result?.group()).toBe('hello');
      expect(result?.groupdict()).toEqual({ word: 'hello' });
      expect(result?.start()).toBe(0);
      expect(result?.end()).toBe(5);
    });

    it('should handle search with position parameters', async () => {
      const result = await testPattern.search(TestStrings.HELLO_WORLD, 6);
      expect(result?.group()).toBe('world');
      expect(result?.start()).toBe(6);
      expect(result?.end()).toBe(11);
    });

    it('should return null when no match found', async () => {
      const result = await testPattern.search('123 456');
      expect(result).toBeNull();
    });
  });

  describe('Match Operations', () => {
    it('should handle match operations correctly', async () => {
      const result = await testPattern.match(TestStrings.HELLO_WORLD);
      expect(result?.group()).toBe('hello');
    });

    it('should return null when pattern does not match at start', async () => {
      const noMatch = await testPattern.match(' hello');
      expect(noMatch).toBeNull();
    });
  });

  describe('Fullmatch Operations', () => {
    it('should handle fullmatch operations correctly', async () => {
      const singleWordPattern = patternManager.track(await re.compileAsync(TestPatterns.SIMPLE_WORD) as PythonPattern);
      const result = await singleWordPattern.fullmatch('hello');
      expect(result?.group()).toBe('hello');
    });

    it('should return null when pattern does not match entire string', async () => {
      const result = await testPattern.fullmatch(TestStrings.HELLO_WORLD);
      expect(result).toBeNull();
    });
  });

  describe('Split Operations', () => {
    it('should handle split operations correctly', async () => {
      const splitPattern = patternManager.track(await re.compileAsync('[,\\s]+') as PythonPattern);
      const result = await splitPattern.split('a,b c,d');
      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should handle split with maxsplit parameter', async () => {
      const splitPattern = patternManager.track(await re.compileAsync('\\s+') as PythonPattern);
      const result = await splitPattern.split('a b c d', 2);
      expect(result).toEqual(['a', 'b', 'c d']);
    });
  });

  describe('Findall Operations', () => {
    it('should handle findall operations correctly', async () => {
      const result = await testPattern.findall('hello world test');
      expect(result).toEqual(['hello', 'world', 'test']);
    });

    it('should return empty array when no matches found', async () => {
      const result = await testPattern.findall('123 456');
      expect(result).toEqual([]);
    });
  });

  describe('Finditer Operations', () => {
    it('should handle finditer operations correctly', async () => {
      const matches: string[] = [];
      for await (const match of testPattern.finditer('hello world test')) {
        const group = match.group();
        if (group) {
          matches.push(group);
        }
      }
      expect(matches).toEqual(['hello', 'world', 'test']);
    });

    it('should handle empty finditer results', async () => {
      const matches: string[] = [];
      for await (const match of testPattern.finditer('123 456')) {
        matches.push(match.group() || '');
      }
      expect(matches).toEqual([]);
    });
  });

  describe('Substitution Operations', () => {
    it('should handle sub operations with string replacement', async () => {
      const result = await testPattern.sub('X', TestStrings.HELLO_WORLD);
      expect(result).toBe('X X');
    });

    it('should handle sub operations with function replacement', async () => {
      const funcResult = await testPattern.sub((match) => `[${match.group()}]`, TestStrings.HELLO_WORLD);
      expect(funcResult).toBe('[hello] [world]');
    });

    it('should handle sub operations with count limit', async () => {
      const result = await testPattern.sub('X', 'hello world test', 1);
      expect(result).toBe('X world test');
    });

    it('should handle subn operations correctly', async () => {
      const [result, count] = await testPattern.subn('X', TestStrings.HELLO_WORLD);
      expect(result).toBe('X X');
      expect(count).toBe(2);
    });

    it('should handle subn with function replacement', async () => {
      const [result, count] = await testPattern.subn((match) => `[${match.group()}]`, TestStrings.HELLO_WORLD);
      expect(result).toBe('[hello] [world]');
      expect(count).toBe(2);
    });
  });

  describe('Complex Pattern Operations', () => {
    it('should handle email pattern correctly', async () => {
      const emailPattern = patternManager.track(await re.compileAsync(TestPatterns.EMAIL, 'i') as PythonPattern);
      const result = await emailPattern.search(TestStrings.CONTACT_INFO);
      
      expect(result?.group()).toBe('john.doe@example.com');
      expect(result?.groupdict()).toEqual({ email: 'john.doe@example.com' });
    });

    it('should handle nested groups correctly', async () => {
      const complexPattern = patternManager.track(await re.compileAsync(TestPatterns.COMPLEX_EMAIL, 'i') as PythonPattern);
      const result = await complexPattern.search(TestStrings.CONTACT_INFO);
      
      expect(result?.groupdict()).toEqual({
        email: 'john.doe@example.com',
        user: 'john.doe',
        domain: 'example',
        tld: 'com'
      });
    });

    it('should handle multiple group types', async () => {
      const mixedPattern = patternManager.track(await re.compileAsync('(?P<word>\\w+)\\s+(\\d+)') as PythonPattern);
      const result = await mixedPattern.search('hello 123');
      
      expect(result?.group()).toBe('hello 123');
      expect(result?.group(1)).toBe('hello');
      expect(result?.group(2)).toBe('123');
      expect(result?.groupdict()).toEqual({ word: 'hello' });
    });
  });

  describe('Flag Handling', () => {
    it('should handle case-insensitive flag', async () => {
      const casePattern = patternManager.track(await re.compileAsync(TestPatterns.CASE_INSENSITIVE, 'i') as PythonPattern);
      const result = await casePattern.search(TestStrings.CASE_TEST);
      
      expect(result?.group()).toBe('HELLO');
      expect(result?.groupdict()).toEqual({ case: 'HELLO' });
    });

    it('should handle multiline flag', async () => {
      const multilinePattern = patternManager.track(await re.compileAsync(TestPatterns.MULTILINE, 'm') as PythonPattern);
      const result = await multilinePattern.search(TestStrings.MULTILINE_TEXT);
      
      expect(result?.group()).toBe('test');
      expect(result?.groupdict()).toEqual({ multi: 'test' });
    });

    it('should handle dotall flag', async () => {
      const dotallPattern = patternManager.track(await re.compileAsync(TestPatterns.DOTALL, 's') as PythonPattern);
      const result = await dotallPattern.search(TestStrings.DOTALL_TEXT);
      
      expect(result?.group()).toBe('a\nb');
      expect(result?.groupdict()).toEqual({ dotall: 'a\nb' });
    });
  });
});