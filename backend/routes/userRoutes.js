const express = require("express");

const { registerUser , updateUser ,  deleteUser, logout, getUserData } = require("../controllers/userController");
const { login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.put("/update_user/:id", updateUser);
router.delete("/delete/:id", protect , deleteUser);
router.post("/login", login);
router.post("/logout", protect , logout);
router.get('/profile', protect, getUserData)

module.exports = router;
