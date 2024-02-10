import {
    Card,
    CardBody,
    Button, DialogHeader, DialogBody, DialogFooter, Dialog,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import BudgetName from "../form-elements/BudgetName";
import BudgetPeriod from "../form-elements/BudgetPeriod";
import BudgetAmount from "../form-elements/BudgetAmount";
import BudgetCategory from "../form-elements/BudgetCategory";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useReduxReset} from "../../../redux/useReduxReset";
import {useDispatch, useSelector} from "react-redux";
import {setBudgetAmount, setBudgetCategories, setBudgetName, setBudgetPeriod} from "../../../redux/budgetSlice";

export default function EditBudgetForm() {

    const [budgetDB, setBudgetDB] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(false);
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

    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const handleOpenDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(true);
    const handleCloseDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/budgets/${id}`, { headers })
            .then(response => {
                setBudgetDB(response.data);
            })
            .catch(error => console.error('Error fetching budget:', error));
    }, [id]);

    function getPeriod(period) {
        if (period === 'WEEKLY') {
            return "weekly";
        } else if (period === 'MONTHLY') {
            return "monthly";
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/budgets/edit/${id}`, budget, { headers });
            reduxReset();
            navigate('/budgets/' + getPeriod(budget.period) + `/${id}`, {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
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
        }
        if (updatedName) {
            handleNameChange(updatedName);
        }
        if (updatedPeriod) {
            handlePeriodChange(updatedPeriod);
        }
        if (updatedCategories) {
            handleCategoriesChange(updatedCategories);
        }
    }, [updatedAmount, updatedName, updatedPeriod, updatedCategories]);

    const deleteBudget = () => {
        axios.delete(`http://localhost:8000/spendwisepro/budgets/delete/${id}`, { headers })
            .then(() => {
                navigate('/budgets', {state: {deleteSuccess: true}});
            })
            .catch(error => console.error('Error deleting budget:', error));
        handleCloseDeleteConfirmationDialog();
    }

    function navigateToBudget() {
        navigate('/budgets/' + getPeriod(budget.period) + `/${id}`);
    }


    return budgetDB ? (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                            <BudgetAmount setAmount={handleAmountChange} initialValue={amount !== "" ? amount : budgetDB.amount} formType="edit" id={id} />

                            <BudgetName setName={handleNameChange} initialValue={name !== "" ? name : budgetDB.name} formType="edit" id={id} />

                            <BudgetPeriod setPeriod={handlePeriodChange} initialValue={period !== "" ? period : budgetDB.period} formType="edit" id={id} />

                            <BudgetCategory setAllCategories={handleCategoriesChange} initialValue={categories !== null ? categories : budgetDB.categories} formType="edit" id={id} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button onClick={handleOpenDeleteConfirmationDialog} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                            <Button className="mt-2 w-full" variant="outlined" color="green" onClick={() => {
                                navigateToBudget();
                                reduxReset();
                            }}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                </form>

            </CardBody>

            <Dialog
                open={openDeleteConfirmationDialog}
                handler={handleCloseDeleteConfirmationDialog}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Are you sure?</DialogHeader>
                <DialogBody>
                    Do you really want to delete this budget? This process cannot be undone.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={deleteBudget}
                        className="mr-1"
                    >
                        <span>Delete</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleCloseDeleteConfirmationDialog}>
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Card>
    ) : null;
}