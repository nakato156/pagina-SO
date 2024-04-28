from flask import Blueprint, render_template
from pathlib import Path
from app.controller import product_ctrl


path = Path(__file__).parent
public = Blueprint('public', __name__, template_folder=str(path / "templates"))

@public.get('/')
def index():
    productos = product_ctrl.listar_productos(5)
    return render_template('index.html', productos=productos)

@public.get('/carrito')
def carrito():
    return render_template('carrito.html')