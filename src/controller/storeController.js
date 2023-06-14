let queries = require("../db/queires"),
    dbConnection = require("../db/connection"),
    { generateStoreCode } = require("../util/helpers");

exports.getStoresList = async (req, res) => {
    try {
        let storeListQuery = queries.queryList.GET_STORES_LIST_QUERY;
        let result = await dbConnection.dbQuery(storeListQuery);

        return res.status(200).send(result.rows);
    } catch (error) {
        console.log("Error in getStoresList", error);
        return res.status(500).send("Failed to get stores");
    }
};

exports.addStore = async (req, res) => {
    try {
        let createdOn = new Date(),
            createdBy = "admin",
            storeCode = generateStoreCode();

        // req.body
        let { storeName, address } = req.body;

        if (!storeName || !address) {
            return res
                .status(400)
                .send({ error: "Please provide store name and address" });
        }

        let addStoreQuery = queries.queryList.ADD_STORE_QUERY;
        await dbConnection.dbQuery(addStoreQuery, [
            storeName,
            storeCode,
            createdOn,
            createdBy,
            address,
        ]);

        return res.status(201).send("Store created successfully");
    } catch (error) {
        console.log("Error in addStore", error);
        return res.status(500).send("Failed to add store");
    }
};

exports.deleteStore = async (req, res) => {
    try {
        let storeId = req.params.storeId;

        if (!storeId) {
            return res.status(400).send({ error: "Please provide storeId" });
        }

        let deleteStoreQuery = queries.queryList.DELETE_STORE_QUERY;
        await dbConnection.dbQuery(deleteStoreQuery, [storeId]);

        return res.status(200).send("Store deleted successfully");
    } catch (error) {
        console.log("Error in deleteStore", error);
        return res.status(500).send("Failed to delete store");
    }
};

exports.editStore = async (req, res) => {
    try {
        let storeId = req.params.storeId;

        // req.body
        let { storeName, address } = req.body;

        if (!storeId) {
            return res.status(400).send({ error: "Please provide storeId" });
        }

        let editStoreQuery = queries.queryList.EDIT_STORE_QUERY;
        await dbConnection.dbQuery(editStoreQuery, [
            storeName,
            address,
            storeId,
        ]);

        return res.status(200).send("Store Edited successfully");
    } catch (error) {
        console.log("Error in editStore", error);
        return res.status(500).send("Failed to edit store");
    }
};
