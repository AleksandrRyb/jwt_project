const Router = require("express").Router;
const userController = require("../controllers/user-controller");

const router = new Router();

router.post("/registration");
router.post("/login");
router.post("/logout");
router.get("/activate/:link");
router.get("/refresh");
router.get("/users", userController.getUsers);

module.exports = router;