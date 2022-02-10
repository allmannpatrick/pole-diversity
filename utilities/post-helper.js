const Post = require('../models/posts');

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

module.exports = (titles) => {
  //make object of titles of posts to pass to /blog
  for(let i=0;i<titles.length;i++) {
    let post = new Post(
        {
            title: titles[i].title,
            spine: spinalCase(titles[i].title),
            date: titles[i].date,
            img: 'post-'+i+'-img-1.png',
            count: 0
        });
    post.save(function (err) {
        if (err) { return err; }
    })
  }
}
