import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const { id } = useParams();
  const fileref = useRef();
  const [imagess, setImage] = useState([]);
  const [drop, setDrop] = useState(false);
  const [data, setData] = useState([]);
  const [employe, setEmploye] = useState([]);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const GetProject = async () => {
    const response = await axios.get(
      `http://localhost:3001/project/get-one/${id}`
    );
    setEmploye(response.data.employe);
    console.log("kakakakka", response);
  };

  const SelectedFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post(
      "http://localhost:3001/upload/image",
      formData
    );
    setData([...data, response.data.url]);
  };

  const HandleChange = (name) => {
    setSelectedOptions([...selectedOptions, name]);
  };

  const FileInput = () => {
    fileref.current.click();
  };

  const schema = yup.object().shape({
    // image: yup.string().required("image required"),
    name: yup.string().required("Name is required"),
    description: yup.string().required("please add description"),
    startdate: yup.string().required("required"),
    enddate: yup.string().required("required"),
    // employe: yup.string().required("required"),
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
    const response = await axios.post("http://localhost:3001/task/post", daa);
    if (response.data.alert) {
      toast.error("email already taken");
    } else {
      toast.success("successfully created");
    }
  };

  const onSubmit = (dat) => {
    console.log("aaaa", dat);
    if (data.length == 0 || !selectedOptions) {
      toast.error("fill All Fileds");
    } else {
      const full = {
        ...dat,
        images: data,
        employe: selectedOptions,
        project: id,
      };
      console.log("kakaka", full);
      Upload(full);
    }
  };

  const Remove = (i) => {
    const Pending2 = selectedOptions.filter((item, index) => index !== i);

    setSelectedOptions(Pending2);
  };

  const RemoveImg = (i) => {
    const PendingImg = data.filter((item, index) => index !== i);
    setImage(PendingImg);
  };

  useEffect(() => {
    console.log("jjj", selectedOptions);
  }, [selectedOptions, imagess]);

  useEffect(() => {
    GetProject();
  }, []);

  return (
    <div className="add-task">
      <ToastContainer></ToastContainer>
      <h3>
        <i
          onClick={() => {
            navigate("/admin");
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Add Task
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data.length == 0 ? (
          <div className="add-photo-1">
            <i className="fa-solid fa-image"></i>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={SelectedFile}
              ref={fileref}
            />
            <span onClick={FileInput}>Add Ref Img</span>
          </div>
        ) : (
          <div className="poster-added">
            <input
              style={{ display: "none" }}
              type="file"
              onChange={SelectedFile}
              ref={fileref}
            />
            <div className="img-array">
              {data.map((i, index) => {
                return (
                  <div className="img-card">
                    <i
                      onClick={() => RemoveImg(index)}
                      className="fa-solid fa-xmark"
                    ></i>
                    <img src={i} alt="Poster" />
                  </div>
                );
              })}
            </div>

            <button onClick={FileInput}>Add more</button>
          </div>
        )}
        <div>
          <input
            placeholder="Task Title"
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
            id="description"
            {...register("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <input
            placeholder="Position"
            type="date"
            id="date"
            name="enddate"
            {...register("startdate")}
          />
          {errors.startdate && <p>{errors.startdate.message}</p>}
        </div>
        <div>
          <input
            // placeholder="Position"
            type="date"
            id="date"
            name="enddate"
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
                return <span onClick={() => HandleChange(i)}>{i}</span>;
              })}
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
