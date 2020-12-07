const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { jwtRoleAuth } = require("../middlewares/auth"); // Value 1 = admin 2 = userbiasa
const {
  loginController,
  registerController,
} = require("../controller/authController");
const { getUsers, deleteUser } = require("../controller/userController");
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
} = require("../controller/artistController");
const {
  getTransactions,
  getTransaction,
  addTransaction,
  editTransaction,
} = require("../controller/transactionControler");

//AUTH(LOGIN & REGISTER)
router.post("/login/", upload.none(), loginController);
router.post("/register/", upload.none(), registerController);

//USER
router.get("/users/", getUsers);
router.delete("/user/:id", deleteUser);

//MUSIC
router.get("/musics/", jwtRoleAuth(2), getMusics);
router.get("/music/:id", jwtRoleAuth(2), getMusic);
router.post(
  "/music/",
  jwtRoleAuth(1),
  uploadFile("thumbnail", "attachment"),
  addMusic
);
router.patch(
  "/music/:id",
  jwtRoleAuth(1),
  uploadFile("thumbnail", "attachment"),
  editMusic
);
router.delete("/music/:id", upload.none(), jwtRoleAuth(1), deleteMusic);

//ARTIST
router.get("/artists/", getArtists);
router.get("/artist/:id", getArtist);
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

//TRANSACTION
router.get("/transactions/", getTransactions);
router.get("/transaction/:id", getTransaction);
router.post(
  "/transaction/",
  jwtRoleAuth(1),
  uploadFile("thumbnail", null),
  addTransaction
);
router.patch(
  "/transaction/:id",
  jwtRoleAuth(1),
  uploadFile("thumbnail", null),
  editTransaction
);

module.exports = router;
