const express = require("express");
const passport = require("passport");

const userRoutes = require("./user_routes");
const feedRoutes = require("./feed_routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use(
  "/feed",
  passport.authenticate("jwt", { session: false }),
  feedRoutes
);

module.exports = router;
