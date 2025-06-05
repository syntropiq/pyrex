import regex
import unittest

class TestGeneralFl(unittest.TestCase):
    PATTERN_CLASS = "<class 'regex.Pattern'>"

    # test_flags
    def test_flags(self):
        for flag in [regex.I, regex.M, regex.X, regex.S, regex.L]:
            self.assertEqual(repr(type(regex.compile('^pattern$', flag))),
              self.PATTERN_CLASS)
