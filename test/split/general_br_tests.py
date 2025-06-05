import regex
import unittest


class TestGeneralBr(unittest.TestCase):
    # test_branch_reset
    def test_branch_reset(self):
        self.assertEqual(
            regex.match(r"(?:(a)|(b))(c)", "ac").groups(), ("a", None, "c")
        )
        self.assertEqual(
            regex.match(r"(?:(a)|(b))(c)", "bc").groups(), (None, "b", "c")
        )
        self.assertEqual(
            regex.match(r"(?:(?<a>a)|(?<b>b))(?<c>c)", "ac").groups(), ("a", None, "c")
        )
        self.assertEqual(
            regex.match(r"(?:(?<a>a)|(?<b>b))(?<c>c)", "bc").groups(), (None, "b", "c")
        )

        self.assertEqual(
            regex.match(r"(?<a>a)(?:(?<b>b)|(?<c>c))(?<d>d)", "abd").groups(),
            ("a", "b", None, "d"),
        )
        self.assertEqual(
            regex.match(r"(?<a>a)(?:(?<b>b)|(?<c>c))(?<d>d)", "acd").groups(),
            ("a", None, "c", "d"),
        )
        self.assertEqual(
            regex.match(r"(a)(?:(b)|(c))(d)", "abd").groups(), ("a", "b", None, "d")
        )

        self.assertEqual(
            regex.match(r"(a)(?:(b)|(c))(d)", "acd").groups(), ("a", None, "c", "d")
        )
        self.assertEqual(
            regex.match(r"(a)(?|(b)|(b))(d)", "abd").groups(), ("a", "b", "d")
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)|(?<b>b))(c)", "ac").groups(), ("a", None, "c")
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)|(?<b>b))(c)", "bc").groups(), (None, "b", "c")
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)|(?<a>b))(c)", "ac").groups(), ("a", "c")
        )

        self.assertEqual(
            regex.match(r"(?|(?<a>a)|(?<a>b))(c)", "bc").groups(), ("b", "c")
        )

        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(?<a>d))(e)", "abe").groups(),
            ("a", "b", "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(?<a>d))(e)", "cde").groups(),
            ("d", "c", "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(d))(e)", "abe").groups(),
            ("a", "b", "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(?<b>c)(d))(e)", "cde").groups(),
            ("d", "c", "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(c)(d))(e)", "abe").groups(),
            ("a", "b", "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(c)(d))(e)", "cde").groups(),
            ("c", "d", "e"),
        )

        # Hg issue 87: Allow duplicate names of groups
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "abe").groups(),
            ("a", "b", "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "abe").capturesdict(),
            {"a": ["a"], "b": ["b"]},
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "cde").groups(),
            ("d", None, "e"),
        )
        self.assertEqual(
            regex.match(r"(?|(?<a>a)(?<b>b)|(c)(?<a>d))(e)", "cde").capturesdict(),
            {"a": ["c", "d"], "b": []},
        )
