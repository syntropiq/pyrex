import regex
import unittest


class TestGeneralFo(unittest.TestCase):
    # test_format
    def test_format(self):
        self.assertEqual(regex.subf(r"(\w+) (\w+)", "{0} => {2} {1}",
          "foo bar"), "foo bar => bar foo")
        self.assertEqual(regex.subf(r"(?<word1>\w+) (?<word2>\w+)",
          "{word2} {word1}", "foo bar"), "bar foo")

        self.assertEqual(regex.subfn(r"(\w+) (\w+)", "{0} => {2} {1}",
          "foo bar"), ("foo bar => bar foo", 1))
        self.assertEqual(regex.subfn(r"(?<word1>\w+) (?<word2>\w+)",
          "{word2} {word1}", "foo bar"), ("bar foo", 1))

        self.assertEqual(regex.match(r"(\w+) (\w+)",
          "foo bar").expandf("{0} => {2} {1}"), "foo bar => bar foo")
