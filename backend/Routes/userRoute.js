//import
import express from "express";

import * as userController from "../Controllers/userController.js";
//import 

const router = express.Router();

// ----------------------
// User Operations
// ----------------------
router.get("/user/info/:email", userController.getOneUser);
router.put("/user/info/:email", userController.userEditInfo);
router.put("/user/password/:email", userController.updatePassword);
router.post("/user/upload", userController.uploadUser);
router.get("/user/info", userController.getUser);

// ----------------------
// Authentication
// ----------------------
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.get("/user/logout", userController.logoutUser);

// ----------------------
// Admin Operations
// ----------------------
router.get("/user", userController.getAllUser);
router.put("/user/:userId", userController.updateUser);
router.delete("/user/:userId", userController.removeUser);
export default router;
