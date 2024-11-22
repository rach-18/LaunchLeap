from flask import Flask, request, jsonify
from anthropic import Anthropic
from dotenv import load_dotenv
from flask_cors import CORS
from auth.routes import auth_bp
from flask_pymongo import PyMongo
from datetime import datetime
import os
import json

# Load environment variables first
load_dotenv()

# Initialize Flask app before other configurations
app = Flask(__name__)
app.config["MONGODB_URI"] = os.getenv("MONGODB_URI")
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
mongo = PyMongo(app)

# Configure CORS
CORS(app,
    #  origins=["https://launch-leap.vercel.app/", "http://localhost:5173", "https://launch-leap-1ggb3myvw-rachita-pradhans-projects.vercel.app/"],
     origins=["*"],
     supports_credentials=True,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type"]
)

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

CLAUDE_PROMPT = """You are LaunchLeap. An AI that helps solopreneurs, individuals new to marketing with limited to no budget to identify unconventional channels to gain traction, based on the book Traction : How Any Startup Can Achieve Explosive Customer Growth By Gabriel Weinberg. 

        Users will share their startup idea, target audience, estimated TAM, Budget, resources at hand. You will Provide the following : 

        1. Startup uniqueness score - how well it is able to stand out / is unique. out of 10. Complexity to market.
        2. Founders thought clarity - identify fluff with fluff meter out of 10, highlight potential assumptions, biases.
        3. Provide a realistic assessment of TAM
        4. Based on the available data you will recommend 5 traction channels that are most suitable, taking into consideration user ability / app context / budget / resources etc.
        5. You will suggest the more underutilized channels whereevr possible and along with it provid the realistic Customer aquistion cost, complexity, Time to see results.
        You will receive inout in json and out put will also be in a structured json. Output will be structured exactly like the following Json : 

        {
        "startupAnalysis": {
            startupUniquenesScore": {
            "score": 7,
            "rationale": "AI-powered nutrition coaching has innovative elements, but the market is becoming increasingly crowded. Differentiation will be key.",
            "marketComplexity": "Medium-High"
            },
            "foundersThoughtClarity": {
            "fluffMeter": 6,
            "potentialAssumptions": [
                "All millennials want AI nutrition coaching",
                "Users will pay for digital nutrition guidance",
                "AI can effectively personalize nutrition recommendations"
            ],
            "biasesIdentified": [
                "Tech-solutionist bias",
                "Assumption of digital health literacy among target demographic"
            ]
            },
            "marketAssessment": {
            "totalAddressableMarket": {
                "globalDigitalHealthMarket": "$639.4 billion by 2026",
                "nutritionCoachingSegment": "$18.6 billion",
                "realisticAddressableSAM": "$5-10 million in first 2 years"
            }
            },
            "tractionChannels": [
            {
                "channel": "Targeted Instagram Influencer Marketing",
                "customerAcquisitionCost": "$15-25 per user",
                "complexity": "Medium",
                "timeToResults": "2-3 months",
                "rationale": "Direct access to health-conscious millennials"
            },
            {
                "channel": "Reddit Community Engagement",
                "customerAcquisitionCost": "$8-12 per user",
                "complexity": "Low",
                "timeToResults": "3-4 months",
                "rationale": "Highly engaged niche communities in fitness, nutrition"
            },
            {
                "channel": "Podcast Sponsorships (Health, Wellness)",
                "customerAcquisitionCost": "$35-50 per user",
                "complexity": "High",
                "timeToResults": ""4-6 months",
                "rationale": "Targeted audio content consumption by target demographic"
            },
            {
                "channel": "Viral TikTok Educational Content",
                "customerAcquisitionCost": "$5-10 per user",
                "complexity": "Low",
                "timeToResults": "1-2 months",
                "rationale": "Quick, engaging content format for younger millennials"
            },
            {
                "channel": "Product Hunt Launch",
                "customerAcquisitionCost": "$20-30 per user",
                "complexity"": ""Medium",
                "timeToResults": "Immediate initial spike",
                "rationale": "Tech-savvy audience, potential for viral tech community pickup"
            }
            ],
            "underutilizedChannels": [
            {
                "channel": "Micro-Niche Fitness/Nutrition Slack/Discord Communities",
                "customerAcquisitionCost": "$5-15 per user",
                "complexity": "Low",
                "timeToResults": "2-3 months",
                "potentialReach": "Highly engaged, low-competition spaces"
            }
            ],
            "recommendedNextSteps": [
                "Create highly targeted, value-driven content",
                "Build social proof through early user testimonials",
                "Develop a referral mechanism with incentives",
                "Focus on precise audience segmentation"
            ]
        }
    }"""

# Route for Claude API
@app.route("/api/claude", methods=["POST"])
def query_claude():
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 400

    try:
        data = request.json
        print("\nReceived request data:", data)  # Print incoming request
        
        user_name = data.get("userName")
        startup_name = data.get("startupName")
        structured_input = data.get("structuredInput")

        if not all([user_name, startup_name, structured_input]):
            return jsonify({"error": "Missing required fields"}), 400

        # Format the input for Claude
        formatted_input = json.dumps(structured_input, indent=2)
        print("\nFormatted input sent to Claude:", formatted_input)
        
        try:
            message = client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=4000,
                temperature=0,
                system=CLAUDE_PROMPT,
                messages=[
                    {"role": "user", "content": f"Analyze this startup:\n{formatted_input}"}
                ],
            )
            
            # Print raw response to see what we're getting
            raw_response = message.content[0].text
            print("\nRaw response from Claude:", raw_response)
            print("\nResponse type:", type(raw_response))
            
            try:
                cleaned_response = raw_response.strip()
                if cleaned_response.startswith('```json'):
                    cleaned_response = cleaned_response.split('```json')[1]
                if cleaned_response.endswith('```'):
                    cleaned_response = cleaned_response.rsplit('```', 1)[0]
                cleaned_response = cleaned_response.strip()
                
                print("\nCleaned response:", cleaned_response)
                response_json = json.loads(cleaned_response)
                print("\nParsed JSON response:")
                print(json.dumps(response_json, indent=2))
                return jsonify({"response": response_json}), 200
            except json.JSONDecodeError as json_error:
                print("\nFailed to parse response as JSON:", json_error)
                print("Response that failed to parse:", cleaned_response)
                return jsonify({"response": message.content[0].text}), 200
            
        except Exception as api_error:
            print(f"\nAnthropic API Error details: {str(api_error)}")
            return jsonify({"error": f"API Error: {str(api_error)}"}), 500
    
    except Exception as e:
        print(f"\nGeneral Error: {str(e)}")
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