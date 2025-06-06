#!/usr/bin/env python3
"""
Regex Test Extraction Tool

This script parses the test-regex.py file and extracts individual test methods
with their metadata including test names, patterns, expected results, and other
relevant information for migration to TypeScript test structure.
"""

import ast
import re
import json
from typing import Dict, List, Any, Optional
from pathlib import Path


class RegexTestExtractor:
    """Extracts test cases from Python regex test files."""
    
    def __init__(self, test_file_path: str):
        self.test_file_path = Path(test_file_path)
        self.test_methods: List[Dict[str, Any]] = []
        
    def extract_tests(self) -> List[Dict[str, Any]]:
        """Extract all test methods from the Python test file."""
        if not self.test_file_path.exists():
            raise FileNotFoundError(f"Test file not found: {self.test_file_path}")
            
        with open(self.test_file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Parse the Python AST
        tree = ast.parse(content)
        
        # Extract test methods
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef) and node.name.startswith('test_'):
                test_info = self._extract_test_info(node, content)
                if test_info:
                    self.test_methods.append(test_info)
                    
        return self.test_methods
    
    def _extract_test_info(self, func_node: ast.FunctionDef, content: str) -> Optional[Dict[str, Any]]:
        """Extract metadata from a test function node."""
        test_info = {
            'name': func_node.name,
            'line_start': func_node.lineno,
            'line_end': func_node.end_lineno,
            'docstring': ast.get_docstring(func_node),
            'patterns': [],
            'assertions': [],
            'imports': [],
            'category': self._categorize_test(func_node.name),
            'complexity': 'basic'
        }
        
        # Extract the actual source code
        lines = content.split('\n')
        test_source = '\n'.join(lines[func_node.lineno-1:func_node.end_lineno])
        test_info['source_code'] = test_source
        
        # Extract regex patterns and assertions
        self._extract_patterns_and_assertions(func_node, test_info)
        
        # Skip test if any pattern or assertion contains bytes
        def contains_bytes(obj):
            if isinstance(obj, bytes):
                return True
            if isinstance(obj, dict):
                return any(contains_bytes(v) for v in obj.values())
            if isinstance(obj, list):
                return any(contains_bytes(v) for v in obj)
            return False

        if contains_bytes(test_info):
            return None

        return test_info
    
    def _extract_patterns_and_assertions(self, func_node: ast.FunctionDef, test_info: Dict[str, Any]):
        """Extract regex patterns and test assertions from the function."""
        for node in ast.walk(func_node):
            # Look for regex patterns (re.compile, re.match, re.search, etc.)
            if isinstance(node, ast.Call):
                if (isinstance(node.func, ast.Attribute) and
                    isinstance(node.func.value, ast.Name) and
                    node.func.value.id in ('re', 'regex')):
                    
                    pattern_info = self._extract_pattern_from_call(node)
                    if pattern_info:
                        test_info['patterns'].append(pattern_info)
                        
                # Look for assertions
                elif (isinstance(node.func, ast.Attribute) and 
                      node.func.attr.startswith('assert')):
                    
                    assertion_info = self._extract_assertion_info(node)
                    if assertion_info:
                        test_info['assertions'].append(assertion_info)
    
    def _extract_pattern_from_call(self, call_node: ast.Call) -> Optional[Dict[str, Any]]:
        """Extract regex pattern information from a function call."""
        if not (isinstance(call_node.func, ast.Attribute) and
                isinstance(call_node.func.value, ast.Name) and
                call_node.func.value.id in ('re', 'regex')):
            return None
            
        method_name = call_node.func.attr
        pattern_info = {
            'method': method_name,
            'pattern': None,
            'flags': [],
            'line': call_node.lineno
        }
        
        # Extract pattern (first argument)
        if call_node.args:
            if isinstance(call_node.args[0], ast.Constant):
                pattern_info['pattern'] = call_node.args[0].value
            elif isinstance(call_node.args[0], ast.Str):  # Python < 3.8 compatibility
                pattern_info['pattern'] = call_node.args[0].s
                
        # Extract flags (if present)
        for keyword in call_node.keywords:
            if keyword.arg == 'flags':
                pattern_info['flags'].append(self._extract_flag_value(keyword.value))
                
        return pattern_info if pattern_info['pattern'] else None
    
    def _extract_assertion_info(self, call_node: ast.Call) -> Optional[Dict[str, Any]]:
        """Extract assertion information."""
        if not isinstance(call_node.func, ast.Attribute):
            return None
            
        assertion_type = call_node.func.attr
        return {
            'type': assertion_type,
            'line': call_node.lineno,
            'args_count': len(call_node.args)
        }
    
    def _extract_flag_value(self, flag_node: ast.AST) -> str:
        """Extract regex flag values."""
        if isinstance(flag_node, ast.Attribute):
            return f"re.{flag_node.attr}"
        elif isinstance(flag_node, ast.Constant):
            return str(flag_node.value)
        return "unknown"
    
    def _categorize_test(self, test_name: str) -> str:
        """Categorize test based on its name."""
        name_lower = test_name.lower()
        
        if any(keyword in name_lower for keyword in ['basic', 'simple', 'intro']):
            return 'basic'
        elif any(keyword in name_lower for keyword in ['performance', 'speed', 'benchmark']):
            return 'performance'
        elif any(keyword in name_lower for keyword in ['error', 'exception', 'invalid']):
            return 'error_handling'
        elif any(keyword in name_lower for keyword in ['async', 'concurrent', 'parallel']):
            return 'async'
        elif any(keyword in name_lower for keyword in ['complex', 'advanced', 'nested']):
            return 'advanced'
        else:
            return 'general'
    
    def export_to_json(self, output_path: str) -> None:
        """Export extracted test data to JSON file."""
        output_data = {
            'source_file': str(self.test_file_path),
            'extraction_timestamp': None,  # Could add timestamp if needed
            'total_tests': len(self.test_methods),
            'tests': self.test_methods
        }
        
        with open(output_path, 'w', encoding='utf-8') as file:
            json.dump(output_data, file, indent=2, ensure_ascii=False)
    
    def generate_migration_report(self) -> Dict[str, Any]:
        """Generate a report for migration planning."""
        categories = {}
        total_patterns = 0
        complexity_distribution = {'basic': 0, 'intermediate': 0, 'advanced': 0}
        
        for test in self.test_methods:
            category = test['category']
            if category not in categories:
                categories[category] = {'count': 0, 'tests': []}
            
            categories[category]['count'] += 1
            categories[category]['tests'].append(test['name'])
            
            total_patterns += len(test['patterns'])
            
            # Determine complexity based on patterns and assertions
            pattern_count = len(test['patterns'])
            assertion_count = len(test['assertions'])
            
            if pattern_count <= 2 and assertion_count <= 3:
                complexity_distribution['basic'] += 1
            elif pattern_count <= 5 and assertion_count <= 8:
                complexity_distribution['intermediate'] += 1
            else:
                complexity_distribution['advanced'] += 1
        
        return {
            'total_tests': len(self.test_methods),
            'total_patterns': total_patterns,
            'categories': categories,
            'complexity_distribution': complexity_distribution,
            'recommended_migration_order': self._recommend_migration_order(categories)
        }
    
    def _recommend_migration_order(self, categories: Dict[str, Any]) -> List[str]:
        """Recommend order for migrating test categories."""
        # Prioritize basic tests first, then general, then specialized
        priority_order = ['basic', 'general', 'error_handling', 'performance', 'async', 'advanced']
        
        available_categories = list(categories.keys())
        ordered_categories = []
        
        # Add categories in priority order
        for category in priority_order:
            if category in available_categories:
                ordered_categories.append(category)
        
        # Add any remaining categories
        for category in available_categories:
            if category not in ordered_categories:
                ordered_categories.append(category)
                
        return ordered_categories


def main():
    """Main function to run the extraction tool."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Extract regex tests from Python test file')
    parser.add_argument('input_file', help='Path to the Python test file')
    parser.add_argument('--output-json', help='Output JSON file path')
    parser.add_argument('--report', action='store_true', help='Generate migration report')
    
    args = parser.parse_args()
    
    try:
        extractor = RegexTestExtractor(args.input_file)
        tests = extractor.extract_tests()
        
        print(f"Extracted {len(tests)} test methods from {args.input_file}")
        
        if args.output_json:
            extractor.export_to_json(args.output_json)
            print(f"Test data exported to {args.output_json}")
        
        if args.report:
            report = extractor.generate_migration_report()
            print("\n=== Migration Report ===")
            print(f"Total tests: {report['total_tests']}")
            print(f"Total regex patterns: {report['total_patterns']}")
            print(f"Categories: {list(report['categories'].keys())}")
            print(f"Recommended migration order: {report['recommended_migration_order']}")
            print(f"Complexity distribution: {report['complexity_distribution']}")
        
        # Print summary of test categories
        categories = {}
        for test in tests:
            category = test['category']
            if category not in categories:
                categories[category] = []
            categories[category].append(test['name'])
        
        print(f"\n=== Test Categories ===")
        for category, test_names in categories.items():
            print(f"{category}: {len(test_names)} tests")
            for name in test_names[:3]:  # Show first 3 tests
                print(f"  - {name}")
            if len(test_names) > 3:
                print(f"  ... and {len(test_names) - 3} more")
            
    except Exception as e:
        print(f"Error: {e}")
        return 1
    
    return 0


if __name__ == '__main__':
    exit(main())