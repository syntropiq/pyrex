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

    console.log('[MIRAI DEBUG] Starting Pyodide initialization...');

    try {
      // Load Pyodide with proper indexURL configuration
      const { loadPyodide } = await import('pyodide');
      console.log('[MIRAI DEBUG] Pyodide module imported successfully');

      // Detect environment and configure appropriate paths
      const isNode = typeof process !== 'undefined' && process.versions?.node;
      console.log(
        '[MIRAI DEBUG] Environment detected:',
        isNode ? 'Node.js' : 'Browser'
      );

      let pyodideConfig;

      if (isNode) {
        // Node.js environment - use absolute paths without file:// protocol
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const pyodidePath = path.resolve(
          __dirname,
          '../../node_modules/pyodide/'
        );
        pyodideConfig = {
          indexURL: pyodidePath,
          packageCacheDir: path.join(__dirname, '../../.pyodide-cache'),
        };
        console.log('[MIRAI DEBUG] Node.js config:', pyodideConfig);
      } else {
        // Browser environment - use relative paths from the current origin
        const baseURL = new URL(window.location.href).origin;
        pyodideConfig = {
          indexURL: `${baseURL}/node_modules/pyodide/`,
          // packageCacheDir not needed in browser (uses IndexedDB automatically)
        };
        console.log('[MIRAI DEBUG] Browser config:', pyodideConfig);
      }

      // Configure Pyodide to find assets in the correct location
      this.pyodide = await loadPyodide(pyodideConfig);
      console.log('[MIRAI DEBUG] Pyodide loaded successfully');
    } catch (error) {
      console.error('[MIRAI ERROR] Failed to load Pyodide:', error);

      // Fallback: Try loading with CDN
      console.log('[MIRAI DEBUG] Attempting fallback CDN initialization...');
      try {
        const { loadPyodide } = await import('pyodide');
        this.pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/',
        });
        console.log(
          '[MIRAI DEBUG] Pyodide loaded successfully from CDN fallback'
        );
      } catch (fallbackError) {
        console.error('[MIRAI ERROR] CDN fallback also failed:', fallbackError);
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        const fallbackErrorMessage =
          fallbackError instanceof Error
            ? fallbackError.message
            : String(fallbackError);
        throw new Error(
          `Failed to initialize Pyodide: ${errorMessage}. CDN fallback also failed: ${fallbackErrorMessage}`
        );
      }
    }

    // Install the regex package
    await this.pyodide.loadPackage(['micropip']);
    await this.pyodide.runPythonAsync(`
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
              'groupdict': dict(match_obj.groupdict()),
              'capturesdict': dict(match_obj.capturesdict())
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
    try {
      const result = this.pyodide.runPython(code);

      // Convert PyProxy objects to JavaScript objects
      if (result && typeof result === 'object' && 'toJs' in result) {
        return result.toJs({ dict_converter: Object.fromEntries });
      }

      return result;
    } catch (error) {
      console.error('[MIRAI ERROR] Python execution failed:', error);
      throw error;
    }
  }

  static async compile(
    pattern: string,
    flags: string = ''
  ): Promise<PythonPattern> {
    await this.initialize();

    // Set pattern and flags in Python globals to avoid escaping issues
    await this.runPython(`
_compile_pattern = ${JSON.stringify(pattern)}
_compile_flags = ${JSON.stringify(flags)}
    `);

    // Use globals to pass the result back
    await this.runPython(`
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
for flag in _compile_flags:
    if flag in flag_map:
        flag_value |= flag_map[flag]

try:
    pattern_obj = re.compile(_compile_pattern, flag_value)
    handle = register_pattern(pattern_obj)
    pattern_data = create_pattern_data(pattern_obj)
    
    _compile_result = {
        'handle': handle,
        'pattern_data': pattern_data
    }
except Exception as e:
    _compile_result = {'error': str(e), 'pattern': _compile_pattern, 'flags': _compile_flags}
    `);

    const result = await this.runPython('_compile_result');

    if (!result) {
      throw new Error(
        `Python execution returned undefined result for pattern: ${pattern}`
      );
    }

    if (result.error) {
      throw new Error(`Failed to compile Python pattern: ${result.error}`);
    }

    if (!result.pattern_data) {
      throw new Error(
        `Invalid pattern compilation result: ${JSON.stringify(result)}`
      );
    }

    return new PythonPattern(
      pattern,
      flags,
      result.pattern_data,
      result.handle
    );
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
  group(name: string): string | null;
  group(index: number, ...indices: number[]): (string | null)[];
  group(
    indexOrName?: number | string,
    ...indices: number[]
  ): string | null | (string | null)[] {
    if (indexOrName === undefined) {
      return this._groups[0] ?? null;
    }

    if (typeof indexOrName === 'string') {
      // Handle named groups
      const groupIndex = this.re.groupindex[indexOrName];
      return groupIndex !== undefined ? (this._groups[groupIndex] ?? null) : null;
    }

    // Handle numeric groups
    if (indices.length === 0) {
      return indexOrName < this._groups.length ? (this._groups[indexOrName] ?? null) : null;
    }

    const allIndices = [indexOrName, ...indices];
    return allIndices.map((i) =>
      i < this._groups.length ? (this._groups[i] ?? null) : null
    );
  }

  groups(default_?: string): (string | null)[] {
    return this._groups.slice(1).map((group) => group ?? default_ ?? null);
  }

  groupdict(default_?: string): Record<string, string | null> {
    const result: Record<string, string | null> = {};
    for (const [name, value] of Object.entries(this._data.groupdict)) {
      result[name] = (value as string) ?? default_ ?? null;
    }
    return result;
  }

  capturesdict(): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const [name, value] of Object.entries(this._data.capturesdict)) {
      result[name] = value as string[];
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

  async search(
    string: string,
    pos: number = 0,
    endpos?: number
  ): Promise<Match | null> {
    // Set string in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(`_search_string = ${JSON.stringify(string)}`);

    const matchData = await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

match_obj = pattern_obj.search(_search_string, ${pos}, ${endpos || string.length})
create_match_data(match_obj, pattern_obj, _search_string, ${pos}, ${endpos || string.length})
    `);

    return matchData ? new PythonMatch(matchData, this) : null;
  }

  async match(
    string: string,
    pos: number = 0,
    endpos?: number
  ): Promise<Match | null> {
    // Set string in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(`_match_string = ${JSON.stringify(string)}`);

    const matchData = await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

match_obj = pattern_obj.match(_match_string, ${pos}, ${endpos || string.length})
create_match_data(match_obj, pattern_obj, _match_string, ${pos}, ${endpos || string.length})
    `);

    return matchData ? new PythonMatch(matchData, this) : null;
  }

  async fullmatch(
    string: string,
    pos: number = 0,
    endpos?: number
  ): Promise<Match | null> {
    // Set string in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(
      `_fullmatch_string = ${JSON.stringify(string)}`
    );

    const matchData = await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

match_obj = pattern_obj.fullmatch(_fullmatch_string, ${pos}, ${endpos || string.length})
create_match_data(match_obj, pattern_obj, _fullmatch_string, ${pos}, ${endpos || string.length})
    `);

    return matchData ? new PythonMatch(matchData, this) : null;
  }

  async split(string: string, maxsplit: number = 0): Promise<string[]> {
    // Set string in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(`_split_string = ${JSON.stringify(string)}`);

    return await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

pattern_obj.split(_split_string, ${maxsplit})
    `);
  }

  async findall(
    string: string,
    pos: number = 0,
    endpos?: number
  ): Promise<string[]> {
    // Set string in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(
      `_findall_string = ${JSON.stringify(string)}`
    );

    return await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

pattern_obj.findall(_findall_string, ${pos}, ${endpos || string.length})
    `);
  }

  async *finditer(
    string: string,
    pos: number = 0,
    endpos?: number
  ): AsyncIterableIterator<Match> {
    // Set string in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(
      `_finditer_string = ${JSON.stringify(string)}`
    );

    const matches = await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

matches = []
for match_obj in pattern_obj.finditer(_finditer_string, ${pos}, ${endpos || string.length}):
    matches.append(create_match_data(match_obj, pattern_obj, _finditer_string, ${pos}, ${endpos || string.length}))
matches
    `);

    for (const matchData of matches) {
      yield new PythonMatch(matchData, this);
    }
  }

  async sub(
    repl: string | ((match: Match) => string),
    string: string,
    count: number = 1
  ): Promise<string> {
    const [result] = await this.subn(repl, string, count);
    return result;
  }

  async subn(
    repl: string | ((match: Match) => string),
    string: string,
    count: number = 1
  ): Promise<[string, number]> {
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

    // Set strings in globals to avoid escaping issues with multiline strings
    await PythonBackend.runPython(
      `_subn_repl = ${JSON.stringify(repl as string)}`
    );
    await PythonBackend.runPython(`_subn_string = ${JSON.stringify(string)}`);

    return await PythonBackend.runPython(`
pattern_obj = get_pattern("${this._handle}")
if pattern_obj is None:
    raise ValueError("Pattern handle not found in registry")

result = pattern_obj.subn(_subn_repl, _subn_string, ${count})
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
export async function compile(
  pattern: string,
  flags: string = ''
): Promise<PythonPattern> {
  return await PythonBackend.compile(pattern, flags);
}
