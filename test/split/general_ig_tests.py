import regex
import unittest


class TestGeneralIg(unittest.TestCase):
    def test_ignore_case(self):
        self.assertEqual(regex.match("abc", "ABC", regex.I)[0], "ABC")
        self.assertEqual(regex.match(b"abc", b"ABC", regex.I)[0], b"ABC")

        self.assertEqual(regex.match(r"(a\s[^a]*)", "a bb", regex.I)[1], "a bb")
        self.assertEqual(regex.match(r"(a\s[abc])", "a b", regex.I)[1], "a b")
        self.assertEqual(regex.match(r"(a\s[abc]*)", "a bb", regex.I)[1], "a bb")
        self.assertEqual(regex.match(r"((a)\s\2)", "a a", regex.I)[1], "a a")
        self.assertEqual(regex.match(r"((a)\s\2*)", "a aa", regex.I)[1], "a aa")
        self.assertEqual(regex.match(r"((a)\s(abc|a))", "a a", regex.I)[1], "a a")
        self.assertEqual(regex.match(r"((a)\s(abc|a)*)", "a aa", regex.I)[1], "a aa")

        # Issue 3511.
        self.assertEqual(regex.match(r"[Z-a]", "_").span(), (0, 1))
        self.assertEqual(regex.match(r"(?i)[Z-a]", "_").span(), (0, 1))

        self.assertEqual(bool(regex.match(r"(?i)nao", "nAo")), True)
        self.assertEqual(bool(regex.match(r"(?i)n\xE3o", "n\xc3o")), True)
        self.assertEqual(bool(regex.match(r"(?i)n\xE3o", "N\xc3O")), True)
        self.assertEqual(bool(regex.match(r"(?i)s", "\u017f")), True)
