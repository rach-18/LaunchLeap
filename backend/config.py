from pymongo import MongoClient

client = MongoClient("mongodb+srv://launchLeap2024:bNebkGLxDueBg6RZ@launchleapcluster.hvaqt.mongodb.net/?retryWrites=true&w=majority&appName=LaunchLeapCluster")
db = client["launchleap"]