import Post from '../model/Post.js';

const getIndex = async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts: posts,
  });
};

const getAbout = (req, res) => {
  res.render('about');
}

const getAddPost = (req, res) => {
  res.render('add');
}

const getEditPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', {
    post:post
  });
}

export {
  getIndex,
  getAbout,
  getAddPost,
  getEditPost
};
