import {
    Card,
    CardBody,
    Typography,
    Chip, Button,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Progress } from "@material-tailwind/react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import {Link} from "react-router-dom";
import getData from "../../../api/axiosInstance";

export default function BudgetMonthlyOverview({ id }) {

    const [monthlyBudgets, setMonthlyBudgets] = useState([]);
    const [recordsThisMonth, setRecordsThisMonth] = useState([]);
    const [categories, setCategories] = useState([]);
    const [budget, setBudget] = useState(null);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            "/budgets/monthly",
            headers,
            setMonthlyBudgets,
            "Error fetching budgets"
        )
    }, []);

    useEffect(() => {
        getData(
            "/records/expense_records_this_month",
            headers,
            setRecordsThisMonth,
            "Error fetching expense records this month"
        )
    }, []);

    useEffect(() => {
        getData(
            "/categories/all",
            headers,
            setCategories,
            "Error fetching categories"
        )
    }, []);

    // Create a new object of monthly budgets based on the budget period and budget name
    useEffect(() => {
        const foundBudget = monthlyBudgets.find(budget =>
            budget.id == id
        );

        if (!foundBudget) return;

        let matchingRecords = recordsThisMonth.filter(record =>
            foundBudget.categories.some(budgetCategory => budgetCategory.name === record.category.name)
        );

        const sumSpent = matchingRecords.reduce((total, record) => total + record.amount, 0);

        setBudget({
            id: foundBudget.id,
            period: foundBudget.period,
            name: foundBudget.name,
            category: foundBudget.category,
            amount: foundBudget.amount,
            spent: sumSpent
        });
    }, [monthlyBudgets, recordsThisMonth, id]);

    function generatePercentageLeft(amount, spent) {
        let percentage = ((amount - spent) / amount * 100).toFixed(0);

        if (percentage < -999) percentage = `-999` + "+";

        return percentage;
    }

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

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">

                        {budget !== null && (
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <Typography variant="h4" className="text-gray-900 font-bold mt-2 truncate">
                                            {budget.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </Typography>
                                        <Link to={`/edit_budget/${budget.id}`}>
                                            <Button size="sm" variant="text" className="mt-1">
                                                <PencilSquareIcon strokeWidth={2} className="w-6 h-6" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Chip size="md" value={`${generatePercentageLeft(budget.amount, budget.spent)}%`} variant="ghost" className="bg-gray-200 text-gray-900 font-semibold mt-2 text-sm" />
                                    </div>
                                </div>
                                <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                <div className="flex justify-between">
                                    <Typography className="font-semibold text-gray-800">
                                        {budget.spent.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                    <Typography className={`font-semibold ${generateAmountLeft(budget.amount, budget.spent) < 0 ? 'text-red-800' : 'text-green-800'}`}>
                                        {Math.abs(generateAmountLeft(budget.amount, budget.spent)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography className="text-sm font-medium text-gray-600">
                                        Spent
                                    </Typography>
                                    <Typography className="text-sm font-medium text-gray-600">
                                        {generateAmountLeft(budget.amount, budget.spent) < 0 ? 'Overspent' : 'Remains'}
                                    </Typography>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </CardBody>
        </Card>
    );
}