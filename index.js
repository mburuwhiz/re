const express = require('express');
const path = require('path');
const app = express();

// Use the port Render provides, or default to 3000 locally
const PORT = process.env.PORT || 3000;

// This serves all files in the root directory as static assets
app.use(express.static(__dirname));

// Optional: A home route so you know the server is working
app.get('/', (req, res) => {
  res.send('Server is running! Access your file at /micheal.pdf');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
