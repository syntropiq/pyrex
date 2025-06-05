import type { Match, Pattern } from './types/index.js';
import type { AsyncPattern } from './types/async.js';
import { analyzePattern, convertFlags, escape } from './utils/pattern-analyzer.js';
import { compile as jsCompile } from './backends/javascript.js';
import { compile as pyCompile } from './backends/python.js';

/**
 * Compile a regular expression pattern (sync - JavaScript only)
 */
export function compile(pattern: string, flags: string = ''): Pattern {
  const analysis = analyzePattern(pattern, flags);
  
  if (analysis.backend === 'python') {
    throw new Error(
      `Pattern uses Python-only features: ${analysis.features.join(', ')}. ` +
      'Use compileAsync() for Python regex support.'
    );
  }
  
  const jsFlags = convertFlags(flags);
  return jsCompile(pattern, jsFlags);
}

/**
 * Compile a regular expression pattern (async - supports both JavaScript and Python)
 */
export async function compileAsync(pattern: string, flags: string = ''): Promise<Pattern | AsyncPattern> {
  const analysis = analyzePattern(pattern, flags);
  
  if (analysis.backend === 'python') {
    return await pyCompile(pattern, flags);
  } else {
    const jsFlags = convertFlags(flags);
    return jsCompile(pattern, jsFlags);
  }
}

/**
 * Scan through string looking for the first location where the regular expression produces a match
 */
export function search(pattern: string, string: string, flags?: string): Match | null {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.search(string);
}

/**
 * Check if zero or more characters at the beginning of string match the regular expression
 */
export function match(pattern: string, string: string, flags?: string): Match | null {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.match(string);
}

/**
 * Check if the whole string matches the regular expression
 */
export function fullmatch(pattern: string, string: string, flags?: string): Match | null {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.fullmatch(string);
}

/**
 * Split string by the occurrences of pattern
 */
export function split(pattern: string, string: string, maxsplit?: number, flags?: string): string[] {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.split(string, maxsplit);
}

/**
 * Return all non-overlapping matches of pattern in string as a list of strings
 */
export function findall(pattern: string, string: string, flags?: string): string[] {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.findall(string);
}

/**
 * Return an iterator over all non-overlapping matches for the RE pattern in string
 */
export function finditer(pattern: string, string: string, flags?: string): IterableIterator<Match> {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.finditer(string);
}

/**
 * Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string
 */
export function sub(
  pattern: string,
  repl: string | ((match: Match) => string),
  string: string,
  count?: number,
  flags?: string
): string {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.sub(repl, string, count);
}

/**
 * Same as sub(), but also return the number of substitutions made
 */
export function subn(
  pattern: string,
  repl: string | ((match: Match) => string),
  string: string,
  count?: number,
  flags?: string
): [string, number] {
  const compiledPattern = compile(pattern, flags);
  return compiledPattern.subn(repl, string, count);
}

// Async versions for Python support
export async function searchAsync(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.search(string);
}

export async function matchAsync(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.match(string);
}

export async function fullmatchAsync(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.fullmatch(string);
}

export async function splitAsync(pattern: string, string: string, maxsplit?: number, flags?: string): Promise<string[]> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.split(string, maxsplit);
}

export async function findallAsync(pattern: string, string: string, flags?: string): Promise<string[]> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.findall(string);
}

export async function subAsync(
  pattern: string,
  repl: string | ((match: Match) => string),
  string: string,
  count?: number,
  flags?: string
): Promise<string> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.sub(repl, string, count);
}

export async function subnAsync(
  pattern: string,
  repl: string | ((match: Match) => string),
  string: string,
  count?: number,
  flags?: string
): Promise<[string, number]> {
  const compiledPattern = await compileAsync(pattern, flags);
  return await compiledPattern.subn(repl, string, count);
}

/**
 * Check if a pattern requires Python backend
 */
export function requiresPython(pattern: string, flags?: string): boolean {
  const analysis = analyzePattern(pattern, flags);
  return analysis.backend === 'python';
}

/**
 * Analyze a pattern to determine backend requirements
 */
export function analyze(pattern: string, flags?: string) {
  return analyzePattern(pattern, flags);
}

// Export escape function
export { escape };

// Export types
export type { Match, Pattern, AsyncPattern };
export { RegexFlags } from './types/index.js';