""" Contains functions used to generate data grouped by category """

from faker import Faker
from random import randint

fake = Faker()

personal =  {
    'personal-firstname': fake.first_name,
    'personal-lastname': fake.last_name,
    'personal-username': fake.user_name,
    'personal-email': fake.email,
    'personal-password': fake.password,
    'personal-age': lambda : randint(15, 100)
}


numerical = {
    # 'id': 
}

geographical = {
    'geographical-country': fake.country,
    'geographical-city': fake.city,
    'geographical-address': fake.address,
    'geographical-street_address': fake.street_address
}