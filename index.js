const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
const { postRouter } = require("./routes/Post.route");
const cors = require("cors");
const { Authenticate } = require("./middleware/Authenticate");

app.use(cors());

app.get('/' , (req, res) => {
    console.log("welcome to homepage")
    res.send("Homepage")

})


app.use("/users" , userRouter)
app.use(Authenticate)
app.use("/posts" , postRouter)

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("connected to database");
  } catch (err) {
    console.log("error connecting to database")
  }
  console.log(`listening on ${process.env.port}`)
});
