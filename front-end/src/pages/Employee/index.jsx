import React, { useState } from "react";
import "./style.css";
import ProjectTable from "../../components/ProjectTable/index.jsx";
import EmpProject from "../../components/EmployeProject/index.jsx";
import Profile from "../../components/Profile/index.jsx";

const EmployeeDash = () => {
  const [page, setPage] = useState("project");

  const RenderPage = () => {
    switch (page) {
      case "project":
        return (
          <div>
            <h2 style={{ paddingLeft: "14px" }}>DashBoard</h2>
            <EmpProject></EmpProject>
          </div>
        );
      case "status":
        return (
          <div>
            <h2 style={{ paddingLeft: "14px" }}>DashBoard</h2>
            <ProjectTable></ProjectTable>
          </div>
        );
      case "profile":
        return (
          <div>
            <h2 style={{ paddingLeft: "14px" }}>Profile</h2>
            <Profile></Profile>
          </div>
        );
      default:
        return <h1>Page Not Found !</h1>;
    }
  };

  return (
    <div className="emp-dash">
      <div className="nav">
        <h3>Project Management</h3>
      </div>
      {/* <h3>DashBoard</h3> */}

      <div className="emp-table">{RenderPage()}</div>
      <div className="emp-project"></div>
      <div className="emp-buttons">
        <button onClick={() => setPage("project")}>Projects</button>
        <button onClick={() => setPage("status")}>Status</button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </div>
    </div>
  );
};

export default EmployeeDash;
