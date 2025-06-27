require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');

// User service entry point

const app = express();
app.use(express.json());
app.use('/', userRoutes);

app.get('/health', (req, res) => res.send('User Service Running'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));