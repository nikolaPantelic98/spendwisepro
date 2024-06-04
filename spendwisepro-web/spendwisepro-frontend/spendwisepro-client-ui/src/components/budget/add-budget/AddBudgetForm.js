import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React, {useEffect} from "react";
import BudgetName from "../form-elements/BudgetName";
import BudgetPeriod from "../form-elements/BudgetPeriod";
import BudgetAmount from "../form-elements/BudgetAmount";
import BudgetCategory from "../form-elements/BudgetCategory";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useReduxReset} from "../../../redux/useReduxReset";
import {useDispatch, useSelector} from "react-redux";
import {setBudgetAmount, setBudgetCategories, setBudgetName, setBudgetPeriod} from "../../../redux/budgetSlice";

export default function AddBudgetForm() {

    const reduxReset = useReduxReset();

    const dispatch = useDispatch();
    const budget = useSelector((state) => state.budget);
    const { amount, name, period, categories } = budget;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => {
        dispatch(setBudgetAmount(amount));
    };

    const handleNameChange = (name) => {
        dispatch(setBudgetName(name));
    };

    const handlePeriodChange = (period) => {
        dispatch(setBudgetPeriod(period));
    };

    const handleCategoriesChange = (categories) => {
        dispatch(setBudgetCategories(categories));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/budgets/save", budget, { headers });
            reduxReset();
            navigate("/budgets", {state: {addSuccess: true}});
        } catch (err) {
            console.log("error");
        }
    }

    const updatedAmount = useSelector((state) => state.budget.amount);
    const updatedName = useSelector((state) => state.budget.name);
    const updatedPeriod = useSelector((state) => state.budget.period);
    const updatedCategories = useSelector((state) => state.budget.categories);

    useEffect(() => {
        if (updatedAmount) {
            handleAmountChange(updatedAmount);
        } else if (updatedName) {
            handleNameChange(updatedName);
        } else if (updatedPeriod) {
            handlePeriodChange(updatedPeriod);
        } else if (updatedCategories) {
            handleCategoriesChange(updatedCategories);
        }
    }, [updatedAmount, updatedName, updatedPeriod, updatedCategories]);


    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <BudgetAmount setAmount={handleAmountChange} initialValue={amount} formType="add" />

                            <BudgetName setName={handleNameChange} initialValue={name} formType="add" />

                            <BudgetPeriod setPeriod={handlePeriodChange} initialValue={period} formType="add" />

                            <BudgetCategory setAllCategories={handleCategoriesChange} initialValue={categories} formType="add" />
                        </ul>
                        <hr className="my-2 border-blue-gray-50" />
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Add</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}