const express = require('express');
const dotenv = require("dotenv").config();
const app = express();//initializes an instance of the Express application by calling express(),
const port = process.env.PORT || 8002; 
const connectdb = require('./config/dbconnection');


connectdb();
app.use(express.json());
app.use("/users", require("./routes/userroutes"));


app.listen(port, ()=>{
    console.log(`server running on ${port}`);
  });