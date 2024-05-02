const express = require("express");
const validateToken = require("../middleware/validatetokenhandler");
const { registerUser, loginUser, currentUser } = require("../controllers/usercontroller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;