import jwt
from os import getenv
from flask import request, jsonify
from functools import wraps

def require_jwt(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.headers.get('Authorization') is None:
            return jsonify({'error': 'Missing Authorization Header'}), 405
        
        token = request.headers.get('Authorization').split(' ')[1].strip()
        try:
            payload = jwt_decode(token)
        except Exception as e:
            return jsonify({'error': f'{e}'}), 405
        
        return func(*args, **kwargs, payload=payload)
    return wrapper

def jwt_encode(payload:dict) -> str:
    return jwt.encode(payload, getenv('SECRET_JWT'), algorithm='HS256')

def jwt_decode(token:str) -> dict:
    return jwt.decode(token, getenv('SECRET_JWT'), algorithms=['HS256'])