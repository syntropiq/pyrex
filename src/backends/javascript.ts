import 'core-js/stable/string/match-all';
import 'core-js/stable/array/flat-map';
import type { Match, Pattern } from '../types/index.js';

/**
 * JavaScript implementation of Python's Match object
 */
export class JSMatch implements Match {
  public readonly string: string;
  public readonly re: Pattern;
  public readonly pos: number;
  public readonly endpos: number;
  public readonly lastindex: number | null;
  public readonly lastgroup: string | null;

  private _match: RegExpMatchArray;
  private _groups: (string | null)[];

  /**
   * Return a list of all captures for the given group.
   * Only supports numbered groups for now.
   */
  captures(group: number | string): string[] {
    // TODO: implement named group support
    if (typeof group === 'number') {
      // Only one match per group in JS RegExp, unless using matchAll
      const val = this._groups[group];
      return val !== undefined && val !== null ? [val] : [];
    } else if (typeof group === 'string') {
      // Named group support not implemented
      return [];
    }
    return [];
  }

  /**
   * Return a dictionary containing all the named subgroups of the match,
   * where each value is a list of all captures for that group.
   */
  capturesdict(): Record<string, string[]> {
    // TODO: implement named group support
    return {};
  }

  /**
   * Return the string obtained by doing backslash substitution and
   * Python-style format string substitution.
   */
  expandf(template: string): string {
    // Simple implementation: replace {group} or {1} with group value
    return template.replace(/\{(\w+)\}/g, (_, group) => {
      // Try numeric group
      const idx = Number(group);
      if (!isNaN(idx)) {
        return this._groups[idx] ?? '';
      }
      // TODO: support named groups
      return '';
    });
  }

  constructor(
    match: RegExpMatchArray,
    pattern: Pattern,
    inputString: string,
    pos: number = 0,
    endpos: number = inputString.length
  ) {
    this._match = match;
    this.string = inputString;
    this.re = pattern;
    this.pos = pos;
    this.endpos = endpos;
    this._groups = Array.from(match);

    // Find last matched group
    this.lastindex = this._groups.length > 1 ? this._groups.length - 1 : null;
    this.lastgroup = null; // TODO: implement named group tracking
  }

  group(): string | null;
  group(index: number): string | null;
  group(index: number, ...indices: number[]): (string | null)[];
  group(
    index?: number,
    ...indices: number[]
  ): string | null | (string | null)[] {
    if (index === undefined) {
      return this._groups[0] ?? null;
    }

    if (indices.length === 0) {
      return index < this._groups.length ? (this._groups[index] ?? null) : null;
    }

    const allIndices = [index, ...indices];
    return allIndices.map((i) =>
      i < this._groups.length ? (this._groups[i] ?? null) : null
    );
  }

  groups(default_?: string): (string | null)[] {
    return this._groups.slice(1).map((group) => group ?? default_ ?? null);
  }

  groupdict(): Record<string, string | null> {
    // TODO: implement named groups support
    return {};
  }

  start(group: number = 0): number {
    if (group === 0) {
      return this._match.index ?? 0;
    }
    // TODO: implement group-specific start positions
    return this._match.index ?? 0;
  }

  end(group: number = 0): number {
    if (group === 0) {
      const start = this._match.index ?? 0;
      return start + (this._groups[0]?.length ?? 0);
    }
    // TODO: implement group-specific end positions
    const start = this._match.index ?? 0;
    return start + (this._groups[0]?.length ?? 0);
  }

  span(group: number | string = 0): [number, number] {
    if (typeof group === 'number') {
      return [this.start(group), this.end(group)];
    } else if (typeof group === 'string') {
      // TODO: implement named group support
      return [this.start(0), this.end(0)];
    }
    return [this.start(0), this.end(0)];
  }

  expand(template: string): string {
    // Simple implementation of template expansion
    return template.replace(/\\(\d+)/g, (_, groupNum) => {
      const index = parseInt(groupNum);
      return this._groups[index] ?? '';
    });
  }
}

/**
 * JavaScript implementation of Python's Pattern object
 */
export class JSPattern implements Pattern {
  public readonly pattern: string;
  public readonly flags: number;
  public readonly groups: number;
  public readonly groupindex: Record<string, number>;

  private _regex: RegExp;

  constructor(pattern: string, flags: string = '') {
    this.pattern = pattern;
    this.flags = this._convertFlags(flags);
    this._regex = new RegExp(pattern, flags);

    // Count capturing groups
    this.groups = this._countGroups(pattern);
    this.groupindex = {}; // TODO: implement named group indexing
  }

  private _convertFlags(flags: string): number {
    let flagBits = 0;
    for (const flag of flags) {
      switch (flag) {
        case 'i':
          flagBits |= 1;
          break;
        case 'm':
          flagBits |= 2;
          break;
        case 's':
          flagBits |= 4;
          break;
        case 'g':
          flagBits |= 8;
          break;
        case 'u':
          flagBits |= 16;
          break;
        case 'y':
          flagBits |= 32;
          break;
      }
    }
    return flagBits;
  }

  private _countGroups(pattern: string): number {
    // Simple group counting (doesn't handle escaped parentheses properly)
    const matches = pattern.match(/\(/g);
    return matches ? matches.length : 0;
  }

  search(string: string, pos: number = 0, endpos?: number): Match | null {
    const searchString =
      endpos !== undefined ? string.slice(pos, endpos) : string.slice(pos);
    const match = searchString.match(this._regex);

    if (match) {
      return new JSMatch(match, this, string, pos, endpos ?? string.length);
    }

    return null;
  }

  match(string: string, pos: number = 0, endpos?: number): Match | null {
    const searchString =
      endpos !== undefined ? string.slice(pos, endpos) : string.slice(pos);

    // Create anchored regex for match() behavior
    const anchoredPattern = this.pattern.startsWith('^')
      ? this.pattern
      : `^${this.pattern}`;
    const anchoredRegex = new RegExp(anchoredPattern, this._regex.flags);
    const match = searchString.match(anchoredRegex);

    if (match) {
      return new JSMatch(match, this, string, pos, endpos ?? string.length);
    }

    return null;
  }

  fullmatch(string: string, pos: number = 0, endpos?: number): Match | null {
    const searchString =
      endpos !== undefined ? string.slice(pos, endpos) : string.slice(pos);

    // Create fully anchored regex for fullmatch() behavior
    let anchoredPattern = this.pattern;
    if (!anchoredPattern.startsWith('^')) {
      anchoredPattern = `^${anchoredPattern}`;
    }
    if (!anchoredPattern.endsWith('$')) {
      anchoredPattern = `${anchoredPattern}$`;
    }

    const anchoredRegex = new RegExp(anchoredPattern, this._regex.flags);
    const match = searchString.match(anchoredRegex);

    if (match) {
      return new JSMatch(match, this, string, pos, endpos ?? string.length);
    }

    return null;
  }

  split(string: string, maxsplit: number = 0): string[] {
    if (maxsplit === 0) {
      return string.split(this._regex);
    }

    const parts: string[] = [];
    let remaining = string;
    let splits = 0;

    while (splits < maxsplit && remaining.length > 0) {
      const match = remaining.match(this._regex);
      if (!match || match.index === undefined) break;

      parts.push(remaining.slice(0, match.index));
      remaining = remaining.slice(match.index + match[0].length);
      splits++;
    }

    if (remaining.length > 0) {
      parts.push(remaining);
    }

    return parts;
  }

  findall(string: string, pos: number = 0, endpos?: number): string[] {
    const searchString =
      endpos !== undefined ? string.slice(pos, endpos) : string.slice(pos);
    const globalRegex = new RegExp(
      this.pattern,
      this._regex.flags + (this._regex.global ? '' : 'g')
    );

    return Array.from(searchString.matchAll(globalRegex), (match) => match[0]);
  }

  *finditer(
    string: string,
    pos: number = 0,
    endpos?: number
  ): IterableIterator<Match> {
    const searchString =
      endpos !== undefined ? string.slice(pos, endpos) : string.slice(pos);
    const globalRegex = new RegExp(
      this.pattern,
      this._regex.flags + (this._regex.global ? '' : 'g')
    );

    for (const match of searchString.matchAll(globalRegex)) {
      yield new JSMatch(match, this, string, pos, endpos ?? string.length);
    }
  }

  sub(
    repl: string | ((match: Match) => string),
    string: string,
    count: number = 0
  ): string {
    const [result] = this.subn(repl, string, count);
    return result;
  }

  subn(
    repl: string | ((match: Match) => string),
    string: string,
    count: number = 0
  ): [string, number] {
    let result = string;
    let substitutions = 0;
    let remaining = string;
    let offset = 0;

    const globalRegex = new RegExp(
      this.pattern,
      this._regex.flags + (this._regex.global ? '' : 'g')
    );

    for (const match of remaining.matchAll(globalRegex)) {
      if (count > 0 && substitutions >= count) break;

      const jsMatch = new JSMatch(match, this, string);
      const replacement = typeof repl === 'string' ? repl : repl(jsMatch);

      const start = offset + (match.index ?? 0);
      const end = start + match[0].length;

      result = result.slice(0, start) + replacement + result.slice(end);
      offset += replacement.length - match[0].length;
      substitutions++;
    }

    return [result, substitutions];
  }
}

/**
 * Compile a pattern using JavaScript RegExp
 */
export function compile(pattern: string, flags: string = ''): JSPattern {
  return new JSPattern(pattern, flags);
}
