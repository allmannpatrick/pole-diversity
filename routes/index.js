const router = require('express').Router(),
      contact_controller = require('../controllers/contactController');
/* Home */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Pole Diversity'
  })
})

router.get('/media', (req, res) => {
  res.render('media', {
    title: 'Media'
  })
})

router.get('/schedule', (req, res) => {
  res.render('schedule', {
   title: 'Schedule'
  })
})

router.get('/contact', contact_controller.contact_get)

router.post('/contact', contact_controller.contact_post)

router.get('/work-with-me', (req, res) => {
  res.render('work-with-me', {
    title: 'Work with me'
  })
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  })
})

router.get('/about/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    title: 'Privacy Policy'
  })
})
module.exports = router
