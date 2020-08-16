
import unittest
from types import GeneratorType

from application.file_creator import FileCreator
from application.utils import create_file_response




class TestFileCreator(unittest.TestCase):
    def setUp(self):
        self.data = [{'email': 'uroberts@yahoo.com'}, {'email': 'sbrown@yahoo.com'}, {'email': 'sherry40@molina.com'}, {'email': 'dominiquemoses@gmail.com'}, {'email': 'bgibson@ford-gonzalez.com'}, {'email': 'charlesbowman@yahoo.com'}, {'email': 'nancyfranklin@hotmail.com'}, {'email': 'julie91@smith.net'}, {'email': 'nicoleschultz@yahoo.com'}, {'email': 'blancharddenise@frazier.com'}]


    def test_create_json(self):
        filecreator = FileCreator(self.data, 'test', 'json')
        file_generator = filecreator.create_json_file()

        self.assertIsInstance(file_generator, GeneratorType)
        self.assertNotEqual(list(file_generator), [])
    
    def test_create_html(self):
        filecreator = FileCreator(self.data, 'test', 'html')
        file_generator = filecreator.create_html_file()

        self.assertIsInstance(file_generator, GeneratorType)
        self.assertNotEqual(list(file_generator), [])

    def test_create_csv(self):
        filecreator = FileCreator(self.data, 'test', 'csv')
        file_generator = filecreator.create_csv_file()

        self.assertIsInstance(file_generator, GeneratorType)
        self.assertNotEqual(list(file_generator), [])
    
    def test_create_response(self):
        filecreator = FileCreator(self.data, 'test', 'json')
        file_generator = filecreator.create_json_file()

        response = filecreator.create_file()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'application/json')




