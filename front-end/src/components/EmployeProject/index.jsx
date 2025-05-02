import React, { use, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getId } from "../../utils";

const EmpProject = () => {
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [isTrue, setTrue] = useState(false);
  const [project, setProject] = useState([]);
  const [project2, setProject2] = useState([]);
  const [Tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const GetEmploye = async () => {
    const response = await axios.get(
      `http://localhost:3001/employe/get-one/${getId()}`
    );
    console.log("poooohh", response);
    setName(response.data.name);
  };

  const GetTask = async () => {
    const response = await axios.get("http://localhost:3001/task/get-all");
    const Halo = response.data.map((i) => {
      return {
        pro: i.project,
        name: i.name,
        startDate: i.startdate,
        employe: i.employe,
        images: i.images,
        id: i._id,
      };
    });
    setTasks(Halo);
  };

  const GetProject = async () => {
    const response = await axios.get("http://localhost:3001/project/get-all");
    console.log("hahah", response.data);
    const AllData = response.data.map((i) => {
      return {
        id: i._id,
        name: i.name,
        startTime: i.startdate,
        endDate: i.enddate,
        employe: i.employe,
        status: "need to do",
      };
    });
    // setEmp(AllData.employe);
    console.log("hoooll", AllData);
    setProject(AllData);
    filteres();
  };

  const filteres = () => {
    console.log("hgaaoha");
    const filterData = project
      .filter((i) => {
        return i.employe.some((emp) =>
          emp.toLowerCase().includes(name.toLowerCase())
        );
      })
      .reverse();
    setProject2(filterData);
    console.log("kikiki", filterData);
  };

  // console.log(formattedDate);

  useEffect(() => {
    GetEmploye(), GetTask();
  }, []);

  useEffect(() => {
    GetProject();
  }, [name]);

  useEffect(() => {
    console.log("kaaa", Tasks);
    filteres();
  }, [project]);

  return (
    <div className="emp-dashboard-2">
      <h4>Projects</h4>

      {project2.map((i, index) => {
        return (
          <div className="projects" key={index}>
            <h4 onClick={() => navigate("/project-view")}>
              {i.name} <span>deadline(23/10/2025)</span>
            </h4>
            {/* <p style={{ fontSize: "15px" }}>Status : {i.status}</p> */}
            <div className="pro-p">
              Employe :
              {i.employe.map((i) => {
                return <p>{i},</p>;
              })}
            </div>
            <div className="pro-btn">
              <tr
                onClick={() => {
                  setTrue(!isTrue), setTask(index);
                }}
              >
                Tasks
              </tr>
            </div>
            {task == index &&
              isTrue &&
              (Tasks.length === 0 ? (
                <div style={{ backgroundColor: "grey", width: "100%" }}>
                  <p>No tasks available</p>
                  <button>Add Task</button>
                </div>
              ) : (
                <div className="task-main">
                  {Tasks.map((it, index) => {
                    return it.pro == i.id ? (
                      <div className="task-1" key={index}>
                        <h4 onClick={() => navigate(`/task-view/${it.id}`)}>
                          {it.name} <span>(deadline-{i.startdate})</span>
                        </h4>
                        <p>Employe : {i.employe}</p>
                        <div className="img-map">
                          {it.images.map((i, index) => {
                            return <img src={i} alt="" />;
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default EmpProject;
