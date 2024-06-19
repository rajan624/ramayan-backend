const Katha = require("../models/Katha.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");

// Get All Katha
const getAllKathas = async (req, res) => {
  // #swagger.tags = ['Katha']
  if (DEBUG) {
    console.log("Get All Kathas Function Start");
  }
  try {
    const Kathas = await Katha.find();
    res.json({ Kathas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get katha by ID
const getKathaById = async (req, res) => {
  // #swagger.tags = ['Katha']
  const kathaId = req.params.id;
  if (DEBUG) {
    console.log("Get Katha By ID Function Start");
  }
  try {
    const katha = await Katha.findById(kathaId);
    if (!katha) {
      return res.status(404).json({ msg: "katha not found" });
    }
    res.json({ katha });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create katha
const createKatha = async (req, res) => {
  // #swagger.tags = ['Katha']
  const { name, Kand, img } = req.body;
  try {
    let katha = new Katha({ name, Kand, img });
    await katha.save();
    res.status(201).json({ msg: "katha created successfully", katha });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update katha
const updateKatha = async (req, res) => {
  // #swagger.tags = ['Katha']
  const kathaId = req.params.id;
  try {
    const updatedKatha = await Katha.findByIdAndUpdate(kathaId, req.body, {
      new: true,
    });
    if (!updatedKatha) {
      return res.status(404).json({ msg: "Katha not found" });
    }
    res.json({ msg: "Kand updated successfully", katha: updatedKatha });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Katha
const deleteKatha = async (req, res) => {
  // #swagger.tags = ['Katha']
  const kathaId = req.params.id;
  try {
    const deletedKatha = await Katha.findByIdAndDelete(kathaId);
    if (!deletedKatha) {
      return res.status(404).json({ msg: "Katha not found" });
    }
    res.json({ msg: "Katha deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllKathas,
  getKathaById,
  createKatha,
  updateKatha,
  deleteKatha,
};
