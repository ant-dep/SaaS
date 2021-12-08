import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/require-auth";

import Header from "./containers/header";
import Home from "./containers/home";
import Register from "./containers/user/register";
import Login from "./containers/user/login";
import Logout from "./containers/user/logout";
import Forgot from "./containers/user/forgot";
import Prospect from "./containers/prospect";
import AddProspect from "./containers/prospect/addProspect";
import EditProspect from "./containers/prospect/editProspect";
import DetailProspect from "./containers/prospect/detailProspect";
import Agenda from "./containers/agenda";
import { Navigate } from "react-router";
import Stat from "./containers/stat";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<RequireAuth child={Home} auth={true} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route
          exact
          path="/prospect/all"
          element={<RequireAuth child={Prospect} auth={true} />}
        />
        <Route
          exact
          path="/prospect/add"
          element={<RequireAuth child={AddProspect} auth={true} />}
        />
        <Route
          exact
          path="/prospect/edit/:id"
          element={<RequireAuth child={EditProspect} auth={true} />}
        />
        <Route
          exact
          path="/prospect/:id"
          element={<RequireAuth child={DetailProspect} auth={true} />}
        />
        <Route
          exact
          path="/agenda"
          element={<RequireAuth child={Agenda} auth={true} />}
        />
        <Route
          exact
          path="/stats"
          element={<RequireAuth child={Stat} auth={true} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
