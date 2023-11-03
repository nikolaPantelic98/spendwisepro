import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import UsersPage from "./user/UsersPage";
import LoginPage from "./login/LoginPage";
import PrivateRoute from "../components/common/PrivateRoute";
import RegisterPage from "./register/RegisterPage";
import CategoryIconsPage from "./categoryicon/CategoryIconsPage";
import AddCategoryIconPage from "./categoryicon/AddCategoryIconPage";
import CreditCardIconsPage from "./creditcardicon/CreditCardIconsPage";
import AddCreditCardIconPage from "./creditcardicon/AddCreditCardIconPage";

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

                <Route path="/category_icons" element={<PrivateRoute element={<CategoryIconsPage />} />} />
                <Route path="/add_category_icon" element={<PrivateRoute element={<AddCategoryIconPage />} />} />

                <Route path="/credit_card_icons" element={<PrivateRoute element={<CreditCardIconsPage />} />} />
                <Route path="/add_credit_card_icon" element={<PrivateRoute element={<AddCreditCardIconPage />} />} />
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
