// import crypto from "crypto";
// import User from "../../models/User"; 

// const nodeMailer = require("nodemailer"); 

// module.exports = (app) => {
//     app.post("/forgotpassword", (req, res) => {
//         if (req.body.email === "") {
//             res.status(400).send("email obligatoire");
//         }
//         console.error(req.body.email);
//         User.findOne({ email: req.body.email }).then((user) => {
//             if (user) {
//               return res.status(406).json({ email: "Email invalide" });
//             } else {
//                 const token = crypto.randomBytes(20).toString("hex")
//                 user.update({
//                     resetPasswordToken: token,
//                     resetPasswordExpire: Date.now() + 3600000

//                 });

//                 const transporter = nodemailer.createTransport({
//                     service: 'gmail', 
//                     auth: {
//                         user: process.env.EMAIL,
//                     }
//                 })


//             };
//     });
// }