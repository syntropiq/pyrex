#!/usr/bin/env python3
"""
Script to extract regex patterns from test-regex.py and convert them to JSON format.
This extracts regex test cases for use with pyodide wrapper.
"""

import ast
import json
import sys
import os
from typing import List, Dict, Any, Optional

class RegexExtractor(ast.NodeVisitor):
    def __init__(self):
        self.regex_tests = []
        self.current_line = 0
        self.current_method = None
        
    def visit_FunctionDef(self, node):
        old_method = self.current_method
        self.current_method = node.name
        self.generic_visit(node)
        self.current_method = old_method
        
    def visit_Call(self, node):
        self.current_line = node.lineno
        
        # Check if this is an assertEqual call with regex function
        if (hasattr(node.func, 'attr') and node.func.attr == 'assertEqual' and 
            len(node.args) >= 2):
            
            first_arg = node.args[0]
            expected_result = node.args[1]
            
            # Check if first argument is a regex function call
            regex_info = self.extract_regex_call(first_arg)
            if regex_info:
                expected_value = self.extract_literal_value(expected_result)
                if expected_value is not None:
                    test_case = {
                        'line': self.current_line,
                        'method': self.current_method,
                        'function': regex_info['function'],
                        'pattern': regex_info['pattern'],
                        'input': regex_info['input'],
                        'expected': expected_value,
                        'flags': regex_info.get('flags'),
                        'is_bytes': regex_info.get('is_bytes', False)
                    }
                    self.regex_tests.append(test_case)
        
        self.generic_visit(node)
    
    def extract_regex_call(self, node) -> Optional[Dict]:
        """Extract regex function call information"""
        if not isinstance(node, ast.Call):
            return None
            
        # Check for regex.function_name calls
        if (hasattr(node.func, 'attr') and 
            hasattr(node.func, 'value') and 
            hasattr(node.func.value, 'id') and 
            node.func.value.id == 'regex'):
            
            function_name = node.func.attr
            
            # We're interested in these regex functions
            if function_name in ['findall', 'match', 'search', 'sub', 'split', 'finditer']:
                if len(node.args) >= 2:
                    pattern = self.extract_literal_value(node.args[0])
                    input_str = self.extract_literal_value(node.args[1])
                    
                    if pattern is not None and input_str is not None:
                        result = {
                            'function': function_name,
                            'pattern': pattern,
                            'input': input_str,
                            'is_bytes': isinstance(pattern, bytes) or isinstance(input_str, bytes)
                        }
                        
                        # Check for flags in additional arguments
                        if len(node.args) > 2:
                            flags = self.extract_flags(node.args[2:])
                            if flags:
                                result['flags'] = flags
                                
                        return result
        
        # Check for compiled pattern method calls (pattern.findall, etc.)
        elif (hasattr(node.func, 'attr') and 
              node.func.attr in ['findall', 'match', 'search', 'sub', 'split']):
            
            function_name = node.func.attr
            if len(node.args) >= 1:
                input_str = self.extract_literal_value(node.args[0])
                if input_str is not None:
                    # We can't easily extract the pattern from compiled regex object
                    # so we'll skip these for now
                    pass
                    
        return None
    
    def extract_literal_value(self, node):
        """Extract literal values from AST nodes"""
        if isinstance(node, ast.Constant):
            return node.value
        elif isinstance(node, ast.Str):  # Python < 3.8 compatibility
            return node.s
        elif isinstance(node, ast.Bytes):
            return node.s
        elif isinstance(node, ast.List):
            return [self.extract_literal_value(item) for item in node.elts]
        elif isinstance(node, ast.Tuple):
            return tuple(self.extract_literal_value(item) for item in node.elts)
        elif isinstance(node, ast.NameConstant):  # None, True, False
            return node.value
        else:
            return None
    
    def extract_flags(self, args) -> Optional[List[str]]:
        """Extract regex flags from arguments"""
        flags = []
        for arg in args:
            if (hasattr(arg, 'attr') and 
                hasattr(arg, 'value') and 
                hasattr(arg.value, 'id') and 
                arg.value.id == 'regex'):
                flags.append(f"regex.{arg.attr}")
        return flags if flags else None

def extract_regex_patterns(file_path: str) -> List[Dict[str, Any]]:
    """Extract regex patterns from Python test file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    try:
        tree = ast.parse(content)
        extractor = RegexExtractor()
        extractor.visit(tree)
        return extractor.regex_tests
    except SyntaxError as e:
        print(f"Error parsing {file_path}: {e}")
        return []

def convert_to_json_serializable(obj):
    """Convert objects to JSON serializable format"""
    if isinstance(obj, bytes):
        # Convert bytes to a representation that preserves the byte values
        return {
            "_type": "bytes",
            "_value": obj.decode('latin1')  # Preserve byte values
        }
    elif isinstance(obj, tuple):
        return list(convert_to_json_serializable(item) for item in obj)
    elif isinstance(obj, list):
        return [convert_to_json_serializable(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_to_json_serializable(v) for k, v in obj.items()}
    return obj

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_regex_patterns.py <path_to_test-regex.py>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    if not os.path.exists(input_file):
        print(f"Error: File {input_file} not found")
        sys.exit(1)
    
    print(f"Extracting regex patterns from {input_file}...")
    regex_tests = extract_regex_patterns(input_file)
    
    if not regex_tests:
        print("No regex test patterns found")
        return
    
    print(f"Found {len(regex_tests)} regex test cases")
    
    # Convert to JSON serializable format
    serializable_tests = []
    for test in regex_tests:
        serializable_test = {}
        for key, value in test.items():
            serializable_test[key] = convert_to_json_serializable(value)
        serializable_tests.append(serializable_test)
    
    # Output to JSON
    output_file = 'regex_test_patterns.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(serializable_tests, f, indent=2, ensure_ascii=False)
    
    print(f"Extracted patterns saved to {output_file}")
    
    # Show a few examples
    print("\nFirst few examples:")
    for i, test in enumerate(serializable_tests[:3]):
        print(f"\nExample {i+1}:")
        print(f"  Function: {test['function']}")
        print(f"  Pattern: {repr(test['pattern'])}")
        print(f"  Input: {repr(test['input'])}")
        print(f"  Expected: {test['expected']}")
        if test.get('flags'):
            print(f"  Flags: {test['flags']}")

if __name__ == "__main__":
    main()
