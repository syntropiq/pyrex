import { vi } from 'vitest';
import { PythonPattern, PythonBackend } from '../../src/backends/python';

/**
 * Test utilities and helpers for regex tests
 */

export class TestPatternManager {
  private createdPatterns: PythonPattern[] = [];

  /**
   * Track a pattern for cleanup
   */
  track(pattern: PythonPattern): PythonPattern {
    this.createdPatterns.push(pattern);
    return pattern;
  }

  /**
   * Clean up all tracked patterns
   */
  async cleanupAll(): Promise<void> {
    for (const pattern of this.createdPatterns) {
      try {
        await pattern.cleanup();
      } catch (error) {
        // Ignore cleanup errors in tests
      }
    }
    this.createdPatterns = [];
  }

  /**
   * Get count of tracked patterns
   */
  getTrackedCount(): number {
    return this.createdPatterns.length;
  }
}

/**
 * Mock spy utilities for testing Python backend calls
 */
export class PythonBackendSpy {
  private spy: any;

  constructor() {
    this.spy = vi.spyOn(PythonBackend, 'runPython');
  }

  /**
   * Get compilation calls made to Python backend
   */
  getCompilationCalls(): unknown[] {
    return this.spy.mock.calls.filter(call =>
      typeof call[0] === 'string' &&
      call[0].includes('re.compile') &&
      call[0].includes('register_pattern')
    );
  }

  /**
   * Get pattern retrieval calls made to Python backend
   */
  getPatternRetrievalCalls(): unknown[] {
    return this.spy.mock.calls.filter(call =>
      typeof call[0] === 'string' &&
      call[0].includes('get_pattern')
    );
  }

  /**
   * Clear spy history
   */
  clear(): void {
    this.spy.mockClear();
  }

  /**
   * Restore spy
   */
  restore(): void {
    this.spy.mockRestore();
  }
}

/**
 * Common test data and patterns
 */
export const TestPatterns = {
  SIMPLE_WORD: '(?P<word>\\w+)',
  SIMPLE_NUMBER: '(?P<num>\\d+)',
  EMAIL: '(?P<email>[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,})',
  COMPLEX_EMAIL: '(?P<email>(?P<user>[\\w._%+-]+)@(?P<domain>[\\w.-]+)\\.(?P<tld>[A-Z]{2,}))',
  PHONE: '(?P<phone>\\d{3}-\\d{4})',
  SPLIT_DELIMITER: '[,\\s]+',
  CASE_INSENSITIVE: '(?P<case>hello)',
  MULTILINE: '(?P<multi>^test)',
  DOTALL: '(?P<dotall>a.b)',
  VERBOSE: '(?P<verbose>t e s t)'
} as const;

/**
 * Common test strings
 */
export const TestStrings = {
  HELLO_WORLD: 'hello world',
  CONTACT_INFO: 'Contact: john.doe@example.com or call 555-1234',
  MIXED_CONTENT: 'test1 test2 test3',
  PHONE_FORMAT: '555-1234',
  CASE_TEST: 'HELLO',
  MULTILINE_TEXT: 'line1\ntest line',
  DOTALL_TEXT: 'a\nb',
  SIMPLE_TEST: 'test',
  LIFECYCLE_TEST: 'lifecycle test',
  PERFORMANCE_TEST: 'performance test string',
  OVERHEAD_TEST: 'overhead test'
} as const;

/**
 * Test flag combinations
 */
export const TestFlags = {
  CASE_INSENSITIVE: 'i',
  MULTILINE: 'm',
  DOTALL: 's',
  VERBOSE: 'x',
  COMBINED: 'im'
} as const;

/**
 * Performance test configuration
 */
export const PerformanceConfig = {
  OPERATIONS_COUNT: 10,
  MAX_DURATION_MS: 1000,
  PATTERN_STRESS_COUNT: 20,
  TOLERANCE_MULTIPLIER: 2
} as const;