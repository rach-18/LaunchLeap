from flask import Flask, request, jsonify
from anthropic import Anthropic
from dotenv import load_dotenv
from flask_cors import CORS
from auth.routes import auth_bp
from flask_pymongo import PyMongo
from datetime import datetime
import os

# Load environment variables first
load_dotenv()

# Initialize Flask app before other configurations
app = Flask(__name__)
app.config["MONGODB_URI"] = os.getenv("MONGODB_URI")
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
mongo = PyMongo(app)

# Configure CORS
CORS(app, resources={
    r"/*": {
        "origins": ["https://launch-leap.vercel.app", "http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Add CORS headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://launch-leap.vercel.app')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Validate API key
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY not found in environment variables!")
elif not api_key.startswith('sk-ant-'):
    raise ValueError(f"API key appears to be invalid format: {api_key[:10]}...")
else:
    print("API key loaded successfully:", api_key[:10] + "...")

# Create Anthropic client
client = Anthropic(
    api_key=api_key.strip()
)

app.register_blueprint(auth_bp, url_prefix="/auth")

# Routes remain the same
@app.route("/")
def home():
    return "<h1>Hello world</h1>"

# Route for Claude API
@app.route("/api/claude", methods=["POST"])
def query_claude():
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 400

    try:
        data = request.json
        query = data.get("query")
        print("Received query:", query)

        if not query:
            return jsonify({"error": "No query provided"}), 400
        
        try:
            message = client.messages.create(
                model="claude-3-sonnet-20240229",  # Updated model name
                max_tokens=1000,
                temperature=0,
                messages=[{"role": "user", "content": query}],
            )
            return jsonify({"response": message.content[0].text}), 200
        except Exception as api_error:
            print(f"Anthropic API Error details: {str(api_error)}")
            return jsonify({"error": f"API Error: {str(api_error)}"}), 500
    
    except Exception as e:
        print(f"General Error: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
# Route for saving responses
@app.route("/api/responses", methods=["POST"])
def save_responses():
    try:
        # Print request data and headers for debugging
        print("Received request data:", request.get_json())
        print("Request headers:", request.headers)

        responses = request.json.get("responses")
        
        if not responses:
            return jsonify({"error": "No responses provided"}), 400

        # Create document to insert
        document = {
            "responses": responses,
            "timestamp": datetime.now()
        }

        try:
            mongo.db.responses.insert_one(document)
        except Exception as e:
            print(f"Error saving responses: {str(e)}")
            return jsonify({"error": str(e)}), 500

        return jsonify({"message": "Responses saved successfully"}), 200
    
    except Exception as e:
        print(f"Error saving responses: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)