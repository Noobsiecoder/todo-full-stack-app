// npm modules
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// MongoDB Schema
const TodoListSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    isImportant: {
      type: Boolean,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating MongoDB Data model
const todoListData = mongoose.model("todoListData", TodoListSchema);
module.exports = todoListData;
