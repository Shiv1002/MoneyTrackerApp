module.exports = (req, res, next) => {
  if (req.session.userid) {
    res.redirect("/");
  } else {
    next();
  }
};
