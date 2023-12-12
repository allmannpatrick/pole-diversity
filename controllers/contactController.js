const sendEmail = require('../utilities/email-helper'),
      { body,validationResult } = require('express-validator');

exports.contact_get = (req, res) => {

  res.render('contact', {
    title: 'Contact'
  })
}

exports.contact_post = async (req, res) => {

  /* Validate and sanitize fields. */
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.')
      .isAlphanumeric().withMessage('Name has non-alphanumeric characters.')
  body('email').trim().isLength({ min: 1 }).escape().withMessage('Email must be specified.')
        .isEmail().withMessage('Enter valid email.')
  body('message').trim().isLength({ min: 1 }).escape().withMessage('Message must be specified.')
      .isAlphanumeric().withMessage('Message has non-alphanumeric characters.')
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  try {
    /*Send email containing name and email in subject and message in message*/
    await sendEmail(`Inquiry from ${name} via ${email}`,message)
    return res.redirect('/')
  }
  catch(error) {
    res.send('message could not be sent')
  }
}
