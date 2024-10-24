import express from "express"
import axios from "axios";
import cors from "cors";
import 'dotenv/config';  // To load the environment variables

const app = express();
const PORT = 3000; // Choose any port

app.use(cors()); // Enable CORS to allow requests from your frontend

// Endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  const { location } = req.query;  // Read location from query params
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;  // Your secret API key

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    res.json(response.data);  // Send back the weather data
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

