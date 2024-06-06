const router = require("express").Router();
const {
  addExpense,
  addCategory,
  deleteExpense,
} = require("../controller/transactionController");
router.route("/add-expense").post(addExpense);
router.route("/delete-expense/:id").post(deleteExpense);
router.route("/add-category").post(addCategory);

module.exports = router;
