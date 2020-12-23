const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { jwtRoleAuth } = require("../middlewares/auth"); // Value 1 = admin 2 = userbiasa
const {
  loginController,
  registerController,
  findUserByToken,
  changePict,
  likeHandler,
} = require("../controller/authController");
const { uploadFile } = require("../middlewares/uploadFile");
const {
  getMusics,
  getMusic,
  addMusic,
  editMusic,
  deleteMusic,
} = require("../controller/musicController");
const {
  getArtists,
  getArtist,
  addArtist,
  editArtist,
  deleteArtist,
} = require("../controller/artistController");
const {
  getTransactions,
  getTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getUserTransactions,
} = require("../controller/transactionControler");

//AUTH(LOGIN & REGISTER)
router.post("/login/", upload.none(), loginController);
router.post("/register/", upload.none(), registerController);
router.get("/getData/", jwtRoleAuth(2), findUserByToken);
router.patch(
  "/changePicture/",
  jwtRoleAuth(2),
  uploadFile("thumbnail", null),
  changePict
);
router.post("/like/:songId", jwtRoleAuth(2), likeHandler);

//MUSIC
router.get("/songs/", jwtRoleAuth(2), getMusics);
router.get("/song/:id", jwtRoleAuth(2), getMusic);
router.post(
  "/song/",
  jwtRoleAuth(1),
  uploadFile("thumbnail", "attachment"),
  addMusic
);
router.patch(
  "/song/:id",
  jwtRoleAuth(1),
  uploadFile("thumbnail", "attachment"),
  editMusic
);
router.delete("/song/:id", upload.none(), jwtRoleAuth(1), deleteMusic);

//ARTIST
router.get("/artists/", jwtRoleAuth(2), getArtists);
router.get("/artist/:id", jwtRoleAuth(2), getArtist);
router.post(
  "/artist/",
  jwtRoleAuth(1),
  uploadFile("thumbnail", null),
  addArtist
);
router.patch(
  "/artist/:id",
  jwtRoleAuth(1),
  uploadFile("thumbnail", null),
  editArtist
);
router.delete("/artist/:id", jwtRoleAuth(1), deleteArtist);

//TRANSACTION
router.get("/transactions/", jwtRoleAuth(1), getTransactions);
router.get("/transaction/:id", jwtRoleAuth(1), getTransaction);
router.get("/usertransactions/", jwtRoleAuth(2), getUserTransactions);
router.post(
  "/transaction/",
  jwtRoleAuth(2),
  uploadFile("thumbnail", null),
  addTransaction
);
router.patch(
  "/transaction/:id",
  jwtRoleAuth(1),
  uploadFile("thumbnail", null),
  editTransaction
);
router.delete("/transaction/:id", jwtRoleAuth(1), deleteTransaction);

module.exports = router;
