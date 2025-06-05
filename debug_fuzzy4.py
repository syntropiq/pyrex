#!/usr/bin/env python3

import regex

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

print("Analyzing the gap between gene and spacer...")

gene_end = 1206
spacer_start = 1274
gap_size = spacer_start - gene_end

print(f"Gene ends at position: {gene_end}")
print(f"Spacer starts at position: {spacer_start}")
print(f"Gap size: {gap_size} characters")
print(f"Gap content: '{text[gene_end:spacer_start]}'")

# Let's see if the gap is part of the gene or should be ignored
print(f"\nChecking if gap contains valid DNA nucleotides:")
gap_content = text[gene_end:spacer_start]
valid_dna = all(c in "ACGT" for c in gap_content)
print(f"Gap contains only ACGT: {valid_dna}")

if valid_dna:
    print(f"Gap could be part of an extended gene sequence")
    
    # Try with a longer gene pattern
    extended_gene_length = 1059 + gap_size
    print(f"Trying with extended gene length: {extended_gene_length}")
    
    pattern_extended = (
        "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
        "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
        "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
        f"(?P<gene>[ACGT]{{{extended_gene_length}}}){{e<=2}}"
        "(?P<spacer>TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
        "TTGTAAGGATATGCCATTCTAGA){e<=0}"
        "(?P<barcode>[ACGT]{18}){e<=0}"
        "(?P<termini3>AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG){e<=1}"
    )
    
    m_extended = regex.search(pattern_extended, text, flags=regex.BESTMATCH)
    print(f"Extended pattern match: {m_extended}")
    if m_extended:
        print(f"  Span: {m_extended.span()}")
        print(f"  Fuzzy counts: {m_extended.fuzzy_counts}")
        print(f"  Fuzzy changes: {m_extended.fuzzy_changes}")
        
        # Check the groups
        for i, group_name in enumerate(['termini5', 'gene', 'spacer', 'barcode', 'termini3'], 1):
            print(f"  {group_name}: {m_extended.group(i)[:50]}{'...' if len(m_extended.group(i)) > 50 else ''}")

# Also try allowing some errors in the spacer
print(f"\n" + "="*60)
print("Trying with spacer errors allowed:")

pattern_spacer_fuzzy = (
    "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "(?P<gene>[ACGT]{1059}){e<=2}"
    "(?P<spacer>TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
    "TTGTAAGGATATGCCATTCTAGA){e<=2}"  # Allow up to 2 errors in spacer
    "(?P<barcode>[ACGT]{18}){e<=0}"
    "(?P<termini3>AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG){e<=1}"
)

m_spacer_fuzzy = regex.search(pattern_spacer_fuzzy, text, flags=regex.BESTMATCH)
print(f"Spacer fuzzy match: {m_spacer_fuzzy}")
if m_spacer_fuzzy:
    print(f"  Span: {m_spacer_fuzzy.span()}")
    print(f"  Fuzzy counts: {m_spacer_fuzzy.fuzzy_counts}")
    print(f"  Fuzzy changes: {m_spacer_fuzzy.fuzzy_changes}")
