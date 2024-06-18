const Router = require("express");
const router = Router.Router();
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../Controller/questionController");

router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
