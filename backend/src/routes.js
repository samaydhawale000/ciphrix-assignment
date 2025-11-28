const createTask = require("./controllers/tasks/create-task");
const deleteTask = require("./controllers/tasks/delete-task");
const getTaskById = require("./controllers/tasks/get-task-by-id");
const getTasks = require("./controllers/tasks/get-tasks");
const updateTask = require("./controllers/tasks/update-task");
const createUser = require("./controllers/users/create-user");
const loginUser = require("./controllers/users/login-user");
const userAuthentication = require("./middleware/auth");

const routes = require("express").Router();

// ---------------------User Routes ----------------------------------
routes.post("/create-user", createUser);
routes.post("/login-user", loginUser);
// --------------------------------------

// ---------------------Tasks Routes ----------------------------------
routes.post("/create-task", userAuthentication, createTask);
routes.post("/get-tasks", userAuthentication, getTasks);
routes.post("/update-task", userAuthentication, updateTask);
routes.get("/get-task-by-id", userAuthentication, getTaskById);
routes.get("/delete-task", userAuthentication, deleteTask);
// --------------------------------------

module.exports = routes;
