import regex
import sys
import unittest


class TestGeneralMo(unittest.TestCase):
    # test_more_zerowidth
    def test_more_zerowidth(self):
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(
                regex.split(r"\b|:+", "a::bc"), ["", "a", "", "", "bc", ""]
            )
            self.assertEqual(regex.sub(r"\b|:+", "-", "a::bc"), "-a---bc-")
            self.assertEqual(regex.findall(r"\b|:+", "a::bc"), ["", "", "::", "", ""])
            self.assertEqual(
                [m.span() for m in regex.finditer(r"\b|:+", "a::bc")],
                [(0, 0), (1, 1), (1, 3), (3, 3), (5, 5)],
            )
            self.assertEqual(
                [m.span() for m in regex.finditer(r"(?m)^\s*?$", "foo\n\n\nbar")],
                [(4, 4), (4, 5), (5, 5)],
            )
