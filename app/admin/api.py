from flask import Blueprint, jsonify, request
from app.appjwt import require_jwt
from app.controller import product_ctrl
from pathlib import Path
from uuid import uuid4

path = Path(__file__).parent.parent

api = Blueprint('api', __name__, url_prefix='/api/v1')

@api.get('/productos/listar')
@require_jwt
def listar_productos(payload):
    print(payload)
    productos = product_ctrl.listar_productos(10)
    return jsonify([prod.to_dict() for prod in productos])

@api.post('/productos/crear')
@require_jwt
def crear_producto(payload):
    data = request.form
    img = request.files["img"]
    print(list(data.values()))
    # if not all(data.values()) or not img:
        # return jsonify({"error": "Llene todos los campos"}), 400

    print(img.filename)
    path_img = Path("static/img/" + f'{uuid4()}_{data.get("nombre")}.jpg')
    img.save(path / path_img)

    prod = {
        "nombre": data.get("nombre"),
        "precio": data.get("precio"),
        "descripcion": data.get("descripcion"),
        "img": str(path_img)
    }

    try:
        producto = product_ctrl.agregar_producto(**prod)
        return jsonify({'producto': producto.to_dict()})
    except:
        return jsonify({'error': 'No se pudo crear el producto'})

@api.delete("productos/eliminar/<string:uuid>")
@require_jwt
def eliminar_producto(uuid, payload):    
    if not uuid:
        return jsonify({"error": "No se selecciono ningun producto"}), 400
    
    try:
        product_ctrl.eliminar_producto(producto=product_ctrl.Producto(uuid=uuid))
        return {"status": True, "uuid": uuid}
    except:
        return {"status": False, "error": "No se pudo eliminar el producto"}
    