import regex
import unittest
from weakref import proxy

class TestGeneralWe(unittest.TestCase):
    def test_weakref(self):
        s = 'QabbbcR'
        x = regex.compile('ab+c')
        y = proxy(x)
        if x.findall('QabbbcR') != y.findall('QabbbcR'):
            self.fail()
