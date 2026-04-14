const express = require("express");
const http = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express(); 
const PORT = process.env.PORT || 4000; 
 
app.use(cookieParser()); 
app.use(express.urlencoded({extended:true}));
app.use(express.json());



const db =  require('./config/db');

const server = http.createServer(app);
const userRoute = require("./Router/userRoutes");
const executionRoute = require("./Router/exeutionRouters");
const AuthMiddleware = require('./Middleware/AuthMiddleware')
app.use('/api/v8',userRoute);
app.use('/api/v8/code',executionRoute);
db.connect();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})
