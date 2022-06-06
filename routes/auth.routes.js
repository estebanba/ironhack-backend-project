const router = require("express").Router();

// Middlewares 
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");

// bcrypt //

const bcryptjs = require("bcryptjs");
const saltRounds = 10
const salt = bcryptjs.genSaltSync(saltRounds)

// SIGNUP //

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut, async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const salt = await bcryptjs.genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(password, salt);

        await User.create( { username, password: hashedPassword, email });
        res.redirect("/user-profile");
    } catch (error) {
        console.log("error: ", error)
    }
})


router.get("/login",isLoggedOut, (req,res,next) => {
    res.render("auth/login")
})

router.post("/login", isLoggedOut, async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        if (email === "" || password === "") {
            res.render("auth/login", 
            //Error handling pending 
            /*{
              errorMessage: "Please enter both, email and password to login.",
            }*/);
            return;
          }
          const userLogged = await User.findOne({ email });
        if (!userLogged) {
            res.render("auth/login", {
            errorMessage: "User does not exist. Try again please",
            });
             return;
        } else if (bcryptjs.compareSync(password, userLogged.password)) {
            //currentUser = userLogged
            console.log("SESSION =====> ", req.session);
            req.session.currentUser = userLogged;
            res.redirect("/user-profile");
            //res.render("users/user-profile", { userLogged });
        } else {
            res.render("auth/login", /*{ errorMessage: "wrong password" }*/);
        }
            } catch (error) {
                console.log(error)
    }
})

module.exports = router;