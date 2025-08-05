"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required

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

    user = User.query.filter_by(email = email, password = password).first()   #buscando si nuestro modelo de dato existe el usuario
    user = user.serialize()   # user minuscula para serializar el usuario qu estamos buscando arriba
    
    #Aquí genero el TOKEN
    token = create_access_token(identity='user["id"]')

    return jsonify({'Token': token, 'user': user})