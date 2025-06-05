import regex
import unittest


class TestGeneralSp(unittest.TestCase):
    # test_special_escapes
    def test_special_escapes(self):
        self.assertEqual(regex.search(r"\b(b.)\b", "abcd abc bcd bx")[1], "bx")
        self.assertEqual(regex.search(r"\B(b.)\B", "abc bcd bc abxd")[1], "bx")
        self.assertEqual(
            regex.search(rb"\b(b.)\b", b"abcd abc bcd bx", regex.LOCALE)[1], b"bx"
        )
        self.assertEqual(
            regex.search(rb"\B(b.)\B", b"abc bcd bc abxd", regex.LOCALE)[1], b"bx"
        )
        self.assertEqual(
            regex.search(r"\b(b.)\b", "abcd abc bcd bx", regex.UNICODE)[1], "bx"
        )
        self.assertEqual(
            regex.search(r"\B(b.)\B", "abc bcd bc abxd", regex.UNICODE)[1], "bx"
        )

        self.assertEqual(regex.search(r"^abc$", "\nabc\n", regex.M)[0], "abc")
        self.assertEqual(regex.search(r"^\Aabc\Z$", "abc", regex.M)[0], "abc")
        self.assertEqual(regex.search(r"^\Aabc\Z$", "\nabc\n", regex.M), None)

        self.assertEqual(regex.search(rb"\b(b.)\b", b"abcd abc bcd bx")[1], b"bx")
        self.assertEqual(regex.search(rb"\B(b.)\B", b"abc bcd bc abxd")[1], b"bx")
        self.assertEqual(regex.search(rb"^abc$", b"\nabc\n", regex.M)[0], b"abc")
        self.assertEqual(regex.search(rb"^\Aabc\Z$", b"abc", regex.M)[0], b"abc")
        self.assertEqual(regex.search(rb"^\Aabc\Z$", b"\nabc\n", regex.M), None)

        self.assertEqual(regex.search(r"\d\D\w\W\s\S", "1aa! a")[0], "1aa! a")
        self.assertEqual(
            regex.search(rb"\d\D\w\W\s\S", b"1aa! a", regex.LOCALE)[0], b"1aa! a"
        )
        self.assertEqual(
            regex.search(r"\d\D\w\W\s\S", "1aa! a", regex.UNICODE)[0], "1aa! a"
        )

    # test_splititer
    def test_splititer(self):
        self.assertEqual(regex.split(r",", "a,b,,c,"), ["a", "b", "", "c", ""])
        self.assertEqual(
            [m for m in regex.splititer(r",", "a,b,,c,")], ["a", "b", "", "c", ""]
        )
