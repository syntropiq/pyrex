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

print("Examining spacer region positioning...")

# Find where the spacer actually starts
spacer_pattern = "TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAGTTGTAAGGATATGCCATTCTAGA"
spacer_pos = text.find(spacer_pattern)
print(f"Spacer found at position: {spacer_pos}")

if spacer_pos >= 0:
    print(f"Context before spacer: {text[spacer_pos-50:spacer_pos]}")
    print(f"Spacer: {text[spacer_pos:spacer_pos+len(spacer_pattern)]}")
    print(f"Context after spacer: {text[spacer_pos+len(spacer_pattern):spacer_pos+len(spacer_pattern)+50]}")
    
    # Now check what comes after the spacer
    after_spacer_pos = spacer_pos + len(spacer_pattern)
    print(f"\nAfter spacer position: {after_spacer_pos}")
    print(f"Next 100 chars: {text[after_spacer_pos:after_spacer_pos+100]}")
    
    # Look for 18 nucleotides (barcode)
    potential_barcode = text[after_spacer_pos:after_spacer_pos+18]
    print(f"Potential barcode (18 chars): {potential_barcode}")
    
    # Check if it's valid DNA
    import re
    if re.match("^[ACGT]{18}$", potential_barcode):
        print("Valid 18-nucleotide barcode found!")
        
        # Check what comes after the barcode
        after_barcode_pos = after_spacer_pos + 18
        print(f"After barcode position: {after_barcode_pos}")
        print(f"Next 50 chars: {text[after_barcode_pos:after_barcode_pos+50]}")
        
        # Check if termini3 pattern is there
        termini3_candidates = ["AGATCGGTAGAGCGTCGTGTAGGGAAAGAGTGTGG", "AGATCGGCAGAGCGTCGTGTAGGGAAAGAGTGTGG"]
        for candidate in termini3_candidates:
            if text[after_barcode_pos:after_barcode_pos+len(candidate)] == candidate:
                print(f"Found exact termini3 match: {candidate}")
                break
        else:
            print("No exact termini3 match found at expected position")
            print(f"Actual sequence: {text[after_barcode_pos:after_barcode_pos+40]}")
    else:
        print(f"NOT a valid 18-nucleotide barcode: {potential_barcode}")

# Let's try breaking down further and see if there's a different issue
print("\n" + "="*60)
print("Trying a step-by-step approach...")

# Test with just termini5 + gene
pattern1 = (
    "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "(?P<gene>[ACGT]{1059}){e<=2}"
)

m1 = regex.search(pattern1, text, flags=regex.BESTMATCH)
print(f"termini5 + gene match: {m1}")
if m1:
    print(f"  Span: {m1.span()}")
    print(f"  Fuzzy counts: {m1.fuzzy_counts}")

# Test with termini5 + gene + spacer
pattern2 = (
    "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "(?P<gene>[ACGT]{1059}){e<=2}"
    "(?P<spacer>TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
    "TTGTAAGGATATGCCATTCTAGA){e<=0}"
)

m2 = regex.search(pattern2, text, flags=regex.BESTMATCH)
print(f"termini5 + gene + spacer match: {m2}")
if m2:
    print(f"  Span: {m2.span()}")
    print(f"  Fuzzy counts: {m2.fuzzy_counts}")

# Test adding barcode
pattern3 = (
    "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "(?P<gene>[ACGT]{1059}){e<=2}"
    "(?P<spacer>TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
    "TTGTAAGGATATGCCATTCTAGA){e<=0}"
    "(?P<barcode>[ACGT]{18}){e<=0}"
)

m3 = regex.search(pattern3, text, flags=regex.BESTMATCH)
print(f"termini5 + gene + spacer + barcode match: {m3}")
if m3:
    print(f"  Span: {m3.span()}")
    print(f"  Fuzzy counts: {m3.fuzzy_counts}")

# Test the full pattern
pattern_full = (
    "(?P<termini5>GGCGTCACACTTTGCTATGCCATAGCAT[AG]TTTATCCATAAGA"
    "TTAGCGGATCCTACCTGACGCTTTTTATCGCAACTCTCTACTGTTTCTCCATAACAGAACATATTGA"
    "CTATCCGGTATTACCCGGCATGACAGGAGTAAAA){e<=1}"
    "(?P<gene>[ACGT]{1059}){e<=2}"
    "(?P<spacer>TAATCGTCTTGTTTGATACACAAGGGTCGCATCTGCGGCCCTTTTGCTTTTTTAAG"
    "TTGTAAGGATATGCCATTCTAGA){e<=0}"
    "(?P<barcode>[ACGT]{18}){e<=0}"
    "(?P<termini3>AGATCGG[CT]AGAGCGTCGTGTAGGGAAAGAGTGTGG){e<=1}"
)

m_full = regex.search(pattern_full, text, flags=regex.BESTMATCH)
print(f"Full pattern match: {m_full}")
if m_full:
    print(f"  Span: {m_full.span()}")
    print(f"  Fuzzy counts: {m_full.fuzzy_counts}")
    print(f"  Fuzzy changes: {m_full.fuzzy_changes}")
