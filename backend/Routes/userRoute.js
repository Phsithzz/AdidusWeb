//import
import express from "express";

import * as userController from "../Controllers/userController.js";
//import 

const router = express.Router();

router.get("/user/info/:email",userController.getOneUser)
router.put("/user/info/:email",userController.userEditInfo)
router.put("/user/password/:email", userController.updatePassword);
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

router.get("/user/info", userController.getUser);

router.get("/user/logout",userController.logoutUser)

router.post("/user/upload",userController.uploadUser)

//admin
router.get("/user",userController.getAllUser)
router.put("/user/:userId",userController.updateUser)
router.delete("/user/:userId",userController.removeUser)
export default router;
