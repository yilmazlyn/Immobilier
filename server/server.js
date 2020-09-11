const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const morgan = require("morgan"); 
const helmet = require("helmet"); 
const passport = require ("passport")
const users = require ("./routes/api/users");






//App init
const app = express(); 

//Morgan (Log errors etc..) and helmet(security plugin) middlewares
app.use(morgan("dev")),
app.use(helmet()),
app.use((err, req, res, next) => {
    reject(new Error("Something went wrong!, err:" + err))
    res.status(500).send("Something went wrong !")
});


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

//To handle DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

//Passport middleware
app.use(passport.initialize());
//Passport config exportation
require("./config/passport")(passport); 

//Routes for users POST
app.use("/api/users", users);















const port = process.env.PORT || 4000; // process.env.port is Heroku's port if deploying on Heroku
app.listen(port, () => console.log(`Server up and running on port ${port} !`));  