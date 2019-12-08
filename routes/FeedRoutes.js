const express = require("express");
const router = express.Router();
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const Event = require("../models/EventModel");
const Recipe = require("../models/RecipeModel");

router.post("/post", (req, res) => {
  const postData = {
    userName: req.body.userName,
    profilePhoto: req.body.profilePhoto,
    postBody: req.body.postBody,
    image: req.body.image
  };

  const newPost = new Post(postData);

  newPost
    .save()
    .then(newPostData => {
      res.json(newPostData);
    })
    .catch(err => {
      console.log("error", err);
    });
});

router.post("/post/like", async (req, res) => {
  let userLikes;
  let postID = req.body.postid;
  let userID = req.user.id;

  let theDocument = await Post.find({ _id: postID }).catch(err => {
    res.json(err);
  });

  userLikes = theDocument[0].likes;

  if (userLikes.includes(userID)) {
    userLikes.splice(userLikes.indexOf(userID), 1);
  } else {
    userLikes.push(userID);
  }

  Post.updateOne({ _id: postID }, { likes: userLikes })
    .then(thePost => {
      res.json(thePost);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/post/share", async (req, res) => {
  let userShares;
  let postID = req.body.postid;
  let userID = req.user.id;

  let theDocument = await Post.find({ _id: postID }).catch(err => {
    res.json(err);
  });

  userShares = theDocument[0].shares;

  if (userShares.includes(userID)) {
    userShares.splice(userShares.indexOf(userID), 1);
  } else {
    userShares.push(userID);
  }

  Post.updateOne({ _id: postID }, { shares: userShares })
    .then(thePost => {
      res.json(thePost);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/post/comment", async (req, res) => {
  
    const commentData = {
    userName: req.body.userName,
    profilePhoto: req.body.profilePhoto,
    commentBody: req.body.commentBody,
    postId: req.body.postId
  };

  const newComment = await new Comment(commentData);

  newComment
    .save()
    .then(newCommentData => {
      res.json(newCommentData);
      commentId = newCommentData._id
    })
    .then(json => {
      Post.findOne({ _id: commentData.postId })
        .then(post => {
          post.comments.push(commentId);
          post.save();
        })
        .catch(err => {
          console.log("error", err);
        });
    })
    .catch(err => {
      console.log("error", err);
    });
});



router.post("/event", (req, res) => {
  const eventData = {
    userName: req.body.userName,
    eventTitle: req.body.eventTitle,
    eventBody: req.body.eventBody,
    eventLocation: req.body.eventLocation,
    eventDate: req.body.eventDate,
    category: req.body.category,
    image: req.body.image
  };

  const newEvent = new Event(eventData);

  newEvent
    .save()
    .then(newEventData => {
      res.json(newEventData);
    })
    .catch(err => {
      console.log("error", err);
    });
});

router.post("/event/like", async (req, res) => {
  let userLikes;
  let eventID = req.body.eventId;
  let userID = req.body.userId;

  let theDocument = await Event.find({ _id: eventID }).catch(err => {
    res.json(err);
  });

  userLikes = theDocument[0].likes;

  if (userLikes.includes(userID)) {
    userLikes.splice(userLikes.indexOf(userID), 1);
  } else {
    userLikes.push(userID);
  }

  Event.updateOne({ _id: eventID }, { likes: userLikes })
    .then(theEvent => {
      res.json(theEvent);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/event/share", async (req, res) => {
  let userShares;
  let eventID = req.body.eventId;
  let userID = req.body.userId;

  let theDocument = await Event.find({ _id: eventID }).catch(err => {
    res.json(err);
  });

  userShares = theDocument[0].shares;

  if (userShares.includes(userID)) {
    userShares.splice(userShares.indexOf(userID), 1);
  } else {
    userShares.push(userID);
  }

  Event.updateOne({ _id: eventID }, { shares: userShares })
    .then(theEvent => {
      res.json(theEvent);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/event/attend", async (req, res) => {
  let usersAttending;
  let eventID = req.body.eventId;
  let userID = req.body.userId;

  let theDocument = await Event.find({ _id: eventID }).catch(err => {
    res.json(err);
  });

  usersAttending = theDocument[0].attending;

  if (usersAttending.includes(userID)) {
    usersAttending.splice(usersAttending.indexOf(userID), 1);
  } else {
    usersAttending.push(userID);
  }

  Event.updateOne({ _id: eventID }, { attending: usersAttending })
    .then(theEvent => {
      res.json(theEvent);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/event/comment", async (req, res) => {
  let userComments;
  let eventID = req.body.eventId;
  let userID = req.body.userId;
  let comment = req.body.comment;

  let theDocument = await Event.find({ _id: eventID }).catch(err => {
    res.json(err);
  });

  userComments = theDocument[0].comments;
  userComments.push({ userID: comment });

  Event.updateOne({ _id: eventID }, { comments: userComments })
    .then(theEvent => {
      res.json(theEvent);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/recipe", (req, res) => {
  const recipeData = {
    userName: req.body.userName,
    recipeTitle: req.body.recipeTitle,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    recipeDescription: req.body.recipeDescription,
    ingredientList: req.body.ingredientList,
    recipeDirections: req.body.recipeDirections,
    tags: req.body.tags,
    image: req.body.image
  };

  const newRecipe = new Recipe(recipeData);

  newRecipe
    .save()
    .then(newRecipeData => {
      res.json(newRecipeData);
    })
    .catch(err => {
      console.log("error", err);
    });
});

router.post("/recipe/like", async (req, res) => {
  let userLikes;
  let recipeID = req.body.recipeId;
  let userID = req.body.userId;

  let theDocument = await Recipe.find({ _id: recipeID }).catch(err => {
    res.json(err);
  });

  userLikes = theDocument[0].likes;

  if (userLikes.includes(userID)) {
    userLikes.splice(userLikes.indexOf(userID), 1);
  } else {
    userLikes.push(userID);
  }

  Recipe.updateOne({ _id: recipeID }, { likes: userLikes })
    .then(theRecipe => {
      res.json(theRecipe);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/recipe/share", async (req, res) => {
  let userShares;
  let recipeID = req.body.recipeId;
  let userID = req.body.userId;

  let theDocument = await Recipe.find({ _id: recipeID }).catch(err => {
    res.json(err);
  });

  userShares = theDocument[0].shares;

  if (userShares.includes(userID)) {
    userShares.splice(userShares.indexOf(userID), 1);
  } else {
    userShares.push(userID);
  }

  Recipe.updateOne({ _id: recipeID }, { shares: userShares })
    .then(theRecipe => {
      res.json(theRecipe);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/recipe/comment", async (req, res) => {
  let userComments;
  let recipeID = req.body.recipeId;
  let userID = req.body.userId;
  let comment = req.body.comment;

  let theDocument = await Recipe.find({ _id: recipeID }).catch(err => {
    res.json(err);
  });

  userComments = theDocument[0].comments;
  userComments.push({ userID: comment });

  Recipe.updateOne({ _id: recipeID }, { comments: userComments })
    .then(theRecipe => {
      res.json(theRecipe);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
