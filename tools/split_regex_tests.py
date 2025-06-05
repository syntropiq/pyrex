#!/usr/bin/env python3
"""
Split Regex Tests by Subject and Subgroup

Reads extracted-regex-tests.json (index) and test-regex.py (source),
extracts each test function, and writes grouped files by subject/category.
If a group exceeds 1000 lines, it is further split by test function name prefix.
"""

import json
import ast
from pathlib import Path
from typing import Dict, List, Tuple

INDEX_PATH = Path("test/utils/extracted-regex-tests.json")
SOURCE_PATH = Path("test/utils/test-regex.py")
OUTPUT_DIR = Path("test/split/")

MAX_LINES_PER_FILE = 1000

def load_index() -> List[Dict]:
    with INDEX_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)
    return data["tests"]

def load_source() -> str:
    with SOURCE_PATH.open("r", encoding="utf-8") as f:
        return f.read()

def group_by_prefix(tests: List[Dict], prefix_len: int = 2) -> Dict[str, List[Dict]]:
    groups: Dict[str, List[Dict]] = {}
    for test in tests:
        name = test["name"]
        prefix = name.split("_")[1][:prefix_len] if "_" in name else name[:prefix_len]
        groups.setdefault(prefix, []).append(test)
    return groups

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    index = load_index()
    source = load_source()
    lines = source.splitlines()
    grouped: Dict[str, List[Dict]] = {}

    # First group by category
    for test in index:
        cat = test.get("category", "uncategorized")
        grouped.setdefault(cat, []).append(test)

    for cat, tests in grouped.items():
        # If group is too large, split by prefix
        snippets: List[Tuple[str, str]] = []
        if cat == "general":
            prefix_groups = group_by_prefix(tests, prefix_len=2)
            for prefix, subtests in prefix_groups.items():
                sub_snippets = []
                for test in subtests:
                    name = test["name"]
                    start = test["line_start"] - 1
                    end = test["line_end"]
                    snippet = f"# {name}\n" + "\n".join(lines[start:end]) + "\n"
                    sub_snippets.append(snippet)
                content = "\n".join(sub_snippets)
                if len(content.splitlines()) > MAX_LINES_PER_FILE:
                    # If still too large, split by prefix_len=3
                    deeper_groups = group_by_prefix(subtests, prefix_len=3)
                    for dprefix, dsubtests in deeper_groups.items():
                        dsub_snippets = []
                        for test in dsubtests:
                            name = test["name"]
                            start = test["line_start"] - 1
                            end = test["line_end"]
                            snippet = f"# {name}\n" + "\n".join(lines[start:end]) + "\n"
                            dsub_snippets.append(snippet)
                        dcontent = "\n".join(dsub_snippets)
                        out_path = OUTPUT_DIR / f"{cat}_{dprefix}_tests.py"
                        with out_path.open("w", encoding="utf-8") as f:
                            f.write(dcontent)
                else:
                    out_path = OUTPUT_DIR / f"{cat}_{prefix}_tests.py"
                    with out_path.open("w", encoding="utf-8") as f:
                        f.write(content)
        else:
            for test in tests:
                name = test["name"]
                start = test["line_start"] - 1
                end = test["line_end"]
                snippet = f"# {name}\n" + "\n".join(lines[start:end]) + "\n"
                snippets.append((name, snippet))
            content = "\n".join(snippet for _, snippet in snippets)
            out_path = OUTPUT_DIR / f"{cat}_tests.py"
            with out_path.open("w", encoding="utf-8") as f:
                f.write(content)

if __name__ == "__main__":
    main()