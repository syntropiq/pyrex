#!/usr/bin/env python3
"""
Script to convert extracted regex patterns to a format suitable for pyodide wrapper.
This creates a simplified JSON format focusing on the specific test pattern you mentioned.
"""

import json
import sys
import os

def convert_bytes_repr(obj):
    """Convert our bytes representation back to string for pyodide"""
    if isinstance(obj, dict) and obj.get("_type") == "bytes":
        return obj["_value"]
    elif isinstance(obj, list):
        return [convert_bytes_repr(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_bytes_repr(v) for k, v in obj.items()}
    return obj

def create_pyodide_format(input_file: str, output_file: str):
    """Convert regex test patterns to pyodide-friendly format"""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    pyodide_tests = []
    
    for test in data:
        # Include ALL regex functions - we need to test each one properly
        if test['function'] in ['findall', 'match', 'search', 'sub', 'split', 'finditer']:
            # Convert our bytes representation back to strings for pyodide
            pattern = convert_bytes_repr(test['pattern'])
            input_str = convert_bytes_repr(test['input'])
            expected = convert_bytes_repr(test['expected'])
            
            pyodide_test = {
                "pattern": pattern,
                "input": input_str,
                "expected": expected,
                "function": test['function'],  # Keep the actual function being tested!
                "line": test['line'],
                "method": test['method']
            }
            
            # Add flags if present
            if test.get('flags'):
                pyodide_test['flags'] = test['flags']
            
            # Add type information
            if test.get('is_bytes'):
                pyodide_test['is_bytes'] = True
            
            pyodide_tests.append(pyodide_test)
    
    # Save the converted format
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(pyodide_tests, f, indent=2, ensure_ascii=False)
    
    return pyodide_tests

def main():
    input_file = "regex_test_patterns.json"
    output_file = "pyodide_regex_tests.json"
    
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found. Run extract_regex_patterns.py first.")
        sys.exit(1)
    
    print(f"Converting {input_file} to pyodide format...")
    tests = create_pyodide_format(input_file, output_file)
    
    print(f"Converted {len(tests)} regex tests to {output_file}")
    
    # Show function distribution
    function_counts = {}
    for test in tests:
        func = test['function']
        function_counts[func] = function_counts.get(func, 0) + 1
    
    print(f"\nFunction distribution:")
    for func, count in sorted(function_counts.items()):
        print(f"  {func}: {count} tests")
    
    # Show the specific \\R example
    r_tests = [t for t in tests if t['pattern'] == '\\R']
    if r_tests:
        print(f"\nFound {len(r_tests)} tests with \\R pattern:")
        for i, test in enumerate(r_tests):
            print(f"\nExample {i+1} (Line {test['line']}):")
            print(f"  Pattern: {repr(test['pattern'])}")
            print(f"  Input: {repr(test['input'])}")
            print(f"  Expected: {test['expected']}")
            if test.get('is_bytes'):
                print(f"  Type: bytes")
    
    # Show examples from different functions
    print(f"\nExamples by function:")
    for func in ['findall', 'match', 'search', 'sub', 'split']:
        func_tests = [t for t in tests if t['function'] == func]
        if func_tests:
            test = func_tests[0]  # Show first example
            print(f"\n{func.upper()} example (Line {test['line']}):")
            print(f"  Pattern: {repr(test['pattern'])}")
            print(f"  Input: {repr(test['input'])}")
            print(f"  Expected: {test['expected']}")
            if test.get('is_bytes'):
                print(f"  Type: bytes")

if __name__ == "__main__":
    main()
