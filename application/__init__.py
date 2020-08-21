from flask import Flask


def create_app():
    """ Create flask application"""

    app = Flask(__name__)

    with app.app_context():
        from .main.routes import main_bp
        from .api.routes import api_bp

        # Register blueprints
        app.register_blueprint(main_bp)
        app.register_blueprint(api_bp)

        return app