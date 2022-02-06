const router = require('express').Router(),
      blog_controller = require('../controllers/blogController');

router.get('/blog/create', blog_controller.blog_create_get);

/*Blog home */
router.get('/blog', blog_controller.blog_list);

router.get('/blog/:spine', blog_controller.blog_get);

//post comments
router.post('/blog/:spine', blog_controller.blog_post);

module.exports = router
