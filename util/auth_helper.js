require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const authHelper = {
  getJWT: (id, handle) => {
    const payload = { id, handle };
    return jwt.sign(payload, secret, (err, token) => {
      console.log(token);
      return err ? null : token;
    });
  },
  comparePasswords: (password, savedPassword) =>
    bcrypt.compare(password, savedPassword),

  hashPassword: (password) => {
    return bcrypt.genSalt((err, salt) => {
      if (err) {
        console.log("error is", err);
      }

      return bcrypt.hash(password, salt, async (error, hashedPassword) => {
        if (error) {
          console.log("error is", error);
        }
        return hashedPassword;
      });
    });
  },
};

module.exports = authHelper;
