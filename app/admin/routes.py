from flask import Blueprint, render_template, request
from pathlib import Path
from app.appjwt import require_jwt
from app.decorators import login_required, not_login_required
from . import auth 

path = Path(__file__).parent

admin_routes = Blueprint('admin', __name__, url_prefix="/admin", template_folder=str(path / "templates"), static_folder=str(path / "static"))

@admin_routes.get("/")
@login_required
def index():
    return render_template("index_admin.html")

@admin_routes.get('/login')
@not_login_required
def get_login():
    return render_template('login.html')

@admin_routes.post('/login')
def login():
    data:dict = request.form
    if not any(data.values()):
        return "Llene todos los campos", 400
    return auth.auth_login(data.get('email'), data.get('password', "").encode())
