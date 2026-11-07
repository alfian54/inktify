const router = require("express").Router();
const { signUp, login, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
