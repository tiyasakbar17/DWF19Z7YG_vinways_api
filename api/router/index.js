const {
  loginController,
  registerController,
} = require("../controller/authController");
const { getUsers, deleteUser } = require("../controller/UserController");
const { uploadFile } = require("../middlewares/uploadFile");
const router = require("express").Router();

router.get("/users/", getUsers);
router.delete("/user/:id", deleteUser);
router.post("/login/", loginController);
router.post("/register/", registerController);
router.post("/artist/", uploadFile("img", null), (req, res) => {
  res.json({ message: "Cek Angin" });
});

module.exports = router;
