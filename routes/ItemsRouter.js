const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");

router.get("/", itemsController.getAllItems);
router.get("/api", itemsController.getApiKey);
router.get("/:id", itemsController.getItems);
router.delete("/:id", itemsController.deleteItems);
router.patch("/:id", itemsController.updateItem);
router.patch("/data/:id", itemsController.updateItemData);
router.post("/", itemsController.CreateItems);

module.exports = router;
