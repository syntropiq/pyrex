import regex
import unittest


class TestGeneralIn(unittest.TestCase):
    # test_inline_flags
    def test_inline_flags(self):
        # Bug #1700.
        upper_char = chr(0x1EA0)  # Latin Capital Letter A with Dot Below
        lower_char = chr(0x1EA1)  # Latin Small Letter A with Dot Below

        p = regex.compile(upper_char, regex.I | regex.U)
        self.assertEqual(bool(p.match(lower_char)), True)

        p = regex.compile(lower_char, regex.I | regex.U)
        self.assertEqual(bool(p.match(upper_char)), True)

        p = regex.compile("(?i)" + upper_char, regex.U)
        self.assertEqual(bool(p.match(lower_char)), True)

        p = regex.compile("(?i)" + lower_char, regex.U)
        self.assertEqual(bool(p.match(upper_char)), True)

        p = regex.compile("(?iu)" + upper_char)
        self.assertEqual(bool(p.match(lower_char)), True)

        p = regex.compile("(?iu)" + lower_char)
        self.assertEqual(bool(p.match(upper_char)), True)

        # Changed to positional flags in regex 2023.12.23.
        self.assertEqual(bool(regex.match(r"(?i)a", "A")), True)
        self.assertEqual(regex.match(r"a(?i)", "A"), None)
