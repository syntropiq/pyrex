import regex
import unittest

class TestGeneralCa(unittest.TestCase):
# test_case_folding
    def test_case_folding(self):
        self.assertEqual(regex.search(r"(?fi)ss", "SS").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)SS", "ss").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)SS",
          "\N{LATIN SMALL LETTER SHARP S}").span(), (0, 1))
        self.assertEqual(regex.search(r"(?fi)\N{LATIN SMALL LETTER SHARP S}",
          "SS").span(), (0, 2))

        self.assertEqual(regex.search(r"(?fi)\N{LATIN SMALL LIGATURE ST}",
          "ST").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)ST",
          "\N{LATIN SMALL LIGATURE ST}").span(), (0, 1))
        self.assertEqual(regex.search(r"(?fi)ST",
          "\N{LATIN SMALL LIGATURE LONG S T}").span(), (0, 1))

        self.assertEqual(regex.search(r"(?fi)SST",
          "\N{LATIN SMALL LETTER SHARP S}t").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)SST",
          "s\N{LATIN SMALL LIGATURE LONG S T}").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)SST",
          "s\N{LATIN SMALL LIGATURE ST}").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)\N{LATIN SMALL LIGATURE ST}",
          "SST").span(), (1, 3))
        self.assertEqual(regex.search(r"(?fi)SST",
          "s\N{LATIN SMALL LIGATURE ST}").span(), (0, 2))

        self.assertEqual(regex.search(r"(?fi)FFI",
          "\N{LATIN SMALL LIGATURE FFI}").span(), (0, 1))
        self.assertEqual(regex.search(r"(?fi)FFI",
          "\N{LATIN SMALL LIGATURE FF}i").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)FFI",
          "f\N{LATIN SMALL LIGATURE FI}").span(), (0, 2))
        self.assertEqual(regex.search(r"(?fi)\N{LATIN SMALL LIGATURE FFI}",
          "FFI").span(), (0, 3))
        self.assertEqual(regex.search(r"(?fi)\N{LATIN SMALL LIGATURE FF}i",
          "FFI").span(), (0, 3))
        self.assertEqual(regex.search(r"(?fi)f\N{LATIN SMALL LIGATURE FI}",
          "FFI").span(), (0, 3))

        sigma = "\u03A3\u03C3\u03C2"
        for ch1 in sigma:
            for ch2 in sigma:
                if not regex.match(r"(?fi)" + ch1, ch2):
                    self.fail()

        self.assertEqual(bool(regex.search(r"(?iV1)ff", "\uFB00\uFB01")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)ff", "\uFB01\uFB00")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)fi", "\uFB00\uFB01")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)fi", "\uFB01\uFB00")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)fffi", "\uFB00\uFB01")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)f\uFB03",
          "\uFB00\uFB01")), True)
        self.assertEqual(bool(regex.search(r"(?iV1)ff", "\uFB00\uFB01")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)fi", "\uFB00\uFB01")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)fffi", "\uFB00\uFB01")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)f\uFB03",
          "\uFB00\uFB01")), True)
        self.assertEqual(bool(regex.search(r"(?iV1)f\uFB01", "\uFB00i")),
          True)
        self.assertEqual(bool(regex.search(r"(?iV1)f\uFB01", "\uFB00i")),
          True)

        self.assertEqual(regex.findall(r"(?iV0)\m(?:word){e<=3}\M(?<!\m(?:word){e<=1}\M)",
          "word word2 word word3 word word234 word23 word"), ["word234",
          "word23"])
        self.assertEqual(regex.findall(r"(?iV1)\m(?:word){e<=3}\M(?<!\m(?:word){e<=1}\M)",
          "word word2 word word3 word word234 word23 word"), ["word234",
          "word23"])

        self.assertEqual(regex.search(r"(?fi)a\N{LATIN SMALL LIGATURE FFI}ne",
          "  affine  ").span(), (2, 8))
        self.assertEqual(regex.search(r"(?fi)a(?:\N{LATIN SMALL LIGATURE FFI}|x)ne",
           "  affine  ").span(), (2, 8))
        self.assertEqual(regex.search(r"(?fi)a(?:\N{LATIN SMALL LIGATURE FFI}|xy)ne",
           "  affine  ").span(), (2, 8))
        self.assertEqual(regex.search(r"(?fi)a\L<options>ne", "affine",
          options=["\N{LATIN SMALL LIGATURE FFI}"]).span(), (0, 6))
        self.assertEqual(regex.search(r"(?fi)a\L<options>ne",
          "a\N{LATIN SMALL LIGATURE FFI}ne", options=["ffi"]).span(), (0, 4))

# test_category
    def test_category(self):
        self.assertEqual(regex.match(r"(\s)", " ")[1], ' ')

# test_captures
    def test_captures(self):
        self.assertEqual(regex.search(r"(\w)+", "abc").captures(1), ['a', 'b',
          'c'])
        self.assertEqual(regex.search(r"(\w{3})+", "abcdef").captures(0, 1),
          (['abcdef'], ['abc', 'def']))
        self.assertEqual(regex.search(r"^(\d{1,3})(?:\.(\d{1,3})){3}$",
          "192.168.0.1").captures(1, 2), (['192', ], ['168', '0', '1']))
        self.assertEqual(regex.match(r"^([0-9A-F]{2}){4} ([a-z]\d){5}$",
          "3FB52A0C a2c4g3k9d3").captures(1, 2), (['3F', 'B5', '2A', '0C'],
          ['a2', 'c4', 'g3', 'k9', 'd3']))
        self.assertEqual(regex.match("([a-z]W)([a-z]X)+([a-z]Y)",
          "aWbXcXdXeXfY").captures(1, 2, 3), (['aW'], ['bX', 'cX', 'dX', 'eX'],
          ['fY']))

        self.assertEqual(regex.search(r".*?(?=(.)+)b", "ab").captures(1),
          ['b'])
        self.assertEqual(regex.search(r".*?(?>(.){0,2})d", "abcd").captures(1),
          ['b', 'c'])
        self.assertEqual(regex.search(r"(.)+", "a").captures(1), ['a'])
