import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon, DocumentIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function ExpensesListWeek() {

    const [expenseRecordsThisWeek, setExpenseRecordsThisWeek] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/expense_records_this_week', { headers })
            .then(response => {
                setExpenseRecordsThisWeek(response.data);
            })
            .catch(error => console.error('Error fetching expense records this week:', error));
    }, []);

    // Create a new array to hold unique expenses
    const expenses = expenseRecordsThisWeek.reduce((groupedExpenses, record) => {
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

    expenses.sort((a, b) => b.amount - a.amount);

    function getPath(categoryName) {
        return categoryName.toLowerCase().replace(/\s+/g, '_');
    }

    function getProgressValue(amount) {
        const maxAmount = Math.max(...expenses.map(expense => expense.amount));
        return (amount / maxAmount) * 100;
    }

    function storeScrollPositionAndTab() {
        const tab = "week";
        sessionStorage.setItem('selectedTab', tab);
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    All expenses
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                {expenseRecordsThisWeek.length > 0 && (
                    <div>
                        {expenses.map((expense) => (
                            <div key={expense.categoryName}>
                                <Link to={`/expenses/week/${getPath(expense.categoryName)}`} onClick={storeScrollPositionAndTab}>
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
                )}

                {expenseRecordsThisWeek.length === 0 && (
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
            </CardBody>
        </Card>
    );
}