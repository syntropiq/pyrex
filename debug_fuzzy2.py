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

print("Advanced debugging of the fuzzy matching issue...")
print()

# Let's calculate expected positions
termini5_start = 3  # From previous analysis, fuzzy match starts at position 3
termini5_length = 146
gene_start = termini5_start + termini5_length - 1  # accounting for fuzzy overlap
gene_length = 1059
spacer_start = gene_start + gene_length
spacer_length = len("TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAGTTGTAAGGATATGCCATTCTAGA")
barcode_start = spacer_start + spacer_length
barcode_length = 18
termini3_start = barcode_start + barcode_length

print(f"Expected positions based on fuzzy termini5 match at position 3:")
print(f"termini5: {termini5_start} - {termini5_start + termini5_length - 1}")
print(f"gene: {gene_start} - {gene_start + gene_length - 1}")
print(f"spacer: {spacer_start} - {spacer_start + spacer_length - 1}")
print(f"barcode: {barcode_start} - {barcode_start + barcode_length - 1}")
print(f"termini3: {termini3_start} - {termini3_start + 50}")
print()

print(f"Text length: {len(text)}")
print(f"Expected termini3 start: {termini3_start}")

if termini3_start < len(text):
    print(f"Text at expected termini3 position: {text[termini3_start:termini3_start+50]}...")
else:
    print("ERROR: Expected termini3 position exceeds text length!")
print()

# Let's look for the expected termini3 pattern at the end
termini3_pattern = "AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG"
print(f"Looking for termini3 pattern: {termini3_pattern}")

# Check the last part of the text
end_of_text = text[-100:]
print(f"End of text (last 100 chars): {end_of_text}")

# Look for the specific termini3 pattern at the end
expected_termini3_exact = "AGATCGGTAGAGCGTCGTGTAGGGAAAGAGTGTGG"
termini3_pos_end = text.find(expected_termini3_exact)
print(f"Expected termini3 exact pattern found at: {termini3_pos_end}")

if termini3_pos_end >= 0:
    print(f"Context: {text[termini3_pos_end-20:termini3_pos_end+50]}")

# Try a simpler approach - just look for the full pattern without named groups
simple_pattern = (
    "(GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "([ACGT]{1059}){e<=2}"
    "(TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
    "TTGTAAGGATATGCCATTCTAGA){e<=0}"
    "([ACGT]{18}){e<=0}"
    "(AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG){e<=1}"
)

print(f"\nTrying simplified pattern without named groups:")
m_simple = regex.search(simple_pattern, text, flags=regex.BESTMATCH)
print(f"Simple pattern match: {m_simple}")

if m_simple:
    print(f"Match span: {m_simple.span()}")
    print(f"Groups: {m_simple.groups()}")
    print(f"Fuzzy counts: {m_simple.fuzzy_counts}")
    print(f"Fuzzy changes: {m_simple.fuzzy_changes}")
