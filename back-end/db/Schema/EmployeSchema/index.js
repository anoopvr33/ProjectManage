import { model, Schema } from "mongoose";
// import { type } from "os";

const EmployeSchema = Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  position: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Employe = model("Employe", EmployeSchema);

export default Employe;
