import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import axioss from "../../utils/axios.js";
// import CustomAxios from "../../utils/axios.js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const fileref = useRef();
  const [imagess, setImage] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();
  // const [Object, setImag] = useState();

  // const Enter = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  const SelectedFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post(
      "http://localhost:3001/upload/image",
      formData
    );
    setData(response.data.url);
  };
  const FileInput = () => {
    fileref.current.click();
  };

  const schema = yup.object().shape({
    // image: yup.string().url("invalid url").required("image required"),
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    position: yup.string().required("position is required"),
    password: yup.string().required("required"),
    // age: yup
    //   .number()
    //   .positive("Age must be positive")
    //   .integer("Age must be an integer")
    //   .required("Age is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const Upload = async (daa) => {
    console.log("looo", daa);
    const response = await axios.post(
      "http://localhost:3001/employe/signup",
      daa
    );
    if (response.data.alert) {
      toast.error("email already taken");
    } else {
      toast.success("successfully created");
    }
  };

  const RemoveImg = () => {
    setData("");
  };

  const onSubmit = (dat) => {
    // console.log("my data", dat);
    if (!data) {
      toast.error("upload image");
    } else {
      const full = {
        ...dat,
        image: data,
      };
      console.log("kakaka", full);
      Upload(full);
    }
  };

  useEffect(() => {
    console.log("my email", data);
  }, [data]);

  return (
    <div className="add-employee">
      <ToastContainer></ToastContainer>
      <h3>
        <i
          onClick={() => {
            navigate("/admin");
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Add Employee
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data == "" ? (
          <div className="add-photo-1">
            <i className="fa-solid fa-image"></i>
            <input
              style={{ display: "none" }}
              type="file"
              name="image"
              onChange={SelectedFile}
              ref={fileref}
            />
            <span onClick={FileInput}>Add Photo</span>
          </div>
        ) : (
          <div className="poster-added">
            <img src={data} alt="Poster" />
            <i onClick={RemoveImg} className="fa-solid fa-xmark"></i>
          </div>
        )}
        <div>
          <input
            placeholder="Name"
            type="text"
            id="name"
            // name="name"
            // onChange={Enter}
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input
            placeholder="Position"
            type="text"
            id="position"
            // name="position"
            {...register("position")}
          />
          {errors.position && <p>{errors.position.message}</p>}
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            // name="email"
            id="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            placeholder="Password"
            type="text"
            // onChange={Enter}
            name="password"
            id="password"
            {...register("password")}
          />
        </div>
        {/* <div>
          <input
            placeholder="Age"
            type="number"
            id="age"
            {...register("age")}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div> */}
        <Button classname='btn2' type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddEmployee;
