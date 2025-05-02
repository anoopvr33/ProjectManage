import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ProjectView = () => {
  const navigate = useNavigate();

  return (
    <div className="project-view">
      <h3>
        <i
          onClick={() => {
            navigate(-1);
          }}
          className="fa-solid fa-arrow-left"
        ></i>
        Project View
      </h3>
      <div className="contents">
        <h2>Project Name</h2>
        <div>
          <label htmlFor="">Project icon :</label>
          <img src="/public/vite.svg" alt="" />
        </div>

        <div>
          <label htmlFor="description">Description :</label>
          <p id="description">
            Lorem ipsum dolor sit amet consecteturorrupti dolor sit amet
            consecteturorrupti repellendusb repellendus!
          </p>
        </div>
        <div>
          <label htmlFor="">start date :</label>
          <p>20/10/2025</p>
        </div>
        <div>
          <label htmlFor="">end date date :</label>
          <p>20/10/2025</p>
        </div>
        <div>
          <label htmlFor="">employees :</label>
          <p>Anoop vr, obamma, faissy</p>
        </div>
        <div>
          <label htmlFor="">Tasks :</label>
          <p onClick={() => navigate("/task-view")}>Task 1, Task 2, Task 3</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
