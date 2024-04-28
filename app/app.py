from flask import Flask
from secrets import token_hex

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = token_hex(16)

    from .public import public_routes
    from .admin import admin_routes, admin_api    

    app.register_blueprint(public_routes)
    app.register_blueprint(admin_routes, url_prefix='/admin')
    app.register_blueprint(admin_api)

    return app