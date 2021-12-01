const { Router } = require("express");
const { postController } = require("../controllers/post.controller");
const authMiddleware = require("../models/middlewares/auth.middleware");

const router = Router();

router.get("/", postController.getPost);
router.post("/post", authMiddleware, postController.createPost);
router.patch("/post/:id", authMiddleware, postController.editPost);
router.delete("/post/:id", authMiddleware, postController.deletePost);
router.post("/post/upload", postController.addImage);

module.exports = router;
