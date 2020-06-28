const express = require('express');
const key = require('./config/main');
const {port,mongoURL} = key;
const ConnectDB = require('./config/db');
ConnectDB(mongoURL)
const app = express();
app.listen(port,()=>console.log(`Server is running on port ${port}`))