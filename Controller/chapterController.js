const Chapter = require("../models/Chapter.model");
const Module = require("../models/Module.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");

// Get All Chapters
const getAllChapters = async (req, res) => {
  // #swagger.tags = ['Chapter']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  if (DEBUG) {
    console.log("Get All Chapters Function Start");
  }
  try {
    const chapters = await Chapter.find();
    res.json({ chapters });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Chapter by ID
const getChapterById = async (req, res) => {
  // #swagger.tags = ['Chapter']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const chapterId = req.params.id;
  if (DEBUG) {
    console.log("Get Chapter By ID Function Start");
  }
  try {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ msg: "Chapter not found" });
    }
    res.json({ chapter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create Chapter
const createChapter = async (req, res) => {
  // #swagger.tags = ['Chapter']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { name, module, easyQuestion, mediumQuestion, hardQuestion, img } =
    req.body;
  try {
    let chapter = new Chapter({
      name,
      module,
      easyQuestion,
      mediumQuestion,
      hardQuestion,
      img,
    });
    await chapter.save();
    await Module.findByIdAndUpdate(
      module,
      { $push: { Chapter: chapter._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json({ msg: "Chapter created successfully", chapter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Chapter
const updateChapter = async (req, res) => {
  // #swagger.tags = ['Chapter']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const chapterId = req.params.id;
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      req.body,
      { new: true }
    );
    if (!updatedChapter) {
      return res.status(404).json({ msg: "Chapter not found" });
    }
    res.json({ msg: "Chapter updated successfully", chapter: updatedChapter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Chapter
const deleteChapter = async (req, res) => {
  // #swagger.tags = ['Chapter']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const chapterId = req.params.id;
  try {
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
    if (!deletedChapter) {
      return res.status(404).json({ msg: "Chapter not found" });
    }
    res.json({ msg: "Chapter deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
};
