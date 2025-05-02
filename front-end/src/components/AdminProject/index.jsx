import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProject = () => {
  const [task, setTask] = useState("");
  const [proId, setProjectId] = useState([]);
  const [project, setPrject] = useState([]);
  const [emp, setEmp] = useState([]);
  const [isTrue, setTrue] = useState(false);
  const navigate = useNavigate();

  const GetDelete = async (ids) => {
    const response = await axios.delete(
      `http://localhost:3001/task/delete/${ids}`
    );
    GetTask();
  };
  const GetDelete2 = async (i) => {
    const response = await axios.delete(
      `http://localhost:3001/project/delete/${i}`
    );
    GetProject();
  };  

  const GetTask = async () => {
    const response = await axios.get("http://localhost:3001/task/get-all");
    const Halo = response.data.map((i) => {
      return {
        pro: i.project,
        name: i.name,
        startDate: i.startdate,
        employe: i.employe,
        id: i._id,
      };
    });
    setProjectId(Halo);
  };

  const GetProject = async () => {
    const response = await axios.get("http://localhost:3001/project/get-all");
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
    setPrject(AllData);
  };

  useEffect(() => {
    GetProject();
    GetTask();
  }, []);

  return (
    <div className="admin-dashboard-2">
      <div className="buttons">
        <button>Clear All</button>
        <button onClick={() => navigate("/add/project")}>Add Project</button>
      </div>
      {project.map((i, index) => {
        return (
          <div className="projects" key={index}>
            <p style={{ fontSize: "13px" }}>Status : {i.status}</p>
            <h4 onClick={() => navigate("/project-view")}>{i.name}</h4>
            <div className="pro-p">
              Employe :
              {i.employe.map((i) => {
                return <p>{i},</p>;
              })}
            </div>

            {/* <p>Employees : Akash,Akhil,Nikhil,Akash,</p> */}
            <div className="pro-btn">
              <a href={`/edit-project/${i.id}`}>Edit</a>
              <a onClick={() => GetDelete2(i.id)}>Delete</a>
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
              (proId.length == 0 ? (
                <div className="task-p">
                  <p>No tasks available</p>
                  <button onClick={() => navigate(`/add/task/${i.id}`)}>
                    Add Task
                  </button>
                </div>
              ) : (
                <div className="task-main">
                  {proId.map((it, index) => {
                    // {
                    //   it.pro==i.id ?
                    // }
                    return (
                      it.pro == i.id && (
                        <div className="task-1" key={index}>
                          <h4 onClick={() => navigate(`/task-view/${it.id}`)}>
                            {it.name} <span>(deadline-{it.enddate})</span>
                          </h4>
                          Group:
                          {it.employe.map((pp) => {
                            return <p>{pp}</p>;
                          })}
                          <div className="activity">
                            <p onClick={() => navigate("/edit-task")}>Edit</p>
                            <p onClick={() => GetDelete(it.id)}>Delete</p>
                          </div>
                        </div>
                      )
                    );
                  })}
                  <button onClick={() => navigate(`/add/task/${i.id}`)}>
                    Add Task
                  </button>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default AdminProject;
