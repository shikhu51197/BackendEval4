const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userschema);
module.exports = { UserModel };
