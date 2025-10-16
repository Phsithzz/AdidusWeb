//import
import express from "express";

import * as userController from "../Controllers/userController.js";
//import 

const router = express.Router();

router.post("/user/register", userController.register);

router.post("/user/login", userController.login);

router.get("/user/info", userController.getUser);

router.get("/user/logout",userController.logoutUser)

router.post("/user/upload",userController.uploadUser)
export default router;
