const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");
const Profile = require("../models/Profile");
require("dotenv").config();

const router = express.Router();
const secret = process.env.SECRET;

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user.id;
    const profile = await Profile.findOne({ user });

    if (profile) {
      res.status(200).json(req.query.get ? profile[req.query.get] : profile);
    } else {
      res.status(404).end();
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user) {
      res.status(200).json(req.user.name);
    } else {
      res.status(404).end();
    }

    // const users = await User.find();
    // if (users.length) {
    //   const userNames = users.map((user) => user.userName);
    //   res.status(200).json(userNames);
    // } else {
    //   res.status(404).end();
    // }
  }
);

router.post("/", async (req, res) => {
  const formData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    handle: req.body.handle,
    email: req.body.email,
  };

  const { password } = req.body;

  const newUser = new User(formData);

  bcrypt.genSalt((err, salt) => {
    if (err) {
      console.log("error is", err);
    }

    bcrypt.hash(password, salt, async (error, hashedPassword) => {
      if (err) {
        console.log("error is", error);
      }
      newUser.password = hashedPassword;

      const savedUser = await newUser.save();
      const newProfile = new Profile({ user: savedUser._id });
      const savedProfile = await newProfile.save();

      await Profile.findById(savedProfile._id)
        .select("-_id -user")
        .exec((erra, profile) => {
          if (!erra) {
            const user = {
              name: savedUser.name,
              handle: savedUser.handle,
              profile,
            };
            jwt.sign(
              { id: savedUser._id, handle: savedUser.handle },
              secret,
              (e, theJWT) => {
                if (!err) {
                  res.status(201).json({
                    token: theJWT,
                    user,
                  });
                } else {
                  res.status(500).send(e);
                }
              }
            );
          } else {
            console.log(erra);
          }
        });
    });
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(req.query.get ? user[req.query.get] : user);
  } else {
    res.status(404).end();
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const found = await User.findOne({ email });

  if (found) {
    const match = await bcrypt.compare(password, found.password);

    if (match) {
      const payload = {
        id: found._id,
        handle: found.handle,
      };

      Profile.findOne({ user: found._id })
        .select("-_id -user")
        .exec((erra, profile) => {
          if (!erra) {
            const user = {
              name: found.name,
              handle: found.handle,
              profile,
            };
            jwt.sign(payload, secret, (err, theJWT) => {
              if (!err) {
                res.status(200).json({
                  token: theJWT,
                  user,
                });
              } else {
                res.status(500).send(err);
              }
            });
          }
        });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

router.put("/:id", (req, res) => {
  // const { firstName, lastName, handle, email } = req.body;

  User.findOneAndUpdate({ _id: req.user.id }, req.body, {
    new: true,
    runValidators: true,
    context: "query ",
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

// router.post("/update", (req, res) => {
//   const formData = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     _id: req.body._id,
//   };

//   User.findOneAndUpdate({ _id: formData._id }, formData, {
//     new: true,
//   }).then((user) => {
//     res.json(user);
//   });
// });

router.post("/profiles", (req, res) => {
  const profileData = {
    user: req.body.userId,
  };
  const newProfile = new Profile(profileData);
  newProfile
    .save()
    .then((newProfileData) => {
      res.json(newProfileData);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.get("/:id/profile", async (req, res) => {
  const user = req.params.id;
  const profile = await Profile.findOne({ user });
  if (profile) {
    res.status(200).json(req.query.get ? profile[req.query.get] : profile);
  } else {
    res.status(404).end();
  }
});

router.put("/profile", (req, res) => {
  const profileData = {
    profilePhoto: req.body.profilePhoto,
    location: req.body.location,
    occupation: req.body.occupation,
    bio: req.body.bio,
    cuisine: req.body.cuisine,
    favoriteFood: req.body.favoriteFood,
  };
  Profile.findOneAndUpdate({ user: req.user.id }, profileData, {
    new: true,
  }).then((profile) => {
    res.json(profile);
  });
});

// router.post("/profile/review", (req, res) => {
//   const reviewData = {
//     firstName: req.body.firstName,
//     profilePhoto: req.body.profilePhoto,
//     rating: req.body.rating,
//     review: req.body.review,
//     eventTitle: req.body.eventTitle,
//     eventDate: req.body.eventDate,
//   };
//   const newReview = new Review(reviewData);
//   newReview
//     .save()
//     .then((newReviewData) => {
//       res.json(newReviewData);
//     })
//     .catch((err) => {
//       console.log("error", err);
//     });
// });

module.exports = router;
