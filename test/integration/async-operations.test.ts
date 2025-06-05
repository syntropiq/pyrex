import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as re from '../../src/index';
import { PythonPattern } from '../../src/backends/python';
import { TestPatternManager, TestStrings } from '../utils/test-helpers';

describe('Async Operations Integration Tests', () => {
  let patternManager: TestPatternManager;

  beforeEach(() => {
    patternManager = new TestPatternManager();
  });

  afterEach(async () => {
    await patternManager.cleanupAll();
  });

  describe('Backward Compatibility', () => {
    it('should maintain backward compatibility for all async functions', async () => {
      const testString = TestStrings.CONTACT_INFO;
      
      // Test all async functions work with Python patterns
      const searchResult = await re.searchAsync('(?P<email>[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,})', testString, 'i');
      expect(searchResult?.group()).toBe('john.doe@example.com');
      expect(searchResult?.groupdict()).toEqual({ email: 'john.doe@example.com' });
      
      const matchResult = await re.matchAsync('(?P<start>\\w+)', testString);
      expect(matchResult?.groupdict()).toEqual({ start: 'Contact' });
      
      const fullmatchResult = await re.fullmatchAsync('(?P<full>.*)', testString);
      expect(fullmatchResult?.groupdict()).toEqual({ full: testString });
      
      const splitResult = await re.splitAsync('\\s+', 'word1 word2 word3');
      expect(splitResult).toEqual(['word1', 'word2', 'word3']);
      
      const findallResult = await re.findallAsync('\\d+', testString);
      expect(findallResult).toEqual(['555', '1234']);
      
      const subResult = await re.subAsync('\\d+', 'XXX', testString);
      expect(subResult).toBe('Contact: john.doe@example.com or call XXX-XXX');
      
      const [subnResult, subnCount] = await re.subnAsync('\\d+', 'XXX', testString);
      expect(subnResult).toBe('Contact: john.doe@example.com or call XXX-XXX');
      expect(subnCount).toBe(2);
    });

    it('should handle JavaScript patterns through async interface', async () => {
      // JavaScript patterns should still work through async interface
      const result = await re.searchAsync('\\d+', 'test 123 test');
      expect(result?.group()).toBe('123');
      
      const findallResult = await re.findallAsync('\\w+', TestStrings.HELLO_WORLD);
      expect(findallResult).toEqual(['hello', 'world']);
    });

    it('should automatically detect and route patterns correctly', async () => {
      // JavaScript pattern should use JavaScript backend
      const jsResult = await re.searchAsync('\\d+', 'number 42');
      expect(jsResult?.group()).toBe('42');
      
      // Python pattern should use Python backend  
      const pythonResult = await re.searchAsync('(?P<num>\\d+)', 'number 42');
      expect(pythonResult?.group()).toBe('42');
      expect(pythonResult?.groupdict()).toEqual({ num: '42' });
    });
  });

  describe('Cross-Backend Consistency', () => {
    it('should produce consistent results across backends for compatible patterns', async () => {
      const pattern = '\\d+';
      const testString = 'test 123 test 456';
      
      // Test with JavaScript backend (sync)
      const jsResult = re.findall(pattern, testString);
      
      // Test with async interface (may use either backend)
      const asyncResult = await re.findallAsync(pattern, testString);
      
      expect(asyncResult).toEqual(jsResult);
    });

    it('should handle flag compatibility between backends', async () => {
      const pattern = 'hello';
      const testString = 'HELLO world';
      
      // JavaScript case-insensitive
      const jsResult = re.search(pattern, testString, 'i');
      
      // Async case-insensitive
      const asyncResult = await re.searchAsync(pattern, testString, 'i');
      
      expect(asyncResult?.group()).toBe(jsResult?.group());
    });
  });

  describe('Performance and Efficiency', () => {
    it('should efficiently handle mixed sync and async operations', async () => {
      const jsPattern = '\\d+';
      const pythonPattern = '(?P<num>\\d+)';
      const testString = 'number 123';
      
      const startTime = performance.now();
      
      // Mix of sync and async operations
      const jsSync = re.search(jsPattern, testString);
      const pythonAsync = await re.searchAsync(pythonPattern, testString);
      const jsFindall = re.findall(jsPattern, testString);
      const pythonFindall = await re.findallAsync(pythonPattern, testString);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete reasonably quickly
      expect(duration).toBeLessThan(2000);
      
      // Results should be consistent
      expect(jsSync?.group()).toBe('123');
      expect(pythonAsync?.group()).toBe('123');
      expect(jsFindall).toEqual(['123']);
      expect(pythonFindall).toEqual(['123']);
    });

    it('should handle concurrent async operations efficiently', async () => {
      const startTime = performance.now();
      
      const [searchResult1, searchResult2, findallResult, splitResult] = await Promise.all([
        re.searchAsync('(?P<word1>\\w+)', 'hello world'),
        re.searchAsync('(?P<word2>\\w+)', 'test string'),
        re.findallAsync('(?P<nums>\\d+)', '123 456 789'),
        re.splitAsync('\\s+', 'split this string')
      ]);
      
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(3000);
      
      expect(searchResult1?.group()).toBe('hello');
      expect(searchResult2?.group()).toBe('test');
      expect(findallResult).toEqual(['123', '456', '789']);
      expect(splitResult).toEqual(['split', 'this', 'string']);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle sync vs async error consistency', () => {
      // Python-only pattern should fail in sync mode
      expect(() => {
        re.compile('(?P<name>\\w+)', 'x');
      }).toThrow('Pattern uses Python-only features');
    });

    it('should provide helpful error messages for backend mismatches', () => {
      try {
        re.compile('(?P<name>\\w+)', 'x');
      } catch (error) {
        expect(error.message).toContain('Use compileAsync()');
      }
    });

    it('should handle async errors gracefully', async () => {
      // Test with potentially problematic input
      try {
        await re.searchAsync('(?P<test>\\w+)', 'test\x00null');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Pattern Lifecycle Integration', () => {
    it('should handle complete pattern lifecycle through async interface', async () => {
      // Creation through async interface
      const pattern = await re.compileAsync('(?P<lifecycle>\\w+)');
      patternManager.track(pattern as PythonPattern);
      
      expect(pattern).toBeInstanceOf(PythonPattern);
      
      // Usage through multiple async operations
      const searchResult = await pattern.search(TestStrings.LIFECYCLE_TEST);
      expect(searchResult?.groupdict()).toEqual({ lifecycle: 'lifecycle' });
      
      const findallResult = await pattern.findall('lifecycle1 lifecycle2 lifecycle3');
      expect(findallResult).toEqual(['lifecycle1', 'lifecycle2', 'lifecycle3']);
      
      const subResult = await pattern.sub('REPLACED', TestStrings.LIFECYCLE_TEST);
      expect(subResult).toBe('REPLACED test');
      
      // Explicit cleanup
      const cleanupResult = await (pattern as PythonPattern).cleanup();
      expect(cleanupResult).toBe(true);
      
      // Verify cleanup worked
      await expect(pattern.search('test')).rejects.toThrow();
    });

    it('should handle automatic cleanup through test infrastructure', async () => {
      const pattern1 = await re.compileAsync('(?P<auto1>\\w+)');
      const pattern2 = await re.compileAsync('(?P<auto2>\\d+)');
      
      patternManager.track(pattern1 as PythonPattern);
      patternManager.track(pattern2 as PythonPattern);
      
      // Verify patterns work
      const result1 = await pattern1.search('test');
      const result2 = await pattern2.search('123');
      
      expect(result1?.group()).toBe('test');
      expect(result2?.group()).toBe('123');
      
      expect(patternManager.getTrackedCount()).toBe(2);
      
      // Cleanup will happen automatically in afterEach
    });
  });
});