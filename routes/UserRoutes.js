const router = require("express").Router;
const {
  login,
  signup,
  forgotpass,
  checkUsername,
} = require("../controller/UserController");
const isLogged = require("../middlewares/isLogged");
const userRoutes = router();

userRoutes
  .route("/login")
  .get((req, res) => {
    res.render("login", { toast: { ...req.flash("info")[0] } });
  })
  .post(login);

userRoutes
  .route("/signup")
  .get((req, res) => {
    res.render("signup", { toast: { ...req.flash("info")[0] } });
  })
  .post(signup);
userRoutes.post("/check-username", checkUsername);
userRoutes.route("/forgot-password").post(forgotpass);

module.exports = userRoutes;
