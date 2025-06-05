import type { Match, Pattern } from './types/index.js';
import type { AsyncPattern } from './types/async.js';
import { analyzePattern, convertFlags, escape } from './utils/pattern-analyzer.js';
import { compile as jsCompile } from './backends/javascript.js';
import { compile as pyCompile } from './backends/python.js';

/**
 * Compile a regular expression pattern (async - supports both JavaScript and Python)
 * This is now the primary compilation function - seamlessly handles both backends
 */
export async function compile(pattern: string, flags: string = ''): Promise<Pattern | AsyncPattern> {
  const analysis = analyzePattern(pattern, flags);
  
  if (analysis.backend === 'python') {
    return await pyCompile(pattern, flags);
  } else {
    const jsFlags = convertFlags(flags);
    return jsCompile(pattern, jsFlags);
  }
}

/**
 * Legacy alias for compile() - maintained for backward compatibility
 * @deprecated Use compile() instead - it now seamlessly handles both JavaScript and Python patterns
 */
export async function compileAsync(pattern: string, flags: string = ''): Promise<Pattern | AsyncPattern> {
  return await compile(pattern, flags);
}

/**
 * Scan through string looking for the first location where the regular expression produces a match
 * Now seamlessly supports both JavaScript and Python regex patterns
 */
export async function search(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.search(string);
}

/**
 * Check if zero or more characters at the beginning of string match the regular expression
 * Now seamlessly supports both JavaScript and Python regex patterns
 */
export async function match(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.match(string);
}

/**
 * Check if the whole string matches the regular expression
 * Now seamlessly supports both JavaScript and Python regex patterns
 */
export async function fullmatch(pattern: string, string: string, flags?: string): Promise<Match | null> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.fullmatch(string);
}

/**
 * Split string by the occurrences of pattern
 * Now seamlessly supports both JavaScript and Python regex patterns
 */
export async function split(pattern: string, string: string, maxsplit?: number, flags?: string): Promise<string[]> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.split(string, maxsplit);
}

/**
 * Return all non-overlapping matches of pattern in string as a list of strings
 * Now seamlessly supports both JavaScript and Python regex patterns
 */
export async function findall(pattern: string, string: string, flags?: string): Promise<string[]> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.findall(string);
}

/**
 * Return an iterator over all non-overlapping matches for the RE pattern in string
 * Now seamlessly supports both JavaScript and Python regex patterns
 */
export async function finditer(pattern: string, string: string, flags?: string): Promise<AsyncIterableIterator<Match> | IterableIterator<Match>> {
  const compiledPattern = await compile(pattern, flags);
  return await compiledPattern.finditer(string);
}

/**
 * Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string
 * Now seamlessly supports both JavaScript and Python regex patterns
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
 * Now seamlessly supports both JavaScript and Python regex patterns
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
// @deprecated All main functions are now async - use search(), match(), etc. instead
export const searchAsync = search;
export const matchAsync = match;
export const fullmatchAsync = fullmatch;
export const splitAsync = split;
export const findallAsync = findall;
export const subAsync = sub;
export const subnAsync = subn;

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
 * Provides the familiar Python re.method() syntax with seamless async support
 * All functions now support both JavaScript and Python regex patterns automatically
 */
export const re = {
  // Core compilation functions
  compile,
  compileAsync, // Legacy alias
  
  // Pattern matching functions (all async, seamlessly handle both JS and Python patterns)
  search,
  match,
  fullmatch,
  
  // Pattern operations (all async, seamlessly handle both JS and Python patterns)
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
  requiresPython,
  analyze,
  escape
};

// Export types
export type { Match, Pattern, AsyncPattern };
export { RegexFlags } from './types/index.js';