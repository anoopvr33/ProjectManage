import { model, Schema } from "mongoose";
import { type } from "os";
// import { type } from "os";

const ProjectSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
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

const Project = model("Project", ProjectSchema);

export default Project;
