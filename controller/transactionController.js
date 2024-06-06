const { isNumeric } = require("validator");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");
const getTodayDate = require("../utils/getTodayDate");

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

module.exports = { addExpense, addCategory, deleteExpense };
