require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/', productRoutes);

app.get('/health', (req, res) => res.send('Ecommerce Service Running'));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Ecommerce service running on port ${PORT}`));