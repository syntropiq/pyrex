# test_symbolic_refs
    def test_symbolic_refs(self):
        self.assertRaisesRegex(regex.error, self.MISSING_GT, lambda:
          regex.sub('(?P<a>x)', r'\g<a', 'xx'))
        self.assertRaisesRegex(regex.error, self.MISSING_GROUP_NAME, lambda:
          regex.sub('(?P<a>x)', r'\g<', 'xx'))
        self.assertRaisesRegex(regex.error, self.MISSING_LT, lambda:
          regex.sub('(?P<a>x)', r'\g', 'xx'))
        self.assertRaisesRegex(regex.error, self.BAD_GROUP_NAME, lambda:
          regex.sub('(?P<a>x)', r'\g<a a>', 'xx'))
        self.assertRaisesRegex(regex.error, self.BAD_GROUP_NAME, lambda:
          regex.sub('(?P<a>x)', r'\g<1a1>', 'xx'))
        self.assertRaisesRegex(IndexError, self.UNKNOWN_GROUP_I, lambda:
          regex.sub('(?P<a>x)', r'\g<ab>', 'xx'))

        # The new behaviour of unmatched but valid groups is to treat them like
        # empty matches in the replacement template, like in Perl.
        self.assertEqual(regex.sub('(?P<a>x)|(?P<b>y)', r'\g<b>', 'xx'), '')
        self.assertEqual(regex.sub('(?P<a>x)|(?P<b>y)', r'\2', 'xx'), '')

        # The old behaviour was to raise it as an IndexError.
        self.assertRaisesRegex(regex.error, self.BAD_GROUP_NAME, lambda:
          regex.sub('(?P<a>x)', r'\g<-1>', 'xx'))
