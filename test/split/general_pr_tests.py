# test_properties
    def test_properties(self):
        self.assertEqual(regex.match(b'(?ai)\xC0', b'\xE0'), None)
        self.assertEqual(regex.match(br'(?ai)\xC0', b'\xE0'), None)
        self.assertEqual(regex.match(br'(?a)\w', b'\xE0'), None)
        self.assertEqual(bool(regex.match(r'\w', '\xE0')), True)

        # Dropped the following test. It's not possible to determine what the
        # correct result should be in the general case.
#        self.assertEqual(bool(regex.match(br'(?L)\w', b'\xE0')),
#          b'\xE0'.isalnum())

        self.assertEqual(bool(regex.match(br'(?L)\d', b'0')), True)
        self.assertEqual(bool(regex.match(br'(?L)\s', b' ')), True)
        self.assertEqual(bool(regex.match(br'(?L)\w', b'a')), True)
        self.assertEqual(regex.match(br'(?L)\d', b'?'), None)
        self.assertEqual(regex.match(br'(?L)\s', b'?'), None)
        self.assertEqual(regex.match(br'(?L)\w', b'?'), None)

        self.assertEqual(regex.match(br'(?L)\D', b'0'), None)
        self.assertEqual(regex.match(br'(?L)\S', b' '), None)
        self.assertEqual(regex.match(br'(?L)\W', b'a'), None)
        self.assertEqual(bool(regex.match(br'(?L)\D', b'?')), True)
        self.assertEqual(bool(regex.match(br'(?L)\S', b'?')), True)
        self.assertEqual(bool(regex.match(br'(?L)\W', b'?')), True)

        self.assertEqual(bool(regex.match(r'\p{Cyrillic}',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'(?i)\p{Cyrillic}',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{IsCyrillic}',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{Script=Cyrillic}',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{InCyrillic}',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{Block=Cyrillic}',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:Cyrillic:]]',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:IsCyrillic:]]',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:Script=Cyrillic:]]',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:InCyrillic:]]',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:Block=Cyrillic:]]',
          '\N{CYRILLIC CAPITAL LETTER A}')), True)

        self.assertEqual(bool(regex.match(r'\P{Cyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\P{IsCyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\P{Script=Cyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\P{InCyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\P{Block=Cyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{^Cyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{^IsCyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{^Script=Cyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{^InCyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'\p{^Block=Cyrillic}',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:^Cyrillic:]]',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:^IsCyrillic:]]',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:^Script=Cyrillic:]]',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:^InCyrillic:]]',
          '\N{LATIN CAPITAL LETTER A}')), True)
        self.assertEqual(bool(regex.match(r'[[:^Block=Cyrillic:]]',
          '\N{LATIN CAPITAL LETTER A}')), True)

        self.assertEqual(bool(regex.match(r'\d', '0')), True)
        self.assertEqual(bool(regex.match(r'\s', ' ')), True)
        self.assertEqual(bool(regex.match(r'\w', 'A')), True)
        self.assertEqual(regex.match(r"\d", "?"), None)
        self.assertEqual(regex.match(r"\s", "?"), None)
        self.assertEqual(regex.match(r"\w", "?"), None)
        self.assertEqual(regex.match(r"\D", "0"), None)
        self.assertEqual(regex.match(r"\S", " "), None)
        self.assertEqual(regex.match(r"\W", "A"), None)
        self.assertEqual(bool(regex.match(r'\D', '?')), True)
        self.assertEqual(bool(regex.match(r'\S', '?')), True)
        self.assertEqual(bool(regex.match(r'\W', '?')), True)

        self.assertEqual(bool(regex.match(r'\p{L}', 'A')), True)
        self.assertEqual(bool(regex.match(r'\p{L}', 'a')), True)
        self.assertEqual(bool(regex.match(r'\p{Lu}', 'A')), True)
        self.assertEqual(bool(regex.match(r'\p{Ll}', 'a')), True)

        self.assertEqual(bool(regex.match(r'(?i)a', 'a')), True)
        self.assertEqual(bool(regex.match(r'(?i)a', 'A')), True)

        self.assertEqual(bool(regex.match(r'\w', '0')), True)
        self.assertEqual(bool(regex.match(r'\w', 'a')), True)
        self.assertEqual(bool(regex.match(r'\w', '_')), True)

        self.assertEqual(regex.match(r"\X", "\xE0").span(), (0, 1))
        self.assertEqual(regex.match(r"\X", "a\u0300").span(), (0, 2))
        self.assertEqual(regex.findall(r"\X",
          "a\xE0a\u0300e\xE9e\u0301"), ['a', '\xe0', 'a\u0300', 'e',
          '\xe9', 'e\u0301'])
        self.assertEqual(regex.findall(r"\X{3}",
          "a\xE0a\u0300e\xE9e\u0301"), ['a\xe0a\u0300', 'e\xe9e\u0301'])
        self.assertEqual(regex.findall(r"\X", "\r\r\n\u0301A\u0301"),
          ['\r', '\r\n', '\u0301', 'A\u0301'])

        self.assertEqual(bool(regex.match(r'\p{Ll}', 'a')), True)

        chars_u = "-09AZaz_\u0393\u03b3"
        chars_b = b"-09AZaz_"
        word_set = set("Ll Lm Lo Lt Lu Mc Me Mn Nd Nl No Pc".split())

        tests = [
            (r"\w", chars_u, "09AZaz_\u0393\u03b3"),
            (r"[[:word:]]", chars_u, "09AZaz_\u0393\u03b3"),
            (r"\W", chars_u, "-"),
            (r"[[:^word:]]", chars_u, "-"),
            (r"\d", chars_u, "09"),
            (r"[[:digit:]]", chars_u, "09"),
            (r"\D", chars_u, "-AZaz_\u0393\u03b3"),
            (r"[[:^digit:]]", chars_u, "-AZaz_\u0393\u03b3"),
            (r"[[:alpha:]]", chars_u, "AZaz\u0393\u03b3"),
            (r"[[:^alpha:]]", chars_u, "-09_"),
            (r"[[:alnum:]]", chars_u, "09AZaz\u0393\u03b3"),
            (r"[[:^alnum:]]", chars_u, "-_"),
            (r"[[:xdigit:]]", chars_u, "09Aa"),
            (r"[[:^xdigit:]]", chars_u, "-Zz_\u0393\u03b3"),
            (r"\p{InBasicLatin}", "a\xE1", "a"),
            (r"\P{InBasicLatin}", "a\xE1", "\xE1"),
            (r"(?i)\p{InBasicLatin}", "a\xE1", "a"),
            (r"(?i)\P{InBasicLatin}", "a\xE1", "\xE1"),

            (br"(?L)\w", chars_b, b"09AZaz_"),
            (br"(?L)[[:word:]]", chars_b, b"09AZaz_"),
            (br"(?L)\W", chars_b, b"-"),
            (br"(?L)[[:^word:]]", chars_b, b"-"),
            (br"(?L)\d", chars_b, b"09"),
            (br"(?L)[[:digit:]]", chars_b, b"09"),
            (br"(?L)\D", chars_b, b"-AZaz_"),
            (br"(?L)[[:^digit:]]", chars_b, b"-AZaz_"),
            (br"(?L)[[:alpha:]]", chars_b, b"AZaz"),
            (br"(?L)[[:^alpha:]]", chars_b, b"-09_"),
            (br"(?L)[[:alnum:]]", chars_b, b"09AZaz"),
            (br"(?L)[[:^alnum:]]", chars_b, b"-_"),
            (br"(?L)[[:xdigit:]]", chars_b, b"09Aa"),
            (br"(?L)[[:^xdigit:]]", chars_b, b"-Zz_"),

            (br"(?a)\w", chars_b, b"09AZaz_"),
            (br"(?a)[[:word:]]", chars_b, b"09AZaz_"),
            (br"(?a)\W", chars_b, b"-"),
            (br"(?a)[[:^word:]]", chars_b, b"-"),
            (br"(?a)\d", chars_b, b"09"),
            (br"(?a)[[:digit:]]", chars_b, b"09"),
            (br"(?a)\D", chars_b, b"-AZaz_"),
            (br"(?a)[[:^digit:]]", chars_b, b"-AZaz_"),
            (br"(?a)[[:alpha:]]", chars_b, b"AZaz"),
            (br"(?a)[[:^alpha:]]", chars_b, b"-09_"),
            (br"(?a)[[:alnum:]]", chars_b, b"09AZaz"),
            (br"(?a)[[:^alnum:]]", chars_b, b"-_"),
            (br"(?a)[[:xdigit:]]", chars_b, b"09Aa"),
            (br"(?a)[[:^xdigit:]]", chars_b, b"-Zz_"),
        ]
        for pattern, chars, expected in tests:
            try:
                if chars[ : 0].join(regex.findall(pattern, chars)) != expected:
                    self.fail("Failed: {}".format(pattern))
            except Exception as e:
                self.fail("Failed: {} raised {}".format(pattern, ascii(e)))

        self.assertEqual(bool(regex.match(r"\p{NumericValue=0}", "0")),
          True)
        self.assertEqual(bool(regex.match(r"\p{NumericValue=1/2}",
          "\N{VULGAR FRACTION ONE HALF}")), True)
        self.assertEqual(bool(regex.match(r"\p{NumericValue=0.5}",
          "\N{VULGAR FRACTION ONE HALF}")), True)
