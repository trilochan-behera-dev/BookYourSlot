const express = require("express");

const route = express.Router();
const userController = require("../controller/userController");
const slotController = require("../controller/slotController");

// user Api
route.post("/users", userController.create);
route.put("/users/:id", userController.update);
route.post("/login", userController.login);

route.get("/user", userController.findUser);
route.get("/user/slot", userController.findSlot);

// Slot Api
route.put("/slot/:id", slotController.update);

route.get("/slot", slotController.allslot);

route.post("/slot/newSlot", slotController.createNewSlot);

module.exports = route;
