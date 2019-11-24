const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');
const Event = require('../models/EventModel');
const Recipe = require('../models/RecipeModel');

router.post('/post', (req, res)=>{
    const postData = {
        userName : req.body.userName,
        postBody : req.body.postBody,
        image : req.body.image
    }

    const newPost = new Post(postData);

    newPost
    .save()
    .then((newPostData)=>{
        res.json(newPostData)
    })
    .catch((err)=>{
        console.log('error', err);
    })
    
});

router.post('/post/like', async (req, res)=>{
    let userLikes;
    let postID = req.body.postid;
    let userID = req.body.userId;
    
    let theDocument = await Post 
    .find({_id: postID})
    .catch(err=>{
        res.json(err)
    });
    
    userLikes = theDocument[0].likes;
    
    if (userLikes.includes(userID)) {
        userLikes.splice(userLikes.indexOf(userID),1);
    } else {userLikes.push(userID);
    };

    Post
    .updateOne(
        {_id: postID},
        {likes: userLikes}
    )
    .then(thePost=>{
        res.json(thePost)
    })
    .catch(err=>{
        res.json(err)
    });
});

router.post('/post/share', async (req, res)=>{
    let userShares;
    let postID = req.body.postid;
    let userID = req.body.userId;
    
    let theDocument = await Post 
    .find({_id: postID})
    .catch(err=>{
        res.json(err)
    });
    
    userShares = theDocument[0].shares;
    
    if (userShares.includes(userID)) {
        userShares.splice(userShares.indexOf(userID),1);
    } else {userShares.push(userID);
    };

    Post
    .updateOne(
        {_id: postID},
        {shares: userShares}
    )
    .then(thePost=>{
        res.json(thePost)
    })
    .catch(err=>{
        res.json(err)
    });
});

router.post('/post/comment', async (req, res)=>{
    let userComments;
    let postID = req.body.postid;
    let userID = req.body.userId;
    let comment = req.body.comment;
    
    let theDocument = await Post 
    .find({_id: postID})
    .catch(err=>{
        res.json(err)
    });
    
    userComments = theDocument[0].comments;
    userComments.push(`${userID}: ${comment}`);

    Post
    .updateOne(
        {_id: postID},
        {comments: userComments}
    )
    .then(thePost=>{
        res.json(thePost)
    })
    .catch(err=>{
        res.json(err)
    });
});

module.exports = router;