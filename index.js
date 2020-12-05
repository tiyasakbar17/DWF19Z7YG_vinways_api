require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./api/router");

const app = express();

// for passing cors
app.use(cors());
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

//ROUTER To Api
app.use("/api/v1", router);

app.listen(3001, () => {
  console.log("Server are running on port 3001");
});
