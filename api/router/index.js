const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("SELAMAT, SERVER BERHASIL");
});

module.exports = router;
