import React, { use, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const fileref = useRef();
  const [employe, setEmploye] = useState([]);
  const [data, setData] = useState("");
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const GetEmploye = async () => {
    const response = await axios.get("http://localhost:3001/employe/get");
    setEmploye(response.data);
  };

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

  const HandleChange = (name) => {
    setSelectedOptions([...selectedOptions, name]);
  };

  const schema = yup.object().shape({
    // image: yup.string().required("image required"),
    startdate: yup.date().required("required"),
    enddate: yup.date().required("required"),
    name: yup.string().required("Name is required"),
    description: yup.string().required("please add description"),
    // employe: yup.string().required("required"),
    // employe: yup
    //   .array()
    //   .of(yup.string().required("Skill cannot be empty"))
    //   .min(1, "At least one skill is required"),
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
      "http://localhost:3001/project/post",
      daa
    );
    if (response.data.alert) {
      toast.error("email already taken");
    } else {
      toast.success("successfully created");
    }
  };

  const OnSubmit = (dat) => {
    console.log("aaaa", dat);
    if (!data || !selectedOptions) {
      toast.error("fill All Fileds");
    } else {
      const full = {
        ...dat,
        icon: data,
        employe: selectedOptions,
      };
      console.log("kakaka", full);
      Upload(full);
    }
  };

  const Remove = (i) => {
    const Pending2 = selectedOptions.filter((item, index) => index !== i);
    setSelectedOptions(Pending2);
  };
  const RemoveImg = () => {
    setData("");
  };

  useEffect(() => {
    console.log("jjj", selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    GetEmploye();
  }, []);
  return (
    <div className="add-project">
      <ToastContainer></ToastContainer>
      <h3>
        <i
          onClick={() => {
            navigate("/admin");
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Add Project
      </h3>
      <form onSubmit={handleSubmit(OnSubmit)}>
        {data == "" ? (
          <div className="add-photo-1">
            <i className="fa-solid fa-image"></i>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={SelectedFile}
              ref={fileref}
            />
            <span onClick={FileInput}>Add Logo</span>
          </div>
        ) : (
          <div className="poster-added">
            <img src={data} alt="Poster" />
            <i onClick={RemoveImg} className="fa-solid fa-xmark"></i>
          </div>
        )}
        <div>
          <input
            placeholder="Project Title"
            type="text"
            id="name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <textarea
            placeholder="Description"
            type="text"
            id="email"
            {...register("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <input
            placeholder="Position"
            type="date"
            id="date"
            name="date"
            {...register("startdate")}
          />
          {errors.startdate && <p>{errors.startdate.message}</p>}
        </div>
        <div>
          <input
            // placeholder="Position"
            type="date"
            id="date"
            name="date"
            {...register("enddate")}
          />
          {errors.enddate && <p>{errors.enddate.message}</p>}
        </div>
        <div>
          <div className="select">
            <div className="array">
              {selectedOptions.length === 0 ? (
                <span>Employes</span>
              ) : (
                selectedOptions.map((i, index) => {
                  return (
                    <td>
                      {i}
                      <i
                        onClick={() => Remove(index)}
                        className="fa-solid fa-xmark"
                      ></i>
                      {/* {...register(`skills[${index}]`)} */}
                    </td>
                  );
                })
              )}
            </div>

            <i
              onClick={() => setDrop(!drop)}
              className="fa-solid fa-angle-down"
            ></i>
          </div>
          {drop && (
            <div className="options">
              {employe.map((i) => {
                return (
                  <span onClick={() => HandleChange(i.name)}>{i.name}</span>
                );
              })}
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProject;
