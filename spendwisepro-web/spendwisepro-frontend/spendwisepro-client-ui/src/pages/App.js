import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import AddCategoryPage from "./category/AddCategoryPage";
import CategoriesPage from "./category/CategoriesPage";
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
import ExpensesRecordsMonthlyPage from "./expenses/ExpensesRecordsMonthlyPage";
import PlannedPaymentsPage from "./planned-payments/PlannedPaymentsPage";
import AddBudgetPage from "./budget/AddBudgetPage";
import AddGoalPage from "./goal/AddGoalPage";
import AddPlannedPaymentPage from "./planned-payments/AddPlannedPaymentPage";
import LoginPage from "./login/LoginPage";
import ExpensesRecordsWeeklyPage from "./expenses/ExpensesRecordsWeeklyPage";
import BudgetMonthlyPage from "./budget/BudgetMonthlyPage";
import GoalMonthlyPage from "./goal/GoalMonthlyPage";
import LandingPage from "./LandingPage";
import PrivateRoute from "../components/common/PrivateRoute";
import EditCategoryPage from "./category/EditCategoryPage";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/" element={<LandingPage />}></Route>

                    <Route path="/login" element={<LoginPage />}></Route>

                    <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />

                    <Route path="/add_category" element={<PrivateRoute element={<AddCategoryPage />} />} />
                    <Route path="/categories" element={<PrivateRoute element={<CategoriesPage />} />} />
                    <Route path="/edit_category/:id" element={<PrivateRoute element={<EditCategoryPage />} />} />

                    <Route path="/records" element={<PrivateRoute element={<RecordsPage />} />} />

                    <Route path="/balance" element={<PrivateRoute element={<BalancePage />} />} />
                    <Route path="/cash" element={<PrivateRoute element={<CashPage />} />} />
                    <Route path="/credit_cards" element={<PrivateRoute element={<CreditCardPage />} />} />
                    <Route path="/add_credit_card" element={<PrivateRoute element={<AddCreditCardPage />} />} />

                    <Route path="/budgets" element={<PrivateRoute element={<BudgetPage />} />} />
                    <Route path="/budgets/weekly/*" element={<PrivateRoute element={<BudgetWeeklyPage />} />} />
                    <Route path="/budgets/monthly/*" element={<PrivateRoute element={<BudgetMonthlyPage />} />} />
                    <Route path="/add_budget" element={<PrivateRoute element={<AddBudgetPage />} />} />

                    <Route path="/goals" element={<PrivateRoute element={<GoalsPage />} />} />
                    <Route path="/goals/weekly/*" element={<PrivateRoute element={<GoalWeeklyPage />} />} />
                    <Route path="/goals/monthly/*" element={<PrivateRoute element={<GoalMonthlyPage />} />} />
                    <Route path="/add_goal" element={<PrivateRoute element={<AddGoalPage />} />} />

                    <Route path="/expenses" element={<PrivateRoute element={<ExpensesPage />} />} />
                    <Route path="/expenses/month/*" element={<PrivateRoute element={<ExpensesRecordsMonthlyPage />} />} />
                    <Route path="/expenses/week/*" element={<PrivateRoute element={<ExpensesRecordsWeeklyPage />} />} />

                    <Route path="/planned_payments" element={<PrivateRoute element={<PlannedPaymentsPage />} />} />
                    <Route path="/add_planned_payment" element={<PrivateRoute element={<AddPlannedPaymentPage />} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;