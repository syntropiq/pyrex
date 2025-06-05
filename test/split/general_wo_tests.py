import regex
import unittest


class TestGeneralWo(unittest.TestCase):
    # test_word_class
    def test_word_class(self):
        self.assertEqual(
            regex.findall(r"\w+", " \u0939\u093f\u0928\u094d\u0926\u0940,"),
            ["\u0939\u093f\u0928\u094d\u0926\u0940"],
        )
        self.assertEqual(
            regex.findall(r"\W+", " \u0939\u093f\u0928\u094d\u0926\u0940,"), [" ", ","]
        )
        self.assertEqual(
            regex.split(r"(?V1)\b", " \u0939\u093f\u0928\u094d\u0926\u0940,"),
            [" ", "\u0939\u093f\u0928\u094d\u0926\u0940", ","],
        )
        self.assertEqual(
            regex.split(r"(?V1)\B", " \u0939\u093f\u0928\u094d\u0926\u0940,"),
            ["", " \u0939", "\u093f", "\u0928", "\u094d", "\u0926", "\u0940,", ""],
        )

    # test_word_boundary
    def test_word_boundary(self):
        text = 'The quick ("brown") fox can\'t jump 32.3 feet, right?'
        self.assertEqual(
            regex.split(r"(?V1)\b", text),
            [
                "",
                "The",
                " ",
                "quick",
                ' ("',
                "brown",
                '") ',
                "fox",
                " ",
                "can",
                "'",
                "t",
                " ",
                "jump",
                " ",
                "32",
                ".",
                "3",
                " ",
                "feet",
                ", ",
                "right",
                "?",
            ],
        )
        self.assertEqual(
            regex.split(r"(?V1w)\b", text),
            [
                "",
                "The",
                " ",
                "quick",
                " ",
                "(",
                '"',
                "brown",
                '"',
                ")",
                " ",
                "fox",
                " ",
                "can't",
                " ",
                "jump",
                " ",
                "32.3",
                " ",
                "feet",
                ",",
                " ",
                "right",
                "?",
                "",
            ],
        )

        text = "The  fox"
        self.assertEqual(regex.split(r"(?V1)\b", text), ["", "The", "  ", "fox", ""])
        self.assertEqual(regex.split(r"(?V1w)\b", text), ["", "The", "  ", "fox", ""])

        text = "can't aujourd'hui l'objectif"
        self.assertEqual(
            regex.split(r"(?V1)\b", text),
            [
                "",
                "can",
                "'",
                "t",
                " ",
                "aujourd",
                "'",
                "hui",
                " ",
                "l",
                "'",
                "objectif",
                "",
            ],
        )
        self.assertEqual(
            regex.split(r"(?V1w)\b", text),
            ["", "can't", " ", "aujourd'hui", " ", "l'objectif", ""],
        )
