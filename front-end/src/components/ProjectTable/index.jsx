import React from "react";
import "./style.css";

const ProjectTable = () => {
  const Table = [
    {
      name: "Todo App",
      status: 1,
    },
    {
      name: "Instagram Clone",
      status: 2,
    },
    {
      name: "E-commerce",
      status: 1,
    },
    {
      name: "FlipKart clone",
      status: 3,
    },
    {
      name: "Vercel Post",
      status: 4,
    },
    {
      name: "Twitter",
      status: 5,
    },
    {
      name: "Matrimony",
      status: 4,
    },
    {
      name: "NetFlix",
      status: 2,
    },
  ];

  return (
    <div className="main-table">
      <h4>Project Table</h4>
      <h2 style={{ color: "red", width: "100%", textAlign: "center" }}>
        Not finished yet
      </h2>
      <div className="table-project">
        <table>
          <thead>
            <tr>
              <th>Need to Do</th>
              <th>In Progress</th>
              <th>Need for Test</th>
              <th>Completed</th>
              <th>Re-Open</th>
            </tr>
          </thead>
          <tbody>
            {Table.map((i, index) => {
              return (
                <tr>
                  <td>{i.status == 1 && i.name}</td>
                  <td>{i.status == 2 && i.name}</td>
                  <td>{i.status == 3 && i.name}</td>
                  <td>{i.status == 4 && i.name}</td>
                  <td>{i.status == 5 && i.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
