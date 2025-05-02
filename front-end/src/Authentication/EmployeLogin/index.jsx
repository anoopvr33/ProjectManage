import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const EmployeLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const EnterData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnLogin = async () => {
    const response = await axios.post(
      "http://localhost:3001/employe/login",
      data
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/employee");
    } else {
      return alert("Invalid Credentials");
    }
  };

  useEffect(() => {
    // SetTokenFalse();
  }, []);

  return (
    <div className="user-login">
      <div className="user-login-1">
        <h1>Sign In</h1>
        <input
          onChange={EnterData}
          type="text"
          placeholder="Email or Username"
          name="email"
          id="1"
        />
        <input
          onChange={EnterData}
          type="password"
          placeholder="Password"
          name="password"
          id="2"
        />
        <button onClick={OnLogin}>Sign In</button>
        <p>__________or__________</p>
        <button>Sign In with Google</button>
      </div>
    </div>
  );
};

export default EmployeLogin;
