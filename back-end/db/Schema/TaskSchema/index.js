import { model, Schema } from "mongoose";
import { type } from "os";
// import { type } from "os";

const TaskSchema = Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
  },
  employe: {
    type: Array,
  },
  startdate: {
    type: Date,
  },
  enddate: {
    type: Date,
  },
});

const Task = model("Task", TaskSchema);

export default Task;
