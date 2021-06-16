const express = require("express"),
  router = express.Router();

const { API_KEY } = require("../../config/config");
const fetchAllTodoTask = require("../../db/middleware/Fetch");
const createAction = require("../middleware/createAction");
const expressResponse = require("../middleware/response");

async function fetchData(res) {
  try {
    const { error, result } = await fetchAllTodoTask();
    if (!error) {
      res.status(200).json({
        type: "FETCH",
        status: {
          action: "FETCH_SUCCESS!",
          serverMessage: "GET method handled successfully for /fetch",
          httpStatusCode: 200,
        },
        data: result,
      });
    } else {
      const action = createAction(
        "ADD",
        500,
        "SERVER_ERROR",
        `GET method failed for /fetch due to *${error}*`
      );
      expressResponse(res, action);
    }
  } catch (err) {
    const action = createAction(
      "ADD",
      500,
      "SERVER_ERROR",
      `GET method failed for /fetch due to *${error}*`
    );
    expressResponse(res, action);
  }
}

router.get("/", (req, res) => {
  if (req.headers.api_key === API_KEY.FETCH_API_KEY) {
    fetchData(res);
  } else {
    const action = createAction(
      req.body.action,
      400,
      "FETCH_FAILURE",
      "GET method failed for /fetch since API_KEY isn't valid"
    );
    expressResponse(res, action);
  }
});

module.exports = router;
