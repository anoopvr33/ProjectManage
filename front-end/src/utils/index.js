import { jwtDecode } from "jwt-decode";

export const getId = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  return decode.id;
};
