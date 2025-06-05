import type { Match } from '../types/index.js';
import type { AsyncPattern } from '../types/async.js';

/**
 * Python backend using Pyodide for regex operations
 */
export class PythonBackend {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static pyodide: any = null;
  private static initPromise: Promise<void> | null = null;

  static async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  private static async _doInitialize(): Promise<void> {
    if (this.pyodide) return;

    // Load Pyodide
    const { loadPyodide } = await import('pyodide');
    this.pyodide = await loadPyodide();

    // Install the regex package
    await this.pyodide.loadPackage(['micropip']);
    await this.pyodide.runPython(`
      import micropip
      await micropip.install('regex')
    `);

    // Set up the Python environment with pattern registry
    await this.pyodide.runPython(`
      import regex as re
      import json
      import uuid
      
      # Pattern registry to store compiled patterns
      _pattern_registry = {}
      
      def register_pattern(pattern_obj):
          """Register a compiled pattern and return its handle"""
          handle = str(uuid.uuid4())
          _pattern_registry[handle] = pattern_obj
          return handle
      
      def get_pattern(handle):
          """Retrieve a pattern by its handle"""
          return _pattern_registry.get(handle)
      
      def unregister_pattern(handle):
          """Remove a pattern from the registry"""
          if handle in _pattern_registry:
              del _pattern_registry[handle]
              return True
          return False
      
      def create_match_data(match_obj, pattern_obj, string, pos=0, endpos=None):
          if match_obj is None:
              return None
          
          groups = []
          for i in range(len(match_obj.groups()) + 1):
              try:
                  groups.append(match_obj.group(i))
              except:
                  groups.append(None)
          
          return {
              'string': string,
              'pos': pos,
              'endpos': endpos or len(string),
              'lastindex': match_obj.lastindex,
              'lastgroup': match_obj.lastgroup,
              'groups': groups,
              'start': match_obj.start(),
              'end': match_obj.end(),
              'span': match_obj.span(),
              'groupdict': dict(match_obj.groupdict())
          }
      
      def create_pattern_data(pattern_obj):
          return {
              'pattern': pattern_obj.pattern,
              'flags': pattern_obj.flags,
              'groups': pattern_obj.groups,
              'groupindex': dict(pattern_obj.groupindex)
          }
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async runPython(code: string): Promise<any> {
    await this.initialize();
    return this.pyodide.runPython(code);
  }

  static async compile(pattern: string, flags: string = ''): Promise<PythonPattern> {
    await this.initialize();
    
    const result = await this.runPython(`
      import regex as re
      
      flag_map = {
          'i': re.IGNORECASE,
          'm': re.MULTILINE,
          's': re.DOTALL,
          'x': re.VERBOSE,
          'a': re.ASCII,
          'l': re.LOCALE,
          'u': re.UNICODE,
          'd': re.DEBUG
      }
      
      flag_value = 0
      for flag in "${flags}":
          if flag in flag_map:
              flag_value |= flag_map[flag]
      
      pattern_obj = re.compile("${pattern.replace(/"/g, '\\"')}", flag_value)
      handle = register_pattern(pattern_obj)
      pattern_data = create_pattern_data(pattern_obj)
      
      {
          'handle': handle,
          'pattern_data': pattern_data
      }
    `);

    return new PythonPattern(pattern, flags, result.pattern_data, result.handle);
  }

  static async cleanup(handle: string): Promise<boolean> {
    await this.initialize();
    return await this.runPython(`unregister_pattern("${handle}")`);
  }
}

/**
 * Python implementation of Match object
 */
export class PythonMatch implements Match {
  public readonly string: string;
  public readonly re: AsyncPattern;
  public readonly pos: number;
  public readonly endpos: number;
  public readonly lastindex: number | null;
  public readonly lastgroup: string | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _data: any;
  private _groups: (string | null)[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any, pattern: AsyncPattern) {
    this._data = data;
    this.string = data.string;
    this.re = pattern;
    this.pos = data.pos;
    this.endpos = data.endpos;
    this.lastindex = data.lastindex;
    this.lastgroup = data.lastgroup;
    this._groups = data.groups;
  }

  group(): string | null;
  group(index: number): string | null;
  group(index: number, ...indices: number[]): (string | null)[];
  group(index?: number, ...indices: number[]): string | null | (string | null)[] {
    if (index === undefined) {
      return this._groups[0] ?? null;
    }
    
    if (indices.length === 0) {
      return index < this._groups.length ? this._groups[index] ?? null : null;
    }
    
    const allIndices = [index, ...indices];
    return allIndices.map(i => i < this._groups.length ? this._groups[i] ?? null : null);
  }

  groups(default_?: string): (string | null)[] {
    return this._groups.slice(1).map(group => group ?? default_ ?? null);
  }

  groupdict(default_?: string): Record<string, string | null> {
    const result: Record<string, string | null> = {};
    for (const [name, value] of Object.entries(this._data.groupdict)) {
      result[name] = (value as string) ?? default_ ?? null;
    }
    return result;
  }

  start(): number {
    return this._data.start;
  }

  end(): number {
    return this._data.end;
  }

  span(): [number, number] {
    return this._data.span;
  }

  expand(template: string): string {
    // This would need to be implemented with Python
    return template.replace(/\\(\d+)/g, (_, groupNum) => {
      const index = parseInt(groupNum);
      return this._groups[index] ?? '';
    });
  }
}

/**
 * Python implementation of Pattern object
 */
export class PythonPattern implements AsyncPattern {
  public readonly pattern: string;
  public readonly flags: number;
  public readonly groups: number;
  public readonly groupindex: Record<string, number>;

  private _pythonFlags: string;
  private _handle: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(pattern: string, flags: string, data: any, handle: string) {
    this.pattern = pattern;
    this._pythonFlags = flags;
    this.flags = data.flags;
    this.groups = data.groups;
    this.groupindex = data.groupindex;
    this._handle = handle;
  }

  async search(string: string, pos: number = 0, endpos?: number): Promise<Match | null> {
    const matchData = await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      match_obj = pattern_obj.search("${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
      create_match_data(match_obj, pattern_obj, "${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
    `);

    return matchData ? new PythonMatch(matchData, this) : null;
  }

  async match(string: string, pos: number = 0, endpos?: number): Promise<Match | null> {
    const matchData = await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      match_obj = pattern_obj.match("${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
      create_match_data(match_obj, pattern_obj, "${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
    `);

    return matchData ? new PythonMatch(matchData, this) : null;
  }

  async fullmatch(string: string, pos: number = 0, endpos?: number): Promise<Match | null> {
    const matchData = await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      match_obj = pattern_obj.fullmatch("${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
      create_match_data(match_obj, pattern_obj, "${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
    `);

    return matchData ? new PythonMatch(matchData, this) : null;
  }

  async split(string: string, maxsplit: number = 0): Promise<string[]> {
    return await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      pattern_obj.split("${string.replace(/"/g, '\\"')}", ${maxsplit})
    `);
  }

  async findall(string: string, pos: number = 0, endpos?: number): Promise<string[]> {
    return await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      pattern_obj.findall("${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length})
    `);
  }

  async *finditer(string: string, pos: number = 0, endpos?: number): AsyncIterableIterator<Match> {
    const matches = await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      matches = []
      for match_obj in pattern_obj.finditer("${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length}):
          matches.append(create_match_data(match_obj, pattern_obj, "${string.replace(/"/g, '\\"')}", ${pos}, ${endpos || string.length}))
      matches
    `);

    for (const matchData of matches) {
      yield new PythonMatch(matchData, this);
    }
  }

  async sub(repl: string | ((match: Match) => string), string: string, count: number = 0): Promise<string> {
    const [result] = await this.subn(repl, string, count);
    return result;
  }

  async subn(repl: string | ((match: Match) => string), string: string, count: number = 0): Promise<[string, number]> {
    if (typeof repl === 'function') {
      // For function replacements, we need to handle this in TypeScript
      let result = string;
      let substitutions = 0;
      
      const matches = [];
      for await (const match of this.finditer(string)) {
        matches.push(match);
        if (count > 0 && matches.length >= count) break;
      }
      
      // Process matches in reverse order to maintain correct indices
      for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        if (match) {
          const replacement = repl(match);
          const start = match.start();
          const end = match.end();
          
          result = result.slice(0, start) + replacement + result.slice(end);
          substitutions++;
        }
      }
      
      return [result, substitutions];
    }

    return await PythonBackend.runPython(`
      pattern_obj = get_pattern("${this._handle}")
      if pattern_obj is None:
          raise ValueError("Pattern handle not found in registry")
      
      result = pattern_obj.subn("${(repl as string).replace(/"/g, '\\"')}", "${string.replace(/"/g, '\\"')}", ${count})
      [result[0], result[1]]
    `);
  }

  /**
   * Clean up the pattern from the registry
   */
  async cleanup(): Promise<boolean> {
    return await PythonBackend.cleanup(this._handle);
  }
}

/**
 * Compile a pattern using Python regex
 */
export async function compile(pattern: string, flags: string = ''): Promise<PythonPattern> {
  return await PythonBackend.compile(pattern, flags);
}