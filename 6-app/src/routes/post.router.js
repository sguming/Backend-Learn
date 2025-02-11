const { Router } = require('express');
const {
  validateBody,
  validateQuery,
  validateObjectId,
} = require('../middleware/validation.middleware');
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
} = require('../controllers/post.controller');
const postValidationSchema = require('../validations/post.validation');
const authGuardMiddleware = require('../middleware/authGuard.middleware');

const postRouter = Router();

postRouter.get('/', validateQuery(postValidationSchema.search), getAllPosts);
postRouter.get('/:id', validateObjectId('id'), getPostById);
postRouter.put(
  '/:id',
  authGuardMiddleware,
  validateObjectId('id'),
  updatePostById
);
postRouter.delete(
  '/:id',
  authGuardMiddleware,
  validateObjectId('id'),
  deletePostById
);
postRouter.post(
  '/',
  authGuardMiddleware,
  validateBody(postValidationSchema.create),
  createPost
);

module.exports = postRouter;
