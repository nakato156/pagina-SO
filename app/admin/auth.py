from flask import session, jsonify
from app.controller import user_ctrl
from app.appjwt import jwt_encode

def auth_login(email, password) -> bool:
    if user:=user_ctrl.login_usuario(email, password):
        user = user.to_dict()
        token = jwt_encode(user)
        session['user'] = user
        session["token"] = token
        return jsonify({'token': token})
    return jsonify({"error": "Credenciales incorrectas"}), 405
