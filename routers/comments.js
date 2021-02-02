const commentsRouter = require('express').Router();
const {send405} = require('../controllers/errors') 
const { patchComment, deleteComment } = require('../controllers/comments');

commentsRouter
.route('/:comment_id')
.patch(patchComment)
.delete(deleteComment)
.all(send405);

module.exports = commentsRouter;
