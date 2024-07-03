import unittest

def add(a, b):
    return a + b

class TestAddFunction(unittest.TestCase):

    def test_add_integers(self):
        self.assertEqual(add(1, 2), 3)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)

    def test_add_floats(self):
        self.assertAlmostEqual(add(1.1, 2.2), 3.3, places=1)
        self.assertAlmostEqual(add(-1.1, 1.1), 0.0, places=1)
        self.assertAlmostEqual(add(-1.1, -1.1), -2.2, places=1)

    def test_add_strings(self):
        self.assertEqual(add('hello', ' world'), 'hello world')

if __name__ == '__main__':
    unittest.main()



# import pytest

# def add(a, b):
#     return a + b

# def test_add_integers():
#     assert add(1, 2) == 3
#     assert add(-1, 1) == 0
#     assert add(-1, -1) == -2

# def test_add_floats():
#     assert add(1.1, 2.2) == 3.3
#     assert add(-1.1, 1.1) == 0.0
#     assert add(-1.1, -1.1) == -2.2

# def test_add_strings():
#     assert add('hello', ' world') == 'hello world'
