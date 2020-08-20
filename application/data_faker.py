""" Contains functions used to generate data grouped by category """

from faker import Faker
from random import randint

fake = Faker()

personal =  {
    'personal-firstname': fake.first_name,
    'personal-lastname': fake.last_name,
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

finance = {
    'finance-currency_name': fake.currency_name,
    'finance-currency_code': fake.currency_code,
    'finance-currency_symbol': fake.currency_symbol,
    'finance-bban': fake.bban,
    'finance-iban': fake.iban,
    'finance-credit_card_number': fake.credit_card_number,
    'finance-credit_card_provider': fake.credit_card_provider
}

phone_numbers = {
    'phone_numbers-country_calling_code': fake.country_calling_code,
    'phone_numbers-phone_number': fake.phone_number,
}


internet = {
    'internet-username': fake.user_name,
    'internet-email': fake.email,
    'internet-company_email': fake.company_email,
    'internet-password': fake.password,
    'internet-domain_name': fake.domain_name,
    'internet-url': fake.url,
    'internet-image_url': fake.image_url
}