const {
  loginController,
  registerController,
} = require("../controller/authController");
const { getUsers, deleteUser } = require("../controller/UserController");
const router = require("express").Router();

router.get("/users/", getUsers);
router.delete("/user/:id", deleteUser);
router.post("/login/", loginController);
router.post("/register/", registerController);

module.exports = router;
