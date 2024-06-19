const Category = require("../models/Category.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");

// Get All Category
const getAllCategorys = async (req, res) => {
  // #swagger.tags = ['Category']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  if (DEBUG) {
    console.log("Get All Category Function Start");
  }
  try {
    const Categorys = await Category.find();
    res.json({ Categorys });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  // #swagger.tags = ['Category']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const categoryId = req.params.id;
  if (DEBUG) {
    console.log("Get Category By ID Function Start");
  }
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "category not found" });
    }
    res.json({ category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create category
const createCategory = async (req, res) => {
  // #swagger.tags = ['Category']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { name, Kand, img } = req.body;
  try {
    let category = new Category({ name, Kand, img });
    await category.save();
    res.status(201).json({ msg: "category created successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update category
const updateCategory = async (req, res) => {
  // #swagger.tags = ['Category']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const categoryId = req.params.id;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json({
      msg: "Category updated successfully",
      Category: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  // #swagger.tags = ['Category']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(CategoryId);
    if (!deletedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
