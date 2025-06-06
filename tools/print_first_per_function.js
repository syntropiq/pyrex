import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '../test/utils/regex_test_patterns.json');

const data = JSON.parse(await readFile(filePath, 'utf-8'));

const seen = new Set();
for (const test of data) {
  if (!seen.has(test.function)) {
    seen.add(test.function);
    console.log(`Function: ${test.function}\n`, JSON.stringify(test, null, 2), '\n');
  }
}