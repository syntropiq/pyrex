# test_stack_overflow
    def test_stack_overflow(self):
        # Nasty cases that used to overflow the straightforward recursive
        # implementation of repeated groups.
        self.assertEqual(regex.match('(x)*', 50000 * 'x')[1], 'x')
        self.assertEqual(regex.match('(x)*y', 50000 * 'x' + 'y')[1], 'x')
        self.assertEqual(regex.match('(x)*?y', 50000 * 'x' + 'y')[1], 'x')
