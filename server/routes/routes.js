import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import {verifyCookies} from '../utils/index.js'

const router = express.Router();
router.use("/user", userRoutes);
 router.use("/task",verifyCookies, taskRoutes);
export default router;
