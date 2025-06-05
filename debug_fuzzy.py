#!/usr/bin/env python3

import regex

# The failing test pattern and text
pattern = (
    "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "(?P<gene>[ACGT]{1059}){e<=2}"
    "(?P<spacer>TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
    "TTGTAAGGATATGCCATTCTAGA){e<=0}"
    "(?P<barcode>[ACGT]{18}){e<=0}"
    "(?P<termini3>AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG){e<=1}"
)

text = (
    "GCACGGCGTCACACTTTGCTATGCCATAGCATATTTATCCATAAGATTAGCGGATCCTACC"
    "TGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGACTATCCGGTATTACC"
    "CGGCATGACAGGAGTAAAAATGGCTATCGACGAAAACAAACAGAAAGCGTTGGCGGCAGCACTGGGC"
    "CAGATTGAGAAACAATTTGGTAAAGGCTCCATCATGCGCCTGGGTGAAGACCGTTCCATGGATGTGG"
    "AAACCATCTCTACCGGTTCGCTTTCACTGGATATCGCGCTTGGGGCAGGTGGTCTGCCGATGGGCCG"
    "TATCGTCGAAATCTACGGACCGGAATCTTCCGGTAAAACCACGCTGACGCTGCAGGTGATCGCCGCA"
    "GCGCAGCGTGAAGGTAAAACCTGTGCGTTTATCGATGCTGAACACGCGCTGGACCCAATCTACGCAC"
    "GTAAACTGGGCGTCGATATCGACAACCTGCTGTGCTCCCAGCCGGACACCGGCGAGCAGGCACTGGA"
    "AATCTGTGACGCCCTGGCGCGTTCTGGCGCAGTAGACGTTATCGTCGTTGACTCCGTGGCGGCACTG"
    "ACGCCGAAAGCGGAAATCGAAGGCGAAATCGGCGACTCTCATATGGGCCTTGCGGCACGTATGATGA"
    "GCCAGGCGATGCGTAAGCTGGCGGGTAACCTGAAGCAGTCCAACACGCTGCTGATCTTCATCAACCC"
    "CATCCGTATGAAAATTGGTGTGATGTTCGGCAACCCGGAAACCACTTACCGGTGGTAACGCGCTGAA"
    "ATTCTACGCCTCTGTTCGTCTCGACATCCGTTAAATCGGCGCGGTGAAAGAGGGCGAAAACGTGGTG"
    "GGTAGCGAAACCCGCGTGAAAGTGGTGAAGAACAAAATCGCTGCGCCGTTTAAACAGGCTGAATTCC"
    "AGATCCTCTACGGCGAAGGTATCAACTTCTACCCCGAACTGGTTGACCTGGGCGTAAAAGAGAAGCT"
    "GATCGAGAAAGCAGGCGCGTGGTACAGCTACAAAGGTGAGAAGATCGGTCAGGGTAAAGCGAATGCG"
    "ACTGCCTGGCTGAAATTTAACCCGGAAACCGCGAAAGAGATCGAGTGAAAAGTACGTGAGTTGCTGC"
    "ACTGCCTGGCTGAAATTTAACCCGGAAACCGCGAAAGAGATCGAGTGAAAAGTACGTGAGTTGCTGC"
    "TGAGCAACCCGAACTCAACGCCGGATTTCTCTGTAGATGATAGCGAAGGCGTAGCAGAAACTAACGA"
    "AGATTTTTAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAGTTGT"
    "AAGGATATGCCATTCTAGACAGTTAACACACCAACAAAGATCGGTAGAGCGTCGTGTAGGGAAAGAG"
    "TGTGGTACC"
)

print("Testing fuzzy matching pattern...")
print(f"Pattern length: {len(pattern)}")
print(f"Text length: {len(text)}")
print()

# Try without BESTMATCH first
print("1. Testing without BESTMATCH:")
m1 = regex.search(pattern, text)
print(f"Match result: {m1}")
print()

# Try with BESTMATCH
print("2. Testing with BESTMATCH:")
m2 = regex.search(pattern, text, flags=regex.BESTMATCH)
print(f"Match result: {m2}")
print()

# Let's break down the pattern into parts and test each one
print("3. Testing individual pattern components:")

# Extract the individual patterns
termini5_pattern = "GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA" + \
                  "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA" + \
                  "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA"

gene_pattern = "[ACGT]{1059}"
spacer_pattern = "TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG" + \
                "TTGTAAGGATATGCCATTCTAGA"
barcode_pattern = "[ACGT]{18}"
termini3_pattern = "AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG"

print(f"termini5 pattern length: {len(termini5_pattern)}")
print(f"Looking for termini5 in text...")
m_termini5 = regex.search(termini5_pattern, text)
print(f"termini5 exact match: {m_termini5}")

# Try with fuzzy matching
m_termini5_fuzzy = regex.search(f"({termini5_pattern}){{e<=1}}", text)
print(f"termini5 fuzzy match (e<=1): {m_termini5_fuzzy}")
print()

# Look for patterns in the text
print("4. Analyzing text structure:")
print(f"Text starts with: {text[:100]}...")
print(f"Text ends with: {text[-100:]}")
print()

# Check if the termini5 pattern is close to the beginning
print("5. Checking termini5 alignment:")
expected_start = "GGCGTCACACTTTGCTATGCCATAGCAT"
actual_start_pos = text.find(expected_start)
print(f"Expected start '{expected_start}' found at position: {actual_start_pos}")

if actual_start_pos >= 0:
    print(f"Text at that position: {text[actual_start_pos:actual_start_pos+100]}...")

# Check for the spacer pattern
print("\n6. Checking for spacer pattern:")
spacer_pos = text.find("TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG")
print(f"Spacer pattern found at position: {spacer_pos}")

# Check for termini3 pattern
print("\n7. Checking for termini3 pattern:")
termini3_base = "AGATCGG"
termini3_pos = text.find(termini3_base)
print(f"termini3 base '{termini3_base}' found at position: {termini3_pos}")

if termini3_pos >= 0:
    print(f"Text around termini3: {text[termini3_pos:termini3_pos+50]}")
