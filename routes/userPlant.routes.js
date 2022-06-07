const router = require("express").Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");
const Plant = require('../models/Plant.model');
const UserPlant = require('../models/UserPlant.model');

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("userPlant/my-list");
});

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("userPlant/my-create");
});

router.post("/create", async (req, res) => {
  try {
      const data = req.body;
      await UserPlant.create(req.body);
      res.render("userPlant/my-list", {data});
  } catch (error) {
      console.log("error: ", error)
  }
})

module.exports = router;