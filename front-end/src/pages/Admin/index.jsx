import React, { useState } from "react";
import AdminProject from "../../components/AdminProject/index.jsx";
import AdminEmployee from "../../components/AdminEmploye/index.jsx";

import "./style.css";

const Admin = () => {
  const [bgcolor, setColor] = useState("white");
  const [bgcolor2, setColor2] = useState("rgb(201, 191, 232)");
  return (
    <div className="admin-dashboard">
      <h3>
        <i class="fa-solid fa-bars"></i>Admin DashBoard
      </h3>
      <div className="main-link">
        <a
          style={{ backgroundColor: `${bgcolor}`, color: "black" }}
          href="#section-1"
          onClick={() => {
            setColor("white"), setColor2("rgb(201, 191, 232)");
          }}
        >
          Projects
        </a>
        <a
          href="#section-2"
          style={{ backgroundColor: `${bgcolor2}`, color: "black" }}
          onClick={() => {
            setColor("rgb(201, 191, 232)"), setColor2("white");
          }}
        >
          Employee
        </a>
      </div>
      <div className="section-main">
        <section id="section-1">
          <AdminProject></AdminProject>
        </section>
        <section id="section-2">
          <AdminEmployee></AdminEmployee>
        </section>
      </div>
      <div className="footer">
        <button style={{ backgroundColor: "rgb(187, 172, 242)" }}>Home</button>
        <button>profile</button>
        <button>settings</button>
      </div>
    </div>
  );
};

export default Admin;
