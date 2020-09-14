const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require("crypto");
const sendgrid = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

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
        emailToken: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
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
      return res
        .status(404)
        .json({ emailnotfound: "Email adresse ou mot de passe incorrect" });
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
        return res.status(401).json({
          passwordincorrect: "Email adresse ou mot de passe incorrect",
        });
      }
    });
  });
});

// @route POST api/users/verify account
// @To verify user account before login
// @access Public


// @route POST api/users/resetpassword
// @To reset user password
// @access Public

//router.get("/resetpassword", (req, res) => {});





//@route POST api/users/forgotpassword
//@To send an recovery email for user password
//@access Public

router.post("/forgotpassword", (req, res) => {
  const email = req.body.email;
  if (email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);

  User.findOne({ email }).then((users) => {
    if (!users) {
      console.log(users);
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(256).toString("hex");
      users.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const transporter = nodemailer.createTransport(
        sendgrid({
          auth: {
            api_key: keys.api_key,
          },
        })
      );

      const mailOptions = {
        from: "yilmaz.putun@epitech.eu",
        to: req.body.email,
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `http://localhost:3000/reset/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };

      // When a user clicks this link, they’re directed
      // to a new page in the application entitled ‘Password Reset Screen’,
      // which can only be accessed with a valid token.
      // If the token has expired or is otherwise invalid,
      // the user will see an error screen with links to go home or
      // attempt to send a new password reset email.

      console.log("sending mail");

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
});
module.exports = router;
