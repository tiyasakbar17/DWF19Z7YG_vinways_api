const {
  loginController,
  registerController,
} = require("../controller/authController");
const { getUsers, deleteUser } = require("../controller/UserController");
const { uploadFile } = require("../middlewares/uploadFile");
const router = require("express").Router();
const multer = require("multer");
const { jwtRoleAuth } = require("../middlewares/auth");
const {
  getMusics,
  getMusic,
  addMusic,
  editMusic,
  deleteMusic,
} = require("../controller/musicController");
const upload = multer();

//AUTH(LOGIN & REGISTER)
router.post("/login/", upload.none(), loginController);
router.post("/register/", upload.none(), registerController);

//USER
router.get("/users/", getUsers);
router.delete("/user/:id", deleteUser);

//MUSIC
router.get("/musics/", getMusics);
router.get("/music/:id", getMusic);
router.post(
  "/music/",
  jwtRoleAuth(1),
  uploadFile("thumbnail", "attachment"),
  addMusic
);
router.patch(
  "/music/:id",
  uploadFile("thumbnail", "attachment"),
  // jwtRoleAuth(1),
  editMusic
);
router.delete("/music/:id", upload.none(), jwtRoleAuth(1), deleteMusic);

module.exports = router;
