const express = require("express"),
  path = require("path"),
  morgan = require("morgan"),
  cors = require("cors"),
  app = express();

const { ROUTES } = require("./config/config");

const expressResponse = require("./api/middleware/response");
const createAction = require("./api/middleware/createAction");

const fetchAllTodoMiddleware = require("./api/routes/fetchTodo");
const addTodoMiddleware = require("./api/routes/addTodo");
const updateTodoMiddleware = require("./api/routes/updateTodo");
const deleteTodoMiddleware = require("./api/routes/deleteTodo");

app.use(express.static(path.join(__dirname, "build")));
app.use(morgan("dev")); // development
app.use(express.json());
app.use(cors({ credentials: true }));

// Production -> Serve React build files 
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/important", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/delete", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app
  .use(ROUTES.FETCH_ROUTE, fetchAllTodoMiddleware)
  .use(ROUTES.ADD_ROUTE, addTodoMiddleware)
  .use(ROUTES.UPDATE_ROUTE, updateTodoMiddleware)
  .use(ROUTES.DELETE_ROUTE, deleteTodoMiddleware);

app
  .use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  })
  .use((error, req, res, next) => {
    // Handling respective error
    const errorStatus = error.status || 500;
    const action = createAction(
      "SERVER_ERROR",
      errorStatus,
      "POST_FAILURE",
      `${req.method} method failed for ${req.originalUrl}`
    );
    expressResponse(res, action);
  });

module.exports = app;
