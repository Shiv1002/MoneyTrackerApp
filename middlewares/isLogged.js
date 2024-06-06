const isLogged = (req, res, next) => {
  if (req.session.userid) {
    next();
  } else {
    res.redirect("/users/login");
  }
};

module.exports = isLogged;
