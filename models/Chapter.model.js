const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Kand = require("./Kand.model");
const Question = require("./Question.model");

const chapterSchema = new Schema(
  {
    name: { type: String, required: true },
    kand: { type: mongoose.Schema.Types.ObjectId, ref: "Kand" },
    easyQuestion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    mediumQuestion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    hardQuestion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Chapter", chapterSchema);
