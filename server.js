const express = require('express');
const server = express();
const db = require('./data/dbConfig.js');
const carRouter = require('./cars/carRouter.js');
server.use(express.json());
server.use('/api/cars', carRouter);

module.exports = server;