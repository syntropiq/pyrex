import regex
import unittest

class TestGeneralNo(unittest.TestCase):
# test_non_consuming
    def test_non_consuming(self):
        self.assertEqual(regex.match(r"(a(?=\s[^a]))", "a b")[1], 'a')
        self.assertEqual(regex.match(r"(a(?=\s[^a]*))", "a b")[1], 'a')
        self.assertEqual(regex.match(r"(a(?=\s[abc]))", "a b")[1], 'a')
        self.assertEqual(regex.match(r"(a(?=\s[abc]*))", "a bc")[1], 'a')
        self.assertEqual(regex.match(r"(a)(?=\s\1)", "a a")[1], 'a')
        self.assertEqual(regex.match(r"(a)(?=\s\1*)", "a aa")[1], 'a')
        self.assertEqual(regex.match(r"(a)(?=\s(abc|a))", "a a")[1], 'a')

        self.assertEqual(regex.match(r"(a(?!\s[^a]))", "a a")[1], 'a')
        self.assertEqual(regex.match(r"(a(?!\s[abc]))", "a d")[1], 'a')
        self.assertEqual(regex.match(r"(a)(?!\s\1)", "a b")[1], 'a')
        self.assertEqual(regex.match(r"(a)(?!\s(abc|a))", "a b")[1], 'a')

# test_not_literal
    def test_not_literal(self):
        self.assertEqual(regex.search(r"\s([^a])", " b")[1], 'b')
        self.assertEqual(regex.search(r"\s([^a]*)", " bb")[1], 'bb')
