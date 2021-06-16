const express = require("express"),
  router = express.Router();

const { API_KEY } = require("../../config/config");
const deleteTodoTask = require("../../db/middleware/Delete");
const {
  checkObjectKeyExists,
  checkObjectLength,
} = require("../middleware/checkObject");
const checkMongoId = require("../middleware/checkMongoId");
const expressResponse = require("../middleware/response");
const createAction = require("../middleware/createAction");

function checkObject(objectValue) {
  return (
    checkObjectLength(objectValue, 1) &&
    checkObjectKeyExists(objectValue, "_id")
  );
}

async function deleteTodo(req, res) {
  if (req.body.action === "DELETE" && checkObject(req.body.payload)) {
    const data = {
      payload: req.body.payload,
    };
    try {
      const { _id, error } = await deleteTodoTask(data);
      const mongoDbIdExists = checkMongoId(_id);
      const action = mongoDbIdExists
        ? createAction(
            "ERASE",
            200,
            "DELETE_SUCCESS",
            "DELETE method handled successfully for /delete",
            _id
          )
        : createAction(
            "ERASE",
            404,
            "DELETE_FAILURE",
            `DELETE method failed for /delete *${
              error === undefined ? "_id being undefined" : error
            }*`
          );
      expressResponse(res, action);
    } catch {
      const action = createAction(
        "ERASE",
        500,
        "SERVER_ERROR",
        "ERASE method failed for /delete"
      );
      expressResponse(res, action);
    }
  } else {
    const action = createAction(
      req.body.action,
      422,
      "DELETE_FAILURE",
      "DELETE method failed for /delete"
    );
    expressResponse(res, action);
  }
}

router.delete("/", (req, res) => {
  if (req.headers.api_key === API_KEY.DELETE_API_KEY) {
    deleteTodo(req, res);
  } else {
    const action = createAction(
      req.body.action,
      400,
      "ERASE_FAILURE",
      "DELETE method failed for /delete since API_KEY isn't valid"
    );
    expressResponse(res, action);
  }
});

module.exports = router;
