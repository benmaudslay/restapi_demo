const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getUsersPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ author: req.params.user_id });
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = req.params.user_id;
    const returnedValue = await post.save();

    res.status(201).send(returnedValue);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
};

module.exports = {
  getAllPosts,
  getUsersPosts,
  addPost,
  updatePost,
  deletePost,
};
