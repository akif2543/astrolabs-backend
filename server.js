require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const initPassportStrategy = require("./config/passport");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
initPassportStrategy(passport);

const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB is connected.");
  })
  .catch((err) => {
    console.log("error", err);
  });
mongoose.set("useFindAndModify", false);

app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log("You are connected!");
});
