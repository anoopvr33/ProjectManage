import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/projectManage")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log({ message: "error occured in mongodb", error: e });
  });

export default mongoose;
