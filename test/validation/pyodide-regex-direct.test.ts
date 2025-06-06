// Direct test of Python's regex module in Pyodide to ensure it works correctly
// This validates that the underlying Python regex module is functioning before testing our wrapper

import { describe, it, expect } from 'vitest';
import { loadPyodide } from 'pyodide';

describe('Direct Pyodide Regex Module Validation', () => {
  it('should load and run Python regex module directly in Pyodide', async () => {
    const pyodide = await loadPyodide({
      indexURL: require.resolve('pyodide').replace(/pyodide\.js$/, '')
    });
    
    // Install regex package
    await pyodide.loadPackage(['micropip']);
    await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('regex')
    `);
    
    // Test basic regex functionality directly in Python
    const result = await pyodide.runPythonAsync(`
      import regex
      
      # Basic functionality tests
      test_results = {}
      
      # Test 1: Simple compile and match
      pattern = regex.compile(r'hello')
      test_results['compile_match'] = pattern.match('hello world') is not None
      
      # Test 2: Search functionality
      test_results['search'] = regex.search(r'world', 'hello world') is not None
      
      # Test 3: Findall
      test_results['findall'] = regex.findall(r'\\d+', 'abc123def456') == ['123', '456']
      
      # Test 4: Sub (substitution)
      test_results['sub'] = regex.sub(r'a', 'x', 'banana') == 'bxnxnx'
      
      # Test 5: Split
      test_results['split'] = regex.split(r',', 'a,b,c') == ['a', 'b', 'c']
      
      # Test 6: Flags
      test_results['flags'] = regex.search(r'hello', 'HELLO', regex.IGNORECASE) is not None
      
      test_results
    `);
    
    expect(result.toJs()).toEqual({
      compile_match: true,
      search: true,
      findall: true,
      sub: true,
      split: true,
      flags: true,
    });
  }, 60000); // Increase timeout for Pyodide loading
});