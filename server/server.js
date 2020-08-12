const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 

const app = express(); 

//Middleware for body-parser
app.use (
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json()); 

//Config Database

const db = require("./config/keys").mongoURI; 

//Conection to MongoDB

mongoose.connect (
    db, 
    { useNewUrlParser: true,
      useUnifiedTopology: true 
         }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err)); 

const port = process.env.PORT || 4000; // process.env.port is Heroku's port if deploying on Heroku
app.listen(port, () => console.log(`Server up and running on port ${port} !`));