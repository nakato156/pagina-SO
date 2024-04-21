from flask import session, redirect, request
from functools import wraps

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if session.get('user'):
            return f(*args, **kwargs)
        if request.method == "GET": 
            return redirect("./login")
        return "No autorizado", 403
    return wrapper

def not_login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if session.get('user'):
            return redirect("./")
        return f(*args, **kwargs)
    return wrapper