/* This code sets up an Express router, defines routes with corresponding HTTP methods and paths,
applies middleware to certain routes, and assigns controller functions to handle the logic for each route. */

// import necessary modules
const express = require("express");
const router = express.Router();

// import middleware functions -> used to perform tasks before/after handling requests
const {
  authenticateUserMiddleware,
  //taskLengthMiddleware,
  jsonContentTypeMiddleware,
} = require("../middleware/middleware");

// import controllers -> handler functions for task-related routes
const taskController = require("../controllers/taskController");

// GET request to get all tasks
router.get("/", authenticateUserMiddleware, taskController.getAllTasks);

// POST request to add a task
router.post(
  "/",
  authenticateUserMiddleware,
  //taskLengthMiddleware,
  jsonContentTypeMiddleware,
  taskController.createTask
);

// PUT request to edit a task
router.put("/:id", taskController.updateTask);

// DELETE request to delete a task
router.delete("/:id", taskController.deleteTask);

// PUT request to mark a task as complete
router.put("/:id/toggle", taskController.toggleTask);

// GET request to get goals of a specific user (employee) by their user ID
router.get("/:userId/goals", authenticateUserMiddleware, taskController.getGoalsOfUser);

// POST request to add a rating
router.post("/ratings", authenticateUserMiddleware, jsonContentTypeMiddleware, taskController.addRating);
  

// allow admins to assign a new task to an existing user, 
router.post('/assign-new-task',authenticateUserMiddleware, taskController.assignTaskToUser);

// export the router
module.exports = router;
