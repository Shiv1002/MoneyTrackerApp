const mongoose = require("mongoose");

const connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "MoneyTrackerApp",
      })
      .then(resolve("Database connected"))
      .catch((e) => reject("DB connection failed " + e.message));
  });
};

module.exports = connectMongo;
