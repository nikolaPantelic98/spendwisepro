import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import UsersPage from "./user/UsersPage";
import LoginPage from "./login/LoginPage";

function App() {



  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>

                <Route path="/users" element={<UsersPage />}></Route>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
