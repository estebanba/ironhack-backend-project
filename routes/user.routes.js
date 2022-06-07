const router = require("express").Router();

// Middlewares 
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");

let confirmPassword = false

router.get("/",isLoggedIn, (req, res, next) => {
    res.render("user/user-profile", { userInSession: req.session.currentUser });
  });


  module.exports = router;