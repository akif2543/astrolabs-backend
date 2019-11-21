require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const UserRoutes = require('./routes/UserRoutes');

const  initPassportStrategy = require('./config/passport');

const app = express();

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
})

app.use(
    '/user',
    UserRoutes
);

app.listen(process.env.PORT || 3000, () => {
    console.log('You are connected!')
});