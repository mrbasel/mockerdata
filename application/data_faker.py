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

datetime = {
    # 'datetime-date_between': fake.date_between,
    'datetime-month': fake.month,
    'datetime-month_name': fake.month_name,
    'datetime-time': fake.time,
    'datetime-timezone': fake.timezone,
    'datetime-year': fake.year
}