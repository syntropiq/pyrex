import regex
import unittest


class TestGeneralBy(unittest.TestCase):
    STR_PAT_ON_BYTES = "cannot use a string pattern on a bytes-like object"
    BYTES_PAT_ON_STR = "cannot use a bytes pattern on a string-like object"
    STR_PAT_BYTES_TEMPL = "expected str instance, bytes found"
    BYTES_PAT_STR_TEMPL = "expected a bytes-like object, str found"
    BYTES_PAT_UNI_FLAG = "cannot use UNICODE flag with a bytes pattern"
    MIXED_FLAGS = "ASCII, LOCALE and UNICODE flags are mutually incompatible"
    
    # test_bytes_str_mixing
    def test_bytes_str_mixing(self):
        # Mixing str and bytes is disallowed.
        pat = regex.compile(".")
        bpat = regex.compile(b".")
        self.assertRaisesRegex(
            TypeError, self.STR_PAT_ON_BYTES, lambda: pat.match(b"b")
        )
        self.assertRaisesRegex(
            TypeError, self.BYTES_PAT_ON_STR, lambda: bpat.match("b")
        )
        self.assertRaisesRegex(
            TypeError, self.STR_PAT_BYTES_TEMPL, lambda: pat.sub(b"b", "c")
        )
        self.assertRaisesRegex(
            TypeError, self.STR_PAT_ON_BYTES, lambda: pat.sub("b", b"c")
        )
        self.assertRaisesRegex(
            TypeError, self.STR_PAT_ON_BYTES, lambda: pat.sub(b"b", b"c")
        )
        self.assertRaisesRegex(
            TypeError, self.BYTES_PAT_ON_STR, lambda: bpat.sub(b"b", "c")
        )
        self.assertRaisesRegex(
            TypeError, self.BYTES_PAT_STR_TEMPL, lambda: bpat.sub("b", b"c")
        )
        self.assertRaisesRegex(
            TypeError, self.BYTES_PAT_ON_STR, lambda: bpat.sub("b", "c")
        )

        self.assertRaisesRegex(
            ValueError,
            self.BYTES_PAT_UNI_FLAG,
            lambda: regex.compile(rb"\w", regex.UNICODE),
        )
        self.assertRaisesRegex(
            ValueError, self.BYTES_PAT_UNI_FLAG, lambda: regex.compile(rb"(?u)\w")
        )
        self.assertRaisesRegex(
            ValueError,
            self.MIXED_FLAGS,
            lambda: regex.compile(r"\w", regex.UNICODE | regex.ASCII),
        )
        self.assertRaisesRegex(
            ValueError, self.MIXED_FLAGS, lambda: regex.compile(r"(?u)\w", regex.ASCII)
        )
        self.assertRaisesRegex(
            ValueError,
            self.MIXED_FLAGS,
            lambda: regex.compile(r"(?a)\w", regex.UNICODE),
        )
        self.assertRaisesRegex(
            ValueError, self.MIXED_FLAGS, lambda: regex.compile(r"(?au)\w")
        )
