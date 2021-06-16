const express = require("express"),
  router = express.Router();

const { API_KEY } = require("../../config/config");
const createNewTodoTask = require("../../db/middleware/Add");
const checkMongoId = require("../middleware/checkMongoId");
const {
  checkObjectKeyExists,
  checkObjectLength,
} = require("../middleware/checkObject");
const createAction = require("../middleware/createAction");
const expressResponse = require("../middleware/response");

function checkObject(objectValue) {
  return (
    checkObjectLength(objectValue, 4) &&
    checkObjectKeyExists(objectValue, "taskTitle") &&
    checkObjectKeyExists(objectValue, "isCompleted") &&
    checkObjectKeyExists(objectValue, "isImportant") &&
    checkObjectKeyExists(objectValue, "isDeleted")
  );
}

async function addTodo(req, res) {
  if (req.body.action === "CREATE" && checkObject(req.body.payload)) {
    const data = {
      payload: req.body.payload,
    };
    try {
      const { _id, error } = await createNewTodoTask(data);
      const mongoDbIdExists = checkMongoId(_id);
      const action = mongoDbIdExists
        ? createAction(
            "CREATE",
            201,
            "POST_SUCCESS",
            "POST method handled successfully for /add",
            _id
          )
        : createAction(
            "CREATE",
            422,
            "POST_FAILURE",
            `POST method failed for /add since due to *${error}*`
          );
      expressResponse(res, action);
    } catch {
      const action = createAction(
        "ADD",
        500,
        "SERVER_ERROR",
        "POST method failed for /add"
      );
      expressResponse(res, action);
    }
  } else {
    const action = createAction(
      req.body.action,
      422,
      "POST_FAILURE",
      "POST method failed for /add"
    );
    expressResponse(res, action);
  }
}

router.post("/", (req, res) => {
  if (req.headers.api_key === API_KEY.ADD_API_KEY) {
    addTodo(req, res);
  } else {
    const action = createAction(
      req.body.action,
      400,
      "POST_FAILURE",
      "POST method failed for /add since API_KEY isn't valid"
    );
    expressResponse(res, action);
  }
});

module.exports = router;
