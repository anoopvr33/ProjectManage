import Employe from "../../db/Schema/EmployeSchema/index.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const findEmail = await Employe.findOne({ email: body.email });

  if (findEmail) {
    return res.json({ alert: "email already taken" });
  }

  const hashedpassword = await bcrypt.hash(body.password, 3);
  body.password = hashedpassword;

  const userData = await Employe.create(body);
  return res.status(200).json({ message: "successfully signup" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };

  const userlog = await Employe.findOne({ email: body.email });

  if (!userlog) {
    return res.json({ message: "incorrect email or password" });
  }
  const isMatch = await bcrypt.compare(body.password, userlog.password);

  if (!isMatch) {
    return res.json({ message: "incorrect email or password" });
  }

  const token = jwt.sign(
    {
      id: userlog._id,
      email: userlog.email,
      role: "USER",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return res.json({ message: "successfully login", token: token });
});

router.get("/get", async (req, res) => {
  const data = await Employe.find();
  res.json(data);
});
router.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Employe.findById(id);
  res.json(data);
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Employe.findByIdAndDelete(id);
  res.json(data);
});
export default router;
