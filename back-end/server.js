/////////////////////////////////

///npm run dev to start

import mongoose from "./db/db.js";
import express from "express";
import cors from "cors";
import routes from "./router/index.js";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(routes);

app.get((req, res) => {
  res.json({ message: "router not found" });
});

app.listen(3001, () => {
  console.log("Server is running on port 3003");
});
