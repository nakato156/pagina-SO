from typing import Optional
from hashlib import sha256
from ..database import User

def login_usuario(email:str, password:str) -> Optional[User]:
    return User.get_or_none(User.email == email, User.password == sha256(password).hexdigest())

def crear_usuario(nombres, email, telefono, password ) -> User:
    user:User = User.create(
        nombres = nombres,
        email = email,
        telefono = telefono,
        password = sha256(password).hexdigest()
    )
    user.save()
    return user

def listar_usuarios(n:int) -> list[User]:
    return User.select().limit(n)

def eliminar_usuario(user:User) -> bool:
    try:
        user.delete_instance()
        return True
    except:
        return False

def modificar_usuario(user:User) -> User:
    user.save()

def buscar_usuario(email=None, nombres=None, telefono=None) -> User:
    ...
