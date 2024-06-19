const Router = require("express");
const router = Router.Router();
const {
  getAllCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controller/categoryController");

router.get("/", getAllCategorys);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
