from flask import Flask, render_template, send_file, request, Response

import json

from data_generator import DataSet, DataGenerator, Field

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

        # print(name)
        # print(data_format)
        # print(rows)
        # print(fields_values)

        fields = []
        for value in fields_values:
            field = Field(name=value['field'], data_type=value['dataType'])
            fields.append(field)

        data_set = DataSet(
            name=name, 
            rows=int(rows),
            data_format=data_format,
             fields=fields
             )
        
        data_generator = DataGenerator(data_set)
        data = data_generator.generate_data()
        
        generator = (row for row in json.dumps(data))

        response = Response(generator, mimetype="application/json")
        response.headers.set("Content-Disposition", "attachment", filename=f"{name}.json")
        return response

    return ''



@app.route('/test')
def test():
    return 'ok'

if __name__ == "__main__":
    app.run(debug=True)