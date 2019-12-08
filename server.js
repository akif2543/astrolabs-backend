require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const FeedRoutes = require('./routes/FeedRoutes');

const  initPassportStrategy = require('./config/passport');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
initPassportStrategy(passport);

const db = 'mongodb+srv://astroadmin:astrolabs@cluster0-ycixo.mongodb.net/astrolabsproject?retryWrites=true&w=majority'; //process.env.MONGO_URI;
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('DB is connected.');
})
.catch((err)=>{
    console.log('error', err)
});
mongoose.set('useFindAndModify', false);

app.get(
    '/user/profile/view',
    (req, res) => {
        UserProfile.find()
        .then((profile)=>{
            res.json(profile);
        })
        .catch((err)=>{
            console.log('error', err)
        })
});

app.get(
    '/user/edit',
    (req, res) => {
        User.find()
        .then((user)=>{
            res.json(user);
        })
        .catch((err)=>{
            console.log('error', err)
        })
});

app.use(
    '/user',
    UserRoutes
);

app.post(
    '/feed/post/all',
    (req, res) => {

        const timestamp = req.body.timestamp;
        const dateFilter = timestamp ? { date: {$lt: new Date (timestamp)} } : null;

        Post
        .find(dateFilter)
        .sort({date: -1})
        .limit(5)
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log('error', err)
        })
});

app.post("/feed/post/comment/view", (req, res) => {
    const postId = req.body.postId;

    Post
    .findOne({_id: postId})
    .populate('comments')
    .exec(function (err, post) {
        if (err) return handleError(err);
        res.json(post.comments);
    })
});

/* app.get(
    '/feed/recipe/all',
    (req, res) => {
        Recipe.find()
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log('error', err)
        })
}); */

app.use(
    '/feed',
    passport.authenticate('jwt', {session: false}),
    FeedRoutes
);

app.listen(process.env.PORT || 3001, () => {
    console.log('You are connected!')
});