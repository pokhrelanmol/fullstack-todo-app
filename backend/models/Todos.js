const mongoose = require("mongoose");
const Todo = new mongoose.Schema(
  {
    username: String,
    todo: {
      type: String,

      minLength: [3, "Length should be greater than 3"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Todo || mongoose.model("Todo", Todo);
