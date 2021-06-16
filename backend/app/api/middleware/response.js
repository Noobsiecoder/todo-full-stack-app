const expressResponse = (res, action) => {
  res.status(action.payload.httpStatusCode).json({
    type: action.type,
    status: {
      action: action.payload.message,
      serverMessage: action.payload.status,
      httpStatusCode: action.payload.httpStatusCode,
    },
    data: {
      _id: action.payload.data._id,
    },
  });
};

module.exports = expressResponse;
