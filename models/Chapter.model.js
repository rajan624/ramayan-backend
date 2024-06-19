const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Module = require("./Module.model");
const Question = require("./Question.model");

const chapterSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    easyQuestion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    mediumQuestion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    hardQuestion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Chapter", chapterSchema);
