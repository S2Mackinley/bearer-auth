
"use strict";

const base64 = require("base-64");
const User = require("../models/users.js");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop(); // added a lil split and pop to get things moving
  let [user, pass] = base64.decode(basic).split(":");
  console.log("basic mw",user,pass)
  try {
    req.user = await User.authenticateBasic(user, pass);
    next();
  } catch (e) {
    res.status(403).send("Invalid Login ERROR");
  }
};