from peewee import FloatField, UUIDField, DateTimeField, CharField
from datetime import datetime
from .database import BaseModel
from uuid import uuid4

class Producto(BaseModel):
    uuid = UUIDField(primary_key=True, default=uuid4)
    nombre = CharField()
    precio: int = FloatField()
    descripcion = CharField()
    descuento = FloatField()
    imagen = CharField()
    fecha = DateTimeField(default=datetime.now)

Producto.create_table(safe=True)