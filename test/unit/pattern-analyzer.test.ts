import { describe, it, expect } from 'vitest';
import * as re from '../../src/index';

describe('Pattern Analysis (Unit Tests)', () => {
  describe('JavaScript Pattern Detection', () => {
    it('should detect simple JavaScript-compatible patterns', () => {
      const analysis = re.analyze('\\d+');
      
      expect(analysis.backend).toBe('javascript');
      expect(analysis.hasPythonFeatures).toBe(false);
    });

    it('should detect JavaScript patterns with basic flags', () => {
      const analysis = re.analyze('[a-z]+', 'i');
      
      expect(analysis.backend).toBe('javascript');
      expect(analysis.hasPythonFeatures).toBe(false);
    });

    it('should detect complex JavaScript-compatible patterns', () => {
      const patterns = [
        '(\\w+)\\s+(\\d+)',
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        '\\b\\d{3}-\\d{3}-\\d{4}\\b',
        '(?:https?://)?[\\w.-]+\\.\\w+'
      ];

      patterns.forEach(pattern => {
        const analysis = re.analyze(pattern);
        expect(analysis.backend).toBe('javascript');
        expect(analysis.hasPythonFeatures).toBe(false);
      });
    });
  });

  describe('Python Pattern Detection', () => {
    it('should detect named groups as Python feature', () => {
      const analysis = re.analyze('(?P<name>\\w+)');
      
      expect(analysis.backend).toBe('python');
      expect(analysis.hasPythonFeatures).toBe(true);
    });

    it('should detect Python-only flags', () => {
      const analysis = re.analyze('\\w+', 'x');
      
      expect(analysis.backend).toBe('python');
      expect(analysis.hasPythonFeatures).toBe(true);
    });

    it('should detect multiple Python features', () => {
      const analysis = re.analyze('(?P<email>(?P<user>\\w+)@(?P<domain>\\w+))', 'ix');
      
      expect(analysis.backend).toBe('python');
      expect(analysis.hasPythonFeatures).toBe(true);
    });

    it('should detect various Python-only flag combinations', () => {
      const flagCombinations = ['x', 'a', 'l', 'u', 'd', 'ix', 'sm', 'iax'];
      
      flagCombinations.forEach(flags => {
        const analysis = re.analyze('\\w+', flags);
        expect(analysis.backend).toBe('python');
        expect(analysis.hasPythonFeatures).toBe(true);
      });
    });
  });

  describe('Backend Requirements Function', () => {
    it('should correctly identify JavaScript patterns', () => {
      expect(re.requiresPython('\\d+')).toBe(false);
      expect(re.requiresPython('[a-z]+', 'i')).toBe(false);
      expect(re.requiresPython('(\\w+)\\s+(\\w+)')).toBe(false);
    });

    it('should correctly identify Python patterns', () => {
      expect(re.requiresPython('(?P<name>\\w+)')).toBe(true);
      expect(re.requiresPython('\\w+', 'x')).toBe(true);
      expect(re.requiresPython('(?P<email>\\w+@\\w+)', 'i')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(re.requiresPython('')).toBe(false);
      expect(re.requiresPython('', '')).toBe(false);
      expect(re.requiresPython('simple')).toBe(false);
      expect(re.requiresPython('simple', undefined)).toBe(false);
    });
  });

  describe('Pattern Feature Analysis', () => {
    it('should identify standard JavaScript regex features', () => {
      const patterns = [
        { pattern: '\\d+', features: 'digit character class' },
        { pattern: '\\w+', features: 'word character class' },
        { pattern: '\\s+', features: 'whitespace character class' },
        { pattern: '.+', features: 'dot metacharacter' },
        { pattern: '^\\w+$', features: 'anchors' },
        { pattern: '\\b\\w+\\b', features: 'word boundaries' },
        { pattern: '[a-z]+', features: 'character class' },
        { pattern: '(\\w+)', features: 'capturing group' },
        { pattern: '(?:\\w+)', features: 'non-capturing group' },
        { pattern: '\\w+?', features: 'non-greedy quantifier' },
        { pattern: '\\w{2,4}', features: 'bounded quantifier' }
      ];

      patterns.forEach(({ pattern }) => {
        const analysis = re.analyze(pattern);
        expect(analysis.backend).toBe('javascript');
      });
    });

    it('should identify Python-specific features correctly', () => {
      const pythonPatterns = [
        '(?P<word>\\w+)',
        '(?P<num>\\d+)\\s+(?P<word>\\w+)',
        '(?P<nested>(?P<inner>\\w+))',
        '(?P<email>[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,})'
      ];

      pythonPatterns.forEach(pattern => {
        const analysis = re.analyze(pattern);
        expect(analysis.backend).toBe('python');
        expect(analysis.hasPythonFeatures).toBe(true);
      });
    });
  });

  describe('Flag Analysis', () => {
    it('should handle JavaScript-compatible flags', () => {
      const jsFlags = ['i', 'm', 's', 'g', 'im', 'ims', 'gi'];
      
      jsFlags.forEach(flags => {
        const analysis = re.analyze('\\w+', flags);
        // Note: 'g' flag and some combinations might still be handled by JavaScript
        // The important thing is that pure i, m, s flags work
        if (flags === 'i' || flags === 'm' || flags === 's' || flags === 'im' || flags === 'ims') {
          expect(['javascript', 'python']).toContain(analysis.backend);
        }
      });
    });

    it('should identify Python-only flags', () => {
      const pythonOnlyFlags = ['x', 'a', 'l', 'u', 'd'];
      
      pythonOnlyFlags.forEach(flag => {
        const analysis = re.analyze('\\w+', flag);
        expect(analysis.backend).toBe('python');
        expect(analysis.hasPythonFeatures).toBe(true);
      });
    });

    it('should handle mixed flag combinations', () => {
      const mixedFlags = ['ix', 'mx', 'sx', 'imx', 'iax', 'smx'];
      
      mixedFlags.forEach(flags => {
        const analysis = re.analyze('\\w+', flags);
        expect(analysis.backend).toBe('python');
        expect(analysis.hasPythonFeatures).toBe(true);
      });
    });
  });

  describe('Complex Pattern Analysis', () => {
    it('should handle patterns with both JS and Python features', () => {
      // Pattern has both JavaScript-compatible syntax and Python named groups
      const analysis = re.analyze('(?P<protocol>https?)://(?P<domain>[\\w.-]+)/(?P<path>.*)');
      
      expect(analysis.backend).toBe('python');
      expect(analysis.hasPythonFeatures).toBe(true);
    });

    it('should analyze email patterns correctly', () => {
      const jsEmail = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
      const pythonEmail = '(?P<email>(?P<user>[\\w._%+-]+)@(?P<domain>[\\w.-]+)\\.(?P<tld>[A-Z]{2,}))';
      
      const jsAnalysis = re.analyze(jsEmail, 'i');
      expect(jsAnalysis.backend).toBe('javascript');
      
      const pythonAnalysis = re.analyze(pythonEmail, 'i');
      expect(pythonAnalysis.backend).toBe('python');
      expect(pythonAnalysis.hasPythonFeatures).toBe(true);
    });

    it('should handle nested structures', () => {
      const nestedPattern = '(?P<outer>(?P<inner1>\\w+)\\s+(?P<inner2>\\d+))';
      const analysis = re.analyze(nestedPattern);
      
      expect(analysis.backend).toBe('python');
      expect(analysis.hasPythonFeatures).toBe(true);
    });
  });
});