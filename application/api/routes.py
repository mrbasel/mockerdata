from flask import Blueprint, request, jsonify


from application.data_generator import DataGenerator, DataSet, Field
from application.file_creator import FileCreator


api_bp = Blueprint('api_bp', __name__)


@api_bp.route('/api/create/file', methods=["POST"])
def create_file():
    if request.method == 'POST':
        dataset_name = request.json.get('name')
        data_format = request.json.get('data_format')
        rows = request.json.get('rows')
        field_values = request.json.get('field_values')

        fields = [Field(name=field['fieldName'], data_type=field['dataType']) for field in field_values]

        data_set = DataSet(
            name=dataset_name, 
            rows=int(rows),
            data_format=data_format,
             fields=fields
             )
        
        data_generator = DataGenerator(data_set)
        try:
            data = data_generator.generate_data()
        except TypeError as e:
            return 'Invalid data', 400
            

        file_creator = FileCreator(data, dataset_name, data_format)
        response = file_creator.create_file()
        
        return response


@api_bp.route('/api/preview/data', methods=["POST"])
def preview_data():
    if request.method == 'POST':
        field_values = request.json.get('field_values')
        fields = [Field(name=field['fieldName'], data_type=field['dataType']) for field in field_values]

        data_set = DataSet(
            name='', 
            rows=10,
            data_format='json',
             fields=fields
             )
        
        data_generator = DataGenerator(data_set)
        try:
            data = data_generator.generate_data()
        except TypeError as e:
            return 'Invalid data', 400
        
        return {
            'data': data,
            'fields': list(data[0].keys())
        }
        
