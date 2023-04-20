const mongoose = require("mongoose");
const config = require("../config.json")
mongoose.set('strictQuery', true);  // to turn on strictQuery
mongoose.set('strictQuery', false);  // to turn off strictQuery

exports.mongo_connection = () => {
  mongoose.set("debug", true);
  try {
    mongoose.connect(
      config.dbUrl || 'mongodb://127.0.0.1:27017/knovatorDB',
      { useNewUrlParser: true, useFindAndModify: false , useUnifiedTopology: true , useCreateIndex :true },
      function (err, db) {
        if (err) {
          console.log("MongoDB Database Connection Error", err);
        } else {
          console.log("MongoDB Connection Done!!");
        }
      }
    );
  } catch (e) {
    console.log("MongoDB Connection Error");
  }
};
