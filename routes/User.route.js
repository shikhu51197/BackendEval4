const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
      });
      await user.save();
      res.send({ msg: "register success" });
      console.log("User registered successfully");
    });
  } catch (err) {
    res.send({ msg: "Error to register user", "err": err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ myapp: user[0]._id }, "mypostapp");
          res.send({ msg: "login success", token: token });
        } else {
          res.send("user not found");
        }
      });
    } else {
      res.send("user not found");
    }
  } catch (err) {
    res.send({ msg: "Error to register user", err: err.message });
  }
});

module.exports = { userRouter };
