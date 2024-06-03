import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from '../redux/store';
import ScrollToTop from "../components/common/ScrollToTop";
import LandingPage from "./LandingPage";
import LoginPage from "./login/LoginPage";
import PrivateRoute from "../components/common/PrivateRoute";
import HomePage from "./HomePage";
import AddCategoryPage from "./category/AddCategoryPage";
import CategoriesPage from "./category/CategoriesPage";
import EditCategoryPage from "./category/EditCategoryPage";
import CategoryNamePage from "./category/form/CategoryNamePage";
import CategoryColorPage from "./category/form/CategoryColorPage";
import CategoryIconPage from "./category/form/CategoryIconPage";
import CategoryParentPage from "./category/form/CategoryParentPage";
import RecordsPage from "./record/RecordsPage";
import AddRecordPage from "./record/AddRecordPage";
import EditRecordPage from "./record/EditRecordPage";
import RecordAmountPage from "./record/form/RecordAmountPage";
import RecordCategoryPage from "./record/form/RecordCategoryPage";
import RecordPaymentTypePage from "./record/form/RecordPaymentTypePage";
import RecordCreditCardPage from "./record/form/RecordCreditCardPage";
import RecordNotePage from "./record/form/RecordNotePage";
import RecordDateAndTimePage from "./record/form/RecordDateAndTimePage";
import BalancePage from "./balance/BalancePage";
import CashPage from "./cash/CashPage";
import CreditCardPage from "./credit-card/CreditCardPage";
import AddCreditCardPage from "./credit-card/AddCreditCardPage";
import EditCreditCardPage from "./credit-card/EditCreditCardPage";
import CreditCardTypePage from "./credit-card/form/CreditCardTypePage";
import CreditCardNotePage from "./credit-card/form/CreditCardNotePage";
import CreditCardBankPage from "./credit-card/form/CreditCardBankPage";
import CreditCardIconPage from "./credit-card/form/CreditCardIconPage";
import CreditCardAmountPage from "./credit-card/form/CreditCardAmountPage";
import BudgetPage from "./budget/BudgetPage";
import BudgetWeeklyPage from "./budget/BudgetWeeklyPage";
import BudgetMonthlyPage from "./budget/BudgetMonthlyPage";
import AddBudgetPage from "./budget/AddBudgetPage";
import EditBudgetPage from "./budget/EditBudgetPage";
import BudgetAmountPage from "./budget/form/BudgetAmountPage";
import BudgetNamePage from "./budget/form/BudgetNamePage";
import BudgetCategoriesPage from "./budget/form/BudgetCategoriesPage";
import BudgetPeriodPage from "./budget/form/BudgetPeriodPage";
import GoalsPage from "./goal/GoalsPage";
import GoalWeeklyPage from "./goal/GoalWeeklyPage";
import GoalMonthlyPage from "./goal/GoalMonthlyPage";
import AddGoalPage from "./goal/AddGoalPage";
import ExpensesPage from "./expenses/ExpensesPage";
import ExpensesRecordsMonthlyPage from "./expenses/ExpensesRecordsMonthlyPage";
import ExpensesRecordsWeeklyPage from "./expenses/ExpensesRecordsWeeklyPage";
import PlannedPaymentsPage from "./planned-payments/PlannedPaymentsPage";
import AddPlannedPaymentPage from "./planned-payments/AddPlannedPaymentPage";
import RecordTransactionTypePage from "./record/form/RecordTransactionTypePage";

function App() {

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
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
                        <Route path="/records/transaction_type" element={<PrivateRoute element={<RecordTransactionTypePage />} />} />

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
                        <Route path="/edit_budget/:id" element={<PrivateRoute element={<EditBudgetPage />} />} />

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
                    <ScrollToTop />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;