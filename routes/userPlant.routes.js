const router = require("express").Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");
const Plant = require('../models/Plant.model');
const UserPlant = require('../models/UserPlant.model');
const { redirect } = require("express/lib/response");

router.get("/", isLoggedIn, async (req, res, next) => {
  const ownerId = await User.find(req.session.currentUser)
  let myPlants = await UserPlant.find({owner: ownerId[0].id}).populate("plantType");
  res.render("userPlant/my-list", { myPlants });
});

router.get("/create", isLoggedIn, async (req, res, next) => {
  const plantType = await Plant.find()
  res.render("userPlant/my-create", { plantType });
});

router.post("/create", async (req, res) => {
  try {
      const data = req.body;
      const ownerId = await User.find(req.session.currentUser)
      // console.log("Owner ID: ", ownerId);
      await UserPlant.create({ ...data, owner: ownerId[0].id });
      res.redirect("/userPlant");
  } catch (error) {
      console.log("error: ", error)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  const plantId = req.params.id
  let plant = await UserPlant.findById(plantId).populate("plantType")
  const plantType = await Plant.find()
  res.render("userPlant/my-edit", { plant, plantType })
});

router.post('/:id/edit', async (req, res, next) => {
  const plantId = req.params.id
  await UserPlant.findByIdAndUpdate(plantId, {name : req.body.name, plantType : req.body.plantType, location : req.body.location, comments : req.body.comments})
  res.redirect("/userPlant");
})

router.post("/:id/delete", async (req,res,next) =>{
  console.log(req.params.id)
  const plantId = req.params.id
  await UserPlant.findByIdAndDelete(plantId)
  res.redirect("/userPlant");
})

module.exports = router;