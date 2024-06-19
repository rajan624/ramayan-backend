const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Kand = require("./Kand.model")

const kathaSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: false },
    Kand: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kand" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Katha", kathaSchema);
