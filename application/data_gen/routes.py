from flask import Blueprint, request, render_template

from application.data_generator import DataGenerator, DataSet, Field
from application.file_creator import FileCreator


data_gen_bp = Blueprint('data_gen_bp', __name__)


@data_gen_bp.route('/')
def home():
    return render_template('index.html')


@data_gen_bp.route('/api/createdata', methods=["POST"])
def create_data():
    if request.method == 'POST':
        name = request.json.get('name')
        data_format = request.json.get('data_format')
        rows = request.json.get('rows')
        fields_values = request.json.get('field_values')

        fields = [Field(name=field['fieldName'], data_type=field['dataType']) for field in fields_values]

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