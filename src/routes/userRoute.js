let express = require("express"),
    router = express.Router(),
    { getUserList, createUser } = require("../controller/userController");

router.get("/users", getUserList);
router.post("/users/createUser", createUser);

module.exports = router;
