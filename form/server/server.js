const express = require('express');
const env = require('dotenv').config();
const config = require('./config/config');

const app = express();

require('./config/express')(app);



const PORT = config.get('port') || 5000;

app.listen(PORT,console.log(`Server Running on port ${PORT}`))