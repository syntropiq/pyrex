import regex
import sys
import pickle
import unittest


class TestGeneralHg(unittest.TestCase):
    # test_hg_bugs
    def test_hg_bugs(self):
        # Hg issue 28: regex.compile("(?>b)") causes "TypeError: 'Character'
        # object is not subscriptable"
        self.assertEqual(bool(regex.compile("(?>b)", flags=regex.V1)), True)

        # Hg issue 29: regex.compile("^((?>\w+)|(?>\s+))*$") causes
        # "TypeError: 'GreedyRepeat' object is not iterable"
        self.assertEqual(
            bool(regex.compile(r"^((?>\w+)|(?>\s+))*$", flags=regex.V1)), True
        )

        # Hg issue 31: atomic and normal groups in recursive patterns
        self.assertEqual(
            regex.findall(r"\((?:(?>[^()]+)|(?R))*\)", "a(bcd(e)f)g(h)"),
            ["(bcd(e)f)", "(h)"],
        )
        self.assertEqual(
            regex.findall(r"\((?:(?:[^()]+)|(?R))*\)", "a(bcd(e)f)g(h)"),
            ["(bcd(e)f)", "(h)"],
        )
        self.assertEqual(
            regex.findall(r"\((?:(?>[^()]+)|(?R))*\)", "a(b(cd)e)f)g)h"), ["(b(cd)e)"]
        )
        self.assertEqual(
            regex.findall(r"\((?:(?>[^()]+)|(?R))*\)", "a(bc(d(e)f)gh"), ["(d(e)f)"]
        )
        self.assertEqual(
            regex.findall(r"(?r)\((?:(?>[^()]+)|(?R))*\)", "a(bc(d(e)f)gh"), ["(d(e)f)"]
        )
        self.assertEqual(
            [
                m.group()
                for m in regex.finditer(r"\((?:[^()]*+|(?0))*\)", "a(b(c(de)fg)h")
            ],
            ["(c(de)fg)"],
        )

        # Hg issue 32: regex.search("a(bc)d", "abcd", regex.I|regex.V1) returns
        # None
        self.assertEqual(
            regex.search("a(bc)d", "abcd", regex.I | regex.V1).group(0), "abcd"
        )

        # Hg issue 33: regex.search("([\da-f:]+)$", "E", regex.I|regex.V1)
        # returns None
        self.assertEqual(
            regex.search(r"([\da-f:]+)$", "E", regex.I | regex.V1).group(0), "E"
        )
        self.assertEqual(
            regex.search(r"([\da-f:]+)$", "e", regex.I | regex.V1).group(0), "e"
        )

        # Hg issue 34: regex.search("^(?=ab(de))(abd)(e)", "abde").groups()
        # returns (None, 'abd', 'e') instead of ('de', 'abd', 'e')
        self.assertEqual(
            regex.search("^(?=ab(de))(abd)(e)", "abde").groups(), ("de", "abd", "e")
        )

        # Hg issue 35: regex.compile("\ ", regex.X) causes "_regex_core.error:
        # bad escape"
        self.assertEqual(bool(regex.match(r"\ ", " ", flags=regex.X)), True)

        # Hg issue 36: regex.search("^(a|)\1{2}b", "b") returns None
        self.assertEqual(regex.search(r"^(a|)\1{2}b", "b").group(0, 1), ("b", ""))

        # Hg issue 37: regex.search("^(a){0,0}", "abc").group(0,1) returns
        # ('a', 'a') instead of ('', None)
        self.assertEqual(regex.search("^(a){0,0}", "abc").group(0, 1), ("", None))

        # Hg issue 38: regex.search("(?>.*/)b", "a/b") returns None
        self.assertEqual(regex.search("(?>.*/)b", "a/b").group(0), "a/b")

        # Hg issue 39: regex.search("((?i)blah)\\s+\\1", "blah BLAH") doesn't
        # return None
        # Changed to positional flags in regex 2023.12.23.
        self.assertEqual(regex.search(r"((?i)blah)\s+\1", "blah BLAH"), None)

        # Hg issue 40: regex.search("(\()?[^()]+(?(1)\)|)", "(abcd").group(0)
        # returns "bcd" instead of "abcd"
        self.assertEqual(
            regex.search(r"(\()?[^()]+(?(1)\)|)", "(abcd").group(0), "abcd"
        )

        # Hg issue 42: regex.search("(a*)*", "a", flags=regex.V1).span(1)
        # returns (0, 1) instead of (1, 1)
        self.assertEqual(regex.search("(a*)*", "a").span(1), (1, 1))
        self.assertEqual(regex.search("(a*)*", "aa").span(1), (2, 2))
        self.assertEqual(regex.search("(a*)*", "aaa").span(1), (3, 3))

        # Hg issue 43: regex.compile("a(?#xxx)*") causes "_regex_core.error:
        # nothing to repeat"
        self.assertEqual(regex.search("a(?#xxx)*", "aaa").group(), "aaa")

        # Hg issue 44: regex.compile("(?=abc){3}abc") causes
        # "_regex_core.error: nothing to repeat"
        self.assertEqual(regex.search("(?=abc){3}abc", "abcabcabc").span(), (0, 3))

        # Hg issue 45: regex.compile("^(?:a(?:(?:))+)+") causes
        # "_regex_core.error: nothing to repeat"
        self.assertEqual(regex.search("^(?:a(?:(?:))+)+", "a").span(), (0, 1))
        self.assertEqual(regex.search("^(?:a(?:(?:))+)+", "aa").span(), (0, 2))

        # Hg issue 46: regex.compile("a(?x: b c )d") causes
        # "_regex_core.error: missing )"
        self.assertEqual(regex.search("a(?x: b c )d", "abcd").group(0), "abcd")

        # Hg issue 47: regex.compile("a#comment\n*", flags=regex.X) causes
        # "_regex_core.error: nothing to repeat"
        self.assertEqual(
            regex.search("a#comment\n*", "aaa", flags=regex.X).group(0), "aaa"
        )

        # Hg issue 48: regex.search("(a(?(1)\\1)){4}", "a"*10,
        # flags=regex.V1).group(0,1) returns ('aaaaa', 'a') instead of ('aaaaaaaaaa', 'aaaa')
        self.assertEqual(
            regex.search(r"(?V1)(a(?(1)\1)){1}", "aaaaaaaaaa").span(0, 1),
            ((0, 1), (0, 1)),
        )
        self.assertEqual(
            regex.search(r"(?V1)(a(?(1)\1)){2}", "aaaaaaaaaa").span(0, 1),
            ((0, 3), (1, 3)),
        )
        self.assertEqual(
            regex.search(r"(?V1)(a(?(1)\1)){3}", "aaaaaaaaaa").span(0, 1),
            ((0, 6), (3, 6)),
        )
        self.assertEqual(
            regex.search(r"(?V1)(a(?(1)\1)){4}", "aaaaaaaaaa").span(0, 1),
            ((0, 10), (6, 10)),
        )

        # Hg issue 49: regex.search("(a)(?<=b(?1))", "baz", regex.V1) returns
        # None incorrectly
        self.assertEqual(regex.search("(?V1)(a)(?<=b(?1))", "baz").group(0), "a")

        # Hg issue 50: not all keywords are found by named list with
        # overlapping keywords when full Unicode casefolding is required
        self.assertEqual(
            regex.findall(
                r"(?fi)\L<keywords>",
                "POST, Post, post, po\u017ft, po\ufb06, and po\ufb05",
                keywords=["post", "pos"],
            ),
            ["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],
        )
        self.assertEqual(
            regex.findall(
                r"(?fi)pos|post", "POST, Post, post, po\u017ft, po\ufb06, and po\ufb05"
            ),
            ["POS", "Pos", "pos", "po\u017f", "po\ufb06", "po\ufb05"],
        )
        self.assertEqual(
            regex.findall(
                r"(?fi)post|pos", "POST, Post, post, po\u017ft, po\ufb06, and po\ufb05"
            ),
            ["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],
        )
        self.assertEqual(
            regex.findall(
                r"(?fi)post|another",
                "POST, Post, post, po\u017ft, po\ufb06, and po\ufb05",
            ),
            ["POST", "Post", "post", "po\u017ft", "po\ufb06", "po\ufb05"],
        )

        # Hg issue 51: regex.search("((a)(?1)|(?2))", "a", flags=regex.V1)
        # returns None incorrectly
        self.assertEqual(
            regex.search("(?V1)((a)(?1)|(?2))", "a").group(0, 1, 2), ("a", "a", None)
        )

        # Hg issue 52: regex.search("(\\1xx|){6}", "xx",
        # flags=regex.V1).span(0,1) returns incorrect value
        self.assertEqual(
            regex.search(r"(?V1)(\1xx|){6}", "xx").span(0, 1), ((0, 2), (2, 2))
        )

        # Hg issue 53: regex.search("(a|)+", "a") causes MemoryError
        self.assertEqual(regex.search("(a|)+", "a").group(0, 1), ("a", ""))

        # Hg issue 54: regex.search("(a|)*\\d", "a"*80) causes MemoryError
        self.assertEqual(regex.search(r"(a|)*\d", "a" * 80), None)

        # Hg issue 55: regex.search("^(?:a?b?)*$", "ac") take a very long time.
        self.assertEqual(regex.search("^(?:a?b?)*$", "ac"), None)

        # Hg issue 58: bad named character escape sequences like "\\N{1}"
        # treats as "N"
        self.assertRaisesRegex(
            regex.error, self.UNDEF_CHAR_NAME, lambda: regex.compile("\\N{1}")
        )

        # Hg issue 59: regex.search("\\Z", "a\na\n") returns None incorrectly
        self.assertEqual(regex.search("\\Z", "a\na\n").span(0), (4, 4))

        # Hg issue 60: regex.search("(q1|.)*(q2|.)*(x(a|bc)*y){2,}", "xayxay")
        # returns None incorrectly
        self.assertEqual(
            regex.search("(q1|.)*(q2|.)*(x(a|bc)*y){2,}", "xayxay").group(0), "xayxay"
        )

        # Hg issue 61: regex.search("[^a]", "A", regex.I).group(0) returns ''
        # incorrectly
        self.assertEqual(regex.search("(?i)[^a]", "A"), None)

        # Hg issue 63: regex.search("[[:ascii:]]", "\N{KELVIN SIGN}",
        # flags=regex.I|regex.V1) doesn't return None
        self.assertEqual(regex.search("(?i)[[:ascii:]]", "\N{KELVIN SIGN}"), None)

        # Hg issue 66: regex.search("((a|b(?1)c){3,5})", "baaaaca",
        # flags=regex.V1).groups() returns ('baaaac', 'baaaac') instead of ('aaaa', 'a')
        self.assertEqual(
            regex.search("((a|b(?1)c){3,5})", "baaaaca").group(0, 1, 2),
            ("aaaa", "aaaa", "a"),
        )

        # Hg issue 71: non-greedy quantifier in lookbehind
        self.assertEqual(
            regex.findall(r"(?<=:\S+ )\w+", ":9 abc :10 def"), ["abc", "def"]
        )
        self.assertEqual(
            regex.findall(r"(?<=:\S* )\w+", ":9 abc :10 def"), ["abc", "def"]
        )
        self.assertEqual(
            regex.findall(r"(?<=:\S+? )\w+", ":9 abc :10 def"), ["abc", "def"]
        )
        self.assertEqual(
            regex.findall(r"(?<=:\S*? )\w+", ":9 abc :10 def"), ["abc", "def"]
        )

        # Hg issue 73: conditional patterns
        self.assertEqual(regex.search(r"(?:fe)?male", "female").group(), "female")
        self.assertEqual(
            [
                m.group()
                for m in regex.finditer(
                    r"(fe)?male: h(?(1)(er)|(is)) (\w+)",
                    "female: her dog; male: his cat. asdsasda",
                )
            ],
            ["female: her dog", "male: his cat"],
        )

        # Hg issue 78: "Captures" doesn't work for recursive calls
        self.assertEqual(
            regex.search(
                r"(?<rec>\((?:[^()]++|(?&rec))*\))", "aaa(((1+0)+1)+1)bbb"
            ).captures("rec"),
            ["(1+0)", "((1+0)+1)", "(((1+0)+1)+1)"],
        )

        # Hg issue 80: Escape characters throws an exception
        self.assertRaisesRegex(
            regex.error,
            self.BAD_ESCAPE,
            lambda: regex.sub("x", "\\", "x"),
        )

        # Hg issue 82: error range does not work
        fz = "(CAGCCTCCCATTTCAGAATATACATCC){1<e<=2}"
        seq = "tcagacgagtgcgttgtaaaacgacggccagtCAGCCTCCCATTCAGAATATACATCCcgacggccagttaaaaacaatgccaaggaggtcatagctgtttcctgccagttaaaaacaatgccaaggaggtcatagctgtttcctgacgcactcgtctgagcgggctggcaagg"
        self.assertEqual(
            regex.search(fz, seq, regex.BESTMATCH)[0], "tCAGCCTCCCATTCAGAATATACATCC"
        )

        # Hg issue 83: slash handling in presence of a quantifier
        self.assertEqual(regex.findall(r"c..+/c", "cA/c\ncAb/c"), ["cAb/c"])

        # Hg issue 85: Non-conformance to Unicode UAX#29 re: ZWJ / ZWNJ
        self.assertEqual(
            ascii(
                regex.sub(
                    r"(\w+)",
                    r"[\1]",
                    "\u0905\u0928\u094d\u200d\u0928 \u0d28\u0d4d\u200d \u0915\u093f\u0928",
                    regex.WORD,
                )
            ),
            ascii(
                "[\u0905\u0928\u094d\u200d\u0928] [\u0d28\u0d4d\u200d] [\u0915\u093f\u0928]"
            ),
        )

        # Hg issue 88: regex.match() hangs
        self.assertEqual(regex.match(r".*a.*ba.*aa", "ababba"), None)

        # Hg issue 87: Allow duplicate names of groups
        self.assertEqual(
            regex.match(r"(?<x>a(?<x>b))", "ab").spans("x"), [(1, 2), (0, 2)]
        )

        # Hg issue 91: match.expand is extremely slow
        # Check that the replacement cache works.
        self.assertEqual(regex.sub(r"(-)", lambda m: m.expand(r"x"), "a-b-c"), "axbxc")

        # Hg issue 94: Python crashes when executing regex updates
        # pattern.findall
        rx = regex.compile(r"\bt(est){i<2}", flags=regex.V1)
        self.assertEqual(rx.search("Some text"), None)
        self.assertEqual(rx.findall("Some text"), [])

        # Hg issue 95: 'pos' for regex.error
        self.assertRaisesRegex(
            regex.error, self.MULTIPLE_REPEAT, lambda: regex.compile(r".???")
        )

        # Hg issue 97: behaviour of regex.escape's special_only is wrong
        #
        # Hg issue 244: Make `special_only=True` the default in
        # `regex.escape()`
        self.assertEqual(regex.escape("foo!?", special_only=False), "foo\\!\\?")
        self.assertEqual(regex.escape("foo!?", special_only=True), "foo!\\?")
        self.assertEqual(regex.escape("foo!?"), "foo!\\?")

        self.assertEqual(regex.escape(b"foo!?", special_only=False), b"foo\\!\\?")
        self.assertEqual(regex.escape(b"foo!?", special_only=True), b"foo!\\?")
        self.assertEqual(regex.escape(b"foo!?"), b"foo!\\?")

        # Hg issue 100: strange results from regex.search
        self.assertEqual(
            regex.search("^([^z]*(?:WWWi|W))?$", "WWWi").groups(), ("WWWi",)
        )
        self.assertEqual(
            regex.search("^([^z]*(?:WWWi|w))?$", "WWWi").groups(), ("WWWi",)
        )
        self.assertEqual(
            regex.search("^([^z]*?(?:WWWi|W))?$", "WWWi").groups(), ("WWWi",)
        )

        # Hg issue 101: findall() broken (seems like memory corruption)
        pat = regex.compile(r"xxx", flags=regex.FULLCASE | regex.UNICODE)
        self.assertEqual([x.group() for x in pat.finditer("yxxx")], ["xxx"])
        self.assertEqual(pat.findall("yxxx"), ["xxx"])

        raw = "yxxx"
        self.assertEqual([x.group() for x in pat.finditer(raw)], ["xxx"])
        self.assertEqual(pat.findall(raw), ["xxx"])

        pat = regex.compile(
            r"xxx", flags=regex.FULLCASE | regex.IGNORECASE | regex.UNICODE
        )
        self.assertEqual([x.group() for x in pat.finditer("yxxx")], ["xxx"])
        self.assertEqual(pat.findall("yxxx"), ["xxx"])

        raw = "yxxx"
        self.assertEqual([x.group() for x in pat.finditer(raw)], ["xxx"])
        self.assertEqual(pat.findall(raw), ["xxx"])

        # Hg issue 106: * operator not working correctly with sub()
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.sub("(?V0).*", "x", "test"), "xx")
        else:
            self.assertEqual(regex.sub("(?V0).*", "x", "test"), "x")
        self.assertEqual(regex.sub("(?V1).*", "x", "test"), "xx")

        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.sub("(?V0).*?", "|", "test"), "|||||||||")
        else:
            self.assertEqual(regex.sub("(?V0).*?", "|", "test"), "|t|e|s|t|")
        self.assertEqual(regex.sub("(?V1).*?", "|", "test"), "|||||||||")

        # Hg issue 112: re: OK, but regex: SystemError
        self.assertEqual(
            regex.sub(
                r"^(@)\n(?!.*?@)(.*)", r"\1\n==========\n\2", "@\n", flags=regex.DOTALL
            ),
            "@\n==========\n",
        )

        # Hg issue 109: Edit distance of fuzzy match
        self.assertEqual(
            regex.match(r"(?:cats|cat){e<=1}", "caz").fuzzy_counts, (1, 0, 0)
        )
        self.assertEqual(
            regex.match(r"(?e)(?:cats|cat){e<=1}", "caz").fuzzy_counts, (1, 0, 0)
        )
        self.assertEqual(
            regex.match(r"(?b)(?:cats|cat){e<=1}", "caz").fuzzy_counts, (1, 0, 0)
        )

        self.assertEqual(regex.match(r"(?:cat){e<=1}", "caz").fuzzy_counts, (1, 0, 0))
        self.assertEqual(
            regex.match(r"(?e)(?:cat){e<=1}", "caz").fuzzy_counts, (1, 0, 0)
        )
        self.assertEqual(
            regex.match(r"(?b)(?:cat){e<=1}", "caz").fuzzy_counts, (1, 0, 0)
        )

        self.assertEqual(
            regex.match(r"(?:cats){e<=2}", "c ats").fuzzy_counts, (1, 1, 0)
        )
        self.assertEqual(
            regex.match(r"(?e)(?:cats){e<=2}", "c ats").fuzzy_counts, (0, 1, 0)
        )
        self.assertEqual(
            regex.match(r"(?b)(?:cats){e<=2}", "c ats").fuzzy_counts, (0, 1, 0)
        )

        self.assertEqual(
            regex.match(r"(?:cats){e<=2}", "c a ts").fuzzy_counts, (0, 2, 0)
        )
        self.assertEqual(
            regex.match(r"(?e)(?:cats){e<=2}", "c a ts").fuzzy_counts, (0, 2, 0)
        )
        self.assertEqual(
            regex.match(r"(?b)(?:cats){e<=2}", "c a ts").fuzzy_counts, (0, 2, 0)
        )

        self.assertEqual(
            regex.match(r"(?:cats){e<=1}", "c ats").fuzzy_counts, (0, 1, 0)
        )
        self.assertEqual(
            regex.match(r"(?e)(?:cats){e<=1}", "c ats").fuzzy_counts, (0, 1, 0)
        )
        self.assertEqual(
            regex.match(r"(?b)(?:cats){e<=1}", "c ats").fuzzy_counts, (0, 1, 0)
        )

        # Hg issue 115: Infinite loop when processing backreferences
        self.assertEqual(
            regex.findall(
                r"\bof ([a-z]+) of \1\b", "To make use of one of these modules"
            ),
            [],
        )

        # Hg issue 125: Reference to entire match (\g&lt;0&gt;) in
        # Pattern.sub() doesn't work as of 2014.09.22 release.
        self.assertEqual(regex.sub(r"x", r"\g<0>", "x"), "x")

        # Unreported issue: no such builtin as 'ascii' in Python 2.
        self.assertEqual(bool(regex.match(r"a", "a", regex.DEBUG)), True)

        # Hg issue 131: nested sets behaviour
        self.assertEqual(regex.findall(r"(?V1)[[b-e]--cd]", "abcdef"), ["b", "e"])
        self.assertEqual(regex.findall(r"(?V1)[b-e--cd]", "abcdef"), ["b", "e"])
        self.assertEqual(regex.findall(r"(?V1)[[bcde]--cd]", "abcdef"), ["b", "e"])
        self.assertEqual(regex.findall(r"(?V1)[bcde--cd]", "abcdef"), ["b", "e"])

        # Hg issue 132: index out of range on null property \p{}
        self.assertRaisesRegex(
            regex.error,
            "^unknown property at position 4$",
            lambda: regex.compile(r"\p{}"),
        )

        # Issue 23692.
        self.assertEqual(
            regex.match("(?:()|(?(1)()|z)){2}(?(2)a|z)", "a").group(0, 1, 2),
            ("a", "", ""),
        )
        self.assertEqual(
            regex.match("(?:()|(?(1)()|z)){0,2}(?(2)a|z)", "a").group(0, 1, 2),
            ("a", "", ""),
        )

        # Hg issue 137: Posix character class :punct: does not seem to be
        # supported.

        # Posix compatibility as recommended here:
        # http://www.unicode.org/reports/tr18/#Compatibility_Properties

        # Posix in Unicode.
        chars = "".join(chr(c) for c in range(0x10000))

        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:alnum:]]+""", chars))),
            ascii("".join(regex.findall(r"""[\p{Alpha}\p{PosixDigit}]+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:alpha:]]+""", chars))),
            ascii("".join(regex.findall(r"""\p{Alpha}+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:ascii:]]+""", chars))),
            ascii("".join(regex.findall(r"""[\p{InBasicLatin}]+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:blank:]]+""", chars))),
            ascii("".join(regex.findall(r"""[\p{gc=Space_Separator}\t]+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:cntrl:]]+""", chars))),
            ascii("".join(regex.findall(r"""\p{gc=Control}+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:digit:]]+""", chars))),
            ascii("".join(regex.findall(r"""[0-9]+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:graph:]]+""", chars))),
            ascii(
                "".join(
                    regex.findall(
                        r"""[^\p{Space}\p{gc=Control}\p{gc=Surrogate}\p{gc=Unassigned}]+""",
                        chars,
                    )
                )
            ),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:lower:]]+""", chars))),
            ascii("".join(regex.findall(r"""\p{Lower}+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:print:]]+""", chars))),
            ascii(
                "".join(
                    regex.findall(r"""(?V1)[\p{Graph}\p{Blank}--\p{Cntrl}]+""", chars)
                )
            ),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:punct:]]+""", chars))),
            ascii(
                "".join(
                    regex.findall(
                        r"""(?V1)[\p{gc=Punctuation}\p{gc=Symbol}--\p{Alpha}]+""", chars
                    )
                )
            ),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:space:]]+""", chars))),
            ascii("".join(regex.findall(r"""\p{Whitespace}+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:upper:]]+""", chars))),
            ascii("".join(regex.findall(r"""\p{Upper}+""", chars))),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:word:]]+""", chars))),
            ascii(
                "".join(
                    regex.findall(
                        r"""[\p{Alpha}\p{gc=Mark}\p{Digit}\p{gc=Connector_Punctuation}\p{Join_Control}]+""",
                        chars,
                    )
                )
            ),
        )
        self.assertEqual(
            ascii("".join(regex.findall(r"""[[:xdigit:]]+""", chars))),
            ascii("".join(regex.findall(r"""[0-9A-Fa-f]+""", chars))),
        )

        # Posix in ASCII.
        chars = bytes(range(0x100))

        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:alnum:]]+""", chars))),
            ascii(
                b"".join(regex.findall(rb"""(?a)[\p{Alpha}\p{PosixDigit}]+""", chars))
            ),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:alpha:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)\p{Alpha}+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:ascii:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)[\x00-\x7F]+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:blank:]]+""", chars))),
            ascii(
                b"".join(regex.findall(rb"""(?a)[\p{gc=Space_Separator}\t]+""", chars))
            ),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:cntrl:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)\p{gc=Control}+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:digit:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)[0-9]+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:graph:]]+""", chars))),
            ascii(
                b"".join(
                    regex.findall(
                        rb"""(?a)[^\p{Space}\p{gc=Control}\p{gc=Surrogate}\p{gc=Unassigned}]+""",
                        chars,
                    )
                )
            ),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:lower:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)\p{Lower}+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:print:]]+""", chars))),
            ascii(
                b"".join(
                    regex.findall(rb"""(?aV1)[\p{Graph}\p{Blank}--\p{Cntrl}]+""", chars)
                )
            ),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:punct:]]+""", chars))),
            ascii(
                b"".join(
                    regex.findall(
                        rb"""(?aV1)[\p{gc=Punctuation}\p{gc=Symbol}--\p{Alpha}]+""",
                        chars,
                    )
                )
            ),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:space:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)\p{Whitespace}+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:upper:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)\p{Upper}+""", chars))),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:word:]]+""", chars))),
            ascii(
                b"".join(
                    regex.findall(
                        rb"""(?a)[\p{Alpha}\p{gc=Mark}\p{Digit}\p{gc=Connector_Punctuation}\p{Join_Control}]+""",
                        chars,
                    )
                )
            ),
        )
        self.assertEqual(
            ascii(b"".join(regex.findall(rb"""(?a)[[:xdigit:]]+""", chars))),
            ascii(b"".join(regex.findall(rb"""(?a)[0-9A-Fa-f]+""", chars))),
        )

        # Hg issue 138: grapheme anchored search not working properly.
        self.assertEqual(
            ascii(regex.search(r"\X$", "ab\u2103").group()), ascii("\u2103")
        )

        # Hg issue 139: Regular expression with multiple wildcards where first
        # should match empty string does not always work.
        self.assertEqual(regex.search("([^L]*)([^R]*R)", "LtR").groups(), ("", "LtR"))

        # Hg issue 140: Replace with REVERSE and groups has unexpected
        # behavior.
        self.assertEqual(regex.sub(r"(.)", r"x\1y", "ab"), "xayxby")
        self.assertEqual(regex.sub(r"(?r)(.)", r"x\1y", "ab"), "xayxby")
        self.assertEqual(regex.subf(r"(.)", "x{1}y", "ab"), "xayxby")
        self.assertEqual(regex.subf(r"(?r)(.)", "x{1}y", "ab"), "xayxby")

        # Hg issue 141: Crash on a certain partial match.
        self.assertEqual(regex.fullmatch("(a)*abc", "ab", partial=True).span(), (0, 2))
        self.assertEqual(regex.fullmatch("(a)*abc", "ab", partial=True).partial, True)

        # Hg issue 143: Partial matches have incorrect span if prefix is '.'
        # wildcard.
        self.assertEqual(regex.search("OXRG", "OOGOX", partial=True).span(), (3, 5))
        self.assertEqual(regex.search(".XRG", "OOGOX", partial=True).span(), (3, 5))
        self.assertEqual(
            regex.search(".{1,3}XRG", "OOGOX", partial=True).span(), (1, 5)
        )

        # Hg issue 144: Latest version problem with matching 'R|R'.
        self.assertEqual(regex.match("R|R", "R").span(), (0, 1))

        # Hg issue 146: Forced-fail (?!) works improperly in conditional.
        self.assertEqual(regex.match(r"(.)(?(1)(?!))", "xy"), None)

        # Groups cleared after failure.
        self.assertEqual(
            regex.findall(r"(y)?(\d)(?(1)\b\B)", "ax1y2z3b"),
            [("", "1"), ("", "2"), ("", "3")],
        )
        self.assertEqual(
            regex.findall(r"(y)?+(\d)(?(1)\b\B)", "ax1y2z3b"),
            [("", "1"), ("", "2"), ("", "3")],
        )

        # Hg issue 147: Fuzzy match can return match points beyond buffer end.
        self.assertEqual(
            [m.span() for m in regex.finditer(r"(?i)(?:error){e}", "regex failure")],
            [(0, 5), (5, 10), (10, 13), (13, 13)],
        )
        self.assertEqual(
            [m.span() for m in regex.finditer(r"(?fi)(?:error){e}", "regex failure")],
            [(0, 5), (5, 10), (10, 13), (13, 13)],
        )

        # Hg issue 150: Have an option for POSIX-compatible longest match of
        # alternates.
        self.assertEqual(
            regex.search(r"(?p)\d+(\w(\d*)?|[eE]([+-]\d+))", "10b12")[0], "10b12"
        )
        self.assertEqual(
            regex.search(r"(?p)\d+(\w(\d*)?|[eE]([+-]\d+))", "10E+12")[0], "10E+12"
        )

        self.assertEqual(regex.search(r"(?p)(\w|ae|oe|ue|ss)", "ae")[0], "ae")
        self.assertEqual(
            regex.search(r"(?p)one(self)?(selfsufficient)?", "oneselfsufficient")[0],
            "oneselfsufficient",
        )

        # Hg issue 151: Request: \K.
        self.assertEqual(regex.search(r"(ab\Kcd)", "abcd").group(0, 1), ("cd", "abcd"))
        self.assertEqual(regex.findall(r"\w\w\K\w\w", "abcdefgh"), ["cd", "gh"])
        self.assertEqual(regex.findall(r"(\w\w\K\w\w)", "abcdefgh"), ["abcd", "efgh"])

        self.assertEqual(
            regex.search(r"(?r)(ab\Kcd)", "abcd").group(0, 1), ("ab", "abcd")
        )
        self.assertEqual(regex.findall(r"(?r)\w\w\K\w\w", "abcdefgh"), ["ef", "ab"])
        self.assertEqual(
            regex.findall(r"(?r)(\w\w\K\w\w)", "abcdefgh"), ["efgh", "abcd"]
        )

        # Hg issue 152: Request: Request: (?(DEFINE)...).
        self.assertEqual(
            regex.search(
                r"(?(DEFINE)(?<quant>\d+)(?<item>\w+))(?&quant) (?&item)", "5 elephants"
            )[0],
            "5 elephants",
        )

        self.assertEqual(
            regex.search(r"(?&routine)(?(DEFINE)(?<routine>.))", "a").group("routine"),
            None,
        )
        self.assertEqual(
            regex.search(r"(?&routine)(?(DEFINE)(?<routine>.))", "a").captures(
                "routine"
            ),
            ["a"],
        )

        # Hg issue 153: Request: (*SKIP).
        self.assertEqual(regex.search(r"12(*FAIL)|3", "123")[0], "3")
        self.assertEqual(regex.search(r"(?r)12(*FAIL)|3", "123")[0], "3")

        self.assertEqual(regex.search(r"\d+(*PRUNE)\d", "123"), None)
        self.assertEqual(regex.search(r"\d+(?=(*PRUNE))\d", "123")[0], "123")
        self.assertEqual(regex.search(r"\d+(*PRUNE)bcd|[3d]", "123bcd")[0], "123bcd")
        self.assertEqual(regex.search(r"\d+(*PRUNE)bcd|[3d]", "123zzd")[0], "d")
        self.assertEqual(regex.search(r"\d+?(*PRUNE)bcd|[3d]", "123bcd")[0], "3bcd")
        self.assertEqual(regex.search(r"\d+?(*PRUNE)bcd|[3d]", "123zzd")[0], "d")
        self.assertEqual(
            regex.search(r"\d++(?<=3(*PRUNE))zzd|[4d]$", "123zzd")[0], "123zzd"
        )
        self.assertEqual(regex.search(r"\d++(?<=3(*PRUNE))zzd|[4d]$", "124zzd")[0], "d")
        self.assertEqual(regex.search(r"\d++(?<=(*PRUNE)3)zzd|[4d]$", "124zzd")[0], "d")
        self.assertEqual(
            regex.search(r"\d++(?<=2(*PRUNE)3)zzd|[3d]$", "124zzd")[0], "d"
        )

        self.assertEqual(regex.search(r"(?r)\d(*PRUNE)\d+", "123"), None)
        self.assertEqual(regex.search(r"(?r)\d(?<=(*PRUNE))\d+", "123")[0], "123")
        self.assertEqual(
            regex.search(r"(?r)\d+(*PRUNE)bcd|[3d]", "123bcd")[0], "123bcd"
        )
        self.assertEqual(regex.search(r"(?r)\d+(*PRUNE)bcd|[3d]", "123zzd")[0], "d")
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=3(*PRUNE))zzd|[4d]$", "123zzd")[0], "123zzd"
        )
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=3(*PRUNE))zzd|[4d]$", "124zzd")[0], "d"
        )
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=(*PRUNE)3)zzd|[4d]$", "124zzd")[0], "d"
        )
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=2(*PRUNE)3)zzd|[3d]$", "124zzd")[0], "d"
        )

        self.assertEqual(regex.search(r"\d+(*SKIP)bcd|[3d]", "123bcd")[0], "123bcd")
        self.assertEqual(regex.search(r"\d+(*SKIP)bcd|[3d]", "123zzd")[0], "d")
        self.assertEqual(regex.search(r"\d+?(*SKIP)bcd|[3d]", "123bcd")[0], "3bcd")
        self.assertEqual(regex.search(r"\d+?(*SKIP)bcd|[3d]", "123zzd")[0], "d")
        self.assertEqual(
            regex.search(r"\d++(?<=3(*SKIP))zzd|[4d]$", "123zzd")[0], "123zzd"
        )
        self.assertEqual(regex.search(r"\d++(?<=3(*SKIP))zzd|[4d]$", "124zzd")[0], "d")
        self.assertEqual(regex.search(r"\d++(?<=(*SKIP)3)zzd|[4d]$", "124zzd")[0], "d")
        self.assertEqual(regex.search(r"\d++(?<=2(*SKIP)3)zzd|[3d]$", "124zzd")[0], "d")

        self.assertEqual(regex.search(r"(?r)\d+(*SKIP)bcd|[3d]", "123bcd")[0], "123bcd")
        self.assertEqual(regex.search(r"(?r)\d+(*SKIP)bcd|[3d]", "123zzd")[0], "d")
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=3(*SKIP))zzd|[4d]$", "123zzd")[0], "123zzd"
        )
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=3(*SKIP))zzd|[4d]$", "124zzd")[0], "d"
        )
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=(*SKIP)3)zzd|[4d]$", "124zzd")[0], "d"
        )
        self.assertEqual(
            regex.search(r"(?r)\d++(?<=2(*SKIP)3)zzd|[3d]$", "124zzd")[0], "d"
        )

        # Hg issue 154: Segmentation fault 11 when working with an atomic group
        text = """June 30, December 31, 2013 2012
some words follow:
more words and numbers 1,234,567 9,876,542
more words and numbers 1,234,567 9,876,542"""
        self.assertEqual(len(regex.findall(r"(?<!\d)(?>2014|2013 ?2012)", text)), 1)

        # Hg issue 156: regression on atomic grouping
        self.assertEqual(regex.match("1(?>2)", "12").span(), (0, 2))

        # Hg issue 157: regression: segfault on complex lookaround
        self.assertEqual(
            regex.match(
                r"(?V1w)(?=(?=[^A-Z]*+[A-Z])(?=[^a-z]*+[a-z]))(?=\D*+\d)(?=\p{Alphanumeric}*+\P{Alphanumeric})\A(?s:.){8,255}+\Z",
                "AAaa11!!",
            )[0],
            "AAaa11!!",
        )

        # Hg issue 158: Group issue with (?(DEFINE)...)
        TEST_REGEX = regex.compile(
            r"""(?smx)
(?(DEFINE)
  (?<subcat>
   ^,[^,]+,
   )
)

# Group 2 is defined on this line
^,([^,]+),

(?:(?!(?&subcat)[\r\n]+(?&subcat)).)+
"""
        )

        TEST_DATA = """
,Cat 1,
,Brand 1,
some
thing
,Brand 2,
other
things
,Cat 2,
,Brand,
Some
thing
"""

        self.assertEqual(
            [m.span(1, 2) for m in TEST_REGEX.finditer(TEST_DATA)],
            [((-1, -1), (2, 7)), ((-1, -1), (54, 59))],
        )

        # Hg issue 161: Unexpected fuzzy match results
        self.assertEqual(
            regex.search(
                "(abcdefgh){e}", "******abcdefghijklmnopqrtuvwxyz", regex.BESTMATCH
            ).span(),
            (6, 14),
        )
        self.assertEqual(
            regex.search(
                "(abcdefghi){e}", "******abcdefghijklmnopqrtuvwxyz", regex.BESTMATCH
            ).span(),
            (6, 15),
        )

        # Hg issue 163: allow lookarounds in conditionals.
        self.assertEqual(regex.match(r"(?:(?=\d)\d+\b|\w+)", "123abc").span(), (0, 6))
        self.assertEqual(regex.match(r"(?(?=\d)\d+\b|\w+)", "123abc"), None)
        self.assertEqual(
            regex.search(r"(?(?<=love\s)you|(?<=hate\s)her)", "I love you").span(),
            (7, 10),
        )
        self.assertEqual(
            regex.findall(
                r"(?(?<=love\s)you|(?<=hate\s)her)",
                "I love you but I don't hate her either",
            ),
            ["you", "her"],
        )

        # Hg issue 180: bug of POSIX matching.
        self.assertEqual(
            regex.search(r"(?p)a*(.*?)", "aaabbb").group(0, 1), ("aaabbb", "bbb")
        )
        self.assertEqual(
            regex.search(r"(?p)a*(.*)", "aaabbb").group(0, 1), ("aaabbb", "bbb")
        )
        self.assertEqual(regex.sub(r"(?p)a*(.*?)", r"\1", "aaabbb"), "bbb")
        self.assertEqual(regex.sub(r"(?p)a*(.*)", r"\1", "aaabbb"), "bbb")

        # Hg issue 192: Named lists reverse matching doesn't work with
        # IGNORECASE and V1
        self.assertEqual(regex.match(r"(?irV0)\L<kw>", "21", kw=["1"]).span(), (1, 2))
        self.assertEqual(regex.match(r"(?irV1)\L<kw>", "21", kw=["1"]).span(), (1, 2))

        # Hg issue 193: Alternation and .REVERSE flag.
        self.assertEqual(regex.search("a|b", "111a222").span(), (3, 4))
        self.assertEqual(regex.search("(?r)a|b", "111a222").span(), (3, 4))

        # Hg issue 194: .FULLCASE and Backreference
        self.assertEqual(
            regex.search(r"(?if)<(CLI)><\1>", "<cli><cli>").span(), (0, 10)
        )
        self.assertEqual(
            regex.search(r"(?if)<(CLI)><\1>", "<cli><clI>").span(), (0, 10)
        )
        self.assertEqual(
            regex.search(r"(?ifr)<\1><(CLI)>", "<cli><clI>").span(), (0, 10)
        )

        # Hg issue 195: Pickle (or otherwise serial) the compiled regex
        r = regex.compile(r"\L<options>", options=["foo", "bar"])
        p = pickle.dumps(r)
        r = pickle.loads(p)
        self.assertEqual(r.match("foo").span(), (0, 3))

        # Hg issue 196: Fuzzy matching on repeated regex not working as
        # expected
        self.assertEqual(
            regex.match("(x{6}){e<=1}", "xxxxxx", flags=regex.BESTMATCH).span(), (0, 6)
        )
        self.assertEqual(
            regex.match("(x{6}){e<=1}", "xxxxx", flags=regex.BESTMATCH).span(), (0, 5)
        )
        self.assertEqual(regex.match("(x{6}){e<=1}", "x", flags=regex.BESTMATCH), None)
        self.assertEqual(
            regex.match("(?r)(x{6}){e<=1}", "xxxxxx", flags=regex.BESTMATCH).span(),
            (0, 6),
        )
        self.assertEqual(
            regex.match("(?r)(x{6}){e<=1}", "xxxxx", flags=regex.BESTMATCH).span(),
            (0, 5),
        )
        self.assertEqual(
            regex.match("(?r)(x{6}){e<=1}", "x", flags=regex.BESTMATCH), None
        )

        # Hg issue 197: ValueError in regex.compile
        self.assertRaises(
            regex.error, lambda: regex.compile(b"00000\\0\\00\\^\50\\00\\U05000000")
        )

        # Hg issue 198: ValueError in regex.compile
        self.assertRaises(regex.error, lambda: regex.compile(b"{e<l"))

        # Hg issue 199: Segfault in re.compile
        self.assertEqual(bool(regex.compile("((?0)){e}")), True)

        # Hg issue 200: AttributeError in regex.compile with latest regex
        self.assertEqual(bool(regex.compile("\x00?(?0){e}")), True)

        # Hg issue 201: ENHANCEMATCH crashes interpreter
        self.assertEqual(
            regex.findall(
                r"((brown)|(lazy)){1<=e<=3} ((dog)|(fox)){1<=e<=3}",
                "The quick borwn fax jumped over the lzy hog",
                regex.ENHANCEMATCH,
            ),
            [
                ("borwn", "borwn", "", "fax", "", "fax"),
                ("lzy", "", "lzy", "hog", "hog", ""),
            ],
        )

        # Hg issue 203: partial matching bug
        self.assertEqual(
            regex.search(
                r"\d\d\d-\d\d-\d\d\d\d",
                "My SSN is 999-89-76, but don't tell.",
                partial=True,
            ).span(),
            (36, 36),
        )

        # Hg issue 204: confusion of (?aif) flags
        upper_i = "\N{CYRILLIC CAPITAL LETTER SHORT I}"
        lower_i = "\N{CYRILLIC SMALL LETTER SHORT I}"

        self.assertEqual(bool(regex.match(r"(?ui)" + upper_i, lower_i)), True)
        self.assertEqual(bool(regex.match(r"(?ui)" + lower_i, upper_i)), True)

        self.assertEqual(bool(regex.match(r"(?ai)" + upper_i, lower_i)), False)
        self.assertEqual(bool(regex.match(r"(?ai)" + lower_i, upper_i)), False)

        self.assertEqual(bool(regex.match(r"(?afi)" + upper_i, lower_i)), False)
        self.assertEqual(bool(regex.match(r"(?afi)" + lower_i, upper_i)), False)

        # Hg issue 205: Named list and (?ri) flags
        self.assertEqual(
            bool(regex.search(r"(?i)\L<aa>", "22", aa=["121", "22"])), True
        )
        self.assertEqual(
            bool(regex.search(r"(?ri)\L<aa>", "22", aa=["121", "22"])), True
        )
        self.assertEqual(
            bool(regex.search(r"(?fi)\L<aa>", "22", aa=["121", "22"])), True
        )
        self.assertEqual(
            bool(regex.search(r"(?fri)\L<aa>", "22", aa=["121", "22"])), True
        )

        # Hg issue 208: Named list, (?ri) flags, Backreference
        self.assertEqual(
            regex.search(
                r"(?r)\1dog..(?<=(\L<aa>))$", "ccdogcc", aa=["bcb", "cc"]
            ).span(),
            (0, 7),
        )
        self.assertEqual(
            regex.search(
                r"(?ir)\1dog..(?<=(\L<aa>))$", "ccdogcc", aa=["bcb", "cc"]
            ).span(),
            (0, 7),
        )

        # Hg issue 210: Fuzzy matching and Backreference
        self.assertEqual(regex.search(r"(2)(?:\1{5}){e<=1}", "3222212").span(), (1, 7))
        self.assertEqual(regex.search(r"(\d)(?:\1{5}){e<=1}", "3222212").span(), (1, 7))

        # Hg issue 211: Segmentation fault with recursive matches and atomic
        # groups
        self.assertEqual(
            regex.match(r"""\A(?P<whole>(?>\((?&whole)\)|[+\-]))\Z""", "((-))").span(),
            (0, 5),
        )
        self.assertEqual(
            regex.match(r"""\A(?P<whole>(?>\((?&whole)\)|[+\-]))\Z""", "((-)+)"), None
        )

        # Hg issue 212: Unexpected matching difference with .*? between re and
        # regex
        self.assertEqual(regex.match(r"x.*? (.).*\1(.*)\1", "x  |y| z|").span(), (0, 9))
        self.assertEqual(
            regex.match(
                r"\.sr (.*?) (.)(.*)\2(.*)\2(.*)",
                r'.sr  h |<nw>|<span class="locked">|',
            ).span(),
            (0, 35),
        )

        # Hg issue 213: Segmentation Fault
        a = '"\\xF9\\x80\\xAEqdz\\x95L\\xA7\\x89[\\xFE \\x91)\\xF9]\\xDB\'\\x99\\x09=\\x00\\xFD\\x98\\x22\\xDD\\xF1\\xB6\\xC3 Z\\xB6gv\\xA5x\\x93P\\xE1r\\x14\\x8Cv\\x0C\\xC0w\\x15r\\xFFc%" '
        py_regex_pattern = r"""(?P<http_referer>((?>(?<!\\)(?>"(?>\\.|[^\\"]+)+"|""|(?>'(?>\\.|[^\\']+)+')|''|(?>`(?>\\.|[^\\`]+)+`)|``)))) (?P<useragent>((?>(?<!\\)(?>"(?>\\.|[^\\"]+)+"|""|(?>'(?>\\.|[^\\']+)+')|''|(?>`(?>\\.|[^\\`]+)+`)|``))))"""
        self.assertEqual(bool(regex.search(py_regex_pattern, a)), False)

        # Hg Issue 216: Invalid match when using negative lookbehind and pipe
        self.assertEqual(bool(regex.match("foo(?<=foo)", "foo")), True)
        self.assertEqual(bool(regex.match("foo(?<!foo)", "foo")), False)
        self.assertEqual(bool(regex.match("foo(?<=foo|x)", "foo")), True)
        self.assertEqual(bool(regex.match("foo(?<!foo|x)", "foo")), False)

        # Hg issue 217: Core dump in conditional ahead match and matching \!
        # character
        self.assertEqual(
            bool(regex.match(r"(?(?=.*\!.*)(?P<true>.*\!\w*\:.*)|(?P<false>.*))", "!")),
            False,
        )

        # Hg issue 220: Misbehavior of group capture with OR operand
        self.assertEqual(
            regex.match(r"\w*(ea)\w*|\w*e(?!a)\w*", "easier").groups(), ("ea",)
        )

        # Hg issue 225: BESTMATCH in fuzzy match not working
        self.assertEqual(
            regex.search("(^1234$){i,d}", "12234", regex.BESTMATCH).span(), (0, 5)
        )
        self.assertEqual(
            regex.search("(^1234$){i,d}", "12234", regex.BESTMATCH).fuzzy_counts,
            (0, 1, 0),
        )

        self.assertEqual(
            regex.search("(^1234$){s,i,d}", "12234", regex.BESTMATCH).span(), (0, 5)
        )
        self.assertEqual(
            regex.search("(^1234$){s,i,d}", "12234", regex.BESTMATCH).fuzzy_counts,
            (0, 1, 0),
        )

        # Hg issue 226: Error matching at start of string
        self.assertEqual(
            regex.search("(^123$){s,i,d}", "xxxxxxxx123", regex.BESTMATCH).span(),
            (0, 11),
        )
        self.assertEqual(
            regex.search("(^123$){s,i,d}", "xxxxxxxx123", regex.BESTMATCH).fuzzy_counts,
            (0, 8, 0),
        )

        # Hg issue 227: Incorrect behavior for ? operator with UNICODE +
        # IGNORECASE
        self.assertEqual(
            regex.search(
                r"a?yz", "xxxxyz", flags=regex.FULLCASE | regex.IGNORECASE
            ).span(),
            (4, 6),
        )

        # Hg issue 230: Is it a bug of (?(DEFINE)...)
        self.assertEqual(regex.findall(r"(?:(?![a-d]).)+", "abcdefgh"), ["efgh"])
        self.assertEqual(
            regex.findall(
                r"""(?(DEFINE)(?P<mydef>(?:(?![a-d]).)))(?&mydef)+""", "abcdefgh"
            ),
            ["efgh"],
        )

        # Hg issue 238: Not fully re backward compatible
        self.assertEqual(
            regex.findall(
                r"((\w{1,3})(\.{2,10})){1,3}",
                '"Erm....yes. T..T...Thank you for that."',
            ),
            [("Erm....", "Erm", "...."), ("T...", "T", "...")],
        )
        self.assertEqual(
            regex.findall(
                r"((\w{1,3})(\.{2,10})){3}", '"Erm....yes. T..T...Thank you for that."'
            ),
            [],
        )
        self.assertEqual(
            regex.findall(
                r"((\w{1,3})(\.{2,10})){2}", '"Erm....yes. T..T...Thank you for that."'
            ),
            [("T...", "T", "...")],
        )
        self.assertEqual(
            regex.findall(
                r"((\w{1,3})(\.{2,10})){1}", '"Erm....yes. T..T...Thank you for that."'
            ),
            [("Erm....", "Erm", "...."), ("T..", "T", ".."), ("T...", "T", "...")],
        )

        # Hg issue 247: Unexpected result with fuzzy matching and lookahead
        # expression
        self.assertEqual(
            regex.search(r"(?:ESTONIA(?!\w)){e<=1}", "ESTONIAN WORKERS").group(),
            "ESTONIAN",
        )
        self.assertEqual(
            regex.search(r"(?:ESTONIA(?=\W)){e<=1}", "ESTONIAN WORKERS").group(),
            "ESTONIAN",
        )

        self.assertEqual(
            regex.search(r"(?:(?<!\w)ESTONIA){e<=1}", "BLUB NESTONIA").group(),
            "NESTONIA",
        )
        self.assertEqual(
            regex.search(r"(?:(?<=\W)ESTONIA){e<=1}", "BLUB NESTONIA").group(),
            "NESTONIA",
        )

        self.assertEqual(
            regex.search(r"(?r)(?:ESTONIA(?!\w)){e<=1}", "ESTONIAN WORKERS").group(),
            "ESTONIAN",
        )
        self.assertEqual(
            regex.search(r"(?r)(?:ESTONIA(?=\W)){e<=1}", "ESTONIAN WORKERS").group(),
            "ESTONIAN",
        )

        self.assertEqual(
            regex.search(r"(?r)(?:(?<!\w)ESTONIA){e<=1}", "BLUB NESTONIA").group(),
            "NESTONIA",
        )
        self.assertEqual(
            regex.search(r"(?r)(?:(?<=\W)ESTONIA){e<=1}", "BLUB NESTONIA").group(),
            "NESTONIA",
        )

        # Hg issue 248: Unexpected result with fuzzy matching and more than one
        # non-greedy quantifier
        self.assertEqual(
            regex.search(r"(?:A.*B.*CDE){e<=2}", "A B CYZ").group(), "A B CYZ"
        )
        self.assertEqual(
            regex.search(r"(?:A.*B.*?CDE){e<=2}", "A B CYZ").group(), "A B CYZ"
        )
        self.assertEqual(
            regex.search(r"(?:A.*?B.*CDE){e<=2}", "A B CYZ").group(), "A B CYZ"
        )
        self.assertEqual(
            regex.search(r"(?:A.*?B.*?CDE){e<=2}", "A B CYZ").group(), "A B CYZ"
        )

        # Hg issue 249: Add an option to regex.escape() to not escape spaces
        self.assertEqual(
            regex.escape(" ,0A[", special_only=False, literal_spaces=False),
            "\\ \\,0A\\[",
        )
        self.assertEqual(
            regex.escape(" ,0A[", special_only=False, literal_spaces=True), " \\,0A\\["
        )
        self.assertEqual(
            regex.escape(" ,0A[", special_only=True, literal_spaces=False), "\\ ,0A\\["
        )
        self.assertEqual(
            regex.escape(" ,0A[", special_only=True, literal_spaces=True), " ,0A\\["
        )

        self.assertEqual(regex.escape(" ,0A["), "\\ ,0A\\[")

        # Hg issue 251: Segfault with a particular expression
        self.assertEqual(regex.search(r"(?(?=A)A|B)", "A").span(), (0, 1))
        self.assertEqual(regex.search(r"(?(?=A)A|B)", "B").span(), (0, 1))
        self.assertEqual(regex.search(r"(?(?=A)A|)", "B").span(), (0, 0))
        self.assertEqual(regex.search(r"(?(?=X)X|)", "").span(), (0, 0))
        self.assertEqual(regex.search(r"(?(?=X))", "").span(), (0, 0))

        # Hg issue 252: Empty capture strings when using DEFINE group reference
        # within look-behind expression
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.))(?&func)", "abc").groups(), (None,)
        )
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.))(?&func)", "abc").groupdict(),
            {"func": None},
        )
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.))(?&func)", "abc").capturesdict(),
            {"func": ["a"]},
        )

        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groups(),
            (None,),
        )
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groupdict(),
            {"func": None},
        )
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").capturesdict(),
            {"func": ["a"]},
        )

        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groups(),
            (None,),
        )
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").groupdict(),
            {"func": None},
        )
        self.assertEqual(
            regex.search(r"(?(DEFINE)(?<func>.)).(?<=(?&func))", "abc").capturesdict(),
            {"func": ["a"]},
        )

        # Hg issue 271: Comment logic different between Re and Regex
        self.assertEqual(bool(regex.match(r"ab(?#comment\))cd", "abcd")), True)

        # Hg issue 276: Partial Matches yield incorrect matches and bounds
        self.assertEqual(
            regex.search(r"[a-z]+ [a-z]*?:", "foo bar", partial=True).span(), (0, 7)
        )
        self.assertEqual(
            regex.search(r"(?r):[a-z]*? [a-z]+", "foo bar", partial=True).span(), (0, 7)
        )

        # Hg issue 291: Include Script Extensions as a supported Unicode property
        self.assertEqual(bool(regex.match(r"(?u)\p{Script:Beng}", "\u09ef")), True)
        self.assertEqual(bool(regex.match(r"(?u)\p{Script:Bengali}", "\u09ef")), True)
        self.assertEqual(
            bool(regex.match(r"(?u)\p{Script_Extensions:Bengali}", "\u09ef")), True
        )
        self.assertEqual(
            bool(regex.match(r"(?u)\p{Script_Extensions:Beng}", "\u09ef")), True
        )
        self.assertEqual(
            bool(regex.match(r"(?u)\p{Script_Extensions:Cakm}", "\u09ef")), True
        )
        self.assertEqual(
            bool(regex.match(r"(?u)\p{Script_Extensions:Sylo}", "\u09ef")), True
        )

        # Hg issue #293: scx (Script Extensions) property currently matches
        # incorrectly
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Latin}", "P")), True)
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Ahom}", "P")), False)
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Common}", "4")), True)
        self.assertEqual(
            bool(regex.match(r"(?u)\p{scx:Caucasian_Albanian}", "4")), False
        )
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Arabic}", "\u062a")), True)
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Balinese}", "\u062a")), False)
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Devanagari}", "\u091c")), True)
        self.assertEqual(bool(regex.match(r"(?u)\p{scx:Batak}", "\u091c")), False)

        # Hg issue 296: Group references are not taken into account when group is reporting the last match
        self.assertEqual(
            regex.fullmatch("(?P<x>.)*(?&x)", "abc").captures("x"), ["a", "b", "c"]
        )
        self.assertEqual(regex.fullmatch("(?P<x>.)*(?&x)", "abc").group("x"), "b")

        self.assertEqual(
            regex.fullmatch("(?P<x>.)(?P<x>.)(?P<x>.)", "abc").captures("x"),
            ["a", "b", "c"],
        )
        self.assertEqual(
            regex.fullmatch("(?P<x>.)(?P<x>.)(?P<x>.)", "abc").group("x"), "c"
        )

        # Hg issue 299: Partial gives misleading results with "open ended" regexp
        self.assertEqual(regex.match("(?:ab)*", "ab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)*", "abab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)*?", "", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)*+", "ab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)*+", "abab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)+", "ab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)+", "abab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)+?", "ab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)++", "ab", partial=True).partial, False)
        self.assertEqual(regex.match("(?:ab)++", "abab", partial=True).partial, False)

        self.assertEqual(regex.match("(?r)(?:ab)*", "ab", partial=True).partial, False)
        self.assertEqual(
            regex.match("(?r)(?:ab)*", "abab", partial=True).partial, False
        )
        self.assertEqual(regex.match("(?r)(?:ab)*?", "", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)(?:ab)*+", "ab", partial=True).partial, False)
        self.assertEqual(
            regex.match("(?r)(?:ab)*+", "abab", partial=True).partial, False
        )
        self.assertEqual(regex.match("(?r)(?:ab)+", "ab", partial=True).partial, False)
        self.assertEqual(
            regex.match("(?r)(?:ab)+", "abab", partial=True).partial, False
        )
        self.assertEqual(regex.match("(?r)(?:ab)+?", "ab", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)(?:ab)++", "ab", partial=True).partial, False)
        self.assertEqual(
            regex.match("(?r)(?:ab)++", "abab", partial=True).partial, False
        )

        self.assertEqual(regex.match("a*", "", partial=True).partial, False)
        self.assertEqual(regex.match("a*?", "", partial=True).partial, False)
        self.assertEqual(regex.match("a*+", "", partial=True).partial, False)
        self.assertEqual(regex.match("a+", "", partial=True).partial, True)
        self.assertEqual(regex.match("a+?", "", partial=True).partial, True)
        self.assertEqual(regex.match("a++", "", partial=True).partial, True)
        self.assertEqual(regex.match("a+", "a", partial=True).partial, False)
        self.assertEqual(regex.match("a+?", "a", partial=True).partial, False)
        self.assertEqual(regex.match("a++", "a", partial=True).partial, False)

        self.assertEqual(regex.match("(?r)a*", "", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)a*?", "", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)a*+", "", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)a+", "", partial=True).partial, True)
        self.assertEqual(regex.match("(?r)a+?", "", partial=True).partial, True)
        self.assertEqual(regex.match("(?r)a++", "", partial=True).partial, True)
        self.assertEqual(regex.match("(?r)a+", "a", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)a+?", "a", partial=True).partial, False)
        self.assertEqual(regex.match("(?r)a++", "a", partial=True).partial, False)

        self.assertEqual(
            regex.match(r"(?:\s*\w+'*)+", "whatever", partial=True).partial, False
        )

        # Hg issue 300: segmentation fault
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

        m = regex.search(pattern, text, flags=regex.BESTMATCH)
        self.assertEqual(m.fuzzy_counts, (0, 1, 0))
        self.assertEqual(m.fuzzy_changes, ([], [1206], []))

        # Hg issue 306: Fuzzy match parameters not respecting quantifier scope
        self.assertEqual(
            regex.search(
                r"(?e)(dogf(((oo){e<1})|((00){e<1}))d){e<2}", "dogfood"
            ).fuzzy_counts,
            (0, 0, 0),
        )
        self.assertEqual(
            regex.search(
                r"(?e)(dogf(((oo){e<1})|((00){e<1}))d){e<2}", "dogfoot"
            ).fuzzy_counts,
            (1, 0, 0),
        )

        # Hg issue 312: \X not matching graphemes with zero-width-joins
        self.assertEqual(
            regex.findall(
                r"\X", "\U0001f468\u200d\U0001f469\u200d\U0001f467\u200d\U0001f466"
            ),
            ["\U0001f468\u200d\U0001f469\u200d\U0001f467\u200d\U0001f466"],
        )

        # Hg issue 320: Abnormal performance
        self.assertEqual(bool(regex.search(r"(?=a)a", "a")), True)
        self.assertEqual(bool(regex.search(r"(?!b)a", "a")), True)

        # Hg issue 327: .fullmatch() causes MemoryError
        self.assertEqual(regex.fullmatch(r"((\d)*?)*?", "123").span(), (0, 3))

        # Hg issue 329: Wrong group matches when question mark quantifier is used within a look behind
        self.assertEqual(
            regex.search(
                r"""(?(DEFINE)(?<mydef>(?<wrong>THIS_SHOULD_NOT_MATCHx?)|(?<right>right))).*(?<=(?&mydef).*)""",
                "x right",
            ).capturesdict(),
            {"mydef": ["right"], "wrong": [], "right": ["right"]},
        )

        # Hg issue 338: specifying allowed characters when fuzzy-matching
        self.assertEqual(bool(regex.match(r"(?:cat){e<=1:[u]}", "cut")), True)
        self.assertEqual(bool(regex.match(r"(?:cat){e<=1:u}", "cut")), True)

        # Hg issue 353: fuzzy changes negative indexes
        self.assertEqual(
            regex.search(
                r"(?be)(AGTGTTCCCCGCGCCAGCGGGGATAAACCG){s<=5,i<=5,d<=5,s+i+d<=10}",
                "TTCCCCGCGCCAGCGGGGATAAACCG",
            ).fuzzy_changes,
            ([], [], [0, 1, 3, 5]),
        )

        # Git issue 364: Contradictory values in fuzzy_counts and fuzzy_changes
        self.assertEqual(regex.match(r"(?:bc){e}", "c").fuzzy_counts, (1, 0, 1))
        self.assertEqual(regex.match(r"(?:bc){e}", "c").fuzzy_changes, ([0], [], [1]))
        self.assertEqual(regex.match(r"(?e)(?:bc){e}", "c").fuzzy_counts, (0, 0, 1))
        self.assertEqual(
            regex.match(r"(?e)(?:bc){e}", "c").fuzzy_changes, ([], [], [0])
        )
        self.assertEqual(regex.match(r"(?b)(?:bc){e}", "c").fuzzy_counts, (0, 0, 1))
        self.assertEqual(
            regex.match(r"(?b)(?:bc){e}", "c").fuzzy_changes, ([], [], [0])
        )

        # Git issue 370: Confusions about Fuzzy matching behavior
        self.assertEqual(
            regex.match(
                "(?e)(?:^(\\$ )?\\d{1,3}(,\\d{3})*(\\.\\d{2})$){e}", "$ 10,112.111.12"
            ).fuzzy_counts,
            (6, 0, 5),
        )
        self.assertEqual(
            regex.match(
                "(?e)(?:^(\\$ )?\\d{1,3}(,\\d{3})*(\\.\\d{2})$){s<=1}",
                "$ 10,112.111.12",
            ).fuzzy_counts,
            (1, 0, 0),
        )
        self.assertEqual(
            regex.match(
                "(?e)(?:^(\\$ )?\\d{1,3}(,\\d{3})*(\\.\\d{2})$){s<=1,i<=1,d<=1}",
                "$ 10,112.111.12",
            ).fuzzy_counts,
            (1, 0, 0),
        )
        self.assertEqual(
            regex.match(
                "(?e)(?:^(\\$ )?\\d{1,3}(,\\d{3})*(\\.\\d{2})$){s<=3}",
                "$ 10,1a2.111.12",
            ).fuzzy_counts,
            (2, 0, 0),
        )
        self.assertEqual(
            regex.match(
                "(?e)(?:^(\\$ )?\\d{1,3}(,\\d{3})*(\\.\\d{2})$){s<=2}",
                "$ 10,1a2.111.12",
            ).fuzzy_counts,
            (2, 0, 0),
        )

        self.assertEqual(
            regex.fullmatch(r"(?e)(?:0?,0(?:,0)?){s<=1,d<=1}", ",0;0").fuzzy_counts,
            (1, 0, 0),
        )
        self.assertEqual(
            regex.fullmatch(r"(?e)(?:0??,0(?:,0)?){s<=1,d<=1}", ",0;0").fuzzy_counts,
            (1, 0, 0),
        )

        # Git issue 371: Specifying character set when fuzzy-matching allows characters not in the set
        self.assertEqual(
            regex.search(
                r"\b(?e)(?:\d{6,20}){i<=5:[\-\\\/]}\b",
                "cat dog starting at 00:01132.000. hello world",
            ),
            None,
        )

        # Git issue 385: Comments in expressions
        self.assertEqual(bool(regex.compile("(?#)")), True)
        self.assertEqual(bool(regex.compile("(?x)(?#)")), True)

        # Git issue 394: Unexpected behaviour in fuzzy matching with limited character set with IGNORECASE flag
        self.assertEqual(
            regex.findall(r"(\d+){i<=2:[ab]}", "123X4Y5"), ["123", "4", "5"]
        )
        self.assertEqual(
            regex.findall(r"(?i)(\d+){i<=2:[ab]}", "123X4Y5"), ["123", "4", "5"]
        )

        # Git issue 403: Fuzzy matching with wrong distance (unnecessary substitutions)
        self.assertEqual(
            regex.match(r"^(test){e<=5}$", "terstin", flags=regex.B).fuzzy_counts,
            (0, 3, 0),
        )

        # Git issue 408: regex fails with a quantified backreference but succeeds with repeated backref
        self.assertEqual(bool(regex.match(r"(?:(x*)\1\1\1)*x$", "x" * 5)), True)
        self.assertEqual(bool(regex.match(r"(?:(x*)\1{3})*x$", "x" * 5)), True)

        # Git issue 415: Fuzzy character restrictions don't apply to insertions at "right edge"
        self.assertEqual(regex.match(r"t(?:es){s<=1:\d}t", "te5t").group(), "te5t")
        self.assertEqual(regex.match(r"t(?:es){s<=1:\d}t", "tezt"), None)
        self.assertEqual(regex.match(r"t(?:es){i<=1:\d}t", "tes5t").group(), "tes5t")
        self.assertEqual(regex.match(r"t(?:es){i<=1:\d}t", "teszt"), None)
        self.assertEqual(
            regex.match(r"t(?:es){i<=1:\d}t", "tes5t").fuzzy_changes, ([], [3], [])
        )
        self.assertEqual(regex.match(r"t(es){i<=1,0<e<=1}t", "tes5t").group(), "tes5t")
        self.assertEqual(
            regex.match(r"t(?:es){i<=1,0<e<=1:\d}t", "tes5t").fuzzy_changes,
            ([], [3], []),
        )

        # Git issue 421: Fatal Python error: Segmentation fault
        self.assertEqual(
            regex.compile(r"(\d+ week|\d+ days)").split("7 days"), ["", "7 days", ""]
        )
        self.assertEqual(
            regex.compile(r"(\d+ week|\d+ days)").split("10 days"), ["", "10 days", ""]
        )

        self.assertEqual(regex.compile(r"[ ]* Name[ ]*\* ").search("  Name *"), None)

        self.assertEqual(regex.compile("a|\\.*pb\\.py").search(".geojs"), None)

        p = regex.compile(
            "(?<=(?:\\A|\\W|_))(\\d+ decades? ago|\\d+ minutes ago|\\d+ seconds ago|in \\d+ decades?|\\d+ months ago|in \\d+ minutes|\\d+ minute ago|in \\d+ seconds|\\d+ second ago|\\d+ years ago|in \\d+ months|\\d+ month ago|\\d+ weeks ago|\\d+ hours ago|in \\d+ minute|in \\d+ second|in \\d+ years|\\d+ year ago|in \\d+ month|in \\d+ weeks|\\d+ week ago|\\d+ days ago|in \\d+ hours|\\d+ hour ago|in \\d+ year|in \\d+ week|in \\d+ days|\\d+ day ago|in \\d+ hour|\\d+ min ago|\\d+ sec ago|\\d+ yr ago|\\d+ mo ago|\\d+ wk ago|in \\d+ day|\\d+ hr ago|in \\d+ min|in \\d+ sec|in \\d+ yr|in \\d+ mo|in \\d+ wk|in \\d+ hr)(?=(?:\\Z|\\W|_))",
            flags=regex.I | regex.V0,
        )
        self.assertEqual(p.search("1 month ago").group(), "1 month ago")
        self.assertEqual(p.search("9 hours 1 minute ago").group(), "1 minute ago")
        self.assertEqual(p.search("10 months 1 hour ago").group(), "1 hour ago")
        self.assertEqual(p.search("1 month 10 hours ago").group(), "10 hours ago")

        # Git issue 427: Possible bug with BESTMATCH
        sequence = "TTCAGACGTGTGCTCTTCCGATCTCAATACCGACTCCTCACTGTGTGTCT"
        pattern = r"(?P<insert>.*)(?P<anchor>CTTCC){e<=1}(?P<umi>([ACGT]){4,6})(?P<sid>CAATACCGACTCCTCACTGTGT){e<=2}(?P<end>([ACGT]){0,6}$)"

        m = regex.match(pattern, sequence, flags=regex.BESTMATCH)
        self.assertEqual(m.span(), (0, 50))
        self.assertEqual(
            m.groupdict(),
            {
                "insert": "TTCAGACGTGTGCT",
                "anchor": "CTTCC",
                "umi": "GATCT",
                "sid": "CAATACCGACTCCTCACTGTGT",
                "end": "GTCT",
            },
        )

        m = regex.match(pattern, sequence, flags=regex.ENHANCEMATCH)
        self.assertEqual(m.span(), (0, 50))
        self.assertEqual(
            m.groupdict(),
            {
                "insert": "TTCAGACGTGTGCT",
                "anchor": "CTTCC",
                "umi": "GATCT",
                "sid": "CAATACCGACTCCTCACTGTGT",
                "end": "GTCT",
            },
        )

        # Git issue 433: Disagreement between fuzzy_counts and fuzzy_changes
        pattern = r"(?P<insert>.*)(?P<anchor>AACACTGG){e<=1}(?P<umi>([AT][CG]){5}){e<=2}(?P<sid>GTAACCGAAG){e<=2}(?P<end>([ACGT]){0,6}$)"

        sequence = "GGAAAACACTGGTCTCAGTCTCGTAACCGAAGTGGTCG"
        m = regex.match(pattern, sequence, flags=regex.BESTMATCH)
        self.assertEqual(m.fuzzy_counts, (0, 0, 0))
        self.assertEqual(m.fuzzy_changes, ([], [], []))

        sequence = "GGAAAACACTGGTCTCAGTCTCGTCCCCGAAGTGGTCG"
        m = regex.match(pattern, sequence, flags=regex.BESTMATCH)
        self.assertEqual(m.fuzzy_counts, (2, 0, 0))
        self.assertEqual(m.fuzzy_changes, ([24, 25], [], []))

        # Git issue 439: Unmatched groups: sub vs subf
        self.assertEqual(
            regex.sub(r"(test1)|(test2)", r"matched: \1\2", "test1"), "matched: test1"
        )
        self.assertEqual(
            regex.subf(r"(test1)|(test2)", r"matched: {1}{2}", "test1"),
            "matched: test1",
        )
        self.assertEqual(
            regex.search(r"(test1)|(test2)", "matched: test1").expand(r"matched: \1\2"),
            "matched: test1",
        ),
        self.assertEqual(
            regex.search(r"(test1)|(test2)", "matched: test1").expandf(
                r"matched: {1}{2}"
            ),
            "matched: test1",
        )

        # Git issue 442: Fuzzy regex matching doesn't seem to test insertions correctly
        self.assertEqual(regex.search(r"(?:\bha\b){i:[ ]}", "having"), None)
        self.assertEqual(
            regex.search(r"(?:\bha\b){i:[ ]}", "having", flags=regex.I), None
        )

        # Git issue 467: Scoped inline flags 'a', 'u' and 'L' affect global flags
        self.assertEqual(
            regex.match(r"(?a:\w)\w", "d\N{CYRILLIC SMALL LETTER ZHE}").span(), (0, 2)
        )
        self.assertEqual(
            regex.match(r"(?a:\w)(?u:\w)", "d\N{CYRILLIC SMALL LETTER ZHE}").span(),
            (0, 2),
        )

        # Git issue 473: Emoji classified as letter
        self.assertEqual(
            regex.match(r"^\p{LC}+$", "\N{SMILING CAT FACE WITH OPEN MOUTH}"), None
        )
        self.assertEqual(
            regex.match(r"^\p{So}+$", "\N{SMILING CAT FACE WITH OPEN MOUTH}").span(),
            (0, 1),
        )

        # Git issue 474: regex has no equivalent to `re.Match.groups()` for captures
        self.assertEqual(
            regex.match(r"(.)+", "abc").allcaptures(), (["abc"], ["a", "b", "c"])
        )
        self.assertEqual(
            regex.match(r"(.)+", "abc").allspans(), ([(0, 3)], [(0, 1), (1, 2), (2, 3)])
        )

        # Git issue 477: \v for vertical spacing
        self.assertEqual(
            bool(
                regex.fullmatch(
                    r"\p{HorizSpace}+",
                    "\t \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",
                )
            ),
            True,
        )
        self.assertEqual(
            bool(regex.fullmatch(r"\p{VertSpace}+", "\n\v\f\r\x85\u2028\u2029")), True
        )

        # Git issue 479: Segmentation fault when using conditional pattern
        self.assertEqual(regex.match(r"(?(?<=A)|(?(?![^B])C|D))", "A"), None)
        self.assertEqual(regex.search(r"(?(?<=A)|(?(?![^B])C|D))", "A").span(), (1, 1))

        # Git issue 494: Backtracking failure matching regex ^a?(a?)b?c\1$ against string abca
        self.assertEqual(regex.search(r"^a?(a?)b?c\1$", "abca").span(), (0, 4))

        # Git issue 498: Conditional negative lookahead inside positive lookahead fails to match
        self.assertEqual(regex.match(r"(?(?=a).|..)", "ab").span(), (0, 1))
        self.assertEqual(regex.match(r"(?(?=b).|..)", "ab").span(), (0, 2))
        self.assertEqual(regex.match(r"(?(?!a).|..)", "ab").span(), (0, 2))
        self.assertEqual(regex.match(r"(?(?!b).|..)", "ab").span(), (0, 1))

        # Git issue 525: segfault when fuzzy matching empty list
        self.assertEqual(regex.match(r"(\L<foo>){e<=5}", "blah", foo=[]).span(), (0, 0))

        # Git issue 527: `VERBOSE`/`X` flag breaks `\N` escapes
        self.assertEqual(
            regex.compile(r"\N{LATIN SMALL LETTER A}").match("a").span(), (0, 1)
        )
        self.assertEqual(
            regex.compile(r"\N{LATIN SMALL LETTER A}", flags=regex.X).match("a").span(),
            (0, 1),
        )

        # Git issue 539: Bug: Partial matching fails on a simple example
        self.assertEqual(
            regex.match(r"[^/]*b/ccc", "b/ccc", partial=True).span(), (0, 5)
        )
        self.assertEqual(regex.match(r"[^/]*b/ccc", "b/ccb", partial=True), None)
        self.assertEqual(
            regex.match(r"[^/]*b/ccc", "b/cc", partial=True).span(), (0, 4)
        )
        self.assertEqual(
            regex.match(r"[^/]*b/xyz", "b/xy", partial=True).span(), (0, 4)
        )
        self.assertEqual(regex.match(r"[^/]*b/xyz", "b/yz", partial=True), None)

        self.assertEqual(
            regex.match(r"(?i)[^/]*b/ccc", "b/ccc", partial=True).span(), (0, 5)
        )
        self.assertEqual(regex.match(r"(?i)[^/]*b/ccc", "b/ccb", partial=True), None)
        self.assertEqual(
            regex.match(r"(?i)[^/]*b/ccc", "b/cc", partial=True).span(), (0, 4)
        )
        self.assertEqual(
            regex.match(r"(?i)[^/]*b/xyz", "b/xy", partial=True).span(), (0, 4)
        )
        self.assertEqual(regex.match(r"(?i)[^/]*b/xyz", "b/yz", partial=True), None)

        # Git issue 546: Partial match not working in some instances with non-greedy capture
        self.assertEqual(
            bool(regex.match(r"<thinking>.*?</thinking>", "<", partial=True)), True
        )
        self.assertEqual(
            bool(regex.match(r"<thinking>.*?</thinking>", "<thinking", partial=True)),
            True,
        )
        self.assertEqual(
            bool(regex.match(r"<thinking>.*?</thinking>", "<thinking>", partial=True)),
            True,
        )
        self.assertEqual(
            bool(regex.match(r"<thinking>.*?</thinking>", "<thinking>x", partial=True)),
            True,
        )
        self.assertEqual(
            bool(
                regex.match(
                    r"<thinking>.*?</thinking>", "<thinking>xyz abc", partial=True
                )
            ),
            True,
        )
        self.assertEqual(
            bool(
                regex.match(
                    r"<thinking>.*?</thinking>", "<thinking>xyz abc foo", partial=True
                )
            ),
            True,
        )
        self.assertEqual(
            bool(
                regex.match(
                    r"<thinking>.*?</thinking>", "<thinking>xyz abc foo ", partial=True
                )
            ),
            True,
        )
        self.assertEqual(
            bool(
                regex.match(
                    r"<thinking>.*?</thinking>",
                    "<thinking>xyz abc foo bar",
                    partial=True,
                )
            ),
            True,
        )

        # Git issue 551:
        self.assertEqual(bool(regex.match(r"(?V1)[[\s\S]]", "a")), True)
        self.assertEqual(bool(regex.match(r"(?V1)[[\s\S]-a]", "a")), True)
        self.assertEqual(bool(regex.match(r"(?V1)[[\s\S]--a]", "a")), False)
        self.assertEqual(bool(regex.match(r"(?V1)[[a-z]--b]", "a")), True)
        self.assertEqual(bool(regex.match(r"(?V1)[[\s\S]--b]", "a")), True)
        self.assertEqual(bool(regex.match(r"(?V1)[a-[\s\S]]", "a")), True)
        self.assertEqual(bool(regex.match(r"(?V1)[a--[\s\S]]", "a")), False)

        self.assertEqual(
            regex.search(
                r"(?ifu)(H\N{LATIN SMALL LETTER O WITH DIAERESIS}gskolan?)[\\s\\S]*p",
                "Yrkesh\N{LATIN SMALL LETTER O WITH DIAERESIS}gskola . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen . Studie\N{LATIN SMALL LETTER A WITH DIAERESIS}mnen",
            ),
            None,
        )
