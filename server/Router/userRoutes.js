const experss =require("express");
const Route= experss.Router();
const{ signup, login } = require("../controller/usercontroller");


Route.post('/signup',signup);
Route.post('/login',login);

module.exports = Route; 
 