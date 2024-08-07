const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Module = require("./Module.model");

const categorySchema = new Schema(
  {
    name_hindi: { type: String, required: true },
    name_english: { type: String, required: true },
    img: { type: String, required: false },
    module: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", categorySchema);
