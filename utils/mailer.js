const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendCodeEmail(to, code) {
  return transporter.sendMail({
    from: `"SimplyStay Baguio" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your SimplyStay Login Code',
    text: `Your login code is: ${code}`,
    html: `<p>Your <strong>SimplyStay</strong> login code is:</p><h2>${code}</h2>`,
  });
}

module.exports = sendCodeEmail;
