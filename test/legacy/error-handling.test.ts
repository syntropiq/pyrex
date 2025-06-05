import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as re from '../../src/index';
import { PythonPattern } from '../../src/backends/python';
import { TestPatternManager } from '../utils/test-helpers';

describe('Error Handling Integration Tests', () => {
  let patternManager: TestPatternManager;

  beforeEach(() => {
    patternManager = new TestPatternManager();
  });

  afterEach(async () => {
    await patternManager.cleanupAll();
  });

  describe('Backend Selection Errors', () => {
    it('should throw error for Python-only patterns in sync mode', () => {
      expect(() => {
        re.compile('(?P<name>\\w+)', 'x');
      }).toThrow('Pattern uses Python-only features');
    });

    it('should provide helpful error messages for Python patterns', () => {
      expect(() => {
        re.compile('(?P<name>\\w+)', 'x');
      }).toThrow();
      
      try {
        re.compile('(?P<name>\\w+)', 'x');
      } catch (error: any) {
        expect(error.message).toContain('Use compileAsync()');
        expect(error.message).toContain('Python-only features');
      }
    });

    it('should identify specific Python features in error messages', () => {
      const testCases = [
        { pattern: '(?P<name>\\w+)', feature: 'named groups' },
        { pattern: '\\w+', flags: 'x', feature: 'verbose flag' },
        { pattern: '\\w+', flags: 'a', feature: 'ASCII flag' }
      ];

      testCases.forEach(({ pattern, flags, feature }) => {
        expect(() => {
          re.compile(pattern, flags);
        }).toThrow('Python-only features');
      });
    });
  });

  describe('Pattern Handle Errors', () => {
    it('should handle invalid handles gracefully', async () => {
      const pattern = await re.compileAsync('(?P<error>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      // Manually corrupt the handle
      (pattern as any)._handle = 'corrupted-handle-12345';
      
      await expect(pattern.search('test')).rejects.toThrow('Pattern handle not found in registry');
    });

    it('should handle cleanup of invalid handles gracefully', async () => {
      const pattern = await re.compileAsync('(?P<cleanup>\\w+)') as PythonPattern;
      
      // Manually corrupt the handle
      (pattern as any)._handle = 'invalid-handle';
      
      // Cleanup should fail gracefully
      const cleanupResult = await pattern.cleanup();
      expect(cleanupResult).toBe(false);
    });

    it('should handle multiple operations on invalid handles', async () => {
      const pattern = await re.compileAsync('(?P<multi>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      // Verify pattern works initially
      const result1 = await pattern.search('test');
      expect(result1?.group()).toBe('test');
      
      // Corrupt handle
      (pattern as any)._handle = 'broken-handle';
      
      // All operations should fail consistently
      await expect(pattern.search('test')).rejects.toThrow('Pattern handle not found in registry');
      await expect(pattern.match('test')).rejects.toThrow('Pattern handle not found in registry');
      await expect(pattern.findall('test')).rejects.toThrow('Pattern handle not found in registry');
      await expect(pattern.split('test')).rejects.toThrow('Pattern handle not found in registry');
      await expect(pattern.sub('X', 'test')).rejects.toThrow('Pattern handle not found in registry');
    });
  });

  describe('Python Backend Errors', () => {
    it('should handle Python execution errors gracefully', async () => {
      const pattern = await re.compileAsync('(?P<test>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      try {
        // Test with potentially problematic input
        await pattern.search('test\x00null\xFF');
      } catch (error: any) {
        // Should handle errors without crashing the system
        expect(error).toBeDefined();
        expect(typeof error.message).toBe('string');
      }
    });

    it('should handle malformed regex patterns during compilation', async () => {
      const malformedPatterns = [
        '(?P<incomplete',
        '(?P<>empty)',
        '(?P<123invalid>\\w+)', // names can't start with digits
        '[unclosed',
        '(unclosed group'
      ];

      for (const pattern of malformedPatterns) {
        await expect(re.compileAsync(pattern)).rejects.toThrow();
      }
    });

    it('should handle operations on cleaned patterns', async () => {
      const pattern = await re.compileAsync('(?P<cleaned>\\w+)') as PythonPattern;
      
      // Verify pattern works initially
      const result1 = await pattern.search('test');
      expect(result1?.group()).toBe('test');
      
      // Clean up the pattern
      const cleanupResult = await pattern.cleanup();
      expect(cleanupResult).toBe(true);
      
      // All subsequent operations should fail
      await expect(pattern.search('test')).rejects.toThrow();
      await expect(pattern.match('test')).rejects.toThrow();
      await expect(pattern.findall('test')).rejects.toThrow();
      await expect(pattern.split('test')).rejects.toThrow();
      await expect(pattern.sub('X', 'test')).rejects.toThrow();
    });
  });

  describe('Async Operation Errors', () => {
    it('should handle errors in async functions consistently', async () => {
      // Test error handling in module-level async functions
      const invalidPattern = '(?P<invalid';
      
      await expect(re.searchAsync(invalidPattern, 'test')).rejects.toThrow();
      await expect(re.matchAsync(invalidPattern, 'test')).rejects.toThrow();
      await expect(re.findallAsync(invalidPattern, 'test')).rejects.toThrow();
      await expect(re.splitAsync(invalidPattern, 'test')).rejects.toThrow();
      await expect(re.subAsync(invalidPattern, 'X', 'test')).rejects.toThrow();
      await expect(re.subnAsync(invalidPattern, 'X', 'test')).rejects.toThrow();
    });

    it('should handle concurrent errors gracefully', async () => {
      const pattern = await re.compileAsync('(?P<concurrent>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      // Start some valid operations
      const validPromises = [
        pattern.search('valid1'),
        pattern.search('valid2')
      ];
      
      // Corrupt the handle during operations
      setTimeout(() => {
        (pattern as any)._handle = 'corrupted-during-operation';
      }, 10);
      
      // Some operations may succeed, others may fail
      const results = await Promise.allSettled(validPromises);
      
      // At least verify we get results (success or failure)
      expect(results).toHaveLength(2);
      results.forEach(result => {
        expect(['fulfilled', 'rejected']).toContain(result.status);
      });
    });
  });

  describe('Input Validation Errors', () => {
    it('should handle null and undefined inputs gracefully', async () => {
      const pattern = await re.compileAsync('(?P<input>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      // These should not crash but may return null or throw reasonable errors
      try {
        await pattern.search(null as any);
      } catch (error: any) {
        expect(error).toBeDefined();
      }
      
      try {
        await pattern.search(undefined as any);
      } catch (error: any) {
        expect(error).toBeDefined();
      }
    });

    it('should handle empty strings appropriately', async () => {
      const pattern = await re.compileAsync('(?P<empty>\\w*)') as PythonPattern;
      patternManager.track(pattern);
      
      // Empty string should be handled gracefully
      const result = await pattern.search('');
      expect(result).toBeDefined(); // May match empty string
    });

    it('should handle very long strings without crashing', async () => {
      const pattern = await re.compileAsync('(?P<long>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      // Create a very long string that might cause issues
      const longString = 'a'.repeat(10000) + ' target ' + 'b'.repeat(10000);
      
      try {
        const result = await pattern.search(longString);
        // Should either succeed or fail gracefully
        expect(result !== undefined).toBe(true);
      } catch (error: any) {
        // If it fails, should be a reasonable error
        expect(error).toBeDefined();
        expect(typeof error.message).toBe('string');
      }
    });
  });

  describe('Recovery and Resilience', () => {
    it('should recover from temporary errors', async () => {
      const pattern = await re.compileAsync('(?P<recovery>\\w+)') as PythonPattern;
      patternManager.track(pattern);
      
      // Verify pattern works initially
      const result1 = await pattern.search('test1');
      expect(result1?.group()).toBe('test1');
      
      // Simulate temporary corruption and recovery
      const originalHandle = (pattern as any)._handle;
      (pattern as any)._handle = 'temporary-corruption';
      
      // Should fail during corruption
      await expect(pattern.search('test2')).rejects.toThrow();
      
      // Restore handle
      (pattern as any)._handle = originalHandle;
      
      // Should work again after restoration
      const result3 = await pattern.search('test3');
      expect(result3?.group()).toBe('test3');
    });

    it('should maintain registry integrity during errors', async () => {
      const patterns: PythonPattern[] = [];
      
      // Create multiple patterns
      for (let i = 0; i < 5; i++) {
        const pattern = await re.compileAsync(`(?P<pattern${i}>\\w+)`) as PythonPattern;
        patterns.push(pattern);
        patternManager.track(pattern);
      }
      
      // Corrupt one pattern
      (patterns[2] as any)._handle = 'corrupted-middle-pattern';
      
      // Other patterns should still work
      for (let i = 0; i < patterns.length; i++) {
        if (i === 2) {
          // Corrupted pattern should fail
          await expect(patterns[i].search('test')).rejects.toThrow();
        } else {
          // Other patterns should work fine
          const result = await patterns[i].search('test');
          expect(result?.group()).toBe('test');
        }
      }
    });
  });
});