
import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/login/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../../pages/HomePage";
import AddCategoryPage from "../../pages/category/AddCategoryPage";
import CategoriesPage from "../../pages/category/CategoriesPage";
import EditCategoryPage from "../../pages/category/EditCategoryPage";
import CategoryNamePage from "../../pages/category/form/CategoryNamePage";
import CategoryColorPage from "../../pages/category/form/CategoryColorPage";
import CategoryIconPage from "../../pages/category/form/CategoryIconPage";
import CategoryParentPage from "../../pages/category/form/CategoryParentPage";
import RecordsPage from "../../pages/record/RecordsPage";
import AddRecordPage from "../../pages/record/AddRecordPage";
import EditRecordPage from "../../pages/record/EditRecordPage";
import RecordAmountPage from "../../pages/record/form/RecordAmountPage";
import RecordCategoryPage from "../../pages/record/form/RecordCategoryPage";
import RecordPaymentTypePage from "../../pages/record/form/RecordPaymentTypePage";
import RecordCreditCardPage from "../../pages/record/form/RecordCreditCardPage";
import RecordNotePage from "../../pages/record/form/RecordNotePage";
import RecordDateAndTimePage from "../../pages/record/form/RecordDateAndTimePage";
import BalancePage from "../../pages/balance/BalancePage";
import CashPage from "../../pages/cash/CashPage";
import CreditCardPage from "../../pages/credit-card/CreditCardPage";
import AddCreditCardPage from "../../pages/credit-card/AddCreditCardPage";
import EditCreditCardPage from "../../pages/credit-card/EditCreditCardPage";
import CreditCardTypePage from "../../pages/credit-card/form/CreditCardTypePage";
import CreditCardNotePage from "../../pages/credit-card/form/CreditCardNotePage";
import CreditCardBankPage from "../../pages/credit-card/form/CreditCardBankPage";
import CreditCardIconPage from "../../pages/credit-card/form/CreditCardIconPage";
import CreditCardAmountPage from "../../pages/credit-card/form/CreditCardAmountPage";
import BudgetPage from "../../pages/budget/BudgetPage";
import BudgetWeeklyPage from "../../pages/budget/BudgetWeeklyPage";
import BudgetMonthlyPage from "../../pages/budget/BudgetMonthlyPage";
import AddBudgetPage from "../../pages/budget/AddBudgetPage";
import BudgetAmountPage from "../../pages/budget/form/BudgetAmountPage";
import BudgetNamePage from "../../pages/budget/form/BudgetNamePage";
import BudgetCategoriesPage from "../../pages/budget/form/BudgetCategoriesPage";
import BudgetPeriodPage from "../../pages/budget/form/BudgetPeriodPage";
import GoalsPage from "../../pages/goal/GoalsPage";
import GoalWeeklyPage from "../../pages/goal/GoalWeeklyPage";
import GoalMonthlyPage from "../../pages/goal/GoalMonthlyPage";
import AddGoalPage from "../../pages/goal/AddGoalPage";
import ExpensesPage from "../../pages/expenses/ExpensesPage";
import ExpensesRecordsMonthlyPage from "../../pages/expenses/ExpensesRecordsMonthlyPage";
import ExpensesRecordsWeeklyPage from "../../pages/expenses/ExpensesRecordsWeeklyPage";
import PlannedPaymentsPage from "../../pages/planned-payments/PlannedPaymentsPage";
import AddPlannedPaymentPage from "../../pages/planned-payments/AddPlannedPaymentPage";

import {AnimatePresence} from "framer-motion";

function AnimatedRoutes() {

    const location = useLocation();

    return (
        <>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route index element={<LandingPage />} />
                    <Route path="/" element={<LandingPage />}></Route>

                    <Route path="/login" element={<LoginPage />}></Route>

                    <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />

                    <Route path="/add_category" element={<PrivateRoute element={<AddCategoryPage />} />} />
                    <Route path="/categories" element={<PrivateRoute element={<CategoriesPage />} />} />
                    <Route path="/edit_category/:id" element={<PrivateRoute element={<EditCategoryPage />} />} />

                    <Route path="/categories/name" element={<PrivateRoute element={<CategoryNamePage />} />} />
                    <Route path="/categories/color" element={<PrivateRoute element={<CategoryColorPage />} />} />
                    <Route path="/categories/icon" element={<PrivateRoute element={<CategoryIconPage />} />} />
                    <Route path="/categories/parent" element={<PrivateRoute element={<CategoryParentPage />} />} />

                    <Route path="/records" element={<PrivateRoute element={<RecordsPage />} />} />
                    <Route path="/add_record" element={<PrivateRoute element={<AddRecordPage />} />} />
                    <Route path="/edit_record/:id" element={<PrivateRoute element={<EditRecordPage />} />} />

                    <Route path="/records/amount" element={<PrivateRoute element={<RecordAmountPage />} />} />
                    <Route path="/records/category" element={<PrivateRoute element={<RecordCategoryPage />} />} />
                    <Route path="/records/payment_type" element={<PrivateRoute element={<RecordPaymentTypePage />} />} />
                    <Route path="/records/credit_card" element={<PrivateRoute element={<RecordCreditCardPage />} />} />
                    <Route path="/records/note" element={<PrivateRoute element={<RecordNotePage />} />} />
                    <Route path="/records/date_and_time" element={<PrivateRoute element={<RecordDateAndTimePage />} />} />

                    <Route path="/balance" element={<PrivateRoute element={<BalancePage />} />} />
                    <Route path="/cash" element={<PrivateRoute element={<CashPage />} />} />
                    <Route path="/credit_cards" element={<PrivateRoute element={<CreditCardPage />} />} />
                    <Route path="/add_credit_card" element={<PrivateRoute element={<AddCreditCardPage />} />} />
                    <Route path="/edit_credit_card/:id" element={<PrivateRoute element={<EditCreditCardPage />} />} />

                    <Route path="/credit_cards/type" element={<PrivateRoute element={<CreditCardTypePage />} />} />
                    <Route path="/credit_cards/note" element={<PrivateRoute element={<CreditCardNotePage />} />} />
                    <Route path="/credit_cards/bank" element={<PrivateRoute element={<CreditCardBankPage />} />} />
                    <Route path="/credit_cards/icon" element={<PrivateRoute element={<CreditCardIconPage />} />} />
                    <Route path="/credit_cards/amount" element={<PrivateRoute element={<CreditCardAmountPage />} />} />

                    <Route path="/budgets" element={<PrivateRoute element={<BudgetPage />} />} />
                    <Route path="/budgets/weekly/*" element={<PrivateRoute element={<BudgetWeeklyPage />} />} />
                    <Route path="/budgets/monthly/*" element={<PrivateRoute element={<BudgetMonthlyPage />} />} />
                    <Route path="/add_budget" element={<PrivateRoute element={<AddBudgetPage />} />} />

                    <Route path="/budgets/amount" element={<PrivateRoute element={<BudgetAmountPage />} />} />
                    <Route path="/budgets/name" element={<PrivateRoute element={<BudgetNamePage />} />} />
                    <Route path="/budgets/categories" element={<PrivateRoute element={<BudgetCategoriesPage />} />} />
                    <Route path="/budgets/period" element={<PrivateRoute element={<BudgetPeriodPage />} />} />

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
            </AnimatePresence>
        </>
    );
}

export default AnimatedRoutes;