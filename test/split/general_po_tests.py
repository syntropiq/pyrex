import regex
import unittest

class TestGeneralPo(unittest.TestCase):
    # test_possessive
    def test_possessive(self):
        # Single-character non-possessive.
        self.assertEqual(regex.search(r"a?a", "a").span(), (0, 1))
        self.assertEqual(regex.search(r"a*a", "aaa").span(), (0, 3))
        self.assertEqual(regex.search(r"a+a", "aaa").span(), (0, 3))
        self.assertEqual(regex.search(r"a{1,3}a", "aaa").span(), (0, 3))

        # Multiple-character non-possessive.
        self.assertEqual(regex.search(r"(?:ab)?ab", "ab").span(), (0, 2))
        self.assertEqual(regex.search(r"(?:ab)*ab", "ababab").span(), (0, 6))
        self.assertEqual(regex.search(r"(?:ab)+ab", "ababab").span(), (0, 6))
        self.assertEqual(regex.search(r"(?:ab){1,3}ab", "ababab").span(), (0, 6))

        # Single-character possessive.
        self.assertEqual(regex.search(r"a?+a", "a"), None)
        self.assertEqual(regex.search(r"a*+a", "aaa"), None)
        self.assertEqual(regex.search(r"a++a", "aaa"), None)
        self.assertEqual(regex.search(r"a{1,3}+a", "aaa"), None)

        # Multiple-character possessive.
        self.assertEqual(regex.search(r"(?:ab)?+ab", "ab"), None)
        self.assertEqual(regex.search(r"(?:ab)*+ab", "ababab"), None)
        self.assertEqual(regex.search(r"(?:ab)++ab", "ababab"), None)
        self.assertEqual(regex.search(r"(?:ab){1,3}+ab", "ababab"), None)
