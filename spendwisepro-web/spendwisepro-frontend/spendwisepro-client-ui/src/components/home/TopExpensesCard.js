import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon, DocumentIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function TopExpensesCard() {

    const [expenseRecordsThisMonth, setExpenseRecordsThisMonth] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/expense_records_this_month', { headers })
            .then(response => {
                setExpenseRecordsThisMonth(response.data);
            })
            .catch(error => console.error('Error fetching expense records this month:', error));
    }, []);

    // Group expenses by category, summing the amounts for each category
    const accumulatedExpenses = expenseRecordsThisMonth.reduce((groupedExpenses, record) => {
        const existingExpense = groupedExpenses.find(expense => expense.categoryName === record.category.name);
        if (existingExpense) {
            existingExpense.amount += record.amount;
        } else {
            groupedExpenses.push({
                categoryName: record.category.name,
                amount: record.amount,
                color: record.category.color
            });
        }
        return groupedExpenses;
    }, []);

    accumulatedExpenses.sort((a, b) => b.amount - a.amount);

    // shows only 5 top expenses
    const limitedExpenses = accumulatedExpenses.slice(0, 5);

    function getPath(categoryName) {
        return categoryName.toLowerCase().replace(/\s+/g, '_');
    }

    function getProgressValue(amount) {
        const maxAmount = Math.max(...accumulatedExpenses.map(expense => expense.amount));
        return (amount / maxAmount) * 100;
    }

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Top expenses
                    <Link to="/expenses" onClick={storeScrollPosition}>
                        <Button size="sm" variant="text" className="flex gap-2">
                            View all
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                {expenseRecordsThisMonth.length > 0 && (
                    <div>
                        <div>
                            <Typography  className="uppercase text-sm font-medium text-gray-700 mb-4">
                                This month
                            </Typography>

                            {limitedExpenses.map((expense) => (
                                <div key={expense.categoryName}>
                                    <Link to={`/expenses/month/${getPath(expense.categoryName)}`} onClick={storeScrollPosition}>
                                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                            <div className="flex-1 w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                        {expense.categoryName}
                                                    </Typography>
                                                    <div className="flex gap-4 items-center">
                                                        <Typography className="text-gray-900 font-semibold mt-2">
                                                            {expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Progress value={getProgressValue(expense.amount)} size="lg" className="mt-2 mb-2" color={expense.color} />
                                            </div>
                                            <div className="flex items-center">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                        <div className="container mx-auto mt-6">
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center gap-4 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                The color of the progress bar is the color of the category.
                            </Typography>
                        </div>
                    </div>
                )}

                {expenseRecordsThisMonth.length === 0 && (
                    <div>
                        <div className="flex justify-center items-center flex-col mb-3">
                            <DocumentIcon className="w-20 h-20 text-green-600 mb-2"/>
                            <Typography variant="h5" className="text-gray-600 mb-2">
                                No data to display
                            </Typography>
                            <Typography variant="h6" className="text-gray-500">
                                Please add some records
                            </Typography>
                        </div>
                    </div>
                )}

                <div className="h-3"></div>
            </CardBody>
        </Card>
    );
}