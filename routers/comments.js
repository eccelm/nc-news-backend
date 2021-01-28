/*
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

*/
const commentsRouter = require('express').Router();

const { patchComment, deleteComment } = require('../controllers/comments');

commentsRouter.route('/:comment_id').patch(patchComment).delete(deleteComment);

module.exports = commentsRouter;
