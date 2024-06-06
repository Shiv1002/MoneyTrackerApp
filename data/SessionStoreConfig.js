const mongostore = require("connect-mongo");
require("dotenv").config();

const sessionStore = mongostore.create({
  mongoUrl: process.env.MONGODB_URI,
  dbName: "MoneyTrackerApp",
  ttl: Date.now() + 30 * 60, // 30 minutes
});
module.exports = sessionStore;
