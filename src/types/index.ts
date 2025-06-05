/**
 * Python-like regex flags
 */
export enum RegexFlags {
  IGNORECASE = 'i',
  MULTILINE = 'm',
  DOTALL = 's',
  VERBOSE = 'x',
  ASCII = 'a',
  LOCALE = 'l',
  UNICODE = 'u',
  DEBUG = 'd',
}

/**
 * Match object similar to Python's re.Match
 */
export interface Match {
  /** The string matched by the RE */
  readonly string: string;
  
  /** The regular expression object */
  readonly re: Pattern | import('./async.js').AsyncPattern;
  
  /** The indices of the start and end of the substring matched */
  readonly pos: number;
  readonly endpos: number;
  
  /** The index of the start of the substring matched by group */
  readonly lastindex: number | null;
  
  /** The name of the last matched capturing group */
  readonly lastgroup: string | null;
  
  /**
   * Return one or more subgroups of the match
   */
  group(): string | null;
  group(index: number): string | null;
  group(index: number, ...indices: number[]): (string | null)[];
  
  /**
   * Return a tuple containing all the subgroups of the match
   */
  groups(default_?: string): (string | null)[];
  
  /**
   * Return a dictionary containing all the named subgroups of the match
   */
  groupdict(default_?: string): Record<string, string | null>;
  
  /**
   * Return the indices of the start and end of the substring matched by group
   */
  start(group?: number): number;
  end(group?: number): number;
  span(group?: number): [number, number];
  
  /**
   * Return the string obtained by doing backslash substitution
   */
  expand(template: string): string;
}

/**
 * Compiled regular expression pattern object similar to Python's re.Pattern
 */
export interface Pattern {
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
  search(string: string, pos?: number, endpos?: number): Match | null;
  
  /**
   * Check if zero or more characters at the beginning of string match this regular expression
   */
  match(string: string, pos?: number, endpos?: number): Match | null;
  
  /**
   * Check if the whole string matches this regular expression
   */
  fullmatch(string: string, pos?: number, endpos?: number): Match | null;
  
  /**
   * Split string by the occurrences of pattern
   */
  split(string: string, maxsplit?: number): string[];
  
  /**
   * Return all non-overlapping matches of pattern in string
   */
  findall(string: string, pos?: number, endpos?: number): string[];
  
  /**
   * Return an iterator over all non-overlapping matches
   */
  finditer(string: string, pos?: number, endpos?: number): IterableIterator<Match>;
  
  /**
   * Return the string obtained by replacing the leftmost non-overlapping occurrences
   */
  sub(repl: string | ((match: Match) => string), string: string, count?: number): string;
  
  /**
   * Same as sub(), but also return the number of substitutions made
   */
  subn(repl: string | ((match: Match) => string), string: string, count?: number): [string, number];
}

/**
 * Backend type for regex execution
 */
export type RegexBackend = 'javascript' | 'python';

/**
 * Configuration for regex pattern analysis
 */
export interface PatternAnalysis {
  backend: RegexBackend;
  hasPythonFeatures: boolean;
  features: string[];
}