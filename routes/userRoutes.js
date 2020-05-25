require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../db/models/user");
const Profile = require("../db/models/profile");

const router = express.Router();
const secret = process.env.SECRET;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      const user = req.user.id;

      const opts = [
        {
          path: "user",
          select: "handle photo firstName lastName -_id",
        },
      ];

      Profile.findOne({ user })
        .populate(opts)
        .then((populated) => res.status(200).json(populated))
        .catch((e) => res.status(500).json(e));
    } else {
      res.status(401).end();
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
      if (error) {
        console.log("error is", error);
      }
      newUser.password = hashedPassword;

      const savedUser = await newUser.save();
      const newProfile = new Profile({ user: savedUser._id });
      const savedProfile = await newProfile.save();

      const opts = [
        {
          path: "user",
          select: "handle photo firstName lastName -_id",
        },
      ];

      Profile.populate(savedProfile, opts)
        .then((profile) => {
          jwt.sign(
            { id: savedUser._id, handle: savedUser.handle },
            secret,
            (e, theJWT) => {
              if (!e) {
                res.status(201).json({
                  token: theJWT,
                  profile,
                });
              } else {
                res.status(500).send(e);
              }
            }
          );
        })
        .catch((e) => res.status(500).send(e));
    });
  });
});

router.get("/:handle", async (req, res) => {
  const user = await User.findOne(req.params.handle)._id;

  const opts = [
    {
      path: "user",
      select: "handle photo firstName lastName -_id",
    },
  ];

  Profile.findOne({ user })
    .populate(opts)
    .then((profile) => res.status(200).json(profile))
    .catch((e) => res.status(404).json(e));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const found = await User.findOne({ email });

  if (found) {
    const match = await bcrypt.compare(password, found.password);

    if (match) {
      const opts = [
        {
          path: "user",
          select: "handle photo firstName lastName -_id",
        },
      ];

      Profile.findOne({ user: found._id })
        .populate(opts)
        .then((profile) => {
          jwt.sign(
            { id: found._id, handle: found.handle },
            secret,
            (e, theJWT) => {
              if (!e) {
                res.status(201).json({
                  token: theJWT,
                  profile,
                });
              } else {
                res.status(500).send(e);
              }
            }
          );
        })
        .catch((e) => res.status(500).send(e));
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      handle: req.body.handle,
    };

    User.findOneAndUpdate({ _id: req.user.id }, userData, {
      new: true,
      runValidators: true,
      context: "query ",
    })
      .select("handle photo firstName lastName -_id")
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((e) => {
        res.status(404).json(e);
      });
  }
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileData = {
      profilePhoto: req.body.profilePhoto,
      location: req.body.location,
      occupation: req.body.occupation,
      bio: req.body.bio,
      cuisine: req.body.cuisine,
      favoriteFood: req.body.favoriteFood,
    };

    const opts = [
      {
        path: "user",
        select: "handle photo firstName lastName -_id",
      },
    ];

    Profile.findOneAndUpdate({ user: req.user.id }, profileData, {
      new: true,
    })
      .populate(opts)
      .then((profile) => res.status(200).json(profile))
      .catch((e) => res.status(404).json(e));
  }
);

module.exports = router;
