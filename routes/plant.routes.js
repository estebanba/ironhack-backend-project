const router = require("express").Router();

const {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
} = require("../middleware/route-guard.js");

const Plant = require("../models/Plant.model");
const UserPlant = require("../models/UserPlant.model");

router.get("/", async (req, res, next) => {
  try {
    let allPlants = await Plant.find();
    res.render("plant/type-list", {
      allPlants,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/create", isLoggedIn, isAdmin, (req, res, next) => {
  try {
    res.render("plant/type-create", {userInSession: req.session.currentUser});
  } catch (error) {
    res.redirect("/plant");
  }
});

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await Plant.create(req.body);
    res.render("plant/type-list", {
      data,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    let allPlants = await Plant.find();
    res.render("plant/type-list", {
      allPlants,
      errorMessage:
        "There was en error creating your plant, please try again later",
      userInSession: req.session.currentUser,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const plantId = req.params.id;
    let plant = await Plant.findById(plantId);
    res.render("plant/type-detail", {
      plant,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    res.redirect("/plant");
  }
});

module.exports = router;
