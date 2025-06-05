import regex
import unittest
import sys


class TestGeneralRe(unittest.TestCase):
# test_re_subn
    def test_re_subn(self):
        self.assertEqual(regex.subn("(?i)b+", "x", "bbbb BBBB"), ('x x', 2))
        self.assertEqual(regex.subn("b+", "x", "bbbb BBBB"), ('x BBBB', 1))
        self.assertEqual(regex.subn("b+", "x", "xyz"), ('xyz', 0))
        self.assertEqual(regex.subn("b*", "x", "xyz"), ('xxxyxzx', 4))
        self.assertEqual(regex.subn("b*", "x", "xyz", 2), ('xxxyz', 2))

# test_re_split
    def test_re_split(self):
        self.assertEqual(regex.split(":", ":a:b::c"), ['', 'a', 'b', '', 'c'])
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.split(":*", ":a:b::c"), ['', '', 'a', '',
              'b', '', 'c', ''])
            self.assertEqual(regex.split("(:*)", ":a:b::c"), ['', ':', '', '',
              'a', ':', '', '', 'b', '::', '', '', 'c', '', ''])
            self.assertEqual(regex.split("(?::*)", ":a:b::c"), ['', '', 'a',
              '', 'b', '', 'c', ''])
            self.assertEqual(regex.split("(:)*", ":a:b::c"), ['', ':', '',
              None, 'a', ':', '', None, 'b', ':', '', None, 'c', None, ''])
        else:
            self.assertEqual(regex.split(":*", ":a:b::c"), ['', 'a', 'b', 'c'])
            self.assertEqual(regex.split("(:*)", ":a:b::c"), ['', ':', 'a',
              ':', 'b', '::', 'c'])
            self.assertEqual(regex.split("(?::*)", ":a:b::c"), ['', 'a', 'b',
              'c'])
            self.assertEqual(regex.split("(:)*", ":a:b::c"), ['', ':', 'a',
              ':', 'b', ':', 'c'])
        self.assertEqual(regex.split("([b:]+)", ":a:b::c"), ['', ':', 'a',
          ':b::', 'c'])
        self.assertEqual(regex.split("(b)|(:+)", ":a:b::c"), ['', None, ':',
          'a', None, ':', '', 'b', None, '', None, '::', 'c'])
        self.assertEqual(regex.split("(?:b)|(?::+)", ":a:b::c"), ['', 'a', '',
          '', 'c'])

        self.assertEqual(regex.split("x", "xaxbxc"), ['', 'a', 'b', 'c'])
        self.assertEqual([m for m in regex.splititer("x", "xaxbxc")], ['', 'a',
          'b', 'c'])

        self.assertEqual(regex.split("(?r)x", "xaxbxc"), ['c', 'b', 'a', ''])
        self.assertEqual([m for m in regex.splititer("(?r)x", "xaxbxc")], ['c',
          'b', 'a', ''])

        self.assertEqual(regex.split("(x)|(y)", "xaxbxc"), ['', 'x', None, 'a',
          'x', None, 'b', 'x', None, 'c'])
        self.assertEqual([m for m in regex.splititer("(x)|(y)", "xaxbxc")],
          ['', 'x', None, 'a', 'x', None, 'b', 'x', None, 'c'])

        self.assertEqual(regex.split("(?r)(x)|(y)", "xaxbxc"), ['c', 'x', None,
          'b', 'x', None, 'a', 'x', None, ''])
        self.assertEqual([m for m in regex.splititer("(?r)(x)|(y)", "xaxbxc")],
          ['c', 'x', None, 'b', 'x', None, 'a', 'x', None, ''])

        self.assertEqual(regex.split(r"(?V1)\b", "a b c"), ['', 'a', ' ', 'b',
          ' ', 'c', ''])
        self.assertEqual(regex.split(r"(?V1)\m", "a b c"), ['', 'a ', 'b ',
          'c'])
        self.assertEqual(regex.split(r"(?V1)\M", "a b c"), ['a', ' b', ' c',
          ''])

# test_re_findall
    def test_re_findall(self):
        self.assertEqual(regex.findall(":+", "abc"), [])
        self.assertEqual(regex.findall(":+", "a:b::c:::d"), [':', '::', ':::'])
        self.assertEqual(regex.findall("(:+)", "a:b::c:::d"), [':', '::',
          ':::'])
        self.assertEqual(regex.findall("(:)(:*)", "a:b::c:::d"), [(':', ''),
          (':', ':'), (':', '::')])

        self.assertEqual(regex.findall(r"\((?P<test>.{0,5}?TEST)\)",
          "(MY TEST)"), ["MY TEST"])
        self.assertEqual(regex.findall(r"\((?P<test>.{0,3}?TEST)\)",
          "(MY TEST)"), ["MY TEST"])
        self.assertEqual(regex.findall(r"\((?P<test>.{0,3}?T)\)", "(MY T)"),
          ["MY T"])

        self.assertEqual(regex.findall(r"[^a]{2}[A-Z]", "\n  S"), ['  S'])
        self.assertEqual(regex.findall(r"[^a]{2,3}[A-Z]", "\n  S"), ['\n  S'])
        self.assertEqual(regex.findall(r"[^a]{2,3}[A-Z]", "\n   S"), ['   S'])

        self.assertEqual(regex.findall(r"X(Y[^Y]+?){1,2}( |Q)+DEF",
          "XYABCYPPQ\nQ DEF"), [('YPPQ\n', ' ')])

        self.assertEqual(regex.findall(r"(\nTest(\n+.+?){0,2}?)?\n+End",
          "\nTest\nxyz\nxyz\nEnd"), [('\nTest\nxyz\nxyz', '\nxyz')])

# test_re_match
    def test_re_match(self):
        self.assertEqual(regex.match('a', 'a')[:], ('a',))
        self.assertEqual(regex.match('(a)', 'a')[:], ('a', 'a'))
        self.assertEqual(regex.match(r'(a)', 'a')[0], 'a')
        self.assertEqual(regex.match(r'(a)', 'a')[1], 'a')
        self.assertEqual(regex.match(r'(a)', 'a').group(1, 1), ('a', 'a'))

        pat = regex.compile('((a)|(b))(c)?')
        self.assertEqual(pat.match('a')[:], ('a', 'a', 'a', None, None))
        self.assertEqual(pat.match('b')[:], ('b', 'b', None, 'b', None))
        self.assertEqual(pat.match('ac')[:], ('ac', 'a', 'a', None, 'c'))
        self.assertEqual(pat.match('bc')[:], ('bc', 'b', None, 'b', 'c'))
        self.assertEqual(pat.match('bc')[:], ('bc', 'b', None, 'b', 'c'))

        # A single group.
        m = regex.match('(a)', 'a')
        self.assertEqual(m.group(), 'a')
        self.assertEqual(m.group(0), 'a')
        self.assertEqual(m.group(1), 'a')
        self.assertEqual(m.group(1, 1), ('a', 'a'))

        pat = regex.compile('(?:(?P<a1>a)|(?P<b2>b))(?P<c3>c)?')
        self.assertEqual(pat.match('a').group(1, 2, 3), ('a', None, None))
        self.assertEqual(pat.match('b').group('a1', 'b2', 'c3'), (None, 'b',
          None))
        self.assertEqual(pat.match('ac').group(1, 'b2', 3), ('a', None, 'c'))

# test_re_groupref_exists
    def test_re_groupref_exists(self):
        self.assertEqual(regex.match(r'^(\()?([^()]+)(?(1)\))$', '(a)')[:],
          ('(a)', '(', 'a'))
        self.assertEqual(regex.match(r'^(\()?([^()]+)(?(1)\))$', 'a')[:], ('a',
          None, 'a'))
        self.assertEqual(regex.match(r'^(\()?([^()]+)(?(1)\))$', 'a)'), None)
        self.assertEqual(regex.match(r'^(\()?([^()]+)(?(1)\))$', '(a'), None)
        self.assertEqual(regex.match('^(?:(a)|c)((?(1)b|d))$', 'ab')[:], ('ab',
          'a', 'b'))
        self.assertEqual(regex.match('^(?:(a)|c)((?(1)b|d))$', 'cd')[:], ('cd',
          None, 'd'))
        self.assertEqual(regex.match('^(?:(a)|c)((?(1)|d))$', 'cd')[:], ('cd',
          None, 'd'))
        self.assertEqual(regex.match('^(?:(a)|c)((?(1)|d))$', 'a')[:], ('a',
          'a', ''))

        # Tests for bug #1177831: exercise groups other than the first group.
        p = regex.compile('(?P<g1>a)(?P<g2>b)?((?(g2)c|d))')
        self.assertEqual(p.match('abc')[:], ('abc', 'a', 'b', 'c'))
        self.assertEqual(p.match('ad')[:], ('ad', 'a', None, 'd'))
        self.assertEqual(p.match('abd'), None)
        self.assertEqual(p.match('ac'), None)

# test_re_groupref
    def test_re_groupref(self):
        self.assertEqual(regex.match(r'^(\|)?([^()]+)\1$', '|a|')[:], ('|a|',
          '|', 'a'))
        self.assertEqual(regex.match(r'^(\|)?([^()]+)\1?$', 'a')[:], ('a',
          None, 'a'))
        self.assertEqual(regex.match(r'^(\|)?([^()]+)\1$', 'a|'), None)
        self.assertEqual(regex.match(r'^(\|)?([^()]+)\1$', '|a'), None)
        self.assertEqual(regex.match(r'^(?:(a)|c)(\1)$', 'aa')[:], ('aa', 'a',
          'a'))
        self.assertEqual(regex.match(r'^(?:(a)|c)(\1)?$', 'c')[:], ('c', None,
          None))

        self.assertEqual(regex.findall(r"(?i)(.{1,40}?),(.{1,40}?)(?:;)+(.{1,80}).{1,40}?\3(\ |;)+(.{1,80}?)\1",
          "TEST, BEST; LEST ; Lest 123 Test, Best"), [('TEST', ' BEST',
          ' LEST', ' ', '123 ')])

# test_repeat_minmax
    def test_repeat_minmax(self):
        self.assertEqual(regex.match(r"^(\w){1}$", "abc"), None)
        self.assertEqual(regex.match(r"^(\w){1}?$", "abc"), None)
        self.assertEqual(regex.match(r"^(\w){1,2}$", "abc"), None)
        self.assertEqual(regex.match(r"^(\w){1,2}?$", "abc"), None)

        self.assertEqual(regex.match(r"^(\w){3}$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){1,3}$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){1,4}$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){3,4}?$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){3}?$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){1,3}?$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){1,4}?$", "abc")[1], 'c')
        self.assertEqual(regex.match(r"^(\w){3,4}?$", "abc")[1], 'c')

        self.assertEqual(regex.match("^x{1}$", "xxx"), None)
        self.assertEqual(regex.match("^x{1}?$", "xxx"), None)
        self.assertEqual(regex.match("^x{1,2}$", "xxx"), None)
        self.assertEqual(regex.match("^x{1,2}?$", "xxx"), None)

        self.assertEqual(regex.match("^x{1}", "xxx")[0], 'x')
        self.assertEqual(regex.match("^x{1}?", "xxx")[0], 'x')
        self.assertEqual(regex.match("^x{0,1}", "xxx")[0], 'x')
        self.assertEqual(regex.match("^x{0,1}?", "xxx")[0], '')

        self.assertEqual(bool(regex.match("^x{3}$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{1,3}$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{1,4}$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{3,4}?$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{3}?$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{1,3}?$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{1,4}?$", "xxx")), True)
        self.assertEqual(bool(regex.match("^x{3,4}?$", "xxx")), True)

        self.assertEqual(regex.match("^x{}$", "xxx"), None)
        self.assertEqual(bool(regex.match("^x{}$", "x{}")), True)

# test_re_escape
    def test_re_escape(self):
        p = ""
        self.assertEqual(regex.escape(p), p)
        for i in range(0, 256):
            p += chr(i)
            self.assertEqual(bool(regex.match(regex.escape(chr(i)), chr(i))),
              True)
            self.assertEqual(regex.match(regex.escape(chr(i)), chr(i)).span(),
              (0, 1))

        pat = regex.compile(regex.escape(p))
        self.assertEqual(pat.match(p).span(), (0, 256))

# test_re_escape_byte
    def test_re_escape_byte(self):
        p = b""
        self.assertEqual(regex.escape(p), p)
        for i in range(0, 256):
            b = bytes([i])
            p += b
            self.assertEqual(bool(regex.match(regex.escape(b), b)), True)
            self.assertEqual(regex.match(regex.escape(b), b).span(), (0, 1))

        pat = regex.compile(regex.escape(p))
        self.assertEqual(pat.match(p).span(), (0, 256))

# test_repeated_repeats
    def test_repeated_repeats(self):
        # Issue 2537.
        self.assertEqual(regex.search(r"(?:a+)+", "aaa").span(), (0, 3))
        self.assertEqual(regex.search(r"(?:(?:ab)+c)+", "abcabc").span(), (0,
          6))

        # Hg issue 286.
        self.assertEqual(regex.search(r"(?:a+){2,}", "aaa").span(), (0, 3))

# test_replacement
    def test_replacement(self):
        self.assertEqual(regex.sub(r"test\?", "result\\?\\.\a\n", "test?"),
          "result\\?\\.\a\n")

        self.assertEqual(regex.sub('(.)', r"\1\1", 'x'), 'xx')
        self.assertEqual(regex.sub('(.)', regex.escape(r"\1\1"), 'x'), r"\1\1")
        self.assertEqual(regex.sub('(.)', r"\\1\\1", 'x'), r"\1\1")
        self.assertEqual(regex.sub('(.)', lambda m: r"\1\1", 'x'), r"\1\1")

# test_recursive
    def test_recursive(self):
        self.assertEqual(regex.search(r"(\w)(?:(?R)|(\w?))\1", "xx")[ : ],
          ("xx", "x", ""))
        self.assertEqual(regex.search(r"(\w)(?:(?R)|(\w?))\1", "aba")[ : ],
          ("aba", "a", "b"))
        self.assertEqual(regex.search(r"(\w)(?:(?R)|(\w?))\1", "abba")[ : ],
          ("abba", "a", None))
        self.assertEqual(regex.search(r"(\w)(?:(?R)|(\w?))\1", "kayak")[ : ],
          ("kayak", "k", None))
        self.assertEqual(regex.search(r"(\w)(?:(?R)|(\w?))\1", "paper")[ : ],
          ("pap", "p", "a"))
        self.assertEqual(regex.search(r"(\w)(?:(?R)|(\w?))\1", "dontmatchme"),
          None)

        self.assertEqual(regex.search(r"(?r)\2(?:(\w?)|(?R))(\w)", "xx")[ : ],
          ("xx", "", "x"))
        self.assertEqual(regex.search(r"(?r)\2(?:(\w?)|(?R))(\w)", "aba")[ : ],
          ("aba", "b", "a"))
        self.assertEqual(regex.search(r"(?r)\2(?:(\w?)|(?R))(\w)", "abba")[ :
          ], ("abba", None, "a"))
        self.assertEqual(regex.search(r"(?r)\2(?:(\w?)|(?R))(\w)", "kayak")[ :
          ], ("kayak", None, "k"))
        self.assertEqual(regex.search(r"(?r)\2(?:(\w?)|(?R))(\w)", "paper")[ :
          ], ("pap", "a", "p"))
        self.assertEqual(regex.search(r"(?r)\2(?:(\w?)|(?R))(\w)",
          "dontmatchme"), None)

        self.assertEqual(regex.search(r"\(((?>[^()]+)|(?R))*\)", "(ab(cd)ef)")[
          : ], ("(ab(cd)ef)", "ef"))
        self.assertEqual(regex.search(r"\(((?>[^()]+)|(?R))*\)",
          "(ab(cd)ef)").captures(1), ["ab", "cd", "(cd)", "ef"])

        self.assertEqual(regex.search(r"(?r)\(((?R)|(?>[^()]+))*\)",
          "(ab(cd)ef)")[ : ], ("(ab(cd)ef)", "ab"))
        self.assertEqual(regex.search(r"(?r)\(((?R)|(?>[^()]+))*\)",
          "(ab(cd)ef)").captures(1), ["ef", "cd", "(cd)", "ab"])

        self.assertEqual(regex.search(r"\(([^()]+|(?R))*\)",
          "some text (a(b(c)d)e) more text")[ : ], ("(a(b(c)d)e)", "e"))

        self.assertEqual(regex.search(r"(?r)\(((?R)|[^()]+)*\)",
          "some text (a(b(c)d)e) more text")[ : ], ("(a(b(c)d)e)", "a"))

        self.assertEqual(regex.search(r"(foo(\(((?:(?>[^()]+)|(?2))*)\)))",
          "foo(bar(baz)+baz(bop))")[ : ], ("foo(bar(baz)+baz(bop))",
          "foo(bar(baz)+baz(bop))", "(bar(baz)+baz(bop))",
          "bar(baz)+baz(bop)"))

        self.assertEqual(regex.search(r"(?r)(foo(\(((?:(?2)|(?>[^()]+))*)\)))",
          "foo(bar(baz)+baz(bop))")[ : ], ("foo(bar(baz)+baz(bop))",
          "foo(bar(baz)+baz(bop))", "(bar(baz)+baz(bop))",
          "bar(baz)+baz(bop)"))

        rgx = regex.compile(r"""^\s*(<\s*([a-zA-Z:]+)(?:\s*[a-zA-Z:]*\s*=\s*(?:'[^']*'|"[^"]*"))*\s*(/\s*)?>(?:[^<>]*|(?1))*(?(3)|<\s*/\s*\2\s*>))\s*$""")
        self.assertEqual(bool(rgx.search('<foo><bar></bar></foo>')), True)
        self.assertEqual(bool(rgx.search('<foo><bar></foo></bar>')), False)
        self.assertEqual(bool(rgx.search('<foo><bar/></foo>')), True)
        self.assertEqual(bool(rgx.search('<foo><bar></foo>')), False)
        self.assertEqual(bool(rgx.search('<foo bar=baz/>')), False)

        self.assertEqual(bool(rgx.search('<foo bar="baz">')), False)
        self.assertEqual(bool(rgx.search('<foo bar="baz"/>')), True)
        self.assertEqual(bool(rgx.search('<    fooo   /  >')), True)
        # The next regex should and does match. Perl 5.14 agrees.
        #self.assertEqual(bool(rgx.search('<foo/>foo')), False)
        self.assertEqual(bool(rgx.search('foo<foo/>')), False)

        self.assertEqual(bool(rgx.search('<foo>foo</foo>')), True)
        self.assertEqual(bool(rgx.search('<foo><bar/>foo</foo>')), True)
        self.assertEqual(bool(rgx.search('<a><b><c></c></b></a>')), True)
