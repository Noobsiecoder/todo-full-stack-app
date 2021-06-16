// MongoDB schema
const todoListData = require("../model/index");

// Asynchronous function to fetch all todoListData in database
const fetchAllTodoTask = async () => {
  try {
    const result = await todoListData
      .find()
      .then((results) => results)
      .catch((err) => err);
    return { result };
  } catch (err) {
    return { error: err };
  }
};

module.exports = fetchAllTodoTask;
