/**
 * Paste one or more documents here
 */
// {
//     "_id": {
//       "$oid": "66602e3149022d20f15eacf3"
//     },
//     "date":"Wed Jun 05 2024 14:45:29 GMT+0530 (India Standard Time)",
//     "transaction":[
//       {"type":"income","amount":4000,"category":"salary"},
//       {"type":"expense","amount":3000,"category":"groceries"},
//       {"type":"expense","amount":400,"category":"appliances"}
//     ]
//   }

const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const singleDaytransactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
    index: true,
  },
  date: {
    type: String,
    required: true,
  },
  transaction: [transactionSchema],
});

module.exports = mongoose.model("Transaction", singleDaytransactionSchema);
