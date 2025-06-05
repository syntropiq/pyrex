import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as re from '../src/index';
import { PythonBackend, PythonPattern } from '../src/backends/python';

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

describe('Python Backend Registry System', () => {
  let createdPatterns: PythonPattern[] = [];

  beforeEach(() => {
    createdPatterns = [];
  });

  afterEach(async () => {
    // Cleanup all patterns created during tests
    for (const pattern of createdPatterns) {
      try {
        await pattern.cleanup();
      } catch (error) {
        // Ignore cleanup errors in tests
      }
    }
    createdPatterns = [];
  });

  describe('Pattern Registry Core Functionality', () => {
    it('should register and retrieve patterns by handle', async () => {
      const pattern = await re.compileAsync('(?P<word>\\w+)', 'i');
      createdPatterns.push(pattern as PythonPattern);
      
      expect(pattern).toBeInstanceOf(PythonPattern);
      expect((pattern as PythonPattern)['_handle']).toBeDefined();
      expect(typeof (pattern as PythonPattern)['_handle']).toBe('string');
      
      // Test that the pattern works
      const result = await pattern.search('Hello World');
      expect(result).not.toBeNull();
      expect(result?.group()).toBe('Hello');
      expect(result?.groupdict()).toEqual({ word: 'Hello' });
    });

    it('should allow multiple patterns to be stored simultaneously', async () => {
      const pattern1 = await re.compileAsync('(?P<num>\\d+)');
      const pattern2 = await re.compileAsync('(?P<word>\\w+)');
      const pattern3 = await re.compileAsync('(?P<email>[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,})', 'i');
      
      createdPatterns.push(pattern1 as PythonPattern, pattern2 as PythonPattern, pattern3 as PythonPattern);
      
      // All patterns should have unique handles
      const handles = [
        (pattern1 as PythonPattern)['_handle'],
        (pattern2 as PythonPattern)['_handle'],
        (pattern3 as PythonPattern)['_handle']
      ];
      
      expect(new Set(handles).size).toBe(3); // All handles are unique
      
      // All patterns should work independently
      const testString = 'Contact: john.doe@example.com or call 555-1234';
      
      const numResult = await pattern1.search(testString);
      expect(numResult?.group()).toBe('555');
      expect(numResult?.groupdict()).toEqual({ num: '555' });
      
      const wordResult = await pattern2.search(testString);
      expect(wordResult?.group()).toBe('Contact');
      expect(wordResult?.groupdict()).toEqual({ word: 'Contact' });
      
      const emailResult = await pattern3.search(testString);
      expect(emailResult?.group()).toBe('john.doe@example.com');
      expect(emailResult?.groupdict()).toEqual({ email: 'john.doe@example.com' });
    });

    it('should prevent pattern recompilation through handle reuse', async () => {
      const spy = vi.spyOn(PythonBackend, 'runPython');
      
      const pattern = await re.compileAsync('(?P<test>\\w+)');
      createdPatterns.push(pattern as PythonPattern);
      
      const compileCalls = spy.mock.calls.filter(call =>
        call[0].includes('re.compile') && call[0].includes('register_pattern')
      ).length;
      
      // Clear spy to count only subsequent operations
      spy.mockClear();
      
      // Perform multiple operations - should not trigger recompilation
      await pattern.search('test1');
      await pattern.search('test2');
      await pattern.findall('test1 test2 test3');
      await pattern.split('test1-test2-test3');
      
      // Verify no recompilation occurred
      const newCompileCalls = spy.mock.calls.filter(call =>
        call[0].includes('re.compile') && call[0].includes('register_pattern')
      ).length;
      
      expect(newCompileCalls).toBe(0);
      
      // Verify all operations used get_pattern
      const getPatternCalls = spy.mock.calls.filter(call =>
        call[0].includes('get_pattern')
      ).length;
      
      expect(getPatternCalls).toBeGreaterThan(0);
      
      spy.mockRestore();
    });

    it('should handle pattern cleanup and deregistration', async () => {
      const pattern = await re.compileAsync('(?P<cleanup>\\w+)');
      const handle = (pattern as PythonPattern)['_handle'];
      
      // Verify pattern works initially
      const result1 = await pattern.search('cleanup');
      expect(result1?.group()).toBe('cleanup');
      
      // Clean up the pattern
      const cleanupResult = await (pattern as PythonPattern).cleanup();
      expect(cleanupResult).toBe(true);
      
      // Verify pattern no longer works after cleanup
      await expect(pattern.search('cleanup')).rejects.toThrow();
    });

    it('should handle invalid handles gracefully', async () => {
      const pattern = await re.compileAsync('(?P<invalid>\\w+)');
      createdPatterns.push(pattern as PythonPattern);
      
      // Manually set an invalid handle
      (pattern as any)._handle = 'invalid-handle-12345';
      
      // Should throw error for invalid handle
      await expect(pattern.search('test')).rejects.toThrow('Pattern handle not found in registry');
    });
  });

  describe('Pattern Lifecycle Management', () => {
    it('should handle pattern creation, usage, and cleanup lifecycle', async () => {
      // Creation
      const pattern = await re.compileAsync('(?P<lifecycle>\\w+)');
      expect(pattern).toBeInstanceOf(PythonPattern);
      
      // Usage - multiple operations
      const searchResult = await pattern.search('lifecycle test');
      expect(searchResult?.groupdict()).toEqual({ lifecycle: 'lifecycle' });
      
      const findallResult = await pattern.findall('lifecycle1 lifecycle2 lifecycle3');
      expect(findallResult).toEqual(['lifecycle1', 'lifecycle2', 'lifecycle3']);
      
      const subResult = await pattern.sub('REPLACED', 'lifecycle test');
      expect(subResult).toBe('REPLACED test');
      
      // Cleanup
      const cleanupResult = await (pattern as PythonPattern).cleanup();
      expect(cleanupResult).toBe(true);
      
      // Verify cleanup worked
      await expect(pattern.search('test')).rejects.toThrow();
    });

    it('should handle cleanup of already cleaned patterns', async () => {
      const pattern = await re.compileAsync('(?P<double>\\w+)');
      
      // First cleanup should succeed
      const result1 = await (pattern as PythonPattern).cleanup();
      expect(result1).toBe(true);
      
      // Second cleanup should return false (pattern not found)
      const result2 = await (pattern as PythonPattern).cleanup();
      expect(result2).toBe(false);
    });
  });

  describe('Pattern Registry Performance Verification', () => {
    it('should demonstrate pattern reuse efficiency', async () => {
      const pattern = await re.compileAsync('(?P<perf>\\w+)');
      createdPatterns.push(pattern as PythonPattern);
      
      const operations = 10;
      const testString = 'performance test string';
      
      const startTime = performance.now();
      
      // Perform multiple operations that would trigger recompilation in old system
      for (let i = 0; i < operations; i++) {
        await pattern.search(testString);
        await pattern.findall(testString);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // With registry, operations should be fast (< 1000ms for 10 operations)
      expect(duration).toBeLessThan(1000);
      
      // Verify all operations still work correctly
      const finalResult = await pattern.search(testString);
      expect(finalResult?.group()).toBe('performance');
    });

    it('should show no performance degradation from registry overhead', async () => {
      const pattern = await re.compileAsync('(?P<overhead>\\w+)');
      createdPatterns.push(pattern as PythonPattern);
      
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
      // Allow for some variance but should be roughly similar
      expect(multiple).toBeLessThan(single * 2);
    });
  });

  describe('All Regex Operations with Registry', () => {
    let testPattern: PythonPattern;
    
    beforeEach(async () => {
      testPattern = await re.compileAsync('(?P<word>\\w+)') as PythonPattern;
      createdPatterns.push(testPattern);
    });

    it('should handle search operations correctly', async () => {
      const result = await testPattern.search('hello world');
      expect(result?.group()).toBe('hello');
      expect(result?.groupdict()).toEqual({ word: 'hello' });
      expect(result?.start()).toBe(0);
      expect(result?.end()).toBe(5);
    });

    it('should handle match operations correctly', async () => {
      const result = await testPattern.match('hello world');
      expect(result?.group()).toBe('hello');
      
      const noMatch = await testPattern.match(' hello');
      expect(noMatch).toBeNull();
    });

    it('should handle fullmatch operations correctly', async () => {
      const result = await testPattern.fullmatch('hello');
      expect(result?.group()).toBe('hello');
      
      const noMatch = await testPattern.fullmatch('hello world');
      expect(noMatch).toBeNull();
    });

    it('should handle split operations correctly', async () => {
      const splitPattern = await re.compileAsync('[,\\s]+') as PythonPattern;
      createdPatterns.push(splitPattern);
      
      const result = await splitPattern.split('a,b c,d');
      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should handle findall operations correctly', async () => {
      const result = await testPattern.findall('hello world test');
      expect(result).toEqual(['hello', 'world', 'test']);
    });

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

    it('should handle sub operations correctly', async () => {
      const result = await testPattern.sub('X', 'hello world', 0);
      expect(result).toBe('X X');
      
      const funcResult = await testPattern.sub((match) => `[${match.group()}]`, 'hello world', 0);
      expect(funcResult).toBe('[hello] [world]');
    });

    it('should handle subn operations correctly', async () => {
      const [result, count] = await testPattern.subn('X', 'hello world', 0);
      expect(result).toBe('X X');
      expect(count).toBe(2);
    });
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

describe('Async Operations Regression Tests', () => {
  let createdPatterns: PythonPattern[] = [];

  afterEach(async () => {
    for (const pattern of createdPatterns) {
      try {
        await pattern.cleanup();
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    createdPatterns = [];
  });

  it('should maintain backward compatibility for all async functions', async () => {
    const testString = 'Contact: john@example.com or call 555-1234';
    
    // Test all async functions work with Python patterns
    const searchResult = await re.searchAsync('(?P<email>[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,})', testString, 'i');
    expect(searchResult?.group()).toBe('john@example.com');
    expect(searchResult?.groupdict()).toEqual({ email: 'john@example.com' });
    
    const matchResult = await re.matchAsync('(?P<start>\\w+)', testString);
    expect(matchResult?.groupdict()).toEqual({ start: 'Contact' });
    
    const fullmatchResult = await re.fullmatchAsync('(?P<full>.*)', testString);
    expect(fullmatchResult?.groupdict()).toEqual({ full: testString });
    
    const splitResult = await re.splitAsync('\\s+', 'word1 word2 word3');
    expect(splitResult).toEqual(['word1', 'word2', 'word3']);
    
    const findallResult = await re.findallAsync('\\d+', testString);
    expect(findallResult).toEqual(['555', '1234']);
    
    const subResult = await re.subAsync('\\d+', 'XXX', testString);
    expect(subResult).toBe('Contact: john@example.com or call XXX-XXX');
    
    const [subnResult, subnCount] = await re.subnAsync('\\d+', 'XXX', testString);
    expect(subnResult).toBe('Contact: john@example.com or call XXX-XXX');
    expect(subnCount).toBe(2);
  });

  it('should handle JavaScript patterns through async interface', async () => {
    // JavaScript patterns should still work through async interface
    const result = await re.searchAsync('\\d+', 'test 123 test');
    expect(result?.group()).toBe('123');
    
    const findallResult = await re.findallAsync('\\w+', 'hello world');
    expect(findallResult).toEqual(['hello', 'world']);
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

  it('should handle invalid pattern handles gracefully', async () => {
    const pattern = await re.compileAsync('(?P<error>\\w+)') as PythonPattern;
    
    // Manually corrupt the handle
    (pattern as any)._handle = 'corrupted-handle';
    
    await expect(pattern.search('test')).rejects.toThrow('Pattern handle not found in registry');
    
    // Cleanup should also fail gracefully
    const cleanupResult = await pattern.cleanup();
    expect(cleanupResult).toBe(false);
  });

  it('should handle Python backend errors gracefully', async () => {
    const pattern = await re.compileAsync('(?P<test>\\w+)') as PythonPattern;
    
    try {
      // Test with malformed input that might cause Python errors
      await pattern.search('test\x00invalid');
    } catch (error) {
      // Should handle errors without crashing
      expect(error).toBeDefined();
    } finally {
      await pattern.cleanup();
    }
  });
});

describe('Edge Cases and Stress Tests', () => {
  let createdPatterns: PythonPattern[] = [];

  afterEach(async () => {
    for (const pattern of createdPatterns) {
      try {
        await pattern.cleanup();
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    createdPatterns = [];
  });

  it('should handle large numbers of patterns', async () => {
    const patterns: PythonPattern[] = [];
    const patternCount = 20;
    
    // Create many patterns
    for (let i = 0; i < patternCount; i++) {
      const pattern = await re.compileAsync(`(?P<group${i}>\\w{${i + 1}})`) as PythonPattern;
      patterns.push(pattern);
      createdPatterns.push(pattern);
    }
    
    // Verify all patterns work
    for (let i = 0; i < patterns.length; i++) {
      const testString = 'a'.repeat(i + 1);
      const result = await patterns[i].search(testString);
      expect(result?.group()).toBe(testString);
    }
    
    // Cleanup all patterns
    for (const pattern of patterns) {
      const cleaned = await pattern.cleanup();
      expect(cleaned).toBe(true);
    }
  });

  it('should handle complex nested patterns', async () => {
    const complexPattern = await re.compileAsync(
      '(?P<email>(?P<user>[\\w._%+-]+)@(?P<domain>[\\w.-]+)\\.(?P<tld>[A-Z]{2,}))',
      'i'
    );
    createdPatterns.push(complexPattern as PythonPattern);
    
    const result = await complexPattern.search('Contact john.doe@example.com for info');
    expect(result?.groupdict()).toEqual({
      email: 'john.doe@example.com',
      user: 'john.doe',
      domain: 'example',
      tld: 'com'
    });
  });

  it('should handle patterns with various flag combinations', async () => {
    const testCases = [
      { pattern: '(?P<case>hello)', flags: 'i', text: 'HELLO', expected: 'HELLO' },
      { pattern: '(?P<multi>^test)', flags: 'm', text: 'line1\\ntest line', expected: 'test' },
      { pattern: '(?P<dotall>a.b)', flags: 's', text: 'a\\nb', expected: 'a\\nb' },
      { pattern: '(?P<verbose>t e s t)', flags: 'x', text: 'test', expected: 'test' }
    ];
    
    for (const testCase of testCases) {
      const pattern = await re.compileAsync(testCase.pattern, testCase.flags);
      createdPatterns.push(pattern as PythonPattern);
      
      const result = await pattern.search(testCase.text);
      if (testCase.expected) {
        expect(result?.group()).toBe(testCase.expected);
      }
    }
  });
});