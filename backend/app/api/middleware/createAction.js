const createAction = (
  actionType,
  actionStatusCode,
  actionMessage,
  actionStatus,
  actionId = { _id: null }
) => ({
  type: actionType,
  payload: {
    httpStatusCode: actionStatusCode,
    message: `${actionMessage}!`,
    status: actionStatus,
    data: actionId,
  },
});

module.exports = createAction;
