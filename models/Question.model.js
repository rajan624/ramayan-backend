const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Chapter = require("./Chapter.model");
const Module = require("./Module.model");

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    description: { type: String, required: false },
    img: { type: String, required: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    option: [{ type: String, required: false }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Question", questionSchema);
