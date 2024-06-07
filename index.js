const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const { isAuthentic } = require("./middlewares/isAuthenticated");
const isLogged = require("./middlewares/isLogged");
const flash = require("connect-flash");
const catchAsync = require("express-async-handler");
const userRoutes = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
const connectMongo = require("./data/DatabaseConfig");
const sessionStore = require("./data/SessionStoreConfig");
const alreadyLogged = require("./middlewares/alreadyLogged");
const Category = require("./model/Category");
const Transaction = require("./model/Transaction");
const getTodayDate = require("./utils/getTodayDate");
const transacRoutes = require("./routes/TransacRoutes");
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());

connectMongo()
  .then((r) => console.log(r))
  .catch((e) => console.log(e.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, //30mintue
    },
    resave: false,
    saveUninitialized: false,
  })
);
const PORT = process.env.PORT || 1002;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(flash());

app.get(
  "/",
  isLogged,
  catchAsync(async (req, res, next) => {
    const userid = req.session.userid;
    const categories = await Category.find({ userId: userid });
    const transactions = await Transaction.findOne({
      userId: userid,
      date: getTodayDate(),
    });

    res.render("Home", {
      toast: { ...req.flash("info")[0] },
      userid,
      username: req.session.username,
      categories,
      transactions: transactions?.transaction,
    });
  })
);

app.use("/users", alreadyLogged, userRoutes);
app.use("/transactions", isLogged, transacRoutes);

app.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("connect.sid", {
        path: "/",
        domain: "localhost",
        sameSite: "none",
        secure: true,
      });
      return res.redirect("/");
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Internal server error!!");
});
app.use((req, res, next) => {
  res.send("Not found!!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} 🔥`);
});
