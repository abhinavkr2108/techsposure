const {Router} = require("express");
const router = Router();

const {registerUser, loginUser, viewUserProfile, changeUserAvatar, editUserDetails, viewAllAuthors} = require("../controllers/UserController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:id", viewUserProfile);
router.post("/change-avatar",authMiddleware, changeUserAvatar);
router.patch("/edit-user", authMiddleware, editUserDetails);
router.get("/authors", viewAllAuthors);


module.exports = router;
