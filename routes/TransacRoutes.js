const router = require("express").Router();
const {
  addExpense,
  addCategory,
  deleteExpense,
  getHistory,
} = require("../controller/transactionController");
router.route("/add-expense").post(addExpense);
router.route("/delete-expense/:id").post(deleteExpense);
router.route("/add-category").post(addCategory);
router.route("/history/:userid").get(getHistory);

module.exports = router;
