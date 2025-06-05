# test_qualified_re_sub
    def test_qualified_re_sub(self):
        self.assertEqual(regex.sub('a', 'b', 'aaaaa'), 'bbbbb')
        self.assertEqual(regex.sub('a', 'b', 'aaaaa', 1), 'baaaa')

# test_qualified_re_split
    def test_qualified_re_split(self):
        self.assertEqual(regex.split(":", ":a:b::c", 2), ['', 'a', 'b::c'])
        self.assertEqual(regex.split(':', 'a:b:c:d', 2), ['a', 'b', 'c:d'])
        self.assertEqual(regex.split("(:)", ":a:b::c", 2), ['', ':', 'a', ':',
          'b::c'])

        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.split("(:*)", ":a:b::c", 2), ['', ':', '',
              '', 'a:b::c'])
        else:
            self.assertEqual(regex.split("(:*)", ":a:b::c", 2), ['', ':', 'a',
              ':', 'b::c'])
