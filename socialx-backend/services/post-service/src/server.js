require('dotenv').config();
const express = require('express');
const postRoutes = require('./routes/postRoutes');

// Post service entry point
const app = express();
app.use(express.json());
app.use('/', postRoutes);

app.get('/health', (req, res) => res.send('Post Service Running'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Post service running on port ${PORT}`));