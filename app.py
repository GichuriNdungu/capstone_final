
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://martin:martingichuri@offsetters.mcbtf.mongodb.net/?retryWrites=true&w=majority&appName=offsetters"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Get the database and collection

db = client.reshift
collection = db.offsetters

offsetters = [
    {"name": "Blue Planet Offset", "location": "South Africa", "offsetFocus": "Agriculture", "CO2ReductionPotential": "50 tons per year"},
    {"name": "Solar Energy Trust", "location": "Rwanda", "offsetFocus": "Renewable Energy", "CO2ReductionPotential": "25 tons per year"},
    {"name": "Eco Forest Alliance", "location": "Uganda", "offsetFocus": "Forestry", "CO2ReductionPotential": "45 tons per year"},
    {"name": "Clean Oceans Initiative", "location": "Nigeria", "offsetFocus": "Marine Conservation", "CO2ReductionPotential": "60 tons per year"},
    {"name": "Carbon Free Future", "location": "Kenya", "offsetFocus": "Afforestation", "CO2ReductionPotential": "40 tons per year"},
    {"name": "Green City Initiative", "location": "Ghana", "offsetFocus": "Urban Green Spaces", "CO2ReductionPotential": "30 tons per year"},
    {"name": "Solar for All", "location": "Tanzania", "offsetFocus": "Solar Energy", "CO2ReductionPotential": "20 tons per year"},
    {"name": "Biomass Hub", "location": "Ethiopia", "offsetFocus": "Biomass Energy", "CO2ReductionPotential": "35 tons per year"},
    {"name": "Wind Power Africa", "location": "Morocco", "offsetFocus": "Wind Energy", "CO2ReductionPotential": "70 tons per year"},
    {"name": "Eco Water Conservation", "location": "Zambia", "offsetFocus": "Water Conservation", "CO2ReductionPotential": "55 tons per year"}
]


# Insert the new offsetter
result = collection.insert_many(offsetters)

print(f"Offsetter added successfully {result.inserted_ids}")