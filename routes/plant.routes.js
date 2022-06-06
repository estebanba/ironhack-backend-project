const router = require("express").Router();

const Plant = require('../models/Plant.model');

router.get("/", async (req, res, next) => {
  let allPlants = await Plant.find();
  res.render("plant/type-list", {allPlants});
});

router.get("/create", (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
  const plantId = req.params.id
  let plant = await Plant.findById(plantId)
  res.render("plant/type-detail", { plant })
});


module.exports = router;