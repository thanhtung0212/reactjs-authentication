import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./containers/Dashboard";
import SignUp from "./containers/SignUp";
import { RoutesNavigation as RoutesApp } from "./navigations";
import Login from "./containers/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={RoutesApp.Home}
          element={<PrivateRoute children={<Dashboard />} />}
        />
        <Route path={RoutesApp.Login} element={<Login />} />
        <Route path={RoutesApp.SignUp} element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
