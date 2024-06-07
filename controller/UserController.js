const { isEmail } = require("validator");
const User = require("../model/User");
const login = async (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);
  // empty data
  if (!email || !password) {
    req.flash("info", {
      text: "email or password cannot be empty",
      type: "error",
    });
    return res.redirect("login");
  }

  //invalid email
  if (!isEmail(email)) {
    // return next(new ErrorHandler("Invalid email", 404));
    req.flash("info", { text: "Invalid email", type: "error" });
    return res.redirect("login");
  }

  let user = await User.findOne({ email });

  // if user not exist
  if (!user) {
    // return next(new ErrorHandler("user not exist", 404));
    req.flash("info", { text: "user not exist", type: "error" });
    return res.redirect("login");
  }

  // password not matched
  let passMatch = await user.verifyPassword(password);
  if (!passMatch) {
    // return next(new ErrorHandler("Password not matched", 404));
    req.flash("info", { text: "Password does not matched", type: "error" });
    return res.redirect("login");
  }

  req.session.username = user.username;
  req.session.userid = user._id;

  // redirect to home page
  req.flash("info", { text: "Logged In successfully!!", type: "success" });
  return res.redirect("/");
};

const signup = async (req, res, next) => {
  // const { name, username, email, password, gender } = req.body;
  let username = String(req.body.username);
  let email = String(req.body.email);
  // console.log(req.body, req.file);

  // check if email or user already exist
  let user = await User.find({
    $or: [{ username: username }, { email: email }],
  });
  // console.log(user);
  if (user.length) {
    return res.render("SignUp", { text: "Account Exist", type: "error" });
  }
  // filter confirm-password kkey
  filteredkeys = Object.keys(req.body).filter(
    (key) => key != "confirm-password"
  );
  const filteredObject = filteredkeys.reduce((obj, key) => {
    return { ...obj, [key]: req.body[key] };
  }, {});

  let new_user = await User({
    ...filteredObject,
  });

  try {
    // new user returned
    const user = await new_user.save();
    if (user) {
      req.flash("info", {
        text: "Account created successfully!",
        type: "success",
      });
    }

    // set current user session
    req.session.username = user.username;
    req.session.userid = user._id;

    return res.redirect("Login");
  } catch (e) {
    return res.render("SignUp", { text: e.message, type: "error" });
  }
};

const checkUsername = async (req, res) => {
  let term = String(req.body.searchTerm);

  let user = await User.findOne({ username: term }).catch((e) => {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  });
  if (user)
    return res.status(200).json({
      success: true,
      userExist: true,
    });
  return res.status(200).json({
    success: true,
    userExist: false,
  });
};
const forgotpass = () => {};

module.exports = { login, signup, forgotpass, checkUsername };
