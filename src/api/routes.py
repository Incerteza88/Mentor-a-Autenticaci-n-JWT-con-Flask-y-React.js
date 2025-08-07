"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

#esta es la importacion para generar el token
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

#esta es la importacion para hashear la contraseña
from werkzeug.security import generate_password_hash, check_password_hash



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])

def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/token', methods=['POST', 'GET'])
def create_token():

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    user = User.query.filter_by(email = email).first()   #buscando si nuestro modelo de dato existe el usuario
    # user = user.serialize()   # user minuscula para serializar el usuario qu estamos buscando arriba
    
    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    #Aquí genero el TOKEN
    token = create_access_token(identity=str(user.id))

    return jsonify({'Token': token, 'user': user.serialize()}) #serializo el usuario cuando lo tenga que devovler para poder hacer el json


@api.route('/register', methods=['POST', 'GET'])
def register_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409 
    
    hashed_password = generate_password_hash(password)
    
    new_user = User(
        email=email, password=hashed_password, is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado satisfactoriamente"}), 201

# END POINT PARA LA RUTA PROTEGIDA DEL GET PROFILE
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"mensaje": "usuario no encontrado"}),401
    return jsonify(user.serialize()), 200










