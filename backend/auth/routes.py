from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from config import db

auth_bp = Blueprint("/auth", __name__)

@auth_bp.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if db.users.find_one({"email":email}):
        return jsonify({"error": "User already exists"}), 400
    
    hashed_password = generate_password_hash(password)

    db.users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully!"}), 201

@auth_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = db.users.find_one({"email": email})

    if user and check_password_hash(user["password"],password):
        return jsonify({"message": "Login successful!"}), 200
    
    return jsonify({"error": "Invalid email or password"}), 401
