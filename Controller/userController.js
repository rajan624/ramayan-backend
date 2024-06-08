const User = require("../models/User.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger")

const getProfile = async (req, res) => {
  const userId = req?.user?.id;
  // Retrieve user profile data from the database using the user ID
  if (DEBUG) {
    console.log("Get Profile Function Start");
  }
  try {
    const userProfile = await User.findById(userId).select(
      "-type  -password -register_date"
    );
    res.json({ profile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getProfile
};
