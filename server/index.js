const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const todoRoutes = require("./routes/todoItem");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
const PORT = 3000;
app.use(cors());
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
// app.get("/", (req, res) => {
//   res.render("home");
// });

app.use("/", todoRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port http://localhost:3000");
});
