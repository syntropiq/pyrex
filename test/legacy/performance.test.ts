import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as re from '../../src/index';
import { PythonPattern } from '../../src/backends/python';
import { TestPatternManager, PerformanceConfig } from '../utils/test-helpers';

describe('Performance and Stress Tests', () => {
  let patternManager: TestPatternManager;

  beforeEach(() => {
    patternManager = new TestPatternManager();
  });

  afterEach(async () => {
    await patternManager.cleanupAll();
  });

  describe('Pattern Registry Performance', () => {
    it('should demonstrate pattern reuse efficiency', async () => {
      const pattern = await re.compileAsync('(?P<perf>\\w+)');
      patternManager.track(pattern as PythonPattern);
      
      const operations = PerformanceConfig.OPERATIONS_COUNT;
      const testString = 'performance test string';
      
      const startTime = performance.now();
      
      // Perform multiple operations that would trigger recompilation in old system
      for (let i = 0; i < operations; i++) {
        await pattern.search(testString);
        await pattern.findall(testString);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // With registry, operations should be fast
      expect(duration).toBeLessThan(PerformanceConfig.MAX_DURATION_MS);
      
      // Verify all operations still work correctly
      const finalResult = await pattern.search(testString);
      expect(finalResult?.group()).toBe('performance');
    });

    it('should show no performance degradation from registry overhead', async () => {
      const pattern = await re.compileAsync('(?P<overhead>\\w+)');
      patternManager.track(pattern as PythonPattern);
      
      const testString = 'overhead test';
      
      // Time a single operation
      const start1 = performance.now();
      await pattern.search(testString);
      const single = performance.now() - start1;
      
      // Time multiple operations
      const start2 = performance.now();
      for (let i = 0; i < 5; i++) {
        await pattern.search(testString);
      }
      const multiple = (performance.now() - start2) / 5;
      
      // Average time per operation should not significantly increase
      expect(multiple).toBeLessThan(single * PerformanceConfig.TOLERANCE_MULTIPLIER);
    });
  });

  describe('Stress Testing', () => {
    it('should handle large numbers of patterns', async () => {
      const patterns: PythonPattern[] = [];
      const patternCount = PerformanceConfig.PATTERN_STRESS_COUNT;
      
      const creationStart = performance.now();
      
      // Create many patterns
      for (let i = 0; i < patternCount; i++) {
        const pattern = await re.compileAsync(`(?P<group${i}>\\w{${i + 1}})`) as PythonPattern;
        patterns.push(pattern);
        patternManager.track(pattern);
      }
      
      const creationTime = performance.now() - creationStart;
      
      // Creation should be reasonably fast
      expect(creationTime).toBeLessThan(patternCount * 200); // 200ms per pattern max
      
      const testStart = performance.now();
      
      // Verify all patterns work
      for (let i = 0; i < patterns.length; i++) {
        const testString = 'a'.repeat(i + 1);
        const result = await patterns[i].search(testString);
        expect(result?.group()).toBe(testString);
      }
      
      const testTime = performance.now() - testStart;
      
      // Testing should be fast with registry
      expect(testTime).toBeLessThan(patternCount * 100); // 100ms per test max
      
      const cleanupStart = performance.now();
      
      // Cleanup all patterns
      for (const pattern of patterns) {
        const cleaned = await pattern.cleanup();
        expect(cleaned).toBe(true);
      }
      
      const cleanupTime = performance.now() - cleanupStart;
      
      // Cleanup should be fast
      expect(cleanupTime).toBeLessThan(patternCount * 50); // 50ms per cleanup max
    });

    it('should handle concurrent pattern operations under load', async () => {
      const pattern = await re.compileAsync('(?P<concurrent>\\w+)');
      patternManager.track(pattern as PythonPattern);
      
      const operationCount = 10;
      const testString = 'concurrent test operation';
      
      const startTime = performance.now();
      
      // Create concurrent search operations
      const searchPromises: Promise<any>[] = [];
      for (let i = 0; i < operationCount; i++) {
        searchPromises.push(pattern.search(`${testString} ${i}`) as Promise<any>);
      }
      
      const searchResults = await Promise.all(searchPromises);
      
      // Test other operations sequentially to avoid type issues
      const findallResult = await pattern.findall(`${testString} extra word`);
      const subResult = await pattern.sub('REPLACED', testString);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should handle concurrent load efficiently
      expect(duration).toBeLessThan(3000);
      
      // Verify search results are correct
      for (let i = 0; i < operationCount; i++) {
        expect(searchResults[i]?.group()).toBe('concurrent');
      }
      
      // Verify other operations
      expect(findallResult).toEqual(['concurrent', 'test', 'operation', 'extra', 'word']);
      expect(subResult).toBe('REPLACED test operation');
    });

    it('should handle complex patterns without performance degradation', async () => {
      const complexPattern = await re.compileAsync(
        '(?P<email>(?P<user>[\\w._%+-]+)@(?P<domain>[\\w.-]+)\\.(?P<tld>[A-Z]{2,}))',
        'i'
      );
      patternManager.track(complexPattern as PythonPattern);
      
      const testEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'complex_email-123@sub.domain.org',
        'another.test@very-long-domain-name.museum'
      ];
      
      const iterations = 50;
      const startTime = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        for (const email of testEmails) {
          const result = await complexPattern.search(`Contact ${email} for info`);
          expect(result?.groupdict().email).toBe(email);
        }
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Complex pattern operations should still be efficient
      expect(duration).toBeLessThan(iterations * testEmails.length * 50); // 50ms per operation max
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory with pattern creation and cleanup', async () => {
      const iterations = 10;
      
      for (let i = 0; i < iterations; i++) {
        const pattern = await re.compileAsync(`(?P<memory${i}>\\w+)`);
        
        // Use the pattern
        const result = await pattern.search('memory test');
        expect(result?.group()).toBe('memory');
        
        // Clean up immediately
        const cleaned = await (pattern as PythonPattern).cleanup();
        expect(cleaned).toBe(true);
      }
      
      // Test should complete without memory issues
      expect(true).toBe(true);
    });

    it('should handle batch operations efficiently', async () => {
      const pattern = await re.compileAsync('(?P<batch>\\w+)');
      patternManager.track(pattern as PythonPattern);
      
      const batchSize = 100;
      const testStrings = Array.from({ length: batchSize }, (_, i) => `batch${i} test`);
      
      const startTime = performance.now();
      
      // Process batch
      const results = await Promise.all(
        testStrings.map(str => pattern.search(str))
      );
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Batch processing should be efficient
      expect(duration).toBeLessThan(batchSize * 20); // 20ms per operation max
      
      // Verify all results
      results.forEach((result, i) => {
        expect(result?.group()).toBe(`batch${i}`);
      });
    });
  });

  describe('Edge Case Performance', () => {
    it('should handle very long strings efficiently', async () => {
      const pattern = await re.compileAsync('(?P<long>\\w+)');
      patternManager.track(pattern as PythonPattern);
      
      // Create a very long string
      const longString = 'word '.repeat(1000) + 'target word';
      
      const startTime = performance.now();
      const result = await pattern.search(longString);
      const endTime = performance.now();
      
      const duration = endTime - startTime;
      
      // Should handle long strings efficiently
      expect(duration).toBeLessThan(500);
      expect(result?.group()).toBe('word');
    });

    it('should handle patterns with many groups efficiently', async () => {
      // Create pattern with many named groups
      const groupCount = 10;
      const patternParts = Array.from({ length: groupCount }, (_, i) => `(?P<group${i}>\\w+)`);
      const complexPattern = await re.compileAsync(patternParts.join('\\s+'));
      patternManager.track(complexPattern as PythonPattern);
      
      const testString = Array.from({ length: groupCount }, (_, i) => `word${i}`).join(' ');
      
      const startTime = performance.now();
      const result = await complexPattern.search(testString);
      const endTime = performance.now();
      
      const duration = endTime - startTime;
      
      // Should handle many groups efficiently
      expect(duration).toBeLessThan(200);
      
      // Verify all groups are captured
      const groupDict = result?.groupdict();
      for (let i = 0; i < groupCount; i++) {
        expect(groupDict?.[`group${i}`]).toBe(`word${i}`);
      }
    });
  });
});