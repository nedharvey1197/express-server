const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  try {
    console.log("Calling Claude API with:", JSON.stringify(req.body).substring(0, 200) + "...");
    
    const response = await axios.post('https://api.anthropic.com/v1/messages', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY || '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',
        'anthropic-version': '2023-06-01'
      }
    });
    
    console.log("Received response from Claude");
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Claude API:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Claude proxy server running on port ${port}`);
});