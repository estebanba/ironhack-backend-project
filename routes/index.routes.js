const router = require("express").Router();



/* GET home page */
router.get("/", (req, res, next) => {
<<<<<<< HEAD
  res.render("index", {userInSession: req.session.currentUser});
=======
  res.render("index", { userInSession: req.session.currentUser });
>>>>>>> style
});

module.exports = router;
