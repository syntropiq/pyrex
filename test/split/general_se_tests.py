# test_search_star_plus
    def test_search_star_plus(self):
        self.assertEqual(regex.search('a*', 'xxx').span(0), (0, 0))
        self.assertEqual(regex.search('x*', 'axx').span(), (0, 0))
        self.assertEqual(regex.search('x+', 'axx').span(0), (1, 3))
        self.assertEqual(regex.search('x+', 'axx').span(), (1, 3))
        self.assertEqual(regex.search('x', 'aaa'), None)
        self.assertEqual(regex.match('a*', 'xxx').span(0), (0, 0))
        self.assertEqual(regex.match('a*', 'xxx').span(), (0, 0))
        self.assertEqual(regex.match('x*', 'xxxa').span(0), (0, 3))
        self.assertEqual(regex.match('x*', 'xxxa').span(), (0, 3))
        self.assertEqual(regex.match('a+', 'xxx'), None)

# test_search_coverage
    def test_search_coverage(self):
        self.assertEqual(regex.search(r"\s(b)", " b")[1], 'b')
        self.assertEqual(regex.search(r"a\s", "a ")[0], 'a ')

# test_search_anchor
    def test_search_anchor(self):
        self.assertEqual(regex.findall(r"\G\w{2}", "abcd ef"), ['ab', 'cd'])

# test_search_reverse
    def test_search_reverse(self):
        self.assertEqual(regex.findall(r"(?r).", "abc"), ['c', 'b', 'a'])
        self.assertEqual(regex.findall(r"(?r).", "abc", overlapped=True), ['c',
          'b', 'a'])
        self.assertEqual(regex.findall(r"(?r)..", "abcde"), ['de', 'bc'])
        self.assertEqual(regex.findall(r"(?r)..", "abcde", overlapped=True),
          ['de', 'cd', 'bc', 'ab'])
        self.assertEqual(regex.findall(r"(?r)(.)(-)(.)", "a-b-c",
          overlapped=True), [("b", "-", "c"), ("a", "-", "b")])

        self.assertEqual([m[0] for m in regex.finditer(r"(?r).", "abc")], ['c',
          'b', 'a'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?r)..", "abcde",
          overlapped=True)], ['de', 'cd', 'bc', 'ab'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?r).", "abc")], ['c',
          'b', 'a'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?r)..", "abcde",
          overlapped=True)], ['de', 'cd', 'bc', 'ab'])

        self.assertEqual(regex.findall(r"^|\w+", "foo bar"), ['', 'foo',
          'bar'])
        self.assertEqual(regex.findall(r"(?V1)^|\w+", "foo bar"), ['', 'foo',
          'bar'])
        self.assertEqual(regex.findall(r"(?r)^|\w+", "foo bar"), ['bar', 'foo',
          ''])
        self.assertEqual(regex.findall(r"(?rV1)^|\w+", "foo bar"), ['bar',
          'foo', ''])

        self.assertEqual([m[0] for m in regex.finditer(r"^|\w+", "foo bar")],
          ['', 'foo', 'bar'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?V1)^|\w+",
          "foo bar")], ['', 'foo', 'bar'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?r)^|\w+",
          "foo bar")], ['bar', 'foo', ''])
        self.assertEqual([m[0] for m in regex.finditer(r"(?rV1)^|\w+",
          "foo bar")], ['bar', 'foo', ''])

        self.assertEqual(regex.findall(r"\G\w{2}", "abcd ef"), ['ab', 'cd'])
        self.assertEqual(regex.findall(r".{2}(?<=\G.*)", "abcd"), ['ab', 'cd'])
        self.assertEqual(regex.findall(r"(?r)\G\w{2}", "abcd ef"), [])
        self.assertEqual(regex.findall(r"(?r)\w{2}\G", "abcd ef"), ['ef'])

        self.assertEqual(regex.findall(r"q*", "qqwe"), ['qq', '', '', ''])
        self.assertEqual(regex.findall(r"(?V1)q*", "qqwe"), ['qq', '', '', ''])
        self.assertEqual(regex.findall(r"(?r)q*", "qqwe"), ['', '', 'qq', ''])
        self.assertEqual(regex.findall(r"(?rV1)q*", "qqwe"), ['', '', 'qq',
          ''])

        self.assertEqual(regex.findall(".", "abcd", pos=1, endpos=3), ['b',
          'c'])
        self.assertEqual(regex.findall(".", "abcd", pos=1, endpos=-1), ['b',
          'c'])
        self.assertEqual([m[0] for m in regex.finditer(".", "abcd", pos=1,
          endpos=3)], ['b', 'c'])
        self.assertEqual([m[0] for m in regex.finditer(".", "abcd", pos=1,
          endpos=-1)], ['b', 'c'])

        self.assertEqual([m[0] for m in regex.finditer("(?r).", "abcd", pos=1,
          endpos=3)], ['c', 'b'])
        self.assertEqual([m[0] for m in regex.finditer("(?r).", "abcd", pos=1,
          endpos=-1)], ['c', 'b'])
        self.assertEqual(regex.findall("(?r).", "abcd", pos=1, endpos=3), ['c',
          'b'])
        self.assertEqual(regex.findall("(?r).", "abcd", pos=1, endpos=-1),
          ['c', 'b'])

        self.assertEqual(regex.findall(r"[ab]", "aB", regex.I), ['a', 'B'])
        self.assertEqual(regex.findall(r"(?r)[ab]", "aB", regex.I), ['B', 'a'])

        self.assertEqual(regex.findall(r"(?r).{2}", "abc"), ['bc'])
        self.assertEqual(regex.findall(r"(?r).{2}", "abc", overlapped=True),
          ['bc', 'ab'])
        self.assertEqual(regex.findall(r"(\w+) (\w+)",
          "first second third fourth fifth"), [('first', 'second'), ('third',
          'fourth')])
        self.assertEqual(regex.findall(r"(?r)(\w+) (\w+)",
          "first second third fourth fifth"), [('fourth', 'fifth'), ('second',
          'third')])

        self.assertEqual([m[0] for m in regex.finditer(r"(?r).{2}", "abc")],
          ['bc'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?r).{2}", "abc",
          overlapped=True)], ['bc', 'ab'])
        self.assertEqual([m[0] for m in regex.finditer(r"(\w+) (\w+)",
          "first second third fourth fifth")], ['first second',
          'third fourth'])
        self.assertEqual([m[0] for m in regex.finditer(r"(?r)(\w+) (\w+)",
          "first second third fourth fifth")], ['fourth fifth',
          'second third'])

        self.assertEqual(regex.search("abcdef", "abcdef").span(), (0, 6))
        self.assertEqual(regex.search("(?r)abcdef", "abcdef").span(), (0, 6))
        self.assertEqual(regex.search("(?i)abcdef", "ABCDEF").span(), (0, 6))
        self.assertEqual(regex.search("(?ir)abcdef", "ABCDEF").span(), (0, 6))

        self.assertEqual(regex.sub(r"(.)", r"\1", "abc"), 'abc')
        self.assertEqual(regex.sub(r"(?r)(.)", r"\1", "abc"), 'abc')

# test_set
    def test_set(self):
        self.assertEqual(regex.match(r"[a]", "a").span(), (0, 1))
        self.assertEqual(regex.match(r"(?i)[a]", "A").span(), (0, 1))
        self.assertEqual(regex.match(r"[a-b]", r"a").span(), (0, 1))
        self.assertEqual(regex.match(r"(?i)[a-b]", r"A").span(), (0, 1))

        self.assertEqual(regex.sub(r"(?V0)([][])", r"-", "a[b]c"), "a-b-c")

        self.assertEqual(regex.findall(r"[\p{Alpha}]", "a0"), ["a"])
        self.assertEqual(regex.findall(r"(?i)[\p{Alpha}]", "A0"), ["A"])

        self.assertEqual(regex.findall(r"[a\p{Alpha}]", "ab0"), ["a", "b"])
        self.assertEqual(regex.findall(r"[a\P{Alpha}]", "ab0"), ["a", "0"])
        self.assertEqual(regex.findall(r"(?i)[a\p{Alpha}]", "ab0"), ["a",
          "b"])
        self.assertEqual(regex.findall(r"(?i)[a\P{Alpha}]", "ab0"), ["a",
          "0"])

        self.assertEqual(regex.findall(r"[a-b\p{Alpha}]", "abC0"), ["a",
          "b", "C"])
        self.assertEqual(regex.findall(r"(?i)[a-b\p{Alpha}]", "AbC0"), ["A",
          "b", "C"])

        self.assertEqual(regex.findall(r"[\p{Alpha}]", "a0"), ["a"])
        self.assertEqual(regex.findall(r"[\P{Alpha}]", "a0"), ["0"])
        self.assertEqual(regex.findall(r"[^\p{Alpha}]", "a0"), ["0"])
        self.assertEqual(regex.findall(r"[^\P{Alpha}]", "a0"), ["a"])

        self.assertEqual("".join(regex.findall(r"[^\d-h]", "a^b12c-h")),
          'a^bc')
        self.assertEqual("".join(regex.findall(r"[^\dh]", "a^b12c-h")),
          'a^bc-')
        self.assertEqual("".join(regex.findall(r"[^h\s\db]", "a^b 12c-h")),
          'a^c-')
        self.assertEqual("".join(regex.findall(r"[^b\w]", "a b")), ' ')
        self.assertEqual("".join(regex.findall(r"[^b\S]", "a b")), ' ')
        self.assertEqual("".join(regex.findall(r"[^8\d]", "a 1b2")), 'a b')

        all_chars = "".join(chr(c) for c in range(0x100))
        self.assertEqual(len(regex.findall(r"\p{ASCII}", all_chars)), 128)
        self.assertEqual(len(regex.findall(r"\p{Letter}", all_chars)),
          117)
        self.assertEqual(len(regex.findall(r"\p{Digit}", all_chars)), 10)

        # Set operators
        self.assertEqual(len(regex.findall(r"(?V1)[\p{ASCII}&&\p{Letter}]",
          all_chars)), 52)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{ASCII}&&\p{Alnum}&&\p{Letter}]",
          all_chars)), 52)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{ASCII}&&\p{Alnum}&&\p{Digit}]",
          all_chars)), 10)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{ASCII}&&\p{Cc}]",
          all_chars)), 33)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{ASCII}&&\p{Graph}]",
          all_chars)), 94)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{ASCII}--\p{Cc}]",
          all_chars)), 95)
        self.assertEqual(len(regex.findall(r"[\p{Letter}\p{Digit}]",
          all_chars)), 127)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{Letter}||\p{Digit}]",
          all_chars)), 127)
        self.assertEqual(len(regex.findall(r"\p{HexDigit}", all_chars)),
          22)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{HexDigit}~~\p{Digit}]",
          all_chars)), 12)
        self.assertEqual(len(regex.findall(r"(?V1)[\p{Digit}~~\p{HexDigit}]",
          all_chars)), 12)

        self.assertEqual(repr(type(regex.compile(r"(?V0)([][-])"))),
          self.PATTERN_CLASS)
        self.assertEqual(regex.findall(r"(?V1)[[a-z]--[aei]]", "abc"), ["b",
          "c"])
        self.assertEqual(regex.findall(r"(?iV1)[[a-z]--[aei]]", "abc"), ["b",
          "c"])
        self.assertEqual(regex.findall(r"(?V1)[\w--a]","abc"), ["b", "c"])
        self.assertEqual(regex.findall(r"(?iV1)[\w--a]","abc"), ["b", "c"])
