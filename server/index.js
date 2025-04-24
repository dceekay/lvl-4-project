require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('API running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
