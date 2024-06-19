const Question = require("../models/Question.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");
const Chapter = require("../models/Chapter.model");

// Get All Question
const getAllQuestions = async (req, res) => {
  // #swagger.tags = ['Question']
  if (DEBUG) {
    console.log("Get All Question Function Start");
  }
  try {
    const question = await Question.find();
    res.json({ question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Question by ID
const getQuestionById = async (req, res) => {
  // #swagger.tags = ['Question']
  const questionId = req.params.id;
  if (DEBUG) {
    console.log("Get Question By ID Function Start");
  }
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.json({ question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create Question
const createQuestion = async (req, res) => {
  // #swagger.tags = ['Question']
  const { question, answer, category, description, kand, chapter, option } =
    req.body;
  try {
    let question = new Question({
      question,
      answer,
      category,
      description,
      kand,
      chapter,
      option,
    });
    await question.save();

    // Find the chapter and update it with the new question reference
    let chapterDoc = await Chapter.findById(chapter);
    if (!chapterDoc) {
      await Question.findByIdAndDelete(question._id);
      return res.status(404).json({ msg: "Chapter not found" });
    }

    switch (difficulty) {
      case "easy":
        chapterDoc.easyQuestion.push(question._id);
        break;
      case "medium":
        chapterDoc.mediumQuestion.push(question._id);
        break;
      case "hard":
        chapterDoc.hardQuestion.push(question._id);
        break;
      default:
        await Question.findByIdAndDelete(question._id);
        return res.status(400).json({ msg: "Invalid difficulty level" });
    }

    await chapterDoc.save();
    res.status(201).json({ msg: "Question created successfully", question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Question
const updateQuestion = async (req, res) => {
  // #swagger.tags = ['Question']
  const questionId = req.params.id;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.json({
      msg: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Question
const deleteQuestion = async (req, res) => {
  // #swagger.tags = ['Question']
  const questionId = req.params.id;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.json({ msg: "Question deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
