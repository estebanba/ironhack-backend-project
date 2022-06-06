const router = require("express").Router();

const User = require("../models/User.model");
const Plant = require('../models/Plant.model');
const UserPlant = require('../models/UserPlant.model');

router.get("/", (req, res, next) => {
  res.render("userPlant/my-list");
});

router.get("/create", async (req, res, next) => {
  const plantType = await Plant.find()
  res.render("userPlant/my-create", { plantType });
});

router.post("/create", async (req, res) => {
  try {
      const data = req.body;
      const ownerId = await User.find(req.session.currentUser)
      
      // console.log("Owner ID: ", ownerId);
      await UserPlant.create({ ...data, owner: ownerId[0].id });
      res.render("userPlant/my-list");
  } catch (error) {
      console.log("error: ", error)
  }
})

module.exports = router;