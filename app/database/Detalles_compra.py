from peewee import TextField, FloatField, ForeignKeyField, DateTimeField
from .database import BaseModel
from .Compras import Compra
from .Productos import Producto
from uuid import uuid4
from datetime import datetime

class DetalleCompra(BaseModel):
    class Meta():
        table_name = 'detalles_compra'
    
    compra_uuid = ForeignKeyField(Compra, backref='detalles_compra')
    producto = ForeignKeyField(Producto, backref='detalles_compra')
    direccion = TextField(null=False)
    monto = FloatField(null=True)

DetalleCompra.create_table(safe=True)