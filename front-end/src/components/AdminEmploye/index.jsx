import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEmployee = () => {
  const [task, setTask] = useState("");
  const [isTrue, setTrue] = useState(false);
  const [employe, setEmploye] = useState([]);

  const navigate = useNavigate();

  const GetEmploye = async () => {
    const response = await axios.get(`http://localhost:3001/employe/get`);
    console.log("poooohh", response);
    setEmploye(response.data);
  };
  const GetDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:3001/employe/delete/${id}`
    );
    console.log("poooohh", response);
    GetEmploye();
  };

  useEffect(() => {
    GetEmploye();
  }, []);

  useEffect(() => {}, [employe]);

  return (
    <div className="admin-dashboard-3">
      <div className="buttons">
        <button>Clear All</button>
        <button onClick={() => navigate("/add/employee")}>Add Employee</button>
      </div>
      {employe.map((i, index) => {
        return (
          <div className="projects" key={index}>
            <div className="h4">
              <img src={i.image} alt="" />
              <span>
                {i.name} <p>Position : {i.position}</p>
              </span>
            </div>

            <div className="pro-btn">
              <a href="/edit-employe">Edit</a>
              <a onClick={() => GetDelete(i._id)}>Delete</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminEmployee;
