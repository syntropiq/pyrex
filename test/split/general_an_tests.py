# test_anyall
    def test_anyall(self):
        self.assertEqual(regex.match("a.b", "a\nb", regex.DOTALL)[0], "a\nb")
        self.assertEqual(regex.match("a.*b", "a\n\nb", regex.DOTALL)[0],
          "a\n\nb")
