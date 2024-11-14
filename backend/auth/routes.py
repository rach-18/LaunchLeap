from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from config import db
from pymongo.errors import PyMongoError

auth_bp = Blueprint("auth", __name__)  # Fix: removed slash from name

@auth_bp.route("/signup", methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400
        
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Validate required fields
        if not all([name, email, password]):
            return jsonify({"error": "Missing required fields"}), 400

        # Check if user exists
        try:
            if db.users.find_one({"email": email}):
                return jsonify({"error": "User already exists"}), 400
        except PyMongoError as e:
            print(f"Database error while checking user: {e}")
            return jsonify({"error": "Database error"}), 500

        # Create new user
        try:
            hashed_password = generate_password_hash(password)
            db.users.insert_one({
                "name": name,
                "email": email,
                "password": hashed_password
            })
            return jsonify({"message": "User registered successfully!"}), 201
        except PyMongoError as e:
            print(f"Database error while creating user: {e}")
            return jsonify({"error": "Database error"}), 500

    except Exception as e:
        print(f"Signup error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@auth_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = db.users.find_one({"email": email})

    if user and check_password_hash(user["password"],password):
        return jsonify({"message": "Login successful!"}), 200
    
    return jsonify({"error": "Invalid email or password"}), 401
