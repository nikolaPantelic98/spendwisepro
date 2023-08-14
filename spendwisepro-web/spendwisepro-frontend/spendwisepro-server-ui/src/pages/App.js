import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import UsersPage from "./user/UsersPage";

function App() {

  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>

                <Route path="/users" element={<UsersPage />}></Route>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
