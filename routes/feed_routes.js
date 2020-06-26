const express = require("express");

const Post = require("../db/models/post");
const { postPop } = require("../util/query_helper");

const router = express.Router();

router.get("/post", (req, res) => {
  Post.findById(req.body.id)
    .populate(postPop)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(404).end();
    });
});

router.put("/toggle", async (req, res) => {
  const userId = req.user.id;
  const { postId, like } = req.body;

  const post = await Post.findById(postId);

  if (post) {
    const { likes, shares } = post;

    if (like) {
      if (likes.includes(userId)) {
        likes.splice(likes.indexOf(userId), 1);
      } else {
        likes.push(userId);
      }
    } else {
      if (shares.includes(userId)) {
        shares.splice(shares.indexOf(userId), 1);
      } else {
        shares.push(userId);
      }
    }

    Post.updateOne({ _id: postId }, { likes, shares })
      .populate(postPop)
      .then((updatedPost) => {
        res.status(200).json(updatedPost);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).end();
      });
  } else {
    res.status(404).end();
  }
});

router.put("/comment", (req, res) => {
  const comment = {
    commenter: req.user.id,
    body: req.body.body,
  };

  const { id } = req.body;

  Post.findOneAndUpdate(
    { _id: id },
    { $push: { comments: comment } },
    { new: true }
  )
    .populate(postPop)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).end();
    });
});

router.put("/comment/like", (req, res) => {
  const userId = req.user.id;

  const { postId, commentId } = req.body;

  Post.findById(postId)
    .then((post) => {
      const comment = post.comments.id(commentId);
      const { likes } = comment;
      if (likes.includes(userId)) {
        likes.splice(likes.indexOf(userId), 1);
      } else {
        likes.push(userId);
      }
      comment.set(likes);
      post
        .save()
        .then((updatedPost) => Post.populate(updatedPost, postPop))
        .then((populatedPost) => res.status(200).send(populatedPost))
        .catch((e) => res.status(500).json(e));
    })
    .catch((e) => res.status(404).json(e));
});

router.get("/", (req, res) => {
  const timestamp = req.query.date;
  const dateFilter = timestamp ? { date: { $lt: new Date(timestamp) } } : null;

  Post.find(dateFilter)
    .sort({ date: -1 })
    .limit(5)
    .populate(postPop)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.post("/", async (req, res) => {
  const postData = {
    author: req.user.id,
    body: req.body.body,
    image: req.body.image,
  };

  const post = new Post(postData);

  const savedPost = await post.save();

  Post.populate(savedPost, postPop, (err, populatedPost) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).json(populatedPost);
    }
  });
});

module.exports = router;
