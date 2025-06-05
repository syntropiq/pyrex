import regex
import unittest


class TestGeneralBi(unittest.TestCase):
    # test_bigcharset
    def test_bigcharset(self):
        self.assertEqual(regex.match(r"([\u2222\u2223])", "\u2222")[1],
          '\u2222')
        self.assertEqual(regex.match(r"([\u2222\u2223])", "\u2222",
          regex.UNICODE)[1], '\u2222')
        self.assertEqual("".join(regex.findall(".",
          "e\xe8\xe9\xea\xeb\u0113\u011b\u0117", flags=regex.UNICODE)),
          'e\xe8\xe9\xea\xeb\u0113\u011b\u0117')
        self.assertEqual("".join(regex.findall(r"[e\xe8\xe9\xea\xeb\u0113\u011b\u0117]",
          "e\xe8\xe9\xea\xeb\u0113\u011b\u0117", flags=regex.UNICODE)),
          'e\xe8\xe9\xea\xeb\u0113\u011b\u0117')
        self.assertEqual("".join(regex.findall(r"e|\xe8|\xe9|\xea|\xeb|\u0113|\u011b|\u0117",
          "e\xe8\xe9\xea\xeb\u0113\u011b\u0117", flags=regex.UNICODE)),
          'e\xe8\xe9\xea\xeb\u0113\u011b\u0117')
