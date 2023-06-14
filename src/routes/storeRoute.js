let express = require("express"),
    router = express.Router(),
    {
        getStoresList,
        addStore,
        deleteStore,
        editStore,
    } = require("../controller/storeController");

router.get("/stores", getStoresList);
router.post("/stores/add", addStore);
router.delete("/stores/delete/:storeId", deleteStore);
router.put("/stores/edit/:storeId", editStore);

module.exports = router;
