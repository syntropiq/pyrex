# test_named_lists
    def test_named_lists(self):
        options = ["one", "two", "three"]
        self.assertEqual(regex.match(r"333\L<bar>444", "333one444",
          bar=options).group(), "333one444")
        self.assertEqual(regex.match(r"(?i)333\L<bar>444", "333TWO444",
          bar=options).group(), "333TWO444")
        self.assertEqual(regex.match(r"333\L<bar>444", "333four444",
          bar=options), None)

        options = [b"one", b"two", b"three"]
        self.assertEqual(regex.match(br"333\L<bar>444", b"333one444",
          bar=options).group(), b"333one444")
        self.assertEqual(regex.match(br"(?i)333\L<bar>444", b"333TWO444",
          bar=options).group(), b"333TWO444")
        self.assertEqual(regex.match(br"333\L<bar>444", b"333four444",
          bar=options), None)

        self.assertEqual(repr(type(regex.compile(r"3\L<bar>4\L<bar>+5",
          bar=["one", "two", "three"]))), self.PATTERN_CLASS)

        self.assertEqual(regex.findall(r"^\L<options>", "solid QWERT",
          options=set(['good', 'brilliant', '+s\\ol[i}d'])), [])
        self.assertEqual(regex.findall(r"^\L<options>", "+solid QWERT",
          options=set(['good', 'brilliant', '+solid'])), ['+solid'])

        options = ["STRASSE"]
        self.assertEqual(regex.match(r"(?fi)\L<words>",
          "stra\N{LATIN SMALL LETTER SHARP S}e", words=options).span(), (0,
          6))

        options = ["STRASSE", "stress"]
        self.assertEqual(regex.match(r"(?fi)\L<words>",
          "stra\N{LATIN SMALL LETTER SHARP S}e", words=options).span(), (0,
          6))

        options = ["stra\N{LATIN SMALL LETTER SHARP S}e"]
        self.assertEqual(regex.match(r"(?fi)\L<words>", "STRASSE",
          words=options).span(), (0, 7))

        options = ["kit"]
        self.assertEqual(regex.search(r"(?i)\L<words>", "SKITS",
          words=options).span(), (1, 4))
        self.assertEqual(regex.search(r"(?i)\L<words>",
          "SK\N{LATIN CAPITAL LETTER I WITH DOT ABOVE}TS",
          words=options).span(), (1, 4))

        self.assertEqual(regex.search(r"(?fi)\b(\w+) +\1\b",
          " stra\N{LATIN SMALL LETTER SHARP S}e STRASSE ").span(), (1, 15))
        self.assertEqual(regex.search(r"(?fi)\b(\w+) +\1\b",
          " STRASSE stra\N{LATIN SMALL LETTER SHARP S}e ").span(), (1, 15))

        self.assertEqual(regex.search(r"^\L<options>$", "", options=[]).span(),
          (0, 0))
