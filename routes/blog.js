const router = require('express').Router()
      posts = require('../models/posts.js')
      
/*Blog home */
router.get('/blog', (req, res) => {

  res.render('blog', {title: 'Pole Diversity', posts: posts})
})


//get all posts
for(let i=0;i<titles.length;i++) {
  let iPost = posts['post'+i]
  router.get('/blog/'+iPost.spinal, (req, res) => {

    res.render(iPost.spinal, iPost)
  })
}




module.exports = router
