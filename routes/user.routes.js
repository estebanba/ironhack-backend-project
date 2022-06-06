const router = require("express").Router();


const User = require("../models/User.model");

router.get("/", (req, res, next) => {
    res.render("user/user-profile", { userInSession: req.session.currentUser });
  });

  module.exports = router;