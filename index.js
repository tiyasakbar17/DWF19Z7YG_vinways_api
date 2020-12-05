require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./api/router");
// const multer = require("multer");
// const upload = multer();

const app = express();

// for passing cors
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.array());

app.use("/uploads", express.static("uploads"));

//ROUTER To Api
app.use("/api/v1", router);

app.listen(3001, () => {
  console.log("Server are running on port 3001");
});
