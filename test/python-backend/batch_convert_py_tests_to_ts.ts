// TypeScript script to batch convert all Python test files in test/split/ to TypeScript Vitest tests

import * as fs from 'fs';
import * as path from 'path';

// --- Conversion logic (refactored from convert_basic_tests.py-to-ts.ts) ---

function extractTests(py: string) {
  const lines = py.split('\n');
  const tests: any[] = [];

  // Patterns for various regex function calls in assertions
  const patterns = [
    {
      // regex.sub
      regex: /self\.(assertEqual|assertTypedEqual)\s*\(\s*regex\.sub\((.+?)\),\s*([^\)]+)\)/,
      type: 'sub'
    },
    {
      // regex.match
      regex: /self\.(assertEqual|assertTypedEqual)\s*\(\s*regex\.match\((.+?)\)(?:\.(\w+)\((.*?)\))?,\s*([^\)]+)\)/,
      type: 'match'
    },
    {
      // regex.search
      regex: /self\.(assertEqual|assertTypedEqual)\s*\(\s*regex\.search\((.+?)\)(?:\.(\w+)\((.*?)\))?,\s*([^\)]+)\)/,
      type: 'search'
    },
    {
      // regex.findall
      regex: /self\.(assertEqual|assertTypedEqual)\s*\(\s*regex\.findall\((.+?)\),\s*([^\)]+)\)/,
      type: 'findall'
    },
    {
      // regex.compile
      regex: /self\.(assertEqual|assertTypedEqual)\s*\(\s*regex\.compile\((.+?)\)(?:\.(\w+)\((.*?)\))?,\s*([^\)]+)\)/,
      type: 'compile'
    }
  ];

  for (let i = 0; i < lines.length; ++i) {
    let line = lines[i].trim();
    // Join multi-line assertions
    if (!line.endsWith(')')) {
      let joined = line;
      let j = i + 1;
      while (!joined.endsWith(')') && j < lines.length) {
        joined += lines[j].trim();
        j++;
      }
      line = joined;
      i = j - 1;
    }

    for (const pat of patterns) {
      const m = pat.regex.exec(line);
      if (m) {
        if (pat.type === 'sub') {
          const args = m[2].split(',').map(s => s.trim());
          tests.push({
            py: line,
            type: 'sub',
            pattern: args[0],
            repl: args[1],
            input: args[2],
            expected: m[3].trim(),
          });
        } else if (pat.type === 'findall') {
          const args = m[2].split(',').map(s => s.trim());
          tests.push({
            py: line,
            type: 'findall',
            pattern: args[0],
            input: args[1],
            expected: m[3].trim(),
          });
        } else if (pat.type === 'match' || pat.type === 'search' || pat.type === 'compile') {
          const args = m[2].split(',').map(s => s.trim());
          tests.push({
            py: line,
            type: pat.type,
            pattern: args[0],
            input: args[1],
            method: m[3], // e.g., group, groups, span, captures
            methodArgs: m[4],
            expected: m[5].trim(),
          });
        }
        break;
      }
    }
  }
  return tests;
}

function pyArgToTs(arg: string | undefined) {
  if (typeof arg !== 'string') return '"// TODO: missing or invalid argument"';
  let s = arg.trim();
  // Remove r/b prefixes, convert quotes, and handle escape sequences
  s = s.replace(/^r?b?["']/, '"').replace(/["']$/, '"');
  // Convert legacy octal escapes (\012) to \x0A
  s = s.replace(/\\([0-7]{3})/g, (_, oct) => {
    const code = parseInt(oct, 8);
    return '\\x' + code.toString(16).padStart(2, '0');
  });
  // Ensure all backslashes are escaped for TS string literals
  s = s.replace(/\\/g, '\\\\');
  return s;
}

function pyExpectedToTs(expected: string) {
  let s = expected.trim();
  if (s.startsWith('chr(')) {
    s = s.replace(/chr\((\d+)\)/g, (m, n) => `String.fromCharCode(${n})`);
    s = s.replace(/\+/g, ' + ');
  }
  if (s.startsWith('b"') || s.startsWith('b\'')) {
    s = s.replace(/^b/, '');
  }
  return s;
}

function toTsTest(test: any, idx: number) {
  // Handle missing args
  if (!test.pattern || !test.input || !test.expected) {
    return `// Skipped test ${idx + 1}: incomplete arguments in Python: ${test.py}`;
  }
  const tsPattern = pyArgToTs(test.pattern);
  const tsInput = pyArgToTs(test.input);
  const tsExpected = pyExpectedToTs(test.expected);

  let comment = `// Python: ${test.py}`;
  if (test.type === 'sub') {
    let tsRepl = test.repl;
    if (tsRepl && (tsRepl.includes('lambda') || tsRepl.match(/self\.\w+/))) {
      tsRepl = '// TODO: Manual conversion needed for callable replacement';
    } else {
      tsRepl = pyArgToTs(tsRepl);
    }
    return `
  it('regex.sub test ${idx + 1}', async () => {
    ${comment}
    expect(await re.sub(${tsPattern}, ${tsRepl}, ${tsInput}, { backend: 'python' })).toBe(${tsExpected});
  });`;
  } else if (test.type === 'findall') {
    return `
  it('regex.findall test ${idx + 1}', async () => {
    ${comment}
    expect(await re.findall(${tsPattern}, ${tsInput}, { backend: 'python' })).toStrictEqual(${tsExpected});
  });`;
  } else if (test.type === 'match' || test.type === 'search' || test.type === 'compile') {
    // Compose the function call chain
    let call = `await re.${test.type}(${tsPattern}, ${tsInput}, { backend: 'python' })`;
    if (test.method) {
      if (test.methodArgs) {
        call += `?.${test.method}(${test.methodArgs})`;
      } else {
        call += `?.${test.method}()`;
      }
    }
    return `
  it('regex.${test.type} test ${idx + 1}', async () => {
    ${comment}
    expect(${call}).toStrictEqual(${tsExpected});
  });`;
  }
  return `// Skipped test ${idx + 1}: unsupported pattern in Python: ${test.py}`;
}

function convertPyTestFile(pyPath: string, tsOutPath: string) {
  const pyContent = fs.readFileSync(pyPath, 'utf-8');
  const tests = extractTests(pyContent);
  const tsTestFile = `import { describe, it, expect } from 'vitest';
// Auto-converted from ${pyPath}

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {
${tests.map(toTsTest).join('\n')}
});
`;

  fs.writeFileSync(tsOutPath, tsTestFile);
  console.log('Converted', pyPath, '->', tsOutPath);
}

// --- Batch conversion ---

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const splitDir = path.join(__dirname, '../split');
const outDir = __dirname;

const files = fs.readdirSync(splitDir)
  .filter(f => f.endsWith('.py') && !f.startsWith('__init__'));

for (const pyFile of files) {
  const pyPath = path.join(splitDir, pyFile);
  const baseName = path.basename(pyFile, '.py');
  const tsOutPath = path.join(outDir, `${baseName}.test.ts`);
  convertPyTestFile(pyPath, tsOutPath);
}