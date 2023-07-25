import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import AddCategoryPage from "./AddCategoryPage";
import CategoriesPage from "./CategoriesPage";
import AddRecordPage from "./AddRecordPage";
import CashPage from "./CashPage";
import CreditCardPage from "./CreditCardPage";
import AddCreditCardPage from "./AddCreditCardPage";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/home" element={<HomePage />}></Route>

                    <Route path="/add_category" element={<AddCategoryPage />}></Route>
                    <Route path="/categories" element={<CategoriesPage />}></Route>

                    <Route path="/add_record" element={<AddRecordPage />}></Route>

                    <Route path="/cash" element={<CashPage />}></Route>
                    <Route path="/credit_cards" element={<CreditCardPage />}></Route>
                    <Route path="/add_credit_card" element={<AddCreditCardPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;