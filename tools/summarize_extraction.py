#!/usr/bin/env python3
"""
Final summary script showing the extracted regex patterns in the exact format requested.
"""

import json

def main():
    # Load the pyodide format data
    with open('pyodide_regex_tests.json', 'r', encoding='utf-8') as f:
        tests = json.load(f)
    
    print("=" * 80)
    print("REGEX PATTERN EXTRACTION SUMMARY")
    print("=" * 80)
    print(f"Total findall test cases extracted: {len(tests)}")
    print()
    
    # Find the specific \\R pattern mentioned
    r_tests = [t for t in tests if t['pattern'] == '\\R']
    
    print("SPECIFIC \\R PATTERN EXAMPLES (as mentioned):")
    print("-" * 50)
    
    for i, test in enumerate(r_tests):
        print(f"\nExample {i+1}:")
        print(f"Original form: regex.findall(r'{test['pattern']}', {repr(test['input'])})")
        print(f"Expected result: {test['expected']}")
        print(f"JSON format for pyodide:")
        
        json_entry = {
            "function": "findall",
            "pattern": test['pattern'],
            "input": test['input'],
            "expected": test['expected']
        }
        if test.get('is_bytes'):
            json_entry['is_bytes'] = True
            
        print(json.dumps(json_entry, indent=2, ensure_ascii=False))
        print()
    
    print("\nOTHER INTERESTING PATTERNS:")
    print("-" * 30)
    
    # Show some other interesting patterns
    interesting_patterns = [
        '(:+)',
        r'\d+',
        r'\b',
        r'\w+',
        r'[a-z]+',
        r'(?i)[a-z]+',
        r'\s+',
        r'[^a-z]+'
    ]
    
    for pattern in interesting_patterns:
        matching_tests = [t for t in tests if t['pattern'] == pattern]
        if matching_tests:
            test = matching_tests[0]  # Show first example
            print(f"Pattern: {repr(pattern)}")
            print(f"  Input: {repr(test['input'])}")
            print(f"  Expected: {test['expected']}")
            print()
    
    print("FILES CREATED:")
    print("-" * 15)
    print("1. regex_test_patterns.json - Complete extraction (247 test cases)")
    print("2. pyodide_regex_tests.json - Filtered findall tests (138 test cases)")
    print()
    print("USAGE:")
    print("-" * 7)
    print("The JSON files can now be used with your pyodide wrapper.")
    print("Each entry contains:")
    print("- pattern: The regex pattern")
    print("- input: The test string") 
    print("- expected: The expected result")
    print("- function: Always 'findall' in the pyodide format")
    print("- line: Original line number in test file")
    print("- method: Original test method name")
    print("- is_bytes: True if this was a bytes test")

if __name__ == "__main__":
    main()
