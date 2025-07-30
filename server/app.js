const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const promptRoute = require('./routes/prompt');
app.use('/api/prompt', promptRoute);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));