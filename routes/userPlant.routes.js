const router = require("express").Router();

const calcNextDate = require("../utils/calcNextDate");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");
const Plant = require("../models/Plant.model");
const UserPlant = require("../models/UserPlant.model");
const { redirect } = require("express/lib/response");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const ownerId = await User.find(req.session.currentUser);
    let myPlants = await UserPlant.find({ owner: ownerId[0].id }).populate(
      "plantType"
    );
    // let myWatering = await (await UserPlant.find({owner: ownerId[0].id})).populate("plantType");
  
    // let patatas = myPlants.forEach(eachPlant => {
    //   eachPlant.lastWatering
    // })

    // let receivedDate = myPlants[10].lastWatering
    // let shortDate = receivedDate.toISOString().split("T");
    res.render("userPlant/my-list", { myPlants });
  } catch (error) {
    res.render("user-profile", {
      errorMessage:
        "An error occurred while charging your plants, please try again later",
    });
  }
});

// router.post("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const ownerId = await User.find(req.session.currentUser)
//     let myPlants = await UserPlant.find({owner: ownerId[0].id}).populate("plantType");
//     res.render("userPlant/my-list", { myPlants });
//   } catch (error) {

//   }

// });

router.get("/create", isLoggedIn, async (req, res, next) => {
  try {
    const plantType = await Plant.find();
    res.render("userPlant/my-create", { plantType });
  } catch (error) {
    res.render("userPlant/my-create", {
      plantType,
      errorMessage:
        "Error occurred while trying to create a plant. Try again later",
    });
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const data = req.body;

    const watering = await Plant.findById(data.plantType);

    const date = new Date(data.lastWatering);
    const today = new Date()
    let epochNumber = date.setDate(date.getDate() + watering.wateringWeekly);
    console.log(">>>>>>>>>> epochNumber: ", "day picked--->",date.setDate(date.getDate()),"7 days ago---->",today.setDate(today.getDate()-7) ,"tomorrow", today.setDate(today.getDate()+1));
    let dateNumber = new Date(epochNumber);
    console.log(">>>>>>>>>> dateNumber: ", dateNumber);
    let calcWatering = dateNumber
      .toLocaleString()
      .slice(0, dateNumber.toLocaleString().indexOf(","))
      .split("/")
      .reverse()
      .join("-");

    const ownerId = await User.find(req.session.currentUser);
    await UserPlant.create({
      ...data,
      nextWatering: calcWatering,
      owner: ownerId[0].id,
    });
    res.redirect("/userPlant");
  } catch (error) {
    console.log(error)
    if (error.message.includes("lastWatering: Path")) {
      const plantType = await Plant.find();
      res.render("userPlant/my-create", {
        plantType,
        errorMessage: "Provide a valid date",
      });
    }
  }
});

router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const plantId = req.params.id;
    let plant = await UserPlant.findById(plantId).populate("plantType");
    const plantType = await Plant.find();
    res.render("userPlant/my-edit", { plant, plantType });
  } catch (error) {
    res.redirect("user-profile", {
      errorMessage: "An error occurred while editing a plant",
    });
  }
});

router.post("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const plantId = req.params.id;
    await UserPlant.findByIdAndUpdate(plantId, {
      name: req.body.name,
      plantType: req.body.plantType,
      location: req.body.location,
      comments: req.body.comments,
    });
    res.redirect("/userPlant");
  } catch (error) {
    res.redirect("user-profile", {
      errorMessage: "An error occurred while editing a plant",
    });
  }
});

router.post("/:id/delete", isLoggedIn, async (req, res, next) => {
  try {
    const plantId = req.params.id;
    await UserPlant.findByIdAndDelete(plantId);
    res.redirect("/userPlant");
  } catch (error) {
    res.redirect("user-profile", {
      errorMessage: "An error occurred while deleting a plant",
    });
  }
});
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const plantId = req.params.id;
    let { plantType } = await UserPlant.findById(plantId);
    let plant = await Plant.findById(plantType);
    res.render("plant/type-detail", { plant });
  } catch (error) {

  }
});

router.post("/:id/watered", async (req, res, next) => {
  try {
    const plantId = req.params.id;
    const wateredPlant = await UserPlant.findById(plantId).populate("plantType");
    const date = new Date();
    const epochNumberLast = date.setDate(date.getDate());
    const epochNumberNext = date.setDate(
      date.getDate() + wateredPlant.plantType.wateringWeekly
    );
    let dateNumberLast = new Date(epochNumberLast);
    let dateNumberNext = new Date(epochNumberNext);
    let calcWateringLast = dateNumberLast
      .toLocaleString()
      .slice(0, dateNumberLast.toLocaleString().indexOf(","))
      .split("/")
      .reverse()
      .join("-");
    let calcWateringNext = dateNumberNext
      .toLocaleString()
      .slice(0, dateNumberNext.toLocaleString().indexOf(","))
      .split("/")
      .reverse()
      .join("-");
    await UserPlant.findByIdAndUpdate(plantId, {
      lastWatering: calcWateringLast,
      nextWatering: calcWateringNext,
    });
    res.redirect("/userPlant");
  } catch (error) {
    res.redirect("userPlant")
  }
});

module.exports = router;
