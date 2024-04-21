from peewee import FloatField, UUIDField, DateTimeField
from datetime import datetime
from .database import BaseModel
from uuid import uuid4

class Compra(BaseModel):
    uuid = UUIDField(primary_key=True, default=uuid4)
    monto: int = FloatField()
    fecha = DateTimeField(default=datetime.now)

Compra.create_table(safe=True)