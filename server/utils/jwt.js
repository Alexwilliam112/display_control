"use strict";
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

module.exports = {
  verifyToken: (token) => {
    return jwt.verify(token, secretKey);
  },

  signToken: (payload) => {
    return jwt.sign(payload, secretKey);
  },
};
