from ..database import Producto
from pathlib import Path

path = Path(__file__).parent

def agregar_producto(nombre, descripcion, precio, img) -> Producto:
    producto = Producto.create(
        nombre = nombre,
        descripcion = descripcion,
        precio = precio,
        imagen = img
    )
    producto.save()
    return producto

def listar_productos(n:int) -> list[Producto]:
    try:
        return list(Producto.select().limit(n).execute())
    except:
        return []

def eliminar_producto(producto:Producto=None) -> bool:
    try:
        img = producto.get().imagen
        Path(path.parent / img).unlink()
        producto.delete_instance()
        return True
    except:
        return False

def modificar_producto(producto:Producto) -> Producto:
    producto.save()

def buscar_producto() -> Producto:
    ...
