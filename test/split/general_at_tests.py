# test_atomic
    def test_atomic(self):
        # Issue 433030.
        self.assertEqual(regex.search(r"(?>a*)a", "aa"), None)
