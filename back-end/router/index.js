import express from "express";
import EmployeRouter from "./EmployeRouter/index.js";
import ProjectRouter from "./ProjectRouter/index.js";
import TaskRouter from "./TaskRouter/index.js";
import ImageRouter from "./ImageRouter/index.js";

const router = express.Router();

router.use("/employe", EmployeRouter);
router.use("/upload", ImageRouter);
router.use("/project", ProjectRouter);
router.use("/task", TaskRouter);

export default router;
