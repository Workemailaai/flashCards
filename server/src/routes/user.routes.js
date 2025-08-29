const router = require("express").Router();
const UserController = require("../controllers/User.controller");

router
  .get("/", UserController.getAllUsers)
  .post("/login", UserController.login)
  .get("/:id", UserController.getUserById)
  .post("/", UserController.createUser)
  .put("/:id", UserController.updateUser)
  .delete("/:id", UserController.deleteUser);

module.exports = router;
