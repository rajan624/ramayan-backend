  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    type: { type: String, required: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Users", userSchema);
 