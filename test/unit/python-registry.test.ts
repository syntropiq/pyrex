import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as re from '../../src/index.js';
import { PythonPattern } from '../../src/backends/python.js';
import { TestPatternManager, TestPatterns, TestStrings, PythonBackendSpy } from '../utils/test-helpers.js';

describe('Python Backend Registry System (Unit Tests)', () => {
  let patternManager: TestPatternManager;

  beforeEach(() => {
    patternManager = new TestPatternManager();
  });

  afterEach(async () => {
    await patternManager.cleanupAll();
  });

  describe('Pattern Registration and Retrieval', () => {
    it('should register patterns with unique handles', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD, 'i');
      patternManager.track(pattern as PythonPattern);
      
      expect(pattern).toBeInstanceOf(PythonPattern);
      expect((pattern as PythonPattern)['_handle']).toBeDefined();
      expect(typeof (pattern as PythonPattern)['_handle']).toBe('string');
    });

    it('should generate unique handles for different patterns', async () => {
      const pattern1 = await re.compileAsync(TestPatterns.SIMPLE_NUMBER);
      const pattern2 = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      const pattern3 = await re.compileAsync(TestPatterns.EMAIL, 'i');
      
      patternManager.track(pattern1 as PythonPattern);
      patternManager.track(pattern2 as PythonPattern);
      patternManager.track(pattern3 as PythonPattern);
      
      const handles = [
        (pattern1 as PythonPattern)['_handle'],
        (pattern2 as PythonPattern)['_handle'],
        (pattern3 as PythonPattern)['_handle']
      ];
      
      expect(new Set(handles).size).toBe(3); // All handles are unique
    });

    it('should retrieve patterns correctly by handle', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      patternManager.track(pattern as PythonPattern);
      
      // Test that the pattern works (implicitly tests handle retrieval)
      const result = await pattern.search(TestStrings.HELLO_WORLD);
      expect(result).not.toBeNull();
      expect(result?.group()).toBe('hello');
    });
  });

  describe('Pattern Compilation Efficiency', () => {
    it('should prevent pattern recompilation through handle reuse', async () => {
      const spy = new PythonBackendSpy();
      
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      patternManager.track(pattern as PythonPattern);
      
      const initialCompileCalls = spy.getCompilationCalls().length;
      spy.clear();
      
      // Perform multiple operations - should not trigger recompilation
      await pattern.search('test1');
      await pattern.search('test2');
      await pattern.findall('test1 test2 test3');
      await pattern.split('test1-test2-test3');
      
      // Verify no recompilation occurred
      const newCompileCalls = spy.getCompilationCalls().length;
      expect(newCompileCalls).toBe(0);
      
      // Verify all operations used pattern retrieval
      const getPatternCalls = spy.getPatternRetrievalCalls().length;
      expect(getPatternCalls).toBeGreaterThan(0);
      
      spy.restore();
    });

    it('should store multiple patterns efficiently', async () => {
      const patterns: PythonPattern[] = [];
      const patternCount = 5;
      
      // Create multiple patterns
      for (let i = 0; i < patternCount; i++) {
        const pattern = await re.compileAsync(`(?P<group${i}>\\w{${i + 1}})`) as PythonPattern;
        patterns.push(pattern);
        patternManager.track(pattern);
      }
      
      // Verify all patterns work independently
      for (let i = 0; i < patterns.length; i++) {
        const testString = 'a'.repeat(i + 1);
        const result = await patterns[i].search(testString);
        expect(result?.group()).toBe(testString);
      }
    });
  });

  describe('Pattern Cleanup and Deregistration', () => {
    it('should clean up patterns successfully', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      
      // Verify pattern works initially
      const result1 = await pattern.search(TestStrings.HELLO_WORLD);
      expect(result1?.group()).toBe('hello');
      
      // Clean up the pattern
      const cleanupResult = await (pattern as PythonPattern).cleanup();
      expect(cleanupResult).toBe(true);
      
      // Verify pattern no longer works after cleanup
      await expect(pattern.search(TestStrings.HELLO_WORLD)).rejects.toThrow();
    });

    it('should handle cleanup of already cleaned patterns', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      
      // First cleanup should succeed
      const result1 = await (pattern as PythonPattern).cleanup();
      expect(result1).toBe(true);
      
      // Second cleanup should return false (pattern not found)
      const result2 = await (pattern as PythonPattern).cleanup();
      expect(result2).toBe(false);
    });

    it('should handle cleanup gracefully for invalid handles', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      
      // Manually corrupt the handle
      (pattern as any)._handle = 'corrupted-handle';
      
      // Cleanup should return false for corrupted handle
      const cleanupResult = await (pattern as PythonPattern).cleanup();
      expect(cleanupResult).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid handles gracefully', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      patternManager.track(pattern as PythonPattern);
      
      // Manually set an invalid handle
      (pattern as any)._handle = 'invalid-handle-12345';
      
      // Should throw error for invalid handle
      await expect(pattern.search(TestStrings.HELLO_WORLD)).rejects.toThrow('Pattern handle not found in registry');
    });

    it('should handle Python backend errors gracefully', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      patternManager.track(pattern as PythonPattern);
      
      try {
        // Test with malformed input that might cause Python errors
        await pattern.search('test\x00invalid');
      } catch (error) {
        // Should handle errors without crashing
        expect(error).toBeDefined();
      }
    });
  });

  describe('Pattern Registry Constraints', () => {
    it('should maintain pattern data integrity', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD, 'i');
      patternManager.track(pattern as PythonPattern);
      
      // Verify pattern properties are correctly set
      expect(pattern.pattern).toBe(TestPatterns.SIMPLE_WORD);
      expect(pattern.groups).toBeGreaterThan(0);
      expect(pattern.groupindex).toHaveProperty('word');
    });

    it('should handle concurrent pattern operations', async () => {
      const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD);
      patternManager.track(pattern as PythonPattern);
      
      // Perform concurrent search operations
      const searchPromises = [
        pattern.search('word1'),
        pattern.search('word2')
      ];
      
      const searchResults = await Promise.all(searchPromises);
      
      // Verify search results
      expect(searchResults[0]?.group()).toBe('word1');
      expect(searchResults[1]?.group()).toBe('word2');
      
      // Test other operations independently
      const findallResult = await pattern.findall('word1 word2 word3');
      expect(findallResult).toEqual(['word1', 'word2', 'word3']);
      
      const splitResult = await pattern.split('word1-word2-word3');
      expect(splitResult).toEqual(['', '', '', '']);
    });
  });
});