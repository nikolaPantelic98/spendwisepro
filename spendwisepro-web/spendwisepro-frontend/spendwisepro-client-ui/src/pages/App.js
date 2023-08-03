import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import AddCategoryPage from "./category/AddCategoryPage";
import CategoriesPage from "./category/CategoriesPage";
import AddRecordPage from "./record/AddRecordPage";
import CashPage from "./cash/CashPage";
import CreditCardPage from "./credit-card/CreditCardPage";
import AddCreditCardPage from "./credit-card/AddCreditCardPage";
import BudgetPage from "./budget/BudgetPage";
import GoalsPage from "./goal/GoalsPage";
import BudgetWeeklyPage from "./budget/BudgetWeeklyPage";
import GoalWeeklyPage from "./goal/GoalWeeklyPage";
import BalancePage from "./balance/BalancePage";
import RecordsPage from "./record/RecordsPage";
import ExpensesPage from "./expenses/ExpensesPage";

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

                    <Route path="/records" element={<RecordsPage />}></Route>
                    <Route path="/add_record" element={<AddRecordPage />}></Route>

                    <Route path="/balance" element={<BalancePage />}></Route>
                    <Route path="/cash" element={<CashPage />}></Route>
                    <Route path="/credit_cards" element={<CreditCardPage />}></Route>
                    <Route path="/add_credit_card" element={<AddCreditCardPage />}></Route>

                    <Route path="/budgets" element={<BudgetPage />}></Route>
                    <Route path="/budgets/weekly/general" element={<BudgetWeeklyPage />}></Route>

                    <Route path="/goals" element={<GoalsPage />}></Route>
                    <Route path="/goals/weekly/laptop" element={<GoalWeeklyPage />}></Route>

                    <Route path="/expenses" element={<ExpensesPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;