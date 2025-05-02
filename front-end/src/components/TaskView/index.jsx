import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({});

  const GetTask = async () => {
    const response = await axios.get(
      `http://localhost:3001/task/get-one/${id}`
    );

    console.log("huhuhu", response.data);
    setTasks(response.data);
  };

  useEffect(() => {
    GetTask();
  }, []);

  useEffect(() => {}, [tasks]);

  return (
    <div className="task-view">
      <h3>
        <i
          onClick={() => {
            navigate(-1);
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Task View
      </h3>
      <div className="contents">
        <h4>Task Name : {tasks.name}</h4> <label htmlFor="">Ref Images :</label>
        <div className="content-img">
          {tasks.images &&
            tasks.images.map((i) => {
              return <img src={i} alt="" />;
            })}
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <p id="description">{tasks.description}</p>
        </div>
        <div>
          <label htmlFor="">start date :</label>
          <p>{tasks.startdate}</p>
        </div>
        <div>
          <label htmlFor="">end date date :</label>
          <p>{tasks.enddate}</p>
        </div>
        <div>
          <label htmlFor="">employees :</label>
          <p>
            {tasks.employe &&
              tasks.employe.map((i) => {
                return <p>{i}</p>;
              })}
          </p>
        </div>
        {/* <div>
          <label htmlFor="">Tasks :</label>
          <p>Task 1, Task 2, Task 3</p>
        </div> */}
      </div>
    </div>
  );
};

export default TaskView;
