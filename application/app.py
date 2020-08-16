from io import StringIO
import csv
import datetime
import json

from flask import Flask, render_template, request, Response

from application.data_generator import DataSet, DataGenerator, Field
from application.file_creator import FileCreator


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('main.html')


@app.route('/api/createdata', methods=["POST"])
def create_data():
    if request.method == 'POST':
        name = request.json.get('name')
        data_format = request.json.get('data_format')
        rows = request.json.get('rows')
        fields_values = request.json.get('field_values')

        fields = [Field(name=field['field'], data_type=field['dataType']) for field in fields_values]

        data_set = DataSet(
            name=name, 
            rows=int(rows),
            data_format=data_format,
             fields=fields
             )
        
        data_generator = DataGenerator(data_set)
        data = data_generator.generate_data()
        

        # Create a response containing the file with the specified format 
        # In more details:
        # Gets a function from dict that creates a response 
        # containing a file with specified format

        # response = file_formats.get(data_format)(data, name)
        file_creator = FileCreator(data, name, data_format)
        response = file_creator.create_file()
        
        return response



if __name__ == "__main__":
    app.run(debug=True)