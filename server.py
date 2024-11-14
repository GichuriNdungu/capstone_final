from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://martin:martingichuri@offsetters.mcbtf.mongodb.net/?retryWrites=true&w=majority&appName=offsetters"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Get the database and collection

db = client.reshift
collection = db.offsetters

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Offsetters API"}), 200
@app.route('/offsetters', methods=['GET'])
def get_offsetters():
    try:
        offsetters = []
        for offsetter in collection.find():
            offsetters.append({
                "_id": str(offsetter["_id"]),
                "name": offsetter["name"],
                "location": offsetter["location"],
                "offsetFocus": offsetter["offsetFocus"],
                "CO2ReductionPotential": offsetter["CO2ReductionPotential"]
            })
        return jsonify(offsetters), 200
    except Exception as e:
        return jsonify({"message": "Error retrieving offsetters", "error": str(e)}), 500

@app.route('/offsetters', methods=['POST'])
def add_offsetter():
    data = request.get_json()
    new_offsetter = {
        "name": data.get("name"),
        "location": data.get("location"),
        "offsetFocus": data.get("offsetFocus"),
        "CO2ReductionPotential": data.get("CO2ReductionPotential")
    }
    try:
        result = collection.insert_one(new_offsetter)
        new_offsetter["_id"] = str(result.inserted_id)  # Convert ObjectId to string
        return jsonify(new_offsetter), 201
    except Exception as e:
        return jsonify({"message": "Error adding offsetter", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
