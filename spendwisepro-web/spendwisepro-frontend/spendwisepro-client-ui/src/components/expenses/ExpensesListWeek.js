import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function ExpensesListWeek() {

    const expenses = [
        {
            id: 1,
            categoryName: "Bills",
            amount: 110.00,
            progressColor: "cyan"
        },
        {
            id: 2,
            categoryName: "Groceries",
            amount: 55.00,
            progressColor: "yellow"
        },
        {
            id: 3,
            categoryName: "Fuel",
            amount: 65.00,
            progressColor: "indigo"
        },
        {
            id: 4,
            categoryName: "Snacks",
            amount: 40.00,
            progressColor: "light-green"
        },
        {
            id: 5,
            categoryName: "Cinema",
            amount: 10.00,
            progressColor: "deep-orange"
        }
    ]

    // sorting by amount desc
    expenses.sort((a, b) => b.amount - a.amount);

    function generatePath(categoryName) {
        return categoryName.toLowerCase().replace(/\s+/g, '_');
    }

    function generateProgressValue(amount) {
        const maxAmount = Math.max(...expenses.map((expense) => expense.amount));
        return (amount / maxAmount) * 100;
    }

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    All expenses
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    {expenses.map((expense) => (
                        <div key={expense.id}>
                            <Link to={`/expenses/week/${generatePath(expense.categoryName)}`} onClick={storeScrollPosition}>
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
                                        <Progress value={generateProgressValue(expense.amount)} size="lg" className="mt-2 mb-2" color={expense.progressColor} />
                                    </div>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                    </div>
                                </ListItem>
                            </Link>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}