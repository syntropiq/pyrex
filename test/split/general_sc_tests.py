# test_scanner
    def test_scanner(self):
        def s_ident(scanner, token): return token
        def s_operator(scanner, token): return "op%s" % token
        def s_float(scanner, token): return float(token)
        def s_int(scanner, token): return int(token)

        scanner = regex.Scanner([(r"[a-zA-Z_]\w*", s_ident), (r"\d+\.\d*",
          s_float), (r"\d+", s_int), (r"=|\+|-|\*|/", s_operator), (r"\s+",
            None), ])

        self.assertEqual(repr(type(scanner.scanner.scanner("").pattern)),
          self.PATTERN_CLASS)

        self.assertEqual(scanner.scan("sum = 3*foo + 312.50 + bar"), (['sum',
          'op=', 3, 'op*', 'foo', 'op+', 312.5, 'op+', 'bar'], ''))

# test_scoped_and_inline_flags
    def test_scoped_and_inline_flags(self):
        # Issues 433028, 433024, 433027.
        self.assertEqual(regex.search(r"(?i)Ab", "ab").span(), (0, 2))
        self.assertEqual(regex.search(r"(?i:A)b", "ab").span(), (0, 2))
        # Changed to positional flags in regex 2023.12.23.
        self.assertEqual(regex.search(r"A(?i)b", "ab"), None)

        self.assertEqual(regex.search(r"(?V0)Ab", "ab"), None)
        self.assertEqual(regex.search(r"(?V1)Ab", "ab"), None)
        self.assertEqual(regex.search(r"(?-i)Ab", "ab", flags=regex.I), None)
        self.assertEqual(regex.search(r"(?-i:A)b", "ab", flags=regex.I), None)
        self.assertEqual(regex.search(r"A(?-i)b", "ab", flags=regex.I).span(),
          (0, 2))
