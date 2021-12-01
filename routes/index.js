const { Router } = require("express");

const router = Router();

router.use(require("./user.route"));
router.use(require("./post.route"));


module.exports = router;
//