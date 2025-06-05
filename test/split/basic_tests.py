import regex
import unittest

class TestBasicRegexSub(unittest.TestCase):
    def bump_num(self, m):
        return str(int(m.group(0)) + 1)

    def test_basic_regex_sub(self):
        self.assertEqual(regex.sub("(?i)b+", "x", "bbbb BBBB"), 'x x')
        self.assertEqual(regex.sub(r'\d+', self.bump_num, '08.2 -2 23x99y'),
          '9.3 -3 24x100y')
        self.assertEqual(regex.sub(r'\d+', self.bump_num, '08.2 -2 23x99y', 3),
          '9.3 -3 23x99y')

        self.assertEqual(regex.sub('.', lambda m: r"\n", 'x'), "\\n")
        self.assertEqual(regex.sub('.', r"\n", 'x'), "\n")

        self.assertEqual(regex.sub('(?P<a>x)', r'\g<a>\g<a>', 'xx'), 'xxxx')
        self.assertEqual(regex.sub('(?P<a>x)', r'\g<a>\g<1>', 'xx'), 'xxxx')
        self.assertEqual(regex.sub('(?P<unk>x)', r'\g<unk>\g<unk>', 'xx'),
          'xxxx')
        self.assertEqual(regex.sub('(?P<unk>x)', r'\g<1>\g<1>', 'xx'), 'xxxx')

        self.assertEqual(regex.sub('a', r'\t\n\v\r\f\a\b', 'a'), "\t\n\v\r\f\a\b")
        self.assertEqual(regex.sub('a', '\t\n\v\r\f\a', 'a'), "\t\n\v\r\f\a")
        self.assertEqual(regex.sub('a', '\t\n\v\r\f\a', 'a'), chr(9) + chr(10)
          + chr(11) + chr(13) + chr(12) + chr(7))

        self.assertEqual(regex.sub(r'^\s*', 'X', 'test'), 'Xtest')

        self.assertEqual(regex.sub(r"x", r"\x0A", "x"), "\n")
        self.assertEqual(regex.sub(r"x", r"\u000A", "x"), "\n")
        self.assertEqual(regex.sub(r"x", r"\U0000000A", "x"), "\n")
        self.assertEqual(regex.sub(r"x", r"\N{LATIN CAPITAL LETTER A}",
          "x"), "A")

        self.assertEqual(regex.sub(br"x", br"\x0A", b"x"), b"\n")
