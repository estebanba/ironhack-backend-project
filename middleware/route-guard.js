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

  const isAdmin = (req, res, next) => {
    if (req.session.currentUser.role !== "admin") {
      return res.redirect('/user-profile');
    }
    next();
  };
   
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
  };