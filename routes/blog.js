const router = require('express').Router()


 //converts titles of posts into url spines
function spinalCase(str) {
  const arr = str.split('')
  const reg = /[A-Z]/
  let nArr = arr.map(s => {
    if(reg.test(s)) return ' ' + s
    else return s
    })
  const lStr = nArr.join('').toLowerCase()
  return lStr.split(/\W|_/).filter(s => s!='').join('-')
}
titles = [{title:'Math, Sexism, and Pole Dance', date: '2021 Jun 13'}, {title: 'How to Plan a Pole Dance or Aerial Class', date: '2021 Jun 13'}]

//make object of titles of posts to pass to /blog
let blogObj = {}
for(let i=0;i<titles.length;i++) {
  blogObj['post'+i] = {
    'title': titles[i].title,
    'spinal': spinalCase(titles[i].title),
    'date': titles[i].date,
    'img': 'post-'+i+'-img-1.png'
  }
}


console.log(blogObj)
/*Blog home */
router.get('/blog', (req, res) => {

  res.render('blog', {title: 'Pole Diversity', posts: blogObj})
})


//get all posts
for(let i=0;i<titles.length;i++) {
  let iPost = blogObj['post'+i]
  router.get('/blog/'+iPost.spinal, (req, res) => {

    res.render(iPost.spinal, iPost)
  })
}




module.exports = router
