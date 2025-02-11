const ForbiddenException = require('../exceptions/forbidden.exception');
const NotFoundException = require('../exceptions/notFound.exception');
const Post = require('../models/post.model');

const createPost = async (req, res, next) => {
  try {
    // if (!req.user) {
    //   throw xxx
    // }
    const { title, content } = req.body;
    // Post.create()
    const post = new Post({
      // ...req.body,
      title,
      content,
      user: req.user._id,
    });
    await post.save();
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (e) {
    next(e);
  }
};

const getAllPosts = async (req, res, next) => {
  const { limit, page, q } = req.query;
  const searchQuery = q ? { $text: { $search: q } } : {};
  try {
    const posts = await Post.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    // const total = await Post.countDocuments(searchQuery).exec();
    res.json({
      success: true,
      data: posts,
      // pagination: {page, limit, total, totalPage}
    });
  } catch (e) {
    next(e);
  }
};
const getPostById = async (req, res, next) => {
  try {
    // const post = await Post.findById(req.params.id)
    //   .populate('user', 'username')
    //   .exec();
    // if (!post) {
    //   throw new NotFoundException(`Post not found ${req.params.id}`);
    // }
    const post = await Post.findByIdOrFail(req.params.id);
    await post.populate('user', 'username');
    res.json({
      success: true,
      data: post,
    });
  } catch (e) {
    next(e);
  }
};
const updatePostById = async (req, res, next) => {
  try {
    const post = await Post.findByIdOrFail(req.params.id);
    checkUserOwnsPost(post, req.user._id);
    post.set(req.body);
    await post.save();
    res.json({
      success: true,
      data: post,
    });
  } catch (e) {
    next(e);
  }
};
const deletePostById = async (req, res, next) => {
  try {
    const post = await Post.findByIdOrFail(req.params.id);
    checkUserOwnsPost(post, req.user._id);
    await post.deleteOne();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const checkUserOwnsPost = (post, userId) => {
  if (userId !== post.user.toString()) {
    throw new ForbiddenException(
      'You do not have permission to perform this action'
    );
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
