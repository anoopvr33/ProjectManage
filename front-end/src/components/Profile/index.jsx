import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getId } from "../../utils";

const Profile = () => {
  const navigate = useNavigate();
  const [employe, setEmploye] = useState({});

  const GetEmploye = async () => {
    const response = await axios.get(
      `http://localhost:3001/employe/get-one/${getId()}`
    );

    console.log("huhuhu", response.data);
    setEmploye(response.data);
  };

  useEffect(() => {
    GetEmploye();
  }, []);
  useEffect(() => {}, [employe]);
  return (
    <div className="profile-view">
      <div className="contents">
        <img src={employe.image} alt="" />
        <h2>{employe.name}</h2>
        <div>
          <label htmlFor="">Email :</label>
          <p>{employe.email}</p>
        </div>

        <div>
          <label htmlFor="">Position :</label>
          <p id="">{employe.position}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
