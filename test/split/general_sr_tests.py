import regex
import unittest

class TestGeneralSr(unittest.TestCase):
    INVALID_GROUP_REF = "invalid group reference"
    BAD_OCTAL_ESCAPE = "bad escape"
    
    # test_sre_character_literals
    def test_sre_character_literals(self):
        for i in [0, 8, 16, 32, 64, 127, 128, 255]:
            self.assertEqual(bool(regex.match(r"\%03o" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"\%03o0" % i, chr(i) + "0")), True)
            self.assertEqual(bool(regex.match(r"\%03o8" % i, chr(i) + "8")), True)
            self.assertEqual(bool(regex.match(r"\x%02x" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"\x%02x0" % i, chr(i) + "0")), True)
            self.assertEqual(bool(regex.match(r"\x%02xz" % i, chr(i) + "z")), True)

        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda: regex.match(r"\911", ""))

    # test_sre_character_class_literals
    def test_sre_character_class_literals(self):
        for i in [0, 8, 16, 32, 64, 127, 128, 255]:
            self.assertEqual(bool(regex.match(r"[\%03o]" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"[\%03o0]" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"[\%03o8]" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"[\x%02x]" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"[\x%02x0]" % i, chr(i))), True)
            self.assertEqual(bool(regex.match(r"[\x%02xz]" % i, chr(i))), True)

        self.assertRaisesRegex(regex.error, self.BAD_OCTAL_ESCAPE, lambda: regex.match(r"[\911]", ""))
