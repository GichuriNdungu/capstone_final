const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const uri = "mongodb+srv://martin:martingichuri@offsetters.mcbtf.mongodb.net/?retryWrites=true&w=majority&appName=offsetters";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Error connecting to MongoDB:", err));


const offsetterSchema = new mongoose.Schema({
    name: String,
    location: String,
    offsetFocus: String,
    CO2ReductionPotential: String
});

const Offsetter = mongoose.model('Offsetter', offsetterSchema);


app.get('/offsetters', async (req, res) => {
    try {
        const offsetters = await Offsetter.find();
        res.json(offsetters);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving offsetters' });
    }
});


app.post('/offsetters', async (req, res) => {
    const { name, location, offsetFocus, CO2ReductionPotential } = req.body;
    const newOffsetter = new Offsetter({ name, location, offsetFocus, CO2ReductionPotential });

    try {
        await newOffsetter.save();
        res.status(201).json(newOffsetter);
    } catch (error) {
        res.status(500).json({ message: 'Error adding offsetter' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
