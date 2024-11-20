from flask import Flask, jsonify, request, send_from_directory
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://martin:martingichuri@offsetters.mcbtf.mongodb.net/?retryWrites=true&w=majority&appName=offsetters"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.reshift
offsetters_collection = db.offsetters
pending_collection = db.pending_approvals

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Offsetters API"}), 200

@app.route('/offsetters', methods=['GET'])
def get_offsetters():
    try:
        offsetters = []
        for offsetter in offsetters_collection.find():
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


@app.route('/add-offsetters', methods=['POST'])
def add_offsetter():
    data = request.get_json()
    if not all(key in data for key in ["name", "location", "offsetFocus", "CO2ReductionPotential"]):
        return jsonify({"message": "Missing fields"}), 400

    new_offsetter = {
        "name": data.get("name"),
        "location": data.get("location"),
        "offsetFocus": data.get("offsetFocus"),
        "CO2ReductionPotential": data.get("CO2ReductionPotential"),
        "website": data.get("website"),
        "contact":data.get("contact"),
        "status": "Pending"
    }
    try:
        result = pending_collection.insert_one(new_offsetter)
        return jsonify({"message": "Offsetter submitted for approval", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"message": "Error submitting offsetter", "error": str(e)}), 500

@app.route('/pending-offsetters', methods=['GET'])
def get_pending_offsetters():
    try:
        pending_offsetters = []
        for offsetter in pending_collection.find():
            pending_offsetters.append({
                "_id": str(offsetter["_id"]),
                "name": offsetter["name"],
                "location": offsetter["location"],
                "offsetFocus": offsetter["offsetFocus"],
                "CO2ReductionPotential": offsetter["CO2ReductionPotential"],
                "website": offsetter["website"],
                "contact":offsetter["contact"],
                "status": offsetter["status"]
            })
        return jsonify(pending_offsetters), 200
    except Exception as e:
        return jsonify({"message": "Error retrieving pending offsetters", "error": str(e)}), 500


@app.route('/approve-offsetter/<id>', methods=['POST'])
def approve_offsetter(id):
    try:
        
        pending = pending_collection.find_one({"_id": ObjectId(id)})
        if not pending:
            return jsonify({"message": "Offsetter not found"}), 404

        
        approved_offsetter = pending.copy()
        del approved_offsetter["_id"]
        offsetters_collection.insert_one(approved_offsetter)

       
        pending_collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Offsetter approved successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Error approving offsetter", "error": str(e)}), 500

@app.route('/reject-offsetter/<id>', methods=['DELETE'])
def reject_offsetter(id):
    try:
        result = pending_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"message": "Offsetter not found"}), 404
        return jsonify({"message": "Offsetter rejected and removed from pending list"}), 200
    except Exception as e:
        return jsonify({"message": "Error rejecting offsetter", "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


app =app