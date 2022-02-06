const Post = require('../models/posts'),
      Comment = require('../models/postComments'),
      { body,validationResult } = require('express-validator'),
      createPosts = require('../utilities/post-helper'),
      async = require('async')

exports.blog_create_get = function(req, res, next) {
  const titles = [{title:'Math, Sexism, and Pole Dance', date: '2021 Jun 13'}, {title: 'How to Plan a Pole Dance or Aerial Class', date: '2021 Jun 13'}]
  createPosts(titles)
  res.redirect('/blog')
};

exports.blog_list = function(req, res, next) {
  Post.find()
    .exec(function (err, posts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('blog', {title: 'Pole Diversity', posts: posts})
    });
};

exports.blog_get = function(req, res, next) {
  const spine = req.params.spine
  async.parallel({
    post: (callback) => {
      Post.findOne({
        spine: spine}).exec(callback)
    },
    comments: function(callback) {
      Comment.find({
        post: spine}).sort({date:-1}).exec(callback)
      },
    comment_count: function(callback) {
        Comment.countDocuments({
          post: spine}, callback);
    }
  },
  (err, results) => {
      if (err) { return next(err); } // Error in API usage.
      if (results.post==null) { // No results.
          var err = new Error('Post not found');
          err.status = 404;
          return next(err);
      }
      console.log(results.comments)
      // Successful, so render.
      res.render(spine, {spine: spine, title: results.post.title, data: results});
  })
//comment_count: results.comment_count, spine: spine, post: results.post, comments: results.comments


//   Post.findOne({spine: req.params.spine}, (err, results) => {
//         if (err) { return next(err); } // Error in API usage.
//         if (results==null) { // No results.
//             let err = new Error('Post not found');
//             err.status = 404;
//             return next(err);
//         }
//         // Successful, so render.
//         res.render(results.spine, results );
//     }
//   )
// };

  // async.parallel({
  //     post: function(callback) {
  //
  //       Post.findOne({
  //         spine: req.params.spine}).exec(callback)
  //     },
  //     book_instance: function(callback) {
  //
  //       Comment.find({
  //         post: req.params.spine}).exec(callback)
  //     },
  // }, function(err, results) {
  //     if (err) { return next(err); }
  //     if (results.post==null) { // No results.
  //         var err = new Error('Post not found');
  //         err.status = 404;
  //         return next(err);
  //     }
  //     // Successful, so render.
  //     res.render(results.spine, { title: results.book.title, book: results.book, book_instances: results.book_instance } );
  // });

  };


exports.blog_post =  [

    // Validate and sanitize fields.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('message').trim().isLength({ min: 1 }).escape().withMessage('Message must be specified.')
        .isAlphanumeric().withMessage('Message has non-alphanumeric characters.'),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('blog', { comment: req.body, errors: errors.array() });
            return;
        }
        else {
            console.log(req.params.post)
            // Data from form is valid.
            // Create a Comment object with escaped and trimmed data.
            //const time = new Date();
          //  const formatted_date = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
            var comment = new Comment(
                {
                    post: req.params.spine,
                    name: req.body.name,
                    message: req.body.message,
                    //date: formatted_date
                });
            comment.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new comment record.
                res.redirect('/blog/'+req.params.spine);
            });
        }
    }
];
//make nicer
//set to production
//make time nicer