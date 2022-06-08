// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/');
    }
    next();
  };
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the profile page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/user-profile');
    }
    next();
  };
//checks if the user has admin rights
  const isAdmin = (req, res, next) => {
    if (req.session.currentUser.role !== "admin") {
      return res.render('user/user-profile', {userInSession: req.session.currentUser, errorMessage : "You don't have access rights, ask permission to admin"});
    }
    next();
  };

  // checks if the user is the owner of the plant 
  const isOwner = (req, res, next) => {
    if (req.session.currentUser.role !== "admin") {
      return res.render('user/user-profile', {userInSession: req.session.currentUser, errorMessage : "You don't have access rights, ask permission to admin"});
    }
    next();
  };
   
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
  };