import type { Match } from './index.js';

/**
 * Async version of Pattern interface for Python backend
 */
export interface AsyncPattern {
  /** The backend used for this pattern */
  readonly backend: import('./index.js').RegexBackend;

  /** The pattern string from which the pattern object was compiled */
  readonly pattern: string;

  /** The regex matching flags */
  readonly flags: number;

  /** The number of capturing groups in the pattern */
  readonly groups: number;

  /** A dictionary mapping any symbolic group names to group numbers */
  readonly groupindex: Record<string, number>;

  /**
   * Scan through string looking for the first location where this regular expression produces a match
   */
  search(string: string, pos?: number, endpos?: number): Promise<Match | null>;

  /**
   * Check if zero or more characters at the beginning of string match this regular expression
   */
  match(string: string, pos?: number, endpos?: number): Promise<Match | null>;

  /**
   * Check if the whole string matches this regular expression
   */
  fullmatch(
    string: string,
    pos?: number,
    endpos?: number
  ): Promise<Match | null>;

  /**
   * Split string by the occurrences of pattern
   */
  split(string: string, maxsplit?: number): Promise<string[]>;

  /**
   * Return all non-overlapping matches of pattern in string
   */
  findall(string: string, pos?: number, endpos?: number): Promise<string[]>;

  /**
   * Return an iterator over all non-overlapping matches
   */
  finditer(
    string: string,
    pos?: number,
    endpos?: number
  ): AsyncIterableIterator<Match>;

  /**
   * Return the string obtained by replacing the leftmost non-overlapping occurrences
   */
  sub(
    repl: string | ((match: Match) => string),
    string: string,
    count?: number
  ): Promise<string>;

  /**
   * Same as sub(), but also return the number of substitutions made
   */
  subn(
    repl: string | ((match: Match) => string),
    string: string,
    count?: number
  ): Promise<[string, number]>;
}
