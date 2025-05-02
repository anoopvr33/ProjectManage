import express from "express";
import Project from "../../db/Schema/ProjectSchema/index.js";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.get("/filter/year", async (req, res) => {
  const body = { ...req.body };
  const data = await Project.find({ employe: body.employeId });
  res.json(data);
});

router.get("/get-all", async (req, res) => {
  const data = await Project.find();
  res.json(data);
});

router.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Project.findById(id);
  res.json(data);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Project.findByIdAndDelete(id);
  res.json(data);
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const updated = await Project.findByIdAndUpdate(id, body);
  res.json({ true: updated });
});

router.post("/post", async (req, res) => {
  const body = { ...req.body };
  const data = await Project.create(body);
  res.json(data);
});

export default router;
