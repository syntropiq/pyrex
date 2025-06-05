# test_empty_array
    def test_empty_array(self):
        # SF buf 1647541.
        import array
        for typecode in 'bBuhHiIlLfd':
            a = array.array(typecode)
            self.assertEqual(regex.compile(b"bla").match(a), None)
            self.assertEqual(regex.compile(b"").match(a)[1 : ], ())
