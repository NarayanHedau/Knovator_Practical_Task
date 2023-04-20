const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        name: { type: String},
        birthDate: { type: Date},
        gender: { type: String},
        email: { type: String,  },
        mobile: { type: String },
        password:{type:String}
      },
      { timestamps: true }
   
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;


