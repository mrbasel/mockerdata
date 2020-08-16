""" This file contains logic for creating files """


from flask import Response
from jinja2 import Template

import json
import csv
from io import StringIO

from application.utils import create_file_response


class FileCreator:
    """ Used to create a file with provided data
        
        Attributes:
            data (list): List of dicts contaning data
            filename (str): Filename to use without extention
    """

    def __init__(self, data, filename, file_type):
        self.data = data
        self.filename = filename
        self.file_type = file_type

    

    def create_file(self):
        """ Creates file with provided type.

            Returns:
                Reponse object
        """

        file_types = {
            'json': self.create_json_file,
            'csv': self.create_csv_file,
            'html': self.create_html_file,
        }

        # Get function that returns a generator with specified type 
        generator = file_types.get(self.file_type)

        response = create_file_response(generator, self.filename, self.file_type)

        return response


    def create_json_file(self):
        """ Creates a JSON file and stores it in a response """

        generator = (row for row in json.dumps(self.data))

        return generator


    def create_html_file(self):
        template = Template(
            """ 
            <ul>
            {% for item in data %}
            <li>
            {% for field in item.items() %}
            {{ field[0] }}: {{ field[1] }}
            <br>
            {% endfor %}
            </li>
            {% endfor %}
            </ul> 
            """)
        
        generator = template.generate(data=self.data)

        return generator



    def create_csv_file(self):
        def generate_csv():
            memory_data = StringIO()
            writer = csv.writer(memory_data)
            
            header = tuple(self.data[0].keys())
            writer.writerow(header)
            
            yield memory_data.getvalue()
            
            # Set cursor/stream postion
            memory_data.seek(0)
            # clear stream
            memory_data.truncate(0)

            for item in self.data:
                writer.writerow(tuple(item.values()))
                yield memory_data.getvalue()
                memory_data.seek(0)
                memory_data.truncate(0)

        generator = generate_csv() 

        return generator


    def create_excel_file(self):
        pass


    def create_sql_file(self):
        pass
