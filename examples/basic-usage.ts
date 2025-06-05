import * as re from '../src/index.js';

// Basic JavaScript regex operations
console.log('=== JavaScript Regex Examples ===');

// Simple search
const searchResult = re.search('\\d+', 'There are 42 items');
console.log('Search result:', searchResult?.group()); // "42"

// Case-insensitive matching
const matchResult = re.match('HELLO', 'hello world', 'i');
console.log('Match result:', matchResult?.group()); // "hello"

// Groups
const groupResult = re.search('(\\w+)\\s+(\\w+)', 'hello world');
console.log('Groups:', groupResult?.groups()); // ["hello", "world"]

// Substitution
const subResult = re.sub('\\d+', 'X', 'Replace 123 and 456');
console.log('Substitution:', subResult); // "Replace X and X"

// Split
const splitResult = re.split('\\s+', 'split   this    string');
console.log('Split result:', splitResult); // ["split", "this", "string"]

// Find all
const findAllResult = re.findall('\\w+', 'find all words here');
console.log('Find all:', findAllResult); // ["find", "all", "words", "here"]

// Pattern compilation
const pattern = re.compile('\\d+');
const compiledResult = pattern.search('Find 789 here');
console.log('Compiled pattern result:', compiledResult?.group()); // "789"

// Pattern analysis
console.log('\n=== Pattern Analysis ===');
console.log('JavaScript pattern:', re.analyze('\\d+'));
console.log('Requires Python:', re.requiresPython('\\d+'));

// Example of Python-only pattern detection
try {
  re.compile('(?P<name>\\w+)', 'x'); // Python-only features
} catch (error) {
  console.log('Python-only pattern error:', error.message);
}

// Async usage for Python patterns (commented out as it requires Python backend)
/*
console.log('\n=== Async Python Regex Examples ===');

async function pythonExamples() {
  // These would work if Python backend is available
  const asyncPattern = await re.compileAsync('(?P<name>\\w+)', 'x');
  const asyncResult = await asyncPattern.search('test');
  console.log('Async result:', asyncResult?.group());
}

// pythonExamples();
*/