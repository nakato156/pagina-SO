from peewee import CharField, UUIDField, DateTimeField, IntegerField, ForeignKeyField
from datetime import datetime
from .database import BaseModel
from playhouse.shortcuts import model_to_dict
from uuid import uuid4

class User(BaseModel):
    class Meta:
        table_name = 'usuarios'
    
    uuid:UUIDField = UUIDField(primary_key=True, default=uuid4)
    email = CharField(unique=True, null=False)
    nombres = CharField(null=False)
    telefono = IntegerField(null=False)
    password = CharField(null=False)
    fecha: datetime = DateTimeField(default=datetime.now)

    def actualizar_info(self, telefono, email):
        self.telefono = telefono
        self.email = email
        self.save()
    
User.create_table(safe=True)