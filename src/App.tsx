import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./component/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoginData,
  setRegisterData,
  setUserData,
} from "./redux/slices/authentication";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state?.register?.data?.id);
  const token = useSelector((state: any) => state?.login?.data?.token);

  React.useEffect(() => {
    const storedRegisteredData = localStorage.getItem("register_data");
    const storedLoginData = localStorage.getItem("login_data");
    if (!userId && storedRegisteredData) {
      dispatch(setRegisterData(JSON.parse(storedRegisteredData)));
    }
    if (!token && storedLoginData) {
      dispatch(setLoginData(JSON.parse(storedLoginData)));
    }
  }, [userId, token]);

  console.log(token,userId)
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            token && userId ? (
              <Navigate to={`/dashboard/${userId}`} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={token && userId ? <Dashboard /> : <Register />}
        />
        <Route
          path="/login"
          element={
            token && userId ? (
              <Navigate to={`/dashboard/${userId}`} />
            ) : <Login />
          }
        />
        <Route
          path="/dashboard/:id"
          element={token && userId ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
