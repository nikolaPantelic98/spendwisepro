import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, BanknotesIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import { Progress } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BudgetList() {

    const [weeklyBudgets, setWeeklyBudgets] = useState([]);
    const [monthlyBudgets, setMonthlyBudgets] = useState([]);
    const [recordsThisWeek, setRecordsThisWeek] = useState([]);
    const [recordsThisMonth, setRecordsThisMonth] = useState([]);
    const [categories, setCategories] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/budgets/weekly', { headers })
            .then(response => {
                setWeeklyBudgets(response.data);
            })
            .catch(error => console.error('Error fetching weekly budgets:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/budgets/monthly', { headers })
            .then(response => {
                setMonthlyBudgets(response.data);
            })
            .catch(error => console.error('Error fetching monthly budgets:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/expense_records_this_week', { headers })
            .then(response => {
                setRecordsThisWeek(response.data);
            })
            .catch(error => console.error('Error fetching expense records this week:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/expense_records_this_month', { headers })
            .then(response => {
                setRecordsThisMonth(response.data);
            })
            .catch(error => console.error('Error fetching expense records this month:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all', { headers })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Create a new array of weekly budgets based on the provided budgets and expense records
    const weeklyBudgetsFinal = weeklyBudgets
        .map(budget => {

            let matchingRecords = recordsThisWeek.filter(record =>
                budget.categories.some(budgetCategory => budgetCategory.name === record.category.name)
            );

            const sumSpent = matchingRecords.reduce((total, record) => total + record.amount, 0);

            return {
                id: budget.id,
                period: budget.period,
                name: budget.name,
                category: budget.category,
                amount: budget.amount,
                spent: sumSpent
            };
        });

    // Create a new array of monthly budgets based on the provided budgets and expense records
    const monthlyBudgetsFinal = monthlyBudgets
        .map(budget => {

            let matchingRecords = recordsThisMonth.filter(record =>
                budget.categories.some(budgetCategory => budgetCategory.name === record.category.name)
            );

            const sumSpent = matchingRecords.reduce((total, record) => total + record.amount, 0);

            return {
                id: budget.id,
                period: budget.period,
                name: budget.name,
                category: budget.category,
                amount: budget.amount,
                spent: sumSpent
            };
        });

    function generateAmountLeft(amount, spent) {
        return amount - spent;
    }

    function generateProgressColor(amount, spent) {
        if (spent / amount < 0.75) {
            return "green";
        } else if (spent / amount < 1) {
            return "orange";
        } else if (spent / amount >= 1) {
            return "red";
        }
    }

    function generateProgressValue(amount, spent) {
        let progressValue = spent / amount * 100;
        if (progressValue > 100) progressValue = 100;

        return progressValue;
    }

    function generatePath(name) {
        return name.toLowerCase().replace(/\s+/g, '_');
    }

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                        Weekly
                        <Link to="/add_budget" onClick={storeScrollPosition}>
                            {(weeklyBudgetsFinal.length !== 0) && (
                                <Button size="sm" variant="text" className="flex gap-2">
                                    Add budget
                                    <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                </Button>
                            )}
                        </Link>
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            {(weeklyBudgetsFinal.length === 0) && (
                                <div>
                                    <div className="flex justify-center items-center flex-col mb-6">
                                        <BanknotesIcon className="w-20 h-20 text-green-600 mb-2"/>
                                        <Typography variant="h6" className="text-gray-600">
                                            You don't have
                                        </Typography>
                                        <Typography variant="h6" className="text-gray-600">
                                            active weekly budgets
                                        </Typography>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Link to="/add_budget" onClick={storeScrollPosition} className="w-full">
                                            <Button className="w-full" variant="gradient" color="green">
                                                <span>Add weekly budget</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {weeklyBudgetsFinal
                                .map((budget) => (
                                    <li key={budget.id} className="py-3 sm:py-4">
                                        <Link to={`/budgets/weekly/${budget.id}`} onClick={storeScrollPosition}>
                                            <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                <div className="flex-1 w-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                            {budget.name}
                                                        </Typography>
                                                        <div className="flex gap-4 items-center">
                                                            <Typography className="text-gray-900 font-semibold mt-2">
                                                                {budget.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                                    <div className="flex justify-between">
                                                        <Typography className="text-sm font-semibold text-gray-800">
                                                            {budget.spent.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                        <Typography className={`text-sm font-semibold ${generateAmountLeft(budget.amount, budget.spent) < 0 ? 'text-red-800' : 'text-green-800'}`}>
                                                            {Math.abs(generateAmountLeft(budget.amount, budget.spent)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            Spent
                                                        </Typography>
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            {generateAmountLeft(budget.amount, budget.spent) < 0 ? 'Overspent' : 'Remains'}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                                </div>
                                            </ListItem>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                        Monthly
                        <Link to="/add_budget" onClick={storeScrollPosition}>
                            {(monthlyBudgetsFinal.length !== 0) && (
                                <Button size="sm" variant="text" className="flex gap-2">
                                    Add budget
                                    <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                </Button>
                            )}
                        </Link>
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            {(monthlyBudgetsFinal.length === 0) && (
                                <div>
                                    <div className="flex justify-center items-center flex-col mb-6">
                                        <BanknotesIcon className="w-20 h-20 text-green-600 mb-2"/>
                                        <Typography variant="h6" className="text-gray-600">
                                            You don't have
                                        </Typography>
                                        <Typography variant="h6" className="text-gray-600">
                                            active monthly budgets
                                        </Typography>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Link to="/add_budget" onClick={storeScrollPosition} className="w-full">
                                            <Button className="w-full" variant="gradient" color="green">
                                                <span>Add monthly budget</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {monthlyBudgetsFinal
                                .map((budget) => (
                                    <li key={budget.id} className="py-3 sm:py-4">
                                        <Link to={`/budgets/monthly/${budget.id}`} onClick={storeScrollPosition}>
                                            <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                <div className="flex-1 w-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                            {budget.name}
                                                        </Typography>
                                                        <div className="flex gap-4 items-center">
                                                            <Typography className="text-gray-900 font-semibold mt-2">
                                                                {budget.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                                    <div className="flex justify-between">
                                                        <Typography className="text-sm font-semibold text-gray-800">
                                                            {budget.spent.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                        <Typography className={`text-sm font-semibold ${generateAmountLeft(budget.amount, budget.spent) < 0 ? 'text-red-800' : 'text-green-800'}`}>
                                                            {Math.abs(generateAmountLeft(budget.amount, budget.spent)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            Spent
                                                        </Typography>
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            {generateAmountLeft(budget.amount, budget.spent) < 0 ? 'Overspent' : 'Remains'}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                                </div>
                                            </ListItem>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}