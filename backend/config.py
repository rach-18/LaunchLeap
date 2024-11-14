from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import certifi

try:
    # Use certifi for SSL certificate verification
    client = MongoClient(
        "mongodb+srv://launchLeap2024:bNebkGLxDueBg6RZ@launchleapcluster.hvaqt.mongodb.net/?retryWrites=true&w=majority&appName=LaunchLeapCluster",
        tls=True,
        tlsCAFile=certifi.where()
    )
    
    # Test the connection
    client.admin.command('ping')
    db = client["launchleap"]
    print("Connected to MongoDB successfully!")
except ConnectionFailure as e:
    print(f"Failed to connect to MongoDB: {e}")
    raise