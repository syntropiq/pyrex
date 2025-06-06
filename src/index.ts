import type { Match, Pattern } from './types/index.js';
import { compile as pyCompile } from './backends/python.js';

/**
 * Compile a regular expression pattern (async - Python-only)
 */
export async function compile(pattern: string, flags: string = ''): Promise<Pattern> {
  return await pyCompile(pattern, flags);
}

/**
 * Legacy alias for compile() - maintained for backward compatibility
 * @deprecated Use compile() instead
 */
export async function compileAsync(pattern: string, flags: string = ''): Promise<Pattern> {
  return await compile(pattern, flags);
}

/**
 * Scan through string looking for the first location where the regular expression produces a match
 * Python-only implementation
 */
export async function search(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.search(string);
}

/**
 * Check if zero or more characters at the beginning of string match the regular expression
 * Python-only implementation
 */
export async function match(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.match(string);
}

/**
 * Check if the whole string matches the regular expression
 * Python-only implementation
 */
export async function fullmatch(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.fullmatch(string);
}

/**
 * Split string by the occurrences of pattern
 * Python-only implementation
 */
export async function split(pattern: string, string: string, maxsplit?: number, flags?: string): Promise<string[]> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.split(string, maxsplit);
}

/**
 * Return all non-overlapping matches of pattern in string as a list of strings
 * Python-only implementation
 */
export async function findall(pattern: string, string: string, flags?: string): Promise<string[]> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.findall(string);
}

/**
 * Return an iterator over all non-overlapping matches for the RE pattern in string
 * Python-only implementation
 */
export async function finditer(pattern: string, string: string, flags?: string): Promise<AsyncIterableIterator<Match>> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.finditer(string);
}

/**
 * Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string
 * Python-only implementation
 */
export async function sub(
  pattern: string,
  repl: string | ((match: Match) => string),
  string: string,
  count?: number,
  flags?: string
): Promise<string> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.sub(repl, string, count);
}

/**
 * Same as sub(), but also return the number of substitutions made
 * Python-only implementation
 */
export async function subn(
  pattern: string,
  repl: string | ((match: Match) => string),
  string: string,
  count?: number,
  flags?: string
): Promise<[string, number]> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.subn(repl, string, count);
}

// Legacy async aliases - maintained for backward compatibility
// @deprecated All main functions are now async
export const searchAsync = search;
export const matchAsync = match;
export const fullmatchAsync = fullmatch;
export const splitAsync = split;
export const findallAsync = findall;
export const subAsync = sub;
export const subnAsync = subn;

/**
 * Escape special regex characters for literal matching
 */
export function escape(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Python-style flag constants (like Python's re.IGNORECASE, re.MULTILINE, etc.)
export const IGNORECASE = 'i';
export const I = 'i'; // Short alias
export const MULTILINE = 'm';
export const M = 'm'; // Short alias
export const DOTALL = 's';
export const S = 's'; // Short alias
export const VERBOSE = 'x';
export const X = 'x'; // Short alias
export const ASCII = 'a';
export const A = 'a'; // Short alias
export const LOCALE = 'l';
export const L = 'l'; // Short alias
export const UNICODE = 'u';
export const U = 'u'; // Short alias
export const DEBUG = 'd';

/**
 * Python-style regex error class
 * Thrown when regex compilation or execution fails
 */
export class RegexError extends Error {
  constructor(message: string, pattern?: string) {
    super(pattern ? `${message}: ${pattern}` : message);
    this.name = 'RegexError';
  }
}

// Alias for compatibility
export const error = RegexError;

/**
 * Python-like re module interface
 * Provides the familiar Python re.method() syntax with async support
 * Python-only implementation
 */
export const re = {
  // Core compilation functions
  compile,
  compileAsync, // Legacy alias

  // Pattern matching functions (all async, Python-only)
  search,
  match,
  fullmatch,

  // Pattern operations (all async, Python-only)
  split,
  findall,
  finditer,
  sub,
  subn,

  // Legacy async aliases (deprecated - all main functions are now async)
  searchAsync,
  matchAsync,
  fullmatchAsync,
  splitAsync,
  findallAsync,
  subAsync,
  subnAsync,

  // Python-style flag constants
  IGNORECASE, I,
  MULTILINE, M,
  DOTALL, S,
  VERBOSE, X,
  ASCII, A,
  LOCALE, L,
  UNICODE, U,
  DEBUG,

  // Python-style error class
  error: RegexError,

  // Utility functions
  escape
};

// Export types
export type { Match, Pattern };
export { RegexFlags } from './types/index.js';