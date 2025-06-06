const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../test/utils/regex_test_patterns.json'),
    'utf-8'
  )
);

const seen = new Set();
for (const test of data) {
  if (!seen.has(test.function)) {
    seen.add(test.function);
    console.log(`Function: ${test.function}\n`, JSON.stringify(test, null, 2), '\n');
  }
}