import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import UsersPage from "./user/UsersPage";
import LoginPage from "./login/LoginPage";
import PrivateRoute from "../components/common/PrivateRoute";
import RegisterPage from "./register/RegisterPage";
import IconsPage from "./icon/IconsPage";
import AddIconPage from "./icon/AddIconPage";

function App() {



  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<PrivateRoute element={<RegisterPage />} />} />

                <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="home" element={<PrivateRoute element={<HomePage />} />} />

                <Route path="/users" element={<PrivateRoute element={<UsersPage />} />} />

                <Route path="/icons" element={<PrivateRoute element={<IconsPage />} />} />
                <Route path="/add_icon" element={<PrivateRoute element={<AddIconPage />} />} />
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
