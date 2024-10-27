const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb+srv://pratikmohite343:6TfEuHfVYmoXkkLq@cluster0.jv7zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

// Create mongoose model for weather data
const WeatherData = mongoose.model('WeatherData', {
    city: String,
    country: String,
    temperature: Number,
    description: String,
    icon: String,
});

// Route to handle storing weather data
app.post('/weather', async (req, res) => {
    try {
        // Extract weather data from recently body
        const { city, country, temperature, description, icon } = req.body;

        // Create a new document using the weatherData model
        const weatherData = new WeatherData({
            city,
            country,
            temperature,
            description,
            icon,
        });
        // Save the waeather data to the database
        await weatherData.save();
        // Respond with sucess message
        res.json({ message: 'Weather data saved sucessfully' });
    } catch (error) {
        console.error('Error saving weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});