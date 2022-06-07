const router = require("express").Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");
const Plant = require('../models/Plant.model');
const UserPlant = require('../models/UserPlant.model');
const { sendStatus } = require("express/lib/response");

router.get("/", isLoggedIn, async (req, res, next) => {
  const ownerId = await User.find(req.session.currentUser)
  let myPlants = await UserPlant.find({owner: ownerId[0].id}).populate("plantType");
  console.log(myPlants)
  // let myWatering = await (await UserPlant.find({owner: ownerId[0].id})).populate("plantType");
  // console.log(">>>>", myWatering)
  // let patatas = myPlants.forEach(eachPlant => {
  //   eachPlant.lastWatering
  // })
  // console.log(">>>>>>>", patatas)
  // let receivedDate = myPlants[10].lastWatering
  // let shortDate = receivedDate.toISOString().split("T");
  // console.log(shortDate[0])
  res.render("userPlant/my-list", { myPlants });
});

router.post("/", isLoggedIn, async (req, res, next) => {
  
  const ownerId = await User.find(req.session.currentUser)
  let myPlants = await UserPlant.find({owner: ownerId[0].id}).populate("plantType");
  res.render("userPlant/my-list", { myPlants });
});

router.get("/create", isLoggedIn, async (req, res, next) => {
  const plantType = await Plant.find()
  res.render("userPlant/my-create", { plantType });
});

router.post("/create", async (req, res, next) => {
  try {
      const data = req.body;
      console.log("last watering: ", data.lastWatering, typeof data.lastWatering)
      // console.log(">>>>>>>>>>>> general plant id: ", data.plantType);
      
      const watering = await Plant.findById(data.plantType)
      console.log(">>>>>>>>>> watering weekly:", watering.wateringWeekly)

      const date = new Date (data.lastWatering)
      let epochNumber = date.setDate(date.getDate() + watering.wateringWeekly);
      console.log(">>>>>>>>>> epochNumber: ", epochNumber)
      let dateNumber = new Date (epochNumber)
      console.log(">>>>>>>>>> dateNumber: ", dateNumber)
      let calcWatering = dateNumber.toLocaleString().slice(0, 10)
      console.log("<<<<<<<<< CALCWATERING:", calcWatering, typeof calcWatering)
      
      const ownerId = await User.find(req.session.currentUser)
      // console.log("Owner ID: ", ownerId);
      await UserPlant.create({ ...data, nextWatering: calcWatering, owner: ownerId[0].id});
      res.redirect("/userPlant");
  } catch (error) {
      console.log("error: ", error)
  }
})

router.get('/:id', async (req, res, next) => {
  const plantId = req.params.id
  let { plantType } = await UserPlant.findById(plantId);
  // console.log(plantType);
  let plant = await Plant.findById(plantType);
  // console.log(plant);
  res.render("plant/type-detail", { plant })
});

module.exports = router;