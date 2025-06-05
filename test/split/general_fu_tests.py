# test_fuzzy
    def test_fuzzy(self):
        # Some tests borrowed from TRE library tests.
        self.assertEqual(repr(type(regex.compile('(fou){s,e<=1}'))),
          self.PATTERN_CLASS)
        self.assertEqual(repr(type(regex.compile('(fuu){s}'))),
          self.PATTERN_CLASS)
        self.assertEqual(repr(type(regex.compile('(fuu){s,e}'))),
          self.PATTERN_CLASS)
        self.assertEqual(repr(type(regex.compile('(anaconda){1i+1d<1,s<=1}'))),
          self.PATTERN_CLASS)
        self.assertEqual(repr(type(regex.compile('(anaconda){1i+1d<1,s<=1,e<=10}'))),
          self.PATTERN_CLASS)
        self.assertEqual(repr(type(regex.compile('(anaconda){s<=1,e<=1,1i+1d<1}'))),
          self.PATTERN_CLASS)

        text = 'molasses anaconda foo bar baz smith anderson '
        self.assertEqual(regex.search('(znacnda){s<=1,e<=3,1i+1d<1}', text),
          None)
        self.assertEqual(regex.search('(znacnda){s<=1,e<=3,1i+1d<2}',
          text).span(0, 1), ((9, 17), (9, 17)))
        self.assertEqual(regex.search('(ananda){1i+1d<2}', text), None)
        self.assertEqual(regex.search(r"(?:\bznacnda){e<=2}", text)[0],
          "anaconda")
        self.assertEqual(regex.search(r"(?:\bnacnda){e<=2}", text)[0],
          "anaconda")

        text = 'anaconda foo bar baz smith anderson'
        self.assertEqual(regex.search('(fuu){i<=3,d<=3,e<=5}', text).span(0,
          1), ((0, 0), (0, 0)))
        self.assertEqual(regex.search('(?b)(fuu){i<=3,d<=3,e<=5}',
          text).span(0, 1), ((9, 10), (9, 10)))
        self.assertEqual(regex.search('(fuu){i<=2,d<=2,e<=5}', text).span(0,
          1), ((7, 10), (7, 10)))
        self.assertEqual(regex.search('(?e)(fuu){i<=2,d<=2,e<=5}',
          text).span(0, 1), ((9, 10), (9, 10)))
        self.assertEqual(regex.search('(fuu){i<=3,d<=3,e}', text).span(0, 1),
          ((0, 0), (0, 0)))
        self.assertEqual(regex.search('(?b)(fuu){i<=3,d<=3,e}', text).span(0,
          1), ((9, 10), (9, 10)))

        self.assertEqual(repr(type(regex.compile('(approximate){s<=3,1i+1d<3}'))),
          self.PATTERN_CLASS)

        # No cost limit.
        self.assertEqual(regex.search('(foobar){e}',
          'xirefoabralfobarxie').span(0, 1), ((0, 6), (0, 6)))
        self.assertEqual(regex.search('(?e)(foobar){e}',
          'xirefoabralfobarxie').span(0, 1), ((0, 3), (0, 3)))
        self.assertEqual(regex.search('(?b)(foobar){e}',
          'xirefoabralfobarxie').span(0, 1), ((11, 16), (11, 16)))

        # At most two errors.
        self.assertEqual(regex.search('(foobar){e<=2}',
          'xirefoabrzlfd').span(0, 1), ((4, 9), (4, 9)))
        self.assertEqual(regex.search('(foobar){e<=2}', 'xirefoabzlfd'), None)

        # At most two inserts or substitutions and max two errors total.
        self.assertEqual(regex.search('(foobar){i<=2,s<=2,e<=2}',
          'oobargoobaploowap').span(0, 1), ((5, 11), (5, 11)))

        # Find best whole word match for "foobar".
        self.assertEqual(regex.search('\\b(foobar){e}\\b', 'zfoobarz').span(0,
          1), ((0, 8), (0, 8)))
        self.assertEqual(regex.search('\\b(foobar){e}\\b',
          'boing zfoobarz goobar woop').span(0, 1), ((0, 6), (0, 6)))
        self.assertEqual(regex.search('(?b)\\b(foobar){e}\\b',
          'boing zfoobarz goobar woop').span(0, 1), ((15, 21), (15, 21)))

        # Match whole string, allow only 1 error.
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'foobar').span(0, 1),
          ((0, 6), (0, 6)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'xfoobar').span(0,
          1), ((0, 7), (0, 7)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'foobarx').span(0,
          1), ((0, 7), (0, 7)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'fooxbar').span(0,
          1), ((0, 7), (0, 7)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'foxbar').span(0, 1),
          ((0, 6), (0, 6)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'xoobar').span(0, 1),
          ((0, 6), (0, 6)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'foobax').span(0, 1),
          ((0, 6), (0, 6)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'oobar').span(0, 1),
          ((0, 5), (0, 5)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'fobar').span(0, 1),
          ((0, 5), (0, 5)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'fooba').span(0, 1),
          ((0, 5), (0, 5)))
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'xfoobarx'), None)
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'foobarxx'), None)
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'xxfoobar'), None)
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'xfoxbar'), None)
        self.assertEqual(regex.search('^(foobar){e<=1}$', 'foxbarx'), None)

        # At most one insert, two deletes, and three substitutions.
        # Additionally, deletes cost two and substitutes one, and total
        # cost must be less than 4.
        self.assertEqual(regex.search('(foobar){i<=1,d<=2,s<=3,2d+1s<4}',
          '3oifaowefbaoraofuiebofasebfaobfaorfeoaro').span(0, 1), ((6, 13), (6,
          13)))
        self.assertEqual(regex.search('(?b)(foobar){i<=1,d<=2,s<=3,2d+1s<4}',
          '3oifaowefbaoraofuiebofasebfaobfaorfeoaro').span(0, 1), ((34, 39),
          (34, 39)))

        # Partially fuzzy matches.
        self.assertEqual(regex.search('foo(bar){e<=1}zap', 'foobarzap').span(0,
          1), ((0, 9), (3, 6)))
        self.assertEqual(regex.search('foo(bar){e<=1}zap', 'fobarzap'), None)
        self.assertEqual(regex.search('foo(bar){e<=1}zap', 'foobrzap').span(0,
          1), ((0, 8), (3, 5)))

        text = ('www.cnn.com 64.236.16.20\nwww.slashdot.org 66.35.250.150\n'
          'For useful information, use www.slashdot.org\nthis is demo data!\n')
        self.assertEqual(regex.search(r'(?s)^.*(dot.org){e}.*$', text).span(0,
          1), ((0, 120), (120, 120)))
        self.assertEqual(regex.search(r'(?es)^.*(dot.org){e}.*$', text).span(0,
          1), ((0, 120), (93, 100)))
        self.assertEqual(regex.search(r'^.*(dot.org){e}.*$', text).span(0, 1),
          ((0, 119), (24, 101)))

        # Behaviour is unexpected, but arguably not wrong. It first finds the
        # best match, then the best in what follows, etc.
        self.assertEqual(regex.findall(r"\b\L<words>{e<=1}\b",
          " book cot dog desk ", words="cat dog".split()), ["cot", "dog"])
        self.assertEqual(regex.findall(r"\b\L<words>{e<=1}\b",
          " book dog cot desk ", words="cat dog".split()), [" dog", "cot"])
        self.assertEqual(regex.findall(r"(?e)\b\L<words>{e<=1}\b",
          " book dog cot desk ", words="cat dog".split()), ["dog", "cot"])
        self.assertEqual(regex.findall(r"(?r)\b\L<words>{e<=1}\b",
          " book cot dog desk ", words="cat dog".split()), ["dog ", "cot"])
        self.assertEqual(regex.findall(r"(?er)\b\L<words>{e<=1}\b",
          " book cot dog desk ", words="cat dog".split()), ["dog", "cot"])
        self.assertEqual(regex.findall(r"(?r)\b\L<words>{e<=1}\b",
          " book dog cot desk ", words="cat dog".split()), ["cot", "dog"])
        self.assertEqual(regex.findall(br"\b\L<words>{e<=1}\b",
          b" book cot dog desk ", words=b"cat dog".split()), [b"cot", b"dog"])
        self.assertEqual(regex.findall(br"\b\L<words>{e<=1}\b",
          b" book dog cot desk ", words=b"cat dog".split()), [b" dog", b"cot"])
        self.assertEqual(regex.findall(br"(?e)\b\L<words>{e<=1}\b",
          b" book dog cot desk ", words=b"cat dog".split()), [b"dog", b"cot"])
        self.assertEqual(regex.findall(br"(?r)\b\L<words>{e<=1}\b",
          b" book cot dog desk ", words=b"cat dog".split()), [b"dog ", b"cot"])
        self.assertEqual(regex.findall(br"(?er)\b\L<words>{e<=1}\b",
          b" book cot dog desk ", words=b"cat dog".split()), [b"dog", b"cot"])
        self.assertEqual(regex.findall(br"(?r)\b\L<words>{e<=1}\b",
          b" book dog cot desk ", words=b"cat dog".split()), [b"cot", b"dog"])

        self.assertEqual(regex.search(r"(\w+) (\1{e<=1})", "foo fou").groups(),
          ("foo", "fou"))
        self.assertEqual(regex.search(r"(?r)(\2{e<=1}) (\w+)",
          "foo fou").groups(), ("foo", "fou"))
        self.assertEqual(regex.search(br"(\w+) (\1{e<=1})",
          b"foo fou").groups(), (b"foo", b"fou"))

        self.assertEqual(regex.findall(r"(?:(?:QR)+){e}", "abcde"), ["abcde",
          ""])
        self.assertEqual(regex.findall(r"(?:Q+){e}", "abc"), ["abc", ""])

        # Hg issue 41: = for fuzzy matches
        self.assertEqual(regex.match(r"(?:service detection){0<e<5}",
          "servic detection").span(), (0, 16))
        self.assertEqual(regex.match(r"(?:service detection){0<e<5}",
          "service detect").span(), (0, 14))
        self.assertEqual(regex.match(r"(?:service detection){0<e<5}",
          "service detecti").span(), (0, 15))
        self.assertEqual(regex.match(r"(?:service detection){0<e<5}",
          "service detection"), None)
        self.assertEqual(regex.match(r"(?:service detection){0<e<5}",
          "in service detection").span(), (0, 20))

        # Hg issue 109: Edit distance of fuzzy match
        self.assertEqual(regex.fullmatch(r"(?:cats|cat){e<=1}",
          "cat").fuzzy_counts, (0, 0, 1))
        self.assertEqual(regex.fullmatch(r"(?e)(?:cats|cat){e<=1}",
          "cat").fuzzy_counts, (0, 0, 0))

        self.assertEqual(regex.fullmatch(r"(?:cat|cats){e<=1}",
          "cats").fuzzy_counts, (0, 1, 0))
        self.assertEqual(regex.fullmatch(r"(?e)(?:cat|cats){e<=1}",
          "cats").fuzzy_counts, (0, 0, 0))

        self.assertEqual(regex.fullmatch(r"(?:cat){e<=1} (?:cat){e<=1}",
          "cat cot").fuzzy_counts, (1, 0, 0))

        # Incorrect fuzzy changes
        self.assertEqual(regex.search(r"(?e)(GTTTTCATTCCTCATA){i<=4,d<=4,s<=4,i+d+s<=8}",
          "ATTATTTATTTTTCATA").fuzzy_changes, ([0, 6, 10, 11], [3], []))

        # Fuzzy constraints ignored when checking for prefix/suffix in branches
        self.assertEqual(bool(regex.match('(?:fo){e<=1}|(?:fo){e<=2}', 'FO')),
          True)

# test_fullmatch
    def test_fullmatch(self):
        self.assertEqual(bool(regex.fullmatch(r"abc", "abc")), True)
        self.assertEqual(bool(regex.fullmatch(r"abc", "abcx")), False)
        self.assertEqual(bool(regex.fullmatch(r"abc", "abcx", endpos=3)), True)

        self.assertEqual(bool(regex.fullmatch(r"abc", "xabc", pos=1)), True)
        self.assertEqual(bool(regex.fullmatch(r"abc", "xabcy", pos=1)), False)
        self.assertEqual(bool(regex.fullmatch(r"abc", "xabcy", pos=1,
          endpos=4)), True)

        self.assertEqual(bool(regex.fullmatch(r"(?r)abc", "abc")), True)
        self.assertEqual(bool(regex.fullmatch(r"(?r)abc", "abcx")), False)
        self.assertEqual(bool(regex.fullmatch(r"(?r)abc", "abcx", endpos=3)),
          True)

        self.assertEqual(bool(regex.fullmatch(r"(?r)abc", "xabc", pos=1)),
          True)
        self.assertEqual(bool(regex.fullmatch(r"(?r)abc", "xabcy", pos=1)),
          False)
        self.assertEqual(bool(regex.fullmatch(r"(?r)abc", "xabcy", pos=1,
          endpos=4)), True)

# test_fuzzy_ext
    def test_fuzzy_ext(self):
        self.assertEqual(bool(regex.fullmatch(r'(?r)(?:a){e<=1:[a-z]}', 'e')),
          True)
        self.assertEqual(bool(regex.fullmatch(r'(?:a){e<=1:[a-z]}', 'e')),
          True)
        self.assertEqual(bool(regex.fullmatch(r'(?:a){e<=1:[a-z]}', '-')),
          False)
        self.assertEqual(bool(regex.fullmatch(r'(?r)(?:a){e<=1:[a-z]}', '-')),
          False)

        self.assertEqual(bool(regex.fullmatch(r'(?:a){e<=1:[a-z]}', 'ae')),
          True)
        self.assertEqual(bool(regex.fullmatch(r'(?r)(?:a){e<=1:[a-z]}',
          'ae')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?:a){e<=1:[a-z]}', 'a-')),
          False)
        self.assertEqual(bool(regex.fullmatch(r'(?r)(?:a){e<=1:[a-z]}',
          'a-')), False)

        self.assertEqual(bool(regex.fullmatch(r'(?:ab){e<=1:[a-z]}', 'ae')),
           True)
        self.assertEqual(bool(regex.fullmatch(r'(?r)(?:ab){e<=1:[a-z]}',
           'ae')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?:ab){e<=1:[a-z]}', 'a-')),
           False)
        self.assertEqual(bool(regex.fullmatch(r'(?r)(?:ab){e<=1:[a-z]}',
           'a-')), False)

        self.assertEqual(bool(regex.fullmatch(r'(a)\1{e<=1:[a-z]}', 'ae')),
           True)
        self.assertEqual(bool(regex.fullmatch(r'(?r)\1{e<=1:[a-z]}(a)',
           'ea')), True)
        self.assertEqual(bool(regex.fullmatch(r'(a)\1{e<=1:[a-z]}', 'a-')),
           False)
        self.assertEqual(bool(regex.fullmatch(r'(?r)\1{e<=1:[a-z]}(a)',
           '-a')), False)

        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          'ts')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          'st')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          'st')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          'ts')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          '-s')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          's-')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          's-')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(?:\N{LATIN SMALL LETTER SHARP S}){e<=1:[a-z]}',
          '-s')), False)

        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(\N{LATIN SMALL LETTER SHARP S})\1{e<=1:[a-z]}',
           'ssst')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(\N{LATIN SMALL LETTER SHARP S})\1{e<=1:[a-z]}',
           'ssts')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)\1{e<=1:[a-z]}(\N{LATIN SMALL LETTER SHARP S})',
           'stss')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)\1{e<=1:[a-z]}(\N{LATIN SMALL LETTER SHARP S})',
           'tsss')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(\N{LATIN SMALL LETTER SHARP S})\1{e<=1:[a-z]}',
           'ss-s')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(\N{LATIN SMALL LETTER SHARP S})\1{e<=1:[a-z]}',
           'sss-')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(\N{LATIN SMALL LETTER SHARP S})\1{e<=1:[a-z]}',
           '-s')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(\N{LATIN SMALL LETTER SHARP S})\1{e<=1:[a-z]}',
           's-')), False)

        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(ss)\1{e<=1:[a-z]}',
           '\N{LATIN SMALL LETTER SHARP S}ts')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(ss)\1{e<=1:[a-z]}',
           '\N{LATIN SMALL LETTER SHARP S}st')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)\1{e<=1:[a-z]}(ss)',
           'st\N{LATIN SMALL LETTER SHARP S}')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)\1{e<=1:[a-z]}(ss)',
           'ts\N{LATIN SMALL LETTER SHARP S}')), True)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(ss)\1{e<=1:[a-z]}',
           '\N{LATIN SMALL LETTER SHARP S}-s')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?fiu)(ss)\1{e<=1:[a-z]}',
           '\N{LATIN SMALL LETTER SHARP S}s-')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(ss)\1{e<=1:[a-z]}',
           's-\N{LATIN SMALL LETTER SHARP S}')), False)
        self.assertEqual(bool(regex.fullmatch(r'(?firu)(ss)\1{e<=1:[a-z]}',
           '-s\N{LATIN SMALL LETTER SHARP S}')), False)
