const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  login: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
