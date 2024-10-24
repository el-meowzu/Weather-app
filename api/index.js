import axios from 'axios';

export default async function handler(req, res) {
  const { location } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;  

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    res.status(200).json(response.data);  
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
}
