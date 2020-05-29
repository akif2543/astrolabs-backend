require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

export const getJWT = (id, handle) => {
  const payload = { id, handle };
  return jwt.sign(payload, secret, (err, token) => {
    return err ? null : token;
  });
};

export const comparePasswords = async (password, savedPassword) =>
  bcrypt.compare(password, savedPassword);

export const hashPassword = (password) => {
  bcrypt.genSalt((err, salt) => {
    if (err) {
      console.log("error is", err);
    }

    bcrypt.hash(password, salt, async (error, hashedPassword) => {
      if (error) {
        console.log("error is", error);
      }
      return hashedPassword;
    });
  });
};
