const router = require("express").Router();

const { isLoggedIn, isLoggedOut, isAdmin } = require("../middleware/route-guard.js");

const Plant = require('../models/Plant.model');

router.get("/", (req, res, next) => {
  res.render("plant/type-list");
});

router.get("/create", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("plant/type-create");
});

router.post("/create", async (req, res) => {
  try {
      const data = req.body;
      await Plant.create(req.body);
      console.log("new plant added")
      res.render("plant/type-list", {data});
  } catch (error) {
      console.log("error: ", error)
  }
})

module.exports = router;