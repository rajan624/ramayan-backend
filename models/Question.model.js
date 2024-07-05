const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Chapter = require("./Chapter.model");
const Module = require("./Module.model");

const questionSchema = new Schema(
  {
    question_hindi: { type: String, required: true },
    answer_hindi: { type: String, required: true },
    question_english: { type: String, required: true },
    answer_english: { type: String, required: true },
    category: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    description_hindi: { type: String, required: false },
    description_english: { type: String, required: false },
    img: { type: String, required: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    option_hindi: [{ type: String, required: false }],
    option_english: [{ type: String, required: false }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Question", questionSchema);
