""" This file contains logic for creating files """


from flask import Response
from jinja2 import Template

import json
import csv
from io import StringIO



def create_json_file(data, filename):
    """ Creates a JSON file and stores it in a response """

    generator = (row for row in json.dumps(data))

    response = Response(generator, mimetype="application/json")
    response.headers.set("Content-Disposition", "attachment", filename=f"{filename}.json")

    return response


def create_html_file(data, filename):
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
    
    generator = template.generate(data=data)

    response = Response(generator, mimetype="text/html")
    response.headers.set("Content-Disposition", "attachment", filename=f"{filename}.html")

    return response



def create_csv_file(data, filename):
    def generate_csv():
        memory_data = StringIO()
        writer = csv.writer(memory_data)
        
        header = tuple(data[0].keys())
        writer.writerow(header)
        
        yield memory_data.getvalue()
        
        # Set cursor/stream postion
        memory_data.seek(0)
        # clear stream
        memory_data.truncate(0)

        for item in data:
            writer.writerow(tuple(item.values()))
            yield memory_data.getvalue()
            memory_data.seek(0)
            memory_data.truncate(0)


    response = Response(generate_csv(), mimetype="text/csv")
    response.headers.set("Content-Disposition", "attachment", filename=f"{filename}.csv")

    return response


def create_excel_file(data, filename):
    pass


def create_sql_file(data, filename):
    pass



file_formats = {
    'json': create_json_file,
    'html': create_html_file,
    'csv': create_csv_file,

}