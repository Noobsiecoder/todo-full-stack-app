// MongoDB schema
const todoListData = require("../model/index");

// Asynchronous function to create new todoListData in database
const createNewTodoTask = async ({ payload }) => {
  const data = new todoListData(payload);
  try {
    const saveData = await data
      .save()
      .then((result) => result)
      .catch((err) => err);
    return saveData;
  } catch (err) {
    return { error: err };
  }
};

module.exports = createNewTodoTask;
