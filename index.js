const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/define', async (req, res) => {
  const query = req.query.word; // Get the word to define from the request query parameter

  try {
    // Free tier endpoint (replace with actual URL if different)
    const API_URI = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;

    const response = await axios.get(API_URI);

    if (response.data.length > 0) { // Check if there's a definition
      const definition = response.data[0].meanings[0].definitions[0].definition;
      const definitions = response.data[0].meanings[0].definitions[0];
      console.log(definitions);
      res.json(definition);
    } else {
      res.status(404).json({ message: 'No definition found for this word.' }); // Handle no definition
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing request' }); // Handle errors
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
