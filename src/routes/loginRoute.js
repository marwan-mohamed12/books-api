let express = require("express");
const router = express.Router(),
    { signIn, getUserProfile } = require("../controller/loginController"),
    { verifyToken } = require("../util/jwtUtil");

router.get("/login/profile/:userId", verifyToken(["user"]), getUserProfile);
router.post("/login/signIn", signIn);

module.exports = router;
