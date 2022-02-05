const sendEmail = require('../utilities/email-helper');

exports.contact_get = (req, res) => {

  res.render('contact', {
    title: 'Contact'
  })
}

exports.contact_post = async (req, res) => {
  /*Send email containing name and email in subject and message in message*/
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  try {
    await sendEmail(`Inquiry from ${name} via ${email}`,message)
    return res.redirect('/')
  }
  catch(error) {
    res.send('message could not be sent')
  }
}
