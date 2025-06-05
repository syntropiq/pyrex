# test_ascii_and_unicode_flag
    def test_ascii_and_unicode_flag(self):
        # String patterns.
        for flags in (0, regex.UNICODE):
            pat = regex.compile('\xc0', flags | regex.IGNORECASE)
            self.assertEqual(bool(pat.match('\xe0')), True)
            pat = regex.compile(r'\w', flags)
            self.assertEqual(bool(pat.match('\xe0')), True)

        pat = regex.compile('\xc0', regex.ASCII | regex.IGNORECASE)
        self.assertEqual(pat.match('\xe0'), None)
        pat = regex.compile('(?a)\xc0', regex.IGNORECASE)
        self.assertEqual(pat.match('\xe0'), None)
        pat = regex.compile(r'\w', regex.ASCII)
        self.assertEqual(pat.match('\xe0'), None)
        pat = regex.compile(r'(?a)\w')
        self.assertEqual(pat.match('\xe0'), None)

        # Bytes patterns.
        for flags in (0, regex.ASCII):
            pat = regex.compile(b'\xc0', flags | regex.IGNORECASE)
            self.assertEqual(pat.match(b'\xe0'), None)
            pat = regex.compile(br'\w')
            self.assertEqual(pat.match(b'\xe0'), None)

        self.assertRaisesRegex(ValueError, self.MIXED_FLAGS, lambda:
          regex.compile(r'(?au)\w'))
