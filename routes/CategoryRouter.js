const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategory);
router.post("/", categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);
router.patch("/:id", categoryController.editCategory);

module.exports = router;
