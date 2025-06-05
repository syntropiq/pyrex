// TypeScript script to batch convert all Python test files in test/split/ to TypeScript Vitest tests

import * as fs from 'fs';
import * as path from 'path';

// --- Conversion logic (refactored from convert_basic_tests.py-to-ts.ts) ---

function extractTests(py: string) {
  const lines = py.split('\n');
  const tests: { py: string; pattern: string; repl: string; input: string; expected: string }[] = [];
  const assertEqRegex = /self\.assertEqual\s*\(\s*regex\.sub\((.+?)\),\s*([^\)]+)\)/;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();
    if (line.startsWith('self.assertEqual(') && line.includes('regex.sub')) {
      const m = assertEqRegex.exec(line);
      if (m) {
        const args = m[1].split(',').map(s => s.trim());
        const expected = m[2].trim();
        tests.push({
          py: line,
          pattern: args[0],
          repl: args[1],
          input: args[2],
          expected,
        });
      } else {
        let joined = line;
        let j = i + 1;
        while (!joined.includes(')') && j < lines.length) {
          joined += lines[j].trim();
          j++;
        }
        const m2 = assertEqRegex.exec(joined);
        if (m2) {
          const args = m2[1].split(',').map(s => s.trim());
          const expected = m2[2].trim();
          tests.push({
            py: joined,
            pattern: args[0],
            repl: args[1],
            input: args[2],
            expected,
          });
        }
        i = j - 1;
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

function toTsTest({ pattern, repl, input, expected, py }: any, idx: number) {
  // If any argument is missing, output a commented test
  if (pattern === undefined || repl === undefined || input === undefined || expected === undefined) {
    return `// Skipped test ${idx + 1}: incomplete arguments in Python: ${py}`;
  }
  let tsRepl = repl;
  if (repl.includes('lambda') || repl.match(/self\.\w+/)) {
    tsRepl = '// TODO: Manual conversion needed for callable replacement';
  } else {
    tsRepl = pyArgToTs(repl);
  }
  const tsPattern = pyArgToTs(pattern);
  const tsInput = pyArgToTs(input);
  const tsExpected = pyExpectedToTs(expected);

  let comment = '';
  if (tsRepl.startsWith('//')) {
    comment = `// Python: ${py}`;
  }

  return `
  it('test ${idx + 1}', () => {
    ${comment}
    // Use PyRex's Python backend for sub
    expect(re.sub(${tsPattern}, ${tsRepl}, ${tsInput}, { backend: 'python' })).toBe(${tsExpected});
  });`;
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