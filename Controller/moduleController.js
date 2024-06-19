const Module = require("../models/Module.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");
const Category = require("../models/Category.model");

// Get All Modules
const getAllModules = async (req, res) => {
  // #swagger.tags = ['Module']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  if (DEBUG) {
    console.log("Get All Modules Function Start");
  }
  try {
    const Modules = await Module.find();
    res.json({ Modules });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get module by ID
const getModuleById = async (req, res) => {
  // #swagger.tags = ['Module']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const moduleId = req.params.id;
  if (DEBUG) {
    console.log("Get Module By ID Function Start");
  }
  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ msg: "module not found" });
    }
    res.json({ module });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create module
const createModule = async (req, res) => {
  // #swagger.tags = ['Module']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { name, moduleQuiz, category, Chapter, img } = req.body;
  try {
    let module = new Module({ name, moduleQuiz, Chapter, img });
    await module.save();
    await Category.findByIdAndUpdate(
      category,
      { $push: { module: module._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json({ msg: "Module created successfully", module });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update module
const updateModule = async (req, res) => {
  // #swagger.tags = ['Module']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const moduleId = req.params.id;
  try {
    const updatedModule = await Module.findByIdAndUpdate(moduleId, req.body, {
      new: true,
    });
    if (!updatedModule) {
      return res.status(404).json({ msg: "Module not found" });
    }
    res.json({ msg: "Module updated successfully", module: updatedmodule });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Module
const deleteModule = async (req, res) => {
  // #swagger.tags = ['Module']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const ModuleId = req.params.id;
  try {
    const deletedModule = await Module.findByIdAndDelete(moduleId);
    if (!deletedModule) {
      return res.status(404).json({ msg: "Module not found" });
    }
    res.json({ msg: "Module deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};
