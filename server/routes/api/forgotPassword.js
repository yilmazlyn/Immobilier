import crypto from "crypto";
import User from "../../models/User";



require("dotenv").config();

const nodemailer = require('nodemailer');
const router = require ("express"); 
 
module.exports = (router) => {
  router.post('/forgotpassword', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.error(req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((users) => {
      if (users === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        users.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000, 
        });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure:'false',
          port: 25,
          auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'mySqlDemoEmail@gmail.com',
          to: `${users.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3031/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
};




// const nodeMailer = require("nodemailer");

// module.exports = (app) => {
//   app.post("/forgotpassword", (req, res) => {
//     if (req.body.email === "") {
//       res.status(400).send("email obligatoire");
//     }
//     console.error(req.body.email);
//     User.findOne({ email: req.body.email }).then((user) => {
//       if (user) {
//         return res.status(406).json({ email: "Email invalide" });
//       } else {
//         const token = crypto.randomBytes(20).toString("hex");
//         user.update({
//           resetPasswordToken: token,
//           resetPasswordExpire: Date.now() + 3600000,
//         });

//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: `${process.env.EMAIL}`,
//             password: `${process.env.PASSWORD}`,
//           },
//         });

//         const mailOptions = {
//           from: "yilmaz.putun69@gmail",
//           to: user.email,
//           subject: "Votre lien de reset votre mot de passe",
//           text:
//             "Vous recevrez ce mail pour reset votre mot de passe. \n\n" +
//             "Veuillez cliquer sur le lien ci-dessous pour reset votre mot de passe. \n\n" +
//             `http://localhost:3000/reset/${token}\n\n` +
//             "Si vous n'avez pas fait cette demande, merci d'ignorer ce message et pensez à changer votre mot de passe au cas ou.\n",
//         };

//         console.log("sending mail");

//         transporteur.sendMail(mailOptions, (err, response) => {
//           if (err) {
//             console.error("problem :/");
//           } else {
//             console.log("res status: ", response);
//             res.status(200).json("reset mail a été envoyé");
//           }
//         });
//       }
//     });
//   });
// };
