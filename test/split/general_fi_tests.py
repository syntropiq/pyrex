# test_finditer
    def test_finditer(self):
        it = regex.finditer(r":+", "a:b::c:::d")
        self.assertEqual([item[0] for item in it], [':', '::', ':::'])
