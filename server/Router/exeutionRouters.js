const express = require("express");
const Route = express.Router();
const { run } = require("../controller/executionController");
const isAuthenticated = require('../Middleware/AuthMiddleware'); 


Route.post("/run",isAuthenticated,run); 


module.exports = Route; 
