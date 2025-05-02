import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/index.jsx";
import AddEmployee from "./components/AddEmployee/index.jsx";
import AddProject from "./components/AddProject/index.jsx";
import AddTask from "./components/AddTask/index.jsx";
import EmployeeDash from "./pages/Employee/index.jsx";
import ProjectView from "./components/ProjectView/index.jsx";
import TaskView from "./components/TaskView/index.jsx";
import Profile from "./components/Profile/index.jsx";
import EditEmploye from "./components/EditEmploye/index.jsx";
import EditProject from "./components/EditProject/index.jsx";
import EditTask from "./components/EditTask/index.jsx";
import EmployeLogin from "./Authentication/EmployeLogin/index.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/add/employee" element={<AddEmployee />} />
        <Route path="/add/project" element={<AddProject />} />
        <Route path="/add/task/:id" element={<AddTask />} />
        <Route path="/employee" element={<EmployeeDash />} />
        <Route path="/project-view" element={<ProjectView />} />
        <Route path="/task-view/:id" element={<TaskView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-employe" element={<EditEmploye />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/edit-task" element={<EditTask />} />
        <Route path="/login" element={<EmployeLogin />} />
      </Routes>
    </>
  );
};

export default App;
