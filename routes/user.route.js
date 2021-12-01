const { Router } = require("express");
const { userController } = require("../controllers/user.controller");

const router = Router();

router.post("/registration", userController.registrationUser);
router.post("/login", userController.login);

module.exports = router;
