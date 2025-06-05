# test_unmatched_in_sub
    def test_unmatched_in_sub(self):
        # Issue 1519638.

        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "xy"),
              'y-x-')
        else:
            self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "xy"),
              'y-x')
        self.assertEqual(regex.sub(r"(?V1)(x)?(y)?", r"\2-\1", "xy"), 'y-x-')
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "x"), '-x-')
        else:
            self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "x"), '-x')
        self.assertEqual(regex.sub(r"(?V1)(x)?(y)?", r"\2-\1", "x"), '-x-')
        if sys.version_info >= (3, 7, 0):
            self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "y"), 'y--')
        else:
            self.assertEqual(regex.sub(r"(?V0)(x)?(y)?", r"\2-\1", "y"), 'y-')
        self.assertEqual(regex.sub(r"(?V1)(x)?(y)?", r"\2-\1", "y"), 'y--')
