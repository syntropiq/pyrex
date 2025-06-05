import regex
import unittest

class TestGeneralSu(unittest.TestCase):
    INVALID_GROUP_REF = "invalid group reference"
    
    # test_sub_template_numeric_escape
    def test_sub_template_numeric_escape(self):
        # Bug 776311 and friends.
        self.assertEqual(regex.sub('x', r'\0', 'x'), "\0")
        self.assertEqual(regex.sub('x', r'\000', 'x'), "\000")
        self.assertEqual(regex.sub('x', r'\001', 'x'), "\001")
        self.assertEqual(regex.sub('x', r'\008', 'x'), "\0" + "8")
        self.assertEqual(regex.sub('x', r'\009', 'x'), "\0" + "9")
        self.assertEqual(regex.sub('x', r'\111', 'x'), "\111")
        self.assertEqual(regex.sub('x', r'\117', 'x'), "\117")

        self.assertEqual(regex.sub('x', r'\1111', 'x'), "\1111")
        self.assertEqual(regex.sub('x', r'\1111', 'x'), "\111" + "1")

        self.assertEqual(regex.sub('x', r'\00', 'x'), '\x00')
        self.assertEqual(regex.sub('x', r'\07', 'x'), '\x07')
        self.assertEqual(regex.sub('x', r'\08', 'x'), "\0" + "8")
        self.assertEqual(regex.sub('x', r'\09', 'x'), "\0" + "9")
        self.assertEqual(regex.sub('x', r'\0a', 'x'), "\0" + "a")

        self.assertEqual(regex.sub('x', r'\400', 'x'), "\u0100")
        self.assertEqual(regex.sub('x', r'\777', 'x'), "\u01FF")
        self.assertEqual(regex.sub(b'x', br'\400', b'x'), b"\x00")
        self.assertEqual(regex.sub(b'x', br'\777', b'x'), b"\xFF")

        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\1', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\8', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\9', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\11', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\18', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\1a', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\90', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\99', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\118', 'x')) # r'\11' + '8'
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\11a', 'x'))
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\181', 'x')) # r'\18' + '1'
        self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:
          regex.sub('x', r'\800', 'x')) # r'\80' + '0'

        # In Python 2.3 (etc), these loop endlessly in sre_parser.py.
        self.assertEqual(regex.sub('(((((((((((x)))))))))))', r'\11', 'x'),
          'x')
        self.assertEqual(regex.sub('((((((((((y))))))))))(.)', r'\118', 'xyz'),
          'xz8')
        self.assertEqual(regex.sub('((((((((((y))))))))))(.)', r'\11a', 'xyz'),
          'xza')

    # test_subscripting_match
    def test_subscripting_match(self):
        m = regex.match(r'(?<a>\w)', 'xy')
        if not m:
            self.fail("Failed: expected match but returned None")
        elif not m or m[0] != m.group(0) or m[1] != m.group(1):
            self.fail("Failed")
        if not m:
            self.fail("Failed: expected match but returned None")
        elif m[:] != ('x', 'x'):
            self.fail("Failed: expected \"('x', 'x')\" but got {} instead".format(ascii(m[:])))

    # test_subscripted_captures
    def test_subscripted_captures(self):
        self.assertEqual(regex.match(r'(?P<x>.)+',
          'abc').expandf('{0} {0[0]} {0[-1]}'), 'abc abc abc')
        self.assertEqual(regex.match(r'(?P<x>.)+',
          'abc').expandf('{1} {1[0]} {1[1]} {1[2]} {1[-1]} {1[-2]} {1[-3]}'),
          'c a b c c b a')
        self.assertEqual(regex.match(r'(?P<x>.)+',
          'abc').expandf('{x} {x[0]} {x[1]} {x[2]} {x[-1]} {x[-2]} {x[-3]}'),
          'c a b c c b a')

        self.assertEqual(regex.subf(r'(?P<x>.)+', r'{0} {0[0]} {0[-1]}',
          'abc'), 'abc abc abc')
        self.assertEqual(regex.subf(r'(?P<x>.)+',
          '{1} {1[0]} {1[1]} {1[2]} {1[-1]} {1[-2]} {1[-3]}', 'abc'),
          'c a b c c b a')
        self.assertEqual(regex.subf(r'(?P<x>.)+',
          '{x} {x[0]} {x[1]} {x[2]} {x[-1]} {x[-2]} {x[-3]}', 'abc'),
          'c a b c c b a')
