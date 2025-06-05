import regex
import string
import copy
import unittest


class TestGeneralCo(unittest.TestCase):
    # test_constants
    def test_constants(self):
        if regex.I != regex.IGNORECASE:
            self.fail()
        if regex.L != regex.LOCALE:
            self.fail()
        if regex.M != regex.MULTILINE:
            self.fail()
        if regex.S != regex.DOTALL:
            self.fail()
        if regex.X != regex.VERBOSE:
            self.fail()

    # test_common_prefix
    def test_common_prefix(self):
        # Very long common prefix
        all = string.ascii_lowercase + string.digits + string.ascii_uppercase
        side = all * 4
        regexp = "(" + side + "|" + side + ")"
        self.assertEqual(repr(type(regex.compile(regexp))), self.PATTERN_CLASS)

    # test_copy
    def test_copy(self):
        # PatternObjects are immutable, therefore there's no need to clone them.
        r = regex.compile("a")
        self.assertTrue(copy.copy(r) is r)
        self.assertTrue(copy.deepcopy(r) is r)

        # MatchObjects are normally mutable because the target string can be
        # detached. However, after the target string has been detached, a
        # MatchObject becomes immutable, so there's no need to clone it.
        m = r.match("a")
        self.assertTrue(copy.copy(m) is not m)
        self.assertTrue(copy.deepcopy(m) is not m)

        self.assertTrue(m.string is not None)
        m2 = copy.copy(m)
        m2.detach_string()
        self.assertTrue(m.string is not None)
        self.assertTrue(m2.string is None)

        # The following behaviour matches that of the re module.
        it = regex.finditer(".", "ab")
        it2 = copy.copy(it)
        self.assertEqual(next(it).group(), "a")
        self.assertEqual(next(it2).group(), "b")

        # The following behaviour matches that of the re module.
        it = regex.finditer(".", "ab")
        it2 = copy.deepcopy(it)
        self.assertEqual(next(it).group(), "a")
        self.assertEqual(next(it2).group(), "b")

        # The following behaviour is designed to match that of copying 'finditer'.
        it = regex.splititer(" ", "a b")
        it2 = copy.copy(it)
        self.assertEqual(next(it), "a")
        self.assertEqual(next(it2), "b")

        # The following behaviour is designed to match that of copying 'finditer'.
        it = regex.splititer(" ", "a b")
        it2 = copy.deepcopy(it)
        self.assertEqual(next(it), "a")
        self.assertEqual(next(it2), "b")
