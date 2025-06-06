import { readFile } from 'fs/promises';

const data = JSON.parse(
  await readFile('./test/utils/regex_test_patterns.json', 'utf-8')
);

const functionSet = new Set();
for (const test of (data.tests || data)) {
  if (test.patterns) {
    for (const pat of test.patterns) {
      if (pat.method) functionSet.add(pat.method);
    }
  }
}
console.log('Regex function types in JSON:', Array.from(functionSet).sort());