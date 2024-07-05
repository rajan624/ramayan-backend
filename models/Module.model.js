const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category.model");

const moduleSchema = new Schema(
  {
    name_hindi: { type: String, required: true },
    name_english: { type: String, required: true },
    moduleQuiz: { type: Boolean, default: false },
    img: { type: String, required: false },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Module", moduleSchema);
