require('dotenv').config();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const createTransporter = async () => {
  try {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'josephogunsuyi360@gmail.com',
      pass: 'joseph36052'
    }
  }));
  
    return transporter;
  } catch(err) {
    console.log(err)
  }
};

//emailOptions - who sends what to whom
const sendEmail = async (emailOptions) => {
  await createTransporter()
  .then(async (transporter) => {
    try {
        await transporter.sendMail(emailOptions)
        console.log('Email sent sucessfully')
      } catch(err) {
        throw err
        // if(err) return console.log(err, "\n Error while sending email")
      }
    })
};

// sendEmail({
//   subject: "Reset password link",
//   html: msg,
//   to:  "ogunsuyiemmanuel360@gmail.com",
//   from: `Emmijozzy ${process.env.USER}`,
// });

module.exports = {sendEmail}