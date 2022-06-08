const router = require("express").Router();

const {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
} = require("../middleware/route-guard.js");

const Plant = require("../models/Plant.model");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    let allPlants = await Plant.find();
    res.render("plant/type-list", { allPlants });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/create", isLoggedIn, isAdmin, (req, res, next) => {
  try {
    res.render("plant/type-create");
  } catch (error) {
    res.redirect("/plant");
  }
});

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await Plant.create(req.body);
    console.log("new plant added");
    res.render("plant/type-list", { data });
  } catch (error) {
    console.log("error: ", error);
    let allPlants = await Plant.find();
    res.render("plant/type-list", {
      allPlants,
      errorMessage:
        "There was en error creating your plant, please try again later",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const plantId = req.params.id;
    let plant = await Plant.findById(plantId);
    res.render("plant/type-detail", { plant });
  } catch (error) {
    res.redirect("/plant")
  }
});

module.exports = router;
