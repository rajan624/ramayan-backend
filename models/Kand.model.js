const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Chapter = require("./Chapter.model");

const kandSchema = new Schema(
  {
    name: { type: String, required: true },
    kandQuiz: { type: Boolean, default: false },
    img: { type: String, required: false },
    Chapter: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Kand", kandSchema);
