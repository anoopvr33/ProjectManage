import React, { useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import { useNavigate } from "react-router-dom";

const EditEmploye = () => {
  const fileref = useRef();
  const [imagess, setImage] = useState({});
  const navigate = useNavigate();
  // const [Object, setImag] = useState();

  const FileInput = () => {
    fileref.current.click();
  };

  const schema = yup.object().shape({
    image: yup.string().required("image required"),
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    position: yup.string().required("position is required"),
    age: yup
      .number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Age is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="edit-employee">
      <h3>
        <i
          onClick={() => {
            navigate(-1);
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Edit Employee
      </h3>
      <h2 style={{ color: "red", width: "100%", textAlign: "center" }}>
        Not finished yet
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(imagess) == 0 ? (
          <div className="add-photo-1">
            <i className="fa-solid fa-image"></i>
            <input
              style={{ display: "none" }}
              type="file"
              onChange=""
              ref={fileref}
            />
            <span onClick={FileInput}>Add Photo</span>
          </div>
        ) : (
          <div className="poster-added">
            <img src={imagess.img} alt="Poster" />
            <i onClick="" className="fa-solid fa-xmark"></i>
          </div>
        )}
        <div>
          <input
            placeholder="Name"
            type="text"
            id="name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            placeholder="Position"
            type="text"
            id="position"
            {...register("position")}
          />
          {errors.position && <p>{errors.position.message}</p>}
        </div>
        <div>
          <input
            placeholder="Age"
            type="number"
            id="age"
            {...register("age")}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditEmploye;
