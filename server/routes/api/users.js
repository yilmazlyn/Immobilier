const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require("crypto");


//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const User = require("../../models/User");

// @route POST api/users/register
// @description Register User
// @access Public

router.post("/register", (req, res) => {
  //Validate the form

  const { error, isValid } = validateRegisterInput(req.body);

  //Check validation
  // Status 406 (Not acceptable) = The requested resource is not available in a format that would respect the "Accept" headers of the request.
  if (!isValid) {
    return res.status(406).json(error);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(406).json({ email: "Email invalide" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified: false
      });

      

      //Hash password with salt before saving user in db
      bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          //After hashing password, persisting user
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }

    //Test 
    if(user) {
      crypto.verify(user)
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  //Starting form validation
  const { error, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(406).json(error);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by his email
  User.findOne({ email }).then((user) => {
    //Check if user mail exist in db
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email adresse ou mot de passe incorrect" });
    }
    //Check user password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        //Creating JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign Jwt Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token,
            });
          }
        );
      } else {
          return res.status(401).json({ passwordincorrect: "Email adresse ou mot de passe incorrect"});
      }
    });
  });
});

// @route POST api/users/verify account
// @To verify user account before login
// @access Public

router.post("/verify", (req,res) => {
  
})



module.exports = router; 