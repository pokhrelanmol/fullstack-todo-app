const mongoose = require("mongoose");
const Todo = new mongoose.Schema(
  {
    todo: {
      type: String,
      minLength: [3, "Length should be greater than 3"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Todo || mongoose.model("Todo", Todo);
