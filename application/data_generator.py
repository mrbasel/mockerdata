from faker import Faker

from constants import personal, geographical


class DataGenerator:
    """ Used to generate data
    
    Args:
        data_set (DataSet): the structure for the needed data
    
    """
    def __init__(self, data_set):
        if not isinstance(data_set, DataSet):
            raise TypeError('data_set must be of type DataSet')

        self.data_set = data_set

    def generate_data(self):
        data_types = {
            'personal': self.generate_personal_data,
            'numerical': self.generate_numerical_data,
            'geographical': self.generate_geographical_data,
        }
        # Add to list if empty
        # Else, add update dict item from old list with dict in new list

        data = []
        for field in self.data_set.fields:
            data_type = field.data_type.split('-')[0]
            new_data = data_types.get(data_type)(field)
            
            for index, item in enumerate(new_data):
                # if not data:
                #     data += new_data
                # else:
                #     data[index].update(item)
                try:
                    data[index].update(item)
                except IndexError:
                    data.append(item)
                
        return data

        
    
    def generate_personal_data(self, field):
        if self.data_set.fields:
            data = [
                {field.name:personal.get(field.data_type)()}
                for row in range(self.data_set.rows)
            ]

            return data
    
    def generate_numerical_data(self, field):
        if self.data_set.fields:
            data = [
                {field.name:numerical.get(field.data_type)()}
                for row in range(self.data_set.rows)
            ]

            return data

    def generate_geographical_data(self, field):
        if self.data_set.fields:
            data = [
                {field.name:geographical.get(field.data_type)()}
                for row in range(self.data_set.rows)
            ]

            return data


class DataSet:
    """  The fields of the dataset 

    Args:
        name (str): name of this dataset
        rows (int): number of rows for this dataset
        data_format (str): format for this dataset.
            available formats are excell, JSON, HTML, SQL
        fields (list): List of 'Field' objects 
        
    """
    
    def __init__(self, name, rows, data_format, fields):
        self.name = name
        self.rows = rows
        self.data_format = data_format
        self.fields = fields  


# ds = DataSet('', 10, '', ['username', 'email', 'personal'] )
# dg = DataGenerator(ds)

# print(dg.generate_data())


class Field:
    def __init__(self, name, data_type):
        self.name = name
        self.data_type = data_type