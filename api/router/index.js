const {
  loginController,
  registerController,
} = require("../controller/authController");
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addUser,
} = require("../controller/UserController");
const router = require("express").Router();

router.get("/users/", getUsers);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);
router.post("/user/", addUser);
router.post("/login/", loginController);
router.post("/register/", registerController);

module.exports = router;
