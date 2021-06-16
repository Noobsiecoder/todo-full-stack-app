const express = require("express"),
  router = express.Router();

const { API_KEY } = require("../../config/config");
const updateTodoTask = require("../../db/middleware/Update");
const {
  checkObjectKeyExists,
  checkObjectLength,
} = require("../middleware/checkObject");
const checkMongoId = require("../middleware/checkMongoId");
const expressResponse = require("../middleware/response");
const createAction = require("../middleware/createAction");

function checkObject(objectValue) {
  return (
    checkObjectLength(objectValue, 2) &&
    checkObjectKeyExists(objectValue, "_id") &&
    (checkObjectKeyExists(objectValue.data, "isCompleted") ||
      checkObjectKeyExists(objectValue.data, "isImportant") ||
      checkObjectKeyExists(objectValue.data, "isDeleted"))
  );
}

async function updateTodo(req, res) {
  if (req.body.action === "UPDATE" && checkObject(req.body.payload)) {
    const data = {
      payload: req.body.payload,
    };
    try {
      const { _id, error } = await updateTodoTask(data);
      const mongoDbIdExists = checkMongoId(_id);
      const action = mongoDbIdExists
        ? createAction(
            "UPDATE",
            200,
            "PATCH_SUCCESS",
            "PATCH method handled successfully for /update",
            _id
          )
        : createAction(
            "UPDATE",
            404,
            "PATCH_FAILURE",
            `PATCH method failed for /update due to *${
              error === undefined ? "_id being undefined" : error
            }*`
          );
      expressResponse(res, action);
    } catch {
      const action = createAction(
        "UPDATE",
        500,
        "SERVER_ERROR",
        "PATCH method failed for /update"
      );
      expressResponse(res, action);
    }
  } else {
    const action = createAction(
      req.body.action,
      422,
      "PATCH_FAILURE",
      "PATCH method failed for /update"
    );
    expressResponse(res, action);
  }
}

router.patch("/", (req, res) => {
  if (req.headers.api_key === API_KEY.UPDATE_API_KEY) {
    updateTodo(req, res);
  } else {
    const action = createAction(
      req.body.action,
      400,
      "PATCH_FAILURE",
      "PATCH method failed for /update since API_KEY isn't valid"
    );
    expressResponse(res, action);
  }
});

module.exports = router;
