import regex
import unittest


class TestGeneralGr(unittest.TestCase):
    # test_groupdict
    def test_groupdict(self):
        self.assertEqual(regex.match('(?P<first>first) (?P<second>second)',
          'first second').groupdict(), {'first': 'first', 'second': 'second'})

    # test_grapheme
    def test_grapheme(self):
        self.assertEqual(regex.match(r"\X", "\xE0").span(), (0, 1))
        self.assertEqual(regex.match(r"\X", "a\u0300").span(), (0, 2))

        self.assertEqual(regex.findall(r"\X",
          "a\xE0a\u0300e\xE9e\u0301"), ['a', '\xe0', 'a\u0300', 'e',
          '\xe9', 'e\u0301'])
        self.assertEqual(regex.findall(r"\X{3}",
          "a\xE0a\u0300e\xE9e\u0301"), ['a\xe0a\u0300', 'e\xe9e\u0301'])
        self.assertEqual(regex.findall(r"\X", "\r\r\n\u0301A\u0301"),
          ['\r', '\r\n', '\u0301', 'A\u0301'])
