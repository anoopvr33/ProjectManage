import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import { useNavigate } from "react-router-dom";

const EditTask = () => {
  const fileref = useRef();
  const [imagess, setImage] = useState([]);
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const HandleChange = (name) => {
    // const options = e.target.value;
    // const values = options.map((option) => option.value);
    setSelectedOptions([...selectedOptions, name]);
    // console.log("kkkk", e.target.value);
  };

  const Employes = [
    {
      name: "Anoop vr",
    },
    {
      name: "Akhil valsu",
    },
    {
      name: "nikhil valsu",
    },
    {
      name: "manikandan",
    },
  ];
  // const [Object, setImag] = useState();

  const FileInput = () => {
    fileref.current.click();
  };

  const schema = yup.object().shape({
    image: yup.string().required("image required"),
    name: yup.string().required("Name is required"),
    description: yup.string().required("please add description"),
    // date: yup.string().required("required"),
    employe: yup.string().required("required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("aaaa", data);
  };

  const Remove = (i) => {
    const Pending2 = selectedOptions.filter((item, index) => index !== i);

    setSelectedOptions(Pending2);
  };

  const RemoveImg = (i) => {
    const PendingImg = imagess.filter((item, index) => index !== i);
    setImage(PendingImg);
  };

  const uploadImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage([...imagess, url]);
    }
  };

  useEffect(() => {
    console.log("jjj", selectedOptions);
  }, [selectedOptions, imagess]);

  return (
    <div className="edit-task">
      <h3>
        <i
          onClick={() => {
            navigate("/admin");
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Edit Task
      </h3>
      <h2 style={{ color: "red", width: "100%", textAlign: "center" }}>
        Not finished yet
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {imagess.length == 0 ? (
          <div className="add-photo-1">
            <i className="fa-solid fa-image"></i>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={uploadImg}
              ref={fileref}
            />
            <span onClick={FileInput}>Add Ref Img</span>
          </div>
        ) : (
          <div className="poster-added">
            <input
              style={{ display: "none" }}
              type="file"
              onChange={uploadImg}
              ref={fileref}
            />
            <div className="img-array">
              {imagess.map((i, index) => {
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
            // {...register("date")}`
          />
          {errors.date && <p>{errors.date.message}</p>}
        </div>
        <div>
          <input
            // placeholder="Position"
            type="date"
            id="date"
            name="date"
            // {...register("date")}`
          />
          {errors.date && <p>{errors.date.message}</p>}
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
              {Employes.map((i) => {
                return (
                  <span onClick={() => HandleChange(i.name)}>{i.name}</span>
                );
              })}
            </div>
          )}
          {selectedOptions.length === 0 && errors.employe && (
            <p>{errors.employe.message}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditTask;
