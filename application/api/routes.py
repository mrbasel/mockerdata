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
        download_file = request.json.get('download_file')

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
        
        if not download_file:
            return jsonify(data)


        file_creator = FileCreator(data, dataset_name, data_format)
        response = file_creator.create_file()
        
        return response