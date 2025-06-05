import { describe, it, expect } from 'vitest';
// Auto-converted from /Users/steve/Projects/amjur.org/pyrex/test/split/general_su_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Regex (converted)', () => {

  it('regex.sub test 1', async () => {
    // Python: import regeximport unittestclass TestGeneralSu(unittest.TestCase):INVALID_GROUP_REF = "invalid group reference"# test_sub_template_numeric_escapedef test_sub_template_numeric_escape(self):# Bug 776311 and friends.self.assertEqual(regex.sub('x', r'\0', 'x'), "\0")
    expect(await re.sub("x", "\\0", "x")).toBe("\0");
  });

  it('regex.sub test 2', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\000', 'x'), "\000")
    expect(await re.sub("x", "\\x00", "x")).toBe("\000");
  });

  it('regex.sub test 3', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\001', 'x'), "\001")
    expect(await re.sub("x", "\\x01", "x")).toBe("\001");
  });

  it('regex.sub test 4', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\008', 'x'), "\0" + "8")
    expect(await re.sub("x", "\\008", "x")).toBe("\0" + "8");
  });

  it('regex.sub test 5', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\009', 'x'), "\0" + "9")
    expect(await re.sub("x", "\\009", "x")).toBe("\0" + "9");
  });

  it('regex.sub test 6', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\111', 'x'), "\111")
    expect(await re.sub("x", "\\x49", "x")).toBe("\111");
  });

  it('regex.sub test 7', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\117', 'x'), "\117")
    expect(await re.sub("x", "\\x4f", "x")).toBe("\117");
  });

  it('regex.sub test 8', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\1111', 'x'), "\1111")
    expect(await re.sub("x", "\\x491", "x")).toBe("\1111");
  });

  it('regex.sub test 9', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\1111', 'x'), "\111" + "1")
    expect(await re.sub("x", "\\x491", "x")).toBe("\111" + "1");
  });

  it('regex.sub test 10', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\00', 'x'), '\x00')
    expect(await re.sub("x", "\\00", "x")).toBe('\x00');
  });

  it('regex.sub test 11', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\07', 'x'), '\x07')
    expect(await re.sub("x", "\\07", "x")).toBe('\x07');
  });

  it('regex.sub test 12', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\08', 'x'), "\0" + "8")
    expect(await re.sub("x", "\\08", "x")).toBe("\0" + "8");
  });

  it('regex.sub test 13', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\09', 'x'), "\0" + "9")
    expect(await re.sub("x", "\\09", "x")).toBe("\0" + "9");
  });

  it('regex.sub test 14', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\0a', 'x'), "\0" + "a")
    expect(await re.sub("x", "\\0a", "x")).toBe("\0" + "a");
  });

  it('regex.sub test 15', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\400', 'x'), "\u0100")
    expect(await re.sub("x", "\\x100", "x")).toBe("\u0100");
  });

  it('regex.sub test 16', async () => {
    // Python: self.assertEqual(regex.sub('x', r'\777', 'x'), "\u01FF")
    expect(await re.sub("x", "\\x1ff", "x")).toBe("\u01FF");
  });

  it('regex.sub test 17', async () => {
    // Python: self.assertEqual(regex.sub(b'x', br'\400', b'x'), "\x00")
    expect(await re.sub("x", br'\\x100", "x")).toBe("\x00");
  });

  it('regex.sub test 18', async () => {
    // Python: self.assertEqual(regex.sub(b'x', br'\777', b'x'), "\xFF")
    expect(await re.sub("x", br'\\x1ff", "x")).toBe("\xFF");
  });

  it('regex.sub test 19', async () => {
    // Python: self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:regex.sub('x', r'\181', 'x')) # r'\18' + '1'self.assertRaisesRegex(regex.error, self.INVALID_GROUP_REF, lambda:regex.sub('x', r'\800', 'x')) # r'\80' + '0'# In Python 2.3 (etc), these loop endlessly in sre_parser.py.self.assertEqual(regex.sub('(((((((((((x)))))))))))', r'\11', 'x'),'x')
    expect(await re.sub("(((((((((((x)))))))))))", "\\11", "x")).toBe('x');
  });

  it('regex.sub test 20', async () => {
    // Python: self.assertEqual(regex.sub('((((((((((y))))))))))(.)', r'\118', 'xyz'),'xz8')
    expect(await re.sub("((((((((((y))))))))))(.)", "\\118", "xyz")).toBe('xz8');
  });

  it('regex.sub test 21', async () => {
    // Python: self.assertEqual(regex.sub('((((((((((y))))))))))(.)', r'\11a', 'xyz'),'xza')
    expect(await re.sub("((((((((((y))))))))))(.)", "\\11a", "xyz")).toBe('xza');
  });

  it('regex.match test 22', async () => {
    // Python: # test_subscripted_capturesdef test_subscripted_captures(self):self.assertEqual(regex.match(r'(?P<x>.)+','abc').expandf('{0} {0[0]} {0[-1]}'), 'abc abc abc')
    expect(await re.match("(?P<x>.)+", "abc")?.expandf('{0} {0[0]} {0[-1]}')).toStrictEqual('abc abc abc');
  });

  it('regex.match test 23', async () => {
    // Python: self.assertEqual(regex.match(r'(?P<x>.)+','abc').expandf('{1} {1[0]} {1[1]} {1[2]} {1[-1]} {1[-2]} {1[-3]}'),'c a b c c b a')
    expect(await re.match("(?P<x>.)+", "abc")?.expandf('{1} {1[0]} {1[1]} {1[2]} {1[-1]} {1[-2]} {1[-3]}')).toStrictEqual('c a b c c b a');
  });

  it('regex.match test 24', async () => {
    // Python: self.assertEqual(regex.match(r'(?P<x>.)+','abc').expandf('{x} {x[0]} {x[1]} {x[2]} {x[-1]} {x[-2]} {x[-3]}'),'c a b c c b a')
    expect(await re.match("(?P<x>.)+", "abc")?.expandf('{x} {x[0]} {x[1]} {x[2]} {x[-1]} {x[-2]} {x[-3]}')).toStrictEqual('c a b c c b a');
  });
});
