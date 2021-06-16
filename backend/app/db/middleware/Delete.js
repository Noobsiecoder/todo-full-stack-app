// MongoDB schema
const todoListData = require("../model/index");

// Asynchronous function to delete todoListData in database
const deleteTodoTask = async ({ payload }) => {
  const { _id, data } = payload;
  try {
    const result = await todoListData
      .findByIdAndDelete(_id, data)
      .then((results) => results)
      .catch((err) => err);
    return result;
  } catch (err) {
    return { error: err };
  }
};

module.exports = deleteTodoTask;
