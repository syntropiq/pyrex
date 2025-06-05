#!/usr/bin/env python3
"""
Split Regex Tests by Subject

Reads extracted-regex-tests.json (index) and test-regex.py (source),
extracts each test function, and writes grouped files by subject/category.
"""

import json
import ast
from pathlib import Path
from typing import Dict, List

INDEX_PATH = Path("test/utils/extracted-regex-tests.json")
SOURCE_PATH = Path("test/utils/test-regex.py")
OUTPUT_DIR = Path("test/split/")

def load_index() -> List[Dict]:
    with INDEX_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)
    return data["tests"]

def load_source() -> str:
    with SOURCE_PATH.open("r", encoding="utf-8") as f:
        return f.read()

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    index = load_index()
    source = load_source()
    lines = source.splitlines()
    grouped: Dict[str, List[str]] = {}

    for test in index:
        cat = test.get("category", "uncategorized")
        name = test["name"]
        start = test["line_start"] - 1
        end = test["line_end"]
        snippet = "\n".join(lines[start:end])
        grouped.setdefault(cat, []).append(f"# {name}\n{snippet}\n")

    for cat, snippets in grouped.items():
        out_path = OUTPUT_DIR / f"{cat}_tests.py"
        with out_path.open("w", encoding="utf-8") as f:
            f.write("\n".join(snippets))

if __name__ == "__main__":
    main()