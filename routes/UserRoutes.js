const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/UserModel");
const UserProfile = require("../models/ProfileModel");
const Review = require("../models/ReviewModel");
const secret = "Astrolabs"; //process.env.SECRET;

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user.userName);
  } else {
    res.status(404).end();
  }
});

router.post("/register", (req, res) => {
  const formData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  const newUser = new User(formData);
  bcrypt.genSalt((err, salt) => {
    if (err) {
      console.log("error is", err);
    }

    bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
      if (err) {
        console.log("error is", err);
      }
      newUser.password = hashedPassword;

      newUser
        .save()
        .then((newUserData) => {
          res.json(newUserData);
        })
        .catch((err) => {
          console.log("error", err);
        });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((theUser) => {
    if (theUser) {
      bcrypt.compare(password, theUser.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: theUser.id,
            email: theUser.email,
            userName: theUser.userName,
          };
          jwt.sign(payload, secret, (err, theJWT) => {
            res.json({
              token: theJWT,
              id: theUser.id,
              userName: theUser.userName,
            });
          });
        } else {
          res.json({ password: "Incorrect password" });
        }
      }).catch;
    } else {
      res.json({ email: "Invalid email" });
    }
  }).catch;
});

router.post("/edit", (req, res) => {
  const userId = req.body.userId;

  User.findOne({ _id: userId })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.post("/update", (req, res) => {
  const formData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    _id: req.body._id,
  };

  User.findOneAndUpdate({ _id: formData._id }, formData, {
    new: true,
  }).then((user) => {
    res.json(user);
  });
});

router.post("/profile", (req, res) => {
  const profileData = {
    userId: req.body.userId,
    profilePhoto: req.body.profilePhoto,
    location: req.body.location,
    occupation: req.body.occupation,
    bio: req.body.bio,
    cuisine: req.body.cuisine,
    favoriteFood: req.body.favoriteFood,
  };
  const newUserProfile = new UserProfile(profileData);
  newUserProfile
    .save()
    .then((newProfileData) => {
      res.json(newProfileData);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.get("/:id/profile", (req, res) => {
  const userId = req.params.id;

  UserProfile.findOne({ userId }).then((profile) => {
    res.status(200).json(profile);
  });
});

router.post("/profile/update", (req, res) => {
  const profileData = {
    userId: req.body.userId,
    profilePhoto: req.body.profilePhoto,
    location: req.body.location,
    occupation: req.body.occupation,
    bio: req.body.bio,
    cuisine: req.body.cuisine,
    favoriteFood: req.body.favoriteFood,
  };
  UserProfile.findOneAndUpdate({ userId: profileData.userId }, profileData, {
    new: true,
  }).then((profile) => {
    res.json(profile);
  });
});

router.post("/profile/review", (req, res) => {
  const reviewData = {
    firstName: req.body.firstName,
    profilePhoto: req.body.profilePhoto,
    rating: req.body.rating,
    review: req.body.review,
    eventTitle: req.body.eventTitle,
    eventDate: req.body.eventDate,
  };
  const newReview = new Review(reviewData);
  newReview
    .save()
    .then((newReviewData) => {
      res.json(newReviewData);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

module.exports = router;
