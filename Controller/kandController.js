const Kand = require("../models/Kand.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");

// Get All Kands
const getAllKands = async (req, res) => {
  // #swagger.tags = ['Kand']
  if (DEBUG) {
    console.log("Get All Kands Function Start");
  }
  try {
    const Kands = await Kand.find();
    res.json({ Kands });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get kand by ID
const getKandById = async (req, res) => {
  // #swagger.tags = ['Kand']
  const kandId = req.params.id;
  if (DEBUG) {
    console.log("Get Chapter By ID Function Start");
  }
  try {
    const kand = await Kand.findById(kandId);
    if (!kand) {
      return res.status(404).json({ msg: "kand not found" });
    }
    res.json({ kand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create kand
const createKand = async (req, res) => {
  // #swagger.tags = ['Kand']
  const { name, kandQuiz, Chapter } = req.body;
  try {
    let kand = new Kand({ name, kandQuiz, Chapter });
    await kand.save();
    res.status(201).json({ msg: "kand created successfully", kand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update kand
const updateKand = async (req, res) => {
  // #swagger.tags = ['Kand']
  const kandId = req.params.id;
  try {
    const updatedKand = await Kand.findByIdAndUpdate(kandId, req.body, {
      new: true,
    });
    if (!updatedKand) {
      return res.status(404).json({ msg: "Kand not found" });
    }
    res.json({ msg: "Kand updated successfully", kand: updatedKand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Chapter
const deleteKand = async (req, res) => {
  // #swagger.tags = ['Kand']
  const kandId = req.params.id;
  try {
    const deletedKand = await Kand.findByIdAndDelete(kandId);
    if (!deletedKand) {
      return res.status(404).json({ msg: "Kand not found" });
    }
    res.json({ msg: "Kand deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllKands,
  getKandById,
  createKand,
  updateKand,
  deleteKand,
};
