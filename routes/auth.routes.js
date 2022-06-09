const router = require("express").Router();

// Middlewares
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const User = require("../models/User.model");

// bcrypt //

const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);

// SIGNUP //

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup", { userInSession: req.session.currentUser });
});

router.post("/signup", isLoggedOut, async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.create({
      username,
      password: hashedPassword,
      email,
      role: "user",
    });
    res.redirect("/user-profile");
  } catch (error) {
    if (Object.keys(error.keyValue).includes("username")) {
      res.render("auth/signup", {
        errorMessage: "User already in use",
        userInSession: req.session.currentUser,
      });
    } else if (Object.keys(error.keyValue).includes("email")) {
      res.render("auth/signup", {
        userInSession: req.session.currentUser,
        errorMessage: "Email already in use",
      });
    }
  }
});

// LOGIN

router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login", { userInSession: req.session.currentUser });
});

router.post("/login", isLoggedOut, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      res.render("auth/login", {
        errorMessage: "Please enter both email and password to login.",
        userInSession: req.session.currentUser,
      });
      return;
    }
    const userLogged = await User.findOne({ email });
    if (!userLogged) {
      res.render("auth/login", {
        errorMessage: `User ${email} does not exist. Try again please`,
        userInSession: req.session.currentUser,
      });
      return;
    } else if (bcryptjs.compareSync(password, userLogged.password)) {
      req.session.currentUser = userLogged;
      res.redirect("/user-profile");
    } else {
      res.render("auth/login", {
        errorMessage: "Password is incorrect, try again please",
        userInSession: req.session.currentUser,
      });
    }
  } catch (error) {
    res.render("auth/login", {
      errorMessage: "Unknown error, please try again",
      userInSession: req.session.currentUser,
    });
  }
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
