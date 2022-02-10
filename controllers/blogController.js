const Post = require('../models/posts'),
      Comment = require('../models/postComments'),
      { body,validationResult } = require('express-validator'),
      createPosts = require('../utilities/post-helper'),
      async = require('async')

exports.blog_create_get = function(req, res, next) {
  const titles = [{title: "Deep Core Activation for Aerialists & Pole Dancers", date: '2021 July 12', postNo: 3}, {title: 'My Experience as an Autistic Pole Dancer', date: '2021 Jul 3', postNo: 2}, {title: 'How to Plan a Pole Dance or Aerial Class', date: '2021 Jun 13', postNo: 1}, {title:'Math, Sexism, and Pole Dance', date: '2021 May 30', postNo: 0},]
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
      results.post.count+=1;
      results.post.save(function (err) {
          if (err) { return err; }})
      // Successful, so render.
      res.render('blogTemplate', {spine: spine, title: results.post.title, data: results});
  })
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
            // Data from form is valid.
            // Create a Comment object with escaped and trimmed data.
            var comment = new Comment(
                {
                    post: req.params.spine,
                    name: req.body.name,
                    message: req.body.message
                });
            comment.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new comment record.
                res.redirect('/blog/'+req.params.spine);
            });
        }
    }
];
