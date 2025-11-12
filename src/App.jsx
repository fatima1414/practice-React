// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./layout/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<TaskList />} />
          <Route path="/addTask" element={<TaskForm />} />
          <Route path="/updateTask/:id" element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
