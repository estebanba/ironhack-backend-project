const router = require("express").Router();

const calcNextDate = require("../utils/calcNextDate");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");
const Plant = require('../models/Plant.model');
const UserPlant = require('../models/UserPlant.model');
const { redirect } = require("express/lib/response");

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
      let calcWatering = dateNumber.toLocaleString().slice(0, 10).split("/").reverse().join("-")
      console.log("<<<<<<<<< CALCWATERING:", calcWatering, typeof calcWatering)
      // const nextDate = calcNextDate(data.lastWatering, watering.wateringWeekly)
      // console.log(nextDate)

      const ownerId = await User.find(req.session.currentUser)
      // console.log("Owner ID: ", ownerId);
      await UserPlant.create({ ...data, nextWatering: calcWatering, owner: ownerId[0].id});
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
router.get('/:id', async (req, res, next) => {
  const plantId = req.params.id
  let { plantType } = await UserPlant.findById(plantId);
  // console.log(plantType);
  let plant = await Plant.findById(plantType);
  // console.log(plant);
  res.render("plant/type-detail", { plant })
});

module.exports = router;