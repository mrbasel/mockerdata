from flask import Blueprint, render_template


main_bp = Blueprint('main_bp', __name__)


@main_bp.route('/')
def home():
    return render_template('main.html')


@main_bp.route('/about')
def about():
    return render_template('about.html')


