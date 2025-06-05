import regex
import unittest


class TestGeneralLi(unittest.TestCase):
    # test_line_boundary
    def test_line_boundary(self):
        self.assertEqual(regex.findall(r".+", "Line 1\nLine 2\n"), ["Line 1", "Line 2"])
        self.assertEqual(regex.findall(r".+", "Line 1\rLine 2\r"), ["Line 1\rLine 2\r"])
        self.assertEqual(
            regex.findall(r".+", "Line 1\r\nLine 2\r\n"), ["Line 1\r", "Line 2\r"]
        )
        self.assertEqual(
            regex.findall(r"(?w).+", "Line 1\nLine 2\n"), ["Line 1", "Line 2"]
        )
        self.assertEqual(
            regex.findall(r"(?w).+", "Line 1\rLine 2\r"), ["Line 1", "Line 2"]
        )
        self.assertEqual(
            regex.findall(r"(?w).+", "Line 1\r\nLine 2\r\n"), ["Line 1", "Line 2"]
        )

        self.assertEqual(regex.search(r"^abc", "abc").start(), 0)
        self.assertEqual(regex.search(r"^abc", "\nabc"), None)
        self.assertEqual(regex.search(r"^abc", "\rabc"), None)
        self.assertEqual(regex.search(r"(?w)^abc", "abc").start(), 0)
        self.assertEqual(regex.search(r"(?w)^abc", "\nabc"), None)
        self.assertEqual(regex.search(r"(?w)^abc", "\rabc"), None)

        self.assertEqual(regex.search(r"abc$", "abc").start(), 0)
        self.assertEqual(regex.search(r"abc$", "abc\n").start(), 0)
        self.assertEqual(regex.search(r"abc$", "abc\r"), None)
        self.assertEqual(regex.search(r"(?w)abc$", "abc").start(), 0)
        self.assertEqual(regex.search(r"(?w)abc$", "abc\n").start(), 0)
        self.assertEqual(regex.search(r"(?w)abc$", "abc\r").start(), 0)

        self.assertEqual(regex.search(r"(?m)^abc", "abc").start(), 0)
        self.assertEqual(regex.search(r"(?m)^abc", "\nabc").start(), 1)
        self.assertEqual(regex.search(r"(?m)^abc", "\rabc"), None)
        self.assertEqual(regex.search(r"(?mw)^abc", "abc").start(), 0)
        self.assertEqual(regex.search(r"(?mw)^abc", "\nabc").start(), 1)
        self.assertEqual(regex.search(r"(?mw)^abc", "\rabc").start(), 1)

        self.assertEqual(regex.search(r"(?m)abc$", "abc").start(), 0)
        self.assertEqual(regex.search(r"(?m)abc$", "abc\n").start(), 0)
        self.assertEqual(regex.search(r"(?m)abc$", "abc\r"), None)
        self.assertEqual(regex.search(r"(?mw)abc$", "abc").start(), 0)
        self.assertEqual(regex.search(r"(?mw)abc$", "abc\n").start(), 0)
        self.assertEqual(regex.search(r"(?mw)abc$", "abc\r").start(), 0)

    # test_line_ending
    def test_line_ending(self):
        self.assertEqual(
            regex.findall(r"\R", "\r\n\n\x0b\f\r\x85\u2028\u2029"),
            ["\r\n", "\n", "\x0b", "\f", "\r", "\x85", "\u2028", "\u2029"],
        )
        self.assertEqual(
            regex.findall(rb"\R", b"\r\n\n\x0b\f\r\x85"),
            [b"\r\n", b"\n", b"\x0b", b"\f", b"\r"],
        )
