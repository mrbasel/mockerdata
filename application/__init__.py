from flask import Flask


def create_app():
    """ Create flask application"""

    app = Flask(__name__)

    with app.app_context():
        from .data_gen.routes import data_gen_bp

        # Register blueprints
        app.register_blueprint(data_gen_bp)

        return app