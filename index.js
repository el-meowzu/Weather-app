import express from "express"
import axios from "axios";
import cors from "cors";
import 'dotenv/config';  

const app = express();
const PORT = 3000; 

app.use(cors()); 


app.get('/weather', async (req, res) => {
  const { location } = req.query;  
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;  

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    res.json(response.data);  
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


