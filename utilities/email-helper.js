const nodemailer = require('nodemailer')
module.exports = async (subject, text ) => {
    /* Create nodemailer transporter using environment variables. */
    let transporter = await nodemailer.createTransport({
      //host: process.env.EMAIL_HOST,
      //port: process.env.EMAIL_PORT,
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    /* Send the email */
    try {
      await transporter.sendMail({
        from: `<${process.env.EMAIL_ADDRESS}>`,
        to: `<${process.env.EMAIL_ADDRESS}>`,
        subject: subject,
        text: text
      });
      return Promise.resolve("Message Sent Successfully!");
    }
    catch(error) {
      return Promise.reject(error);
    }
  }
