import express from "express";
import Task from "../../db/Schema/TaskSchema/index.js";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.get("/filter/year", async (req, res) => {
  const body = { ...req.body };
  const data = await Task.find({ project: body.projectId });
  res.json(data);
});

router.get("/filter/duration", async (req, res) => {
  const body = { ...req.body };
  const data = await Task.find({ duration: body.duration });
  res.json(data);
});

router.get("/get-all", async (req, res) => {
  const data = await Task.find();
  res.json(data);
});

router.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Task.findById(id);
  res.json(data);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Task.findByIdAndDelete(id);
  res.json(data);
});

router.patch("/update/:id", CheckToken(["ADMIN"]), async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const updated = await Task.findByIdAndUpdate(id, body);
  res.json({ true: updated });
});

router.post("/post", async (req, res) => {
  const body = { ...req.body };
  const data = await Task.create(body);
  res.json(data);
});

export default router;
