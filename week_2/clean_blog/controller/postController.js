import Post from '../model/Post.js';

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post:post
  })
}

const createPost = async (req, res) => {
  await Post.create(req.body);
  console.log(req.body)
  res.redirect('/');
};

const deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

const editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.title = req.body.title;
  post.author = req.body.author;
  post.content = req.body.content;
  post.save();
  res.redirect(`/post/${req.params.id}`);
};

export {
  getPost,
  createPost,
  deletePost,
  editPost
}
