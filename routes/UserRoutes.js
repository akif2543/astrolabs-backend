const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/UserModel');
const UserProfile = require('../models/UserProfileModel');
const secret = 'Astrolabs';  //process.env.SECRET;

router.post('/register', (req, res)=>{
    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }

    const newUser = new User(formData);
    bcrypt.genSalt((err, salt)=>{
        if(err) {
            console.log('error is', err);
        }

        bcrypt.hash(
            newUser.password,
            salt,
            (err, hashedPassword)=>{
                if(err) {
                    console.log('error is', err);
                }
                newUser.password = hashedPassword;

                newUser
                .save()
                .then((newUserData)=>{
                    res.json(newUserData)
                })
                .catch((err)=>{
                    console.log('error', err);
                })
            }
        )
    });
});

router.post('/login', (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;
    
    User
    .findOne({email: email})
    .then((theUser)=>{
        if(theUser) {
            bcrypt
            .compare(password, theUser.password)
            .then((isMatch)=>{
                if (isMatch) {
                    const payload = {
                        id: theUser.id,
                        email: theUser.email
                    }
                    jwt.sign(
                        payload,
                        secret,
                        (err, theJWT) => {
                            res.json({token: theJWT})
                        }
                    )
                } else {
                    res.json({message: "Incorrect password"})
                }
            })
            .catch
        } else {
            res.json({message: "Invalid email"})
        }
    })
    .catch
});

router.post('/profile', (req, res)=>{
    const formData = {
        nickName : req.body.nickName,
        profilePhoto : req.body.profilePhoto,
        location : req.body.location,
        occupation : req.body.occupation,
        bio : req.body.bio,
        cuisine : req.body.cuisine,
        favoriteFood : req.body.favoriteFood,
    }
    const newUserProfile = new UserProfile(formData);
    newUserProfile
    .save()
    .then((newFormData)=>{
        res.json(newFormData)
    })
    .catch((err)=>{
        console.log('error', err);
    })
});



module.exports = router;