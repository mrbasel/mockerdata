from flask import Blueprint, request, render_template, jsonify

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
        download_file = request.json.get('download_file')

        fields = [Field(name=field['fieldName'], data_type=field['dataType']) for field in fields_values]

        data_set = DataSet(
            name=name, 
            rows=int(rows),
            data_format=data_format,
             fields=fields
             )
        
        data_generator = DataGenerator(data_set)
        data = data_generator.generate_data()
        
        if not download_file:
            return jsonify(data)


        file_creator = FileCreator(data, name, data_format)
        response = file_creator.create_file()
        
        return response