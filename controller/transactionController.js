const { isNumeric } = require("validator");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");
const getTodayDate = require("../utils/getTodayDate");
const { Chart } = require("chart.js");
const htmlElement = require("html-element");
const addExpense = async (req, res, next) => {
  console.log(req.body);
  if (!isNumeric(req.body.amount)) {
    req.flash("info", { text: "Enter numeric amount", type: "error" });
    return res.redirect("/");
  }
  const newExpense = {
    amount: Number(req.body.amount),
    category: req.body.category,
    description: req.body.description,
    date: new Date(),
  };
  try {
    const result = await Transaction.updateOne(
      {
        userId: req.session.userid,
        date: getTodayDate(),
      },
      { $push: { transaction: newExpense } },
      {
        upsert: true,
      }
    );

    if (result.modifiedCount || result.upsertedCount) {
      return res.redirect("/");
    }
  } catch (e) {
    console.error(e.message);
    req.flash("info", { text: e.message, type: "error" });
    return res.redirect("/");
  }
};

const deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Transaction.updateOne(
      {
        userId: req.session.userid,
        date: getTodayDate(),
      },
      { $pull: { transaction: { _id: id } } }
    );
    if (result.modifiedCount) {
      return res.redirect("/");
    }
  } catch (e) {
    console.log(e.message);
    req.flash("info", { text: e.message, type: "error" });
    return res.redirect("/");
  }
};
const getHistory = async (req, res, next) => {
  const { userid } = req.params;

  try {
    // get previous transaction data in sort
    const history = await Transaction.find({ userId: userid }).sort({
      date: -1,
    });
    const categoryData = await Category.find({ userId: userid });
    const catMp = categoryData.reduce((obj, key) => {
      if (key.type == "Income") {
        return { ...obj, [key.name]: "Income" };
      }
      return { ...obj, [key.name]: "Expense" };
    }, {});

    const weekExpense = [];

    // category wise spending and income
    for (let i = 0; i < history.length; i++) {
      let cats = {};
      let spend = 0;
      let gains = 0;
      let list = history[i].transaction.map(
        // transaction
        (t) => {
          // if category is income then it is a gain else spend otherwise
          if (catMp[t.category] == "Income") gains += t.amount;
          else spend += t.amount;

          // category wise total amount spend
          if (cats[t.category]) {
            cats[t.category] += t.amount;
          } else {
            cats[t.category] = t.amount;
          }
        }
      );
      weekExpense.push({
        date: history[i].date,
        dataset: cats,
        status: {
          spend: spend,
          gains: gains,
        },
      });
    }

    return res.render("History", { history: history, weekExpense });
  } catch (e) {
    console.log(e.message);
    req.flash("info", { text: e.message, type: "error" });
    return res.redirect("/");
  }
};
const addCategory = async (req, res, next) => {
  console.log(req.body);
  const name = req.body.category;
  const type = req.body.categoryType;

  const new_cat = new Category({
    userId: req.session.userid,
    name: name,
    type: type,
    createdAt: getTodayDate(),
  });
  try {
    await new_cat.save();
    req.flash("info", { text: "category successfully added", type: "success" });
  } catch (e) {
    req.flash("info", { text: e.message, type: "error" });
  }
  return res.redirect("/");
};

module.exports = { addExpense, addCategory, deleteExpense, getHistory };
