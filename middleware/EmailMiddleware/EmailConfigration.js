const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "msharma7055084627@gmail.com",
    pass: "xqgx uijs geah nsru",
  },
});


module.exports = {transporter};