# test_bug_449964
    def test_bug_449964(self):
        # Fails for group followed by other escape.
        self.assertEqual(regex.sub(r'(?P<unk>x)', r'\g<1>\g<1>\b', 'xx'),
          "xx\bxx\b")

# test_bug_449000
    def test_bug_449000(self):
        # Test for sub() on escaped characters.
        self.assertEqual(regex.sub(r'\r\n', r'\n', 'abc\r\ndef\r\n'),
          "abc\ndef\n")
        self.assertEqual(regex.sub('\r\n', r'\n', 'abc\r\ndef\r\n'),
          "abc\ndef\n")
        self.assertEqual(regex.sub(r'\r\n', '\n', 'abc\r\ndef\r\n'),
          "abc\ndef\n")
        self.assertEqual(regex.sub('\r\n', '\n', 'abc\r\ndef\r\n'),
          "abc\ndef\n")

# test_bug_1661
    def test_bug_1661(self):
        # Verify that flags do not get silently ignored with compiled patterns
        pattern = regex.compile('.')
        self.assertRaisesRegex(ValueError, self.FLAGS_WITH_COMPILED_PAT,
          lambda: regex.match(pattern, 'A', regex.I))
        self.assertRaisesRegex(ValueError, self.FLAGS_WITH_COMPILED_PAT,
          lambda: regex.search(pattern, 'A', regex.I))
        self.assertRaisesRegex(ValueError, self.FLAGS_WITH_COMPILED_PAT,
          lambda: regex.findall(pattern, 'A', regex.I))
        self.assertRaisesRegex(ValueError, self.FLAGS_WITH_COMPILED_PAT,
          lambda: regex.compile(pattern, regex.I))

# test_bug_3629
    def test_bug_3629(self):
        # A regex that triggered a bug in the sre-code validator
        self.assertEqual(repr(type(regex.compile("(?P<quote>)(?(quote))"))),
          self.PATTERN_CLASS)

# test_bug_114660
    def test_bug_114660(self):
        self.assertEqual(regex.sub(r'(\S)\s+(\S)', r'\1 \2', 'hello  there'),
          'hello there')

# test_bug_462270
    def test_bug_462270(self):
        # Test for empty sub() behaviour, see SF bug #462270
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.sub('(?V0)x*', '-', 'abxd'), '-a-b--d-')
        else:
            self.assertEqual(regex.sub('(?V0)x*', '-', 'abxd'), '-a-b-d-')
        self.assertEqual(regex.sub('(?V1)x*', '-', 'abxd'), '-a-b--d-')
        self.assertEqual(regex.sub('x+', '-', 'abxd'), 'ab-d')

# test_bug_14462
    def test_bug_14462(self):
        # chr(255) is a valid identifier in Python 3.
        group_name = '\xFF'
        self.assertEqual(regex.search(r'(?P<' + group_name + '>a)',
          'abc').group(group_name), 'a')

# test_bug_117612
    def test_bug_117612(self):
        self.assertEqual(regex.findall(r"(a|(b))", "aba"), [('a', ''), ('b',
          'b'), ('a', '')])

# test_bug_113254
    def test_bug_113254(self):
        self.assertEqual(regex.match(r'(a)|(b)', 'b').start(1), -1)
        self.assertEqual(regex.match(r'(a)|(b)', 'b').end(1), -1)
        self.assertEqual(regex.match(r'(a)|(b)', 'b').span(1), (-1, -1))

# test_bug_527371
    def test_bug_527371(self):
        # Bug described in patches 527371/672491.
        self.assertEqual(regex.match(r'(a)?a','a').lastindex, None)
        self.assertEqual(regex.match(r'(a)(b)?b','ab').lastindex, 1)
        self.assertEqual(regex.match(r'(?P<a>a)(?P<b>b)?b','ab').lastgroup,
          'a')
        self.assertEqual(regex.match("(?P<a>a(b))", "ab").lastgroup, 'a')
        self.assertEqual(regex.match("((a))", "a").lastindex, 1)

# test_bug_545855
    def test_bug_545855(self):
        # Bug 545855 -- This pattern failed to cause a compile error as it
        # should, instead provoking a TypeError.
        self.assertRaisesRegex(regex.error, self.BAD_SET, lambda:
          regex.compile('foo[a-'))

# test_bug_418626
    def test_bug_418626(self):
        # Bugs 418626 at al. -- Testing Greg Chapman's addition of op code
        # SRE_OP_MIN_REPEAT_ONE for eliminating recursion on simple uses of
        # pattern '*?' on a long string.
        self.assertEqual(regex.match('.*?c', 10000 * 'ab' + 'cd').end(0),
          20001)
        self.assertEqual(regex.match('.*?cd', 5000 * 'ab' + 'c' + 5000 * 'ab' +
          'cde').end(0), 20003)
        self.assertEqual(regex.match('.*?cd', 20000 * 'abc' + 'de').end(0),
          60001)
        # Non-simple '*?' still used to hit the recursion limit, before the
        # non-recursive scheme was implemented.
        self.assertEqual(regex.search('(a|b)*?c', 10000 * 'ab' + 'cd').end(0),
          20001)

# test_bug_612074
    def test_bug_612074(self):
        pat = "[" + regex.escape("\u2039") + "]"
        self.assertEqual(regex.compile(pat) and 1, 1)

# test_bug_448951
    def test_bug_448951(self):
        # Bug 448951 (similar to 429357, but with single char match).
        # (Also test greedy matches.)
        for op in '', '?', '*':
            self.assertEqual(regex.match(r'((.%s):)?z' % op, 'z')[:], ('z',
              None, None))
            self.assertEqual(regex.match(r'((.%s):)?z' % op, 'a:z')[:], ('a:z',
              'a:', 'a'))

# test_bug_725106
    def test_bug_725106(self):
        # Capturing groups in alternatives in repeats.
        self.assertEqual(regex.match('^((a)|b)*', 'abc')[:], ('ab', 'b', 'a'))
        self.assertEqual(regex.match('^(([ab])|c)*', 'abc')[:], ('abc', 'c',
          'b'))
        self.assertEqual(regex.match('^((d)|[ab])*', 'abc')[:], ('ab', 'b',
          None))
        self.assertEqual(regex.match('^((a)c|[ab])*', 'abc')[:], ('ab', 'b',
          None))
        self.assertEqual(regex.match('^((a)|b)*?c', 'abc')[:], ('abc', 'b',
          'a'))
        self.assertEqual(regex.match('^(([ab])|c)*?d', 'abcd')[:], ('abcd',
          'c', 'b'))
        self.assertEqual(regex.match('^((d)|[ab])*?c', 'abc')[:], ('abc', 'b',
          None))
        self.assertEqual(regex.match('^((a)c|[ab])*?c', 'abc')[:], ('abc', 'b',
          None))

# test_bug_725149
    def test_bug_725149(self):
        # Mark_stack_base restoring before restoring marks.
        self.assertEqual(regex.match('(a)(?:(?=(b)*)c)*', 'abb')[:], ('a', 'a',
          None))
        self.assertEqual(regex.match('(a)((?!(b)*))*', 'abb')[:], ('a', 'a',
          None, None))

# test_bug_764548
    def test_bug_764548(self):
        # Bug 764548, regex.compile() barfs on str/unicode subclasses.
        class my_unicode(str): pass
        pat = regex.compile(my_unicode("abc"))
        self.assertEqual(pat.match("xyz"), None)

# test_bug_926075
    def test_bug_926075(self):
        if regex.compile('bug_926075') is regex.compile(b'bug_926075'):
            self.fail()

# test_bug_931848
    def test_bug_931848(self):
        pattern = "[\u002E\u3002\uFF0E\uFF61]"
        self.assertEqual(regex.compile(pattern).split("a.b.c"), ['a', 'b',
          'c'])

# test_bug_581080
    def test_bug_581080(self):
        it = regex.finditer(r"\s", "a b")
        self.assertEqual(next(it).span(), (1, 2))
        self.assertRaises(StopIteration, lambda: next(it))

        scanner = regex.compile(r"\s").scanner("a b")
        self.assertEqual(scanner.search().span(), (1, 2))
        self.assertEqual(scanner.search(), None)

# test_bug_817234
    def test_bug_817234(self):
        it = regex.finditer(r".*", "asdf")
        self.assertEqual(next(it).span(), (0, 4))
        self.assertEqual(next(it).span(), (4, 4))
        self.assertRaises(StopIteration, lambda: next(it))

# test_bug_10328
    def test_bug_10328 (self):
        # Issue 10328.
        pat = regex.compile(r'(?mV0)(?P<trailing_ws>[ \t]+\r*$)|(?P<no_final_newline>(?<=[^\n])\Z)')
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(pat.subn(lambda m: '<' + m.lastgroup + '>',
              'foobar '), ('foobar<trailing_ws><no_final_newline>', 2))
        else:
            self.assertEqual(pat.subn(lambda m: '<' + m.lastgroup + '>',
              'foobar '), ('foobar<trailing_ws>', 1))
        self.assertEqual([m.group() for m in pat.finditer('foobar ')], [' ',
          ''])
        pat = regex.compile(r'(?mV1)(?P<trailing_ws>[ \t]+\r*$)|(?P<no_final_newline>(?<=[^\n])\Z)')
        self.assertEqual(pat.subn(lambda m: '<' + m.lastgroup + '>',
          'foobar '), ('foobar<trailing_ws><no_final_newline>', 2))
        self.assertEqual([m.group() for m in pat.finditer('foobar ')], [' ',
          ''])
