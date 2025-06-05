import regex
import unittest


class TestGeneralDo(unittest.TestCase):
    # test_dollar_matches_twice
    def test_dollar_matches_twice(self):
        # $ matches the end of string, and just before the terminating \n.
        pattern = regex.compile("$")
        self.assertEqual(pattern.sub("#", "a\nb\n"), "a\nb#\n#")
        self.assertEqual(pattern.sub("#", "a\nb\nc"), "a\nb\nc#")
        self.assertEqual(pattern.sub("#", "\n"), "#\n#")

        pattern = regex.compile("$", regex.MULTILINE)
        self.assertEqual(pattern.sub("#", "a\nb\n"), "a#\nb#\n#")
        self.assertEqual(pattern.sub("#", "a\nb\nc"), "a#\nb#\nc#")
        self.assertEqual(pattern.sub("#", "\n"), "#\n#")
