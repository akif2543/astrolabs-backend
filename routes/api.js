const express = require("express");
const passport = require("passport");

const userRoutes = require("./userRoutes");
const feedRoutes = require("./feedRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use(
  "/feed",
  passport.authenticate("jwt", { session: false }),
  feedRoutes
);

module.exports = router;
