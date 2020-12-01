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
// for parsing mutiform data
app.use(express.static("public"));

app.use("/", router);

app.listen(3001, () => {
  console.log("Server are running on port 3000");
});
