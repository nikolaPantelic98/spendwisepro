import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React, {useState} from "react";
import AddBudgetName from "./add-budget-elements/AddBudgetName";
import AddBudgetPeriod from "./add-budget-elements/AddBudgetPeriod";
import AddBudgetAmount from "./add-budget-elements/AddBudgetAmount";
import AddBudgetCategory from "./add-budget-elements/AddBudgetCategory";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function AddBudgetForm() {

    const [budget, setBudget] = useState({
        amount: "",
        name: "",
        period: "",
        categories: null
    });
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => setBudget({...budget, amount});
    const handleNameChange = (name) => setBudget({...budget, name});
    const handlePeriodChange = (period) => setBudget({...budget, period});
    const handleCategoriesChange = (categories) => setBudget({...budget, categories});


    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/budgets/save", budget, { headers });
            navigate("/budgets", {state: {addSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <AddBudgetAmount setAmount={handleAmountChange} />

                            <AddBudgetName setName={handleNameChange} />

                            <AddBudgetPeriod setPeriod={handlePeriodChange} />

                            <AddBudgetCategory setAllCategories={handleCategoriesChange} />
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