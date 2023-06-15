const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: 'No URLs provided' });
    return;
  }

  const urls = Array.isArray(url) ? url : [url];
  const numberSet = new Set();

  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const { numbers } = response.data;
      numbers.forEach((number) => numberSet.add(number));
    } catch (error) {
      console.error(`Failed to retrieve numbers from ${url}: ${error.message}`);
    }
  }

  const sortedNumbers = Array.from(numberSet).sort((a, b) => a - b);

  res.json({ numbers: sortedNumbers });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
