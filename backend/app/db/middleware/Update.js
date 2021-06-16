// MongoDB schema
const todoListData = require("../model/index");

// Asynchronous function to update todoListData in database
const updateTodoTask = async ({ payload }) => {
  const { _id, data } = payload;
  try {
    const result = await todoListData
      .findByIdAndUpdate(_id, data)
      .then((results) => results)
      .catch((err) => err);
    return result;
  } catch (err) {
    return { error: err };
  }
};

module.exports = updateTodoTask;
