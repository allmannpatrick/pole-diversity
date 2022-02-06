const router = require('express').Router(),
      blog_controller = require('../controllers/blogController');

router.get('/blog/create', blog_controller.blog_create_get);

/*Blog home */
router.get('/blog', blog_controller.blog_list);



// //get all posts
// for(let i=0;i<titles.length;i++) {
//   let iPost = posts['post'+i]
//   router.get('/blog/'+iPost.spinal, (req, res) => {
//     res.render(iPost.spinal, iPost)
//   })
//   router.post('/blog/'+iPost.spinal,comment_controller.commentPost)
// }

router.get('/blog/:spine', blog_controller.blog_get);

router.post('/blog/:spine', blog_controller.blog_post);

module.exports = router
