const express = require("express");

const { registerUser , updateUser ,  deleteUser, logout } = require("../controllers/userController");
const { login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", protect , deleteUser);
router.post("/login", login);
router.post("/logout", protect , logout);

module.exports = router;
