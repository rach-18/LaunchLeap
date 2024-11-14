from flask import Flask
from flask_cors import CORS
from auth.routes import auth_bp

app = Flask(__name__)

# if os.getenv("FLASK_ENV") == "development":
#     CORS(app, resources={r"/auth/*": {"origins": "http://localhost:5173"}})
# else:
#     CORS(app, resources={r"/auth/*": {"origins": "https://myfrontenddomain.com"}})

app.register_blueprint(auth_bp, url_prefix="/auth")

CORS(app, resources={r"/auth/*": {"origins": "http://localhost:5173"}})

@app.route("/")
def home():
    return "<h1>Hello world</h1>"

if __name__ == "__main__":
    app.run(debug=True, port=5001)
