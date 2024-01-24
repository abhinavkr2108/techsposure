const {Router} = require("express");
const router = Router();

const {createPost,getPosts,getSinglePost,getCategoryPosts,getAuthorPosts,editPost,deletePost} = require("../controllers/PostController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/create-post", authMiddleware, createPost);
router.get("/all-posts", getPosts);
router.get("/:id", getSinglePost);
router.get("/categories/:category", getCategoryPosts);
router.get("/users/:id", getAuthorPosts);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);




module.exports = router;
