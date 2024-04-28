from pathlib import Path
from app.database import Producto
from app.services import upload_image, ENDPOINT, FOLDER_IMG

path = Path(__file__).parent

def agregar_producto(nombre:str, descripcion:str, precio:float, img:bytes, filename:str) -> Producto:
    res = upload_image(img, filename)

    if res.file_id:
        producto = Producto.create(
            nombre = nombre,
            descripcion = descripcion,
            precio = precio,
            imagen = res.url
        )
        producto.save()
        return producto
    raise Exception("Error al subir la imagen")

def listar_productos(n:int) -> list[Producto]:
    try:
        return list(Producto.select().limit(n).execute())
    except:
        return []

def eliminar_producto(producto:Producto=None) -> bool:
    try:
        producto.delete_instance()
        return True
    except:
        return False

def modificar_producto(producto:Producto) -> Producto:
    producto.save()

def buscar_producto() -> Producto:
    ...
