const express = require("express");
const router = express.Router();
const supermarketController = require("../controllers/SupermarketControl");

router.get("/", supermarketController.getAllSupermarket);
router.get("/:id", supermarketController.getSupermarket);
router.post("/", supermarketController.addSupermarket);
router.delete("/:id", supermarketController.deleteSupermarket);
router.patch("/:id", supermarketController.editSupermarket);

module.exports = router;
