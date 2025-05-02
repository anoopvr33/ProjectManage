import axios from "axios";

const CustomAxios = axios.create({
  baseUrl: "http://localhost:3001",
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
});

export default CustomAxios;
