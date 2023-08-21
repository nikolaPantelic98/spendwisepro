import {
    Card,
    CardBody,
    Typography,
    Chip, Button,
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

export default function BudgetWeeklyOverview( {name} ) {

    const budgets = [
        {
            id: 1,
            period: "weekly",
            name: "General",
            amount: 140.00,
            spent: 70.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 2,
            period: "weekly",
            name: "Tobacco",
            amount: 50.00,
            spent: 55.00,
            category: [
                { id: 2, categoryName: "Tobacco" }
            ]
        },
        {
            id: 3,
            period: "monthly",
            name: "General",
            amount: 2000.00,
            spent: 1800.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 4,
            period: "monthly",
            name: "Car",
            amount: 400.00,
            spent: 260.00,
            category: [
                { id: 1, categoryName: "Car" }
            ]
        },
        {
            id: 5,
            period: "monthly",
            name: "House",
            amount: 500.00,
            spent: 250.00,
            category: [
                { id: 1, categoryName: "House and garden" }
            ]
        }
    ]

    const records = [
        {
            id: 1,
            amount: 30.00,
            type: "expense",
            date: new Date("2023-08-16T08:57"),
            note: "Window repair",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "House and garden" }
            ]
        },
        {
            id: 2,
            amount: 25.00,
            type: "expense",
            date: new Date("2023-08-20T12:30"),
            note: "New door",
            paymentType: "Cash",
            category: [
                { id: 1, categoryName: "House and garden" }
            ]
        },
        {
            id: 3,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-07-29T12:30"),
            note: "Garden maintenance",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "House and garden" }
            ]
        },
        {
            id: 4,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-07-30T12:30"),
            note: "Tomato",
            paymentType: "Credit Card",
            category: [
                { id: 2, categoryName: "Groceries" }
            ]
        },
        {
            id: 5,
            amount: 100.00,
            type: "expense",
            date: new Date("2023-08-10T08:57"),
            note: "Car maintenance",
            paymentType: "Cash",
            category: [
                { id: 3, categoryName: "Car" }
            ]
        },
        {
            id: 6,
            amount: 112.00,
            type: "expense",
            date: new Date("2023-08-08T12:30"),
            note: "Broken window repair",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Car" }
            ]
        },
        {
            id: 7,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-01T12:30"),
            note: "Fuel",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Car" }
            ]
        },
        {
            id: 8,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-19T08:57"),
            note: "Cigarette",
            paymentType: "Cash",
            category: [
                { id: 4, categoryName: "Tobacco" }
            ]
        },
        {
            id: 91,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-18T12:30"),
            note: "Tobacco",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco" }
            ]
        },
        {
            id: 10,
            amount: 22.00,
            type: "expense",
            date: new Date("2023-08-17T12:30"),
            note: "Pack",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco" }
            ]
        },
        {
            id: 11,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-14T12:30"),
            time: "12:30",
            note: "Chips",
            paymentType: "Credit Card",
            category: [
                { id: 5, categoryName: "Snacks" }
            ]
        },
        {
            id: 12,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-07-27T08:57"),
            note: "Doctor",
            paymentType: "Cash",
            category: [
                { id: 6, categoryName: "Health care" }
            ]
        },
        {
            id: 13,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-01T08:57"),
            note: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema" }
            ]
        },
        {
            id: 14,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-07-23T12:30"),
            note: "Cinema chips",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema" }
            ]
        }
    ];

    const currentDate = new Date();

    // Filter records that occurred in the current week
    const recordsThisWeek = (() => {

        // Find the first day of the week (Monday) for the current date
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);

        // Find the last day of the week (Sunday) for the current date
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);

        return records.filter(record => {
            return record.date >= startOfWeek && record.date <= endOfWeek;
        });
    })();

    // Create a new object of weekly budgets based on the budget period and budget name
    const budget = (() => {

        const foundBudget = budgets.find(budget =>
            budget.period === "weekly" && budget.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        let matchingRecords;

        if (foundBudget.category.some(cat => cat.categoryName === "All categories")) {
            // If budget's category is "All categories", include all expense records in the current week
            matchingRecords = recordsThisWeek.filter(record => record.type === "expense");
        } else {
            // Otherwise, find expense records in the current week with matching category
            matchingRecords = recordsThisWeek.filter(record =>
                record.category.some(category =>
                    foundBudget.category.some(budgetCategory => budgetCategory.categoryName === category.categoryName)
                ) && record.type === "expense"
            );
        }

        const sumSpent = matchingRecords.reduce((total, record) => total + record.amount, 0);

        return {
            id: foundBudget.id,
            period: foundBudget.period,
            name: foundBudget.name,
            category: foundBudget.category,
            amount: foundBudget.amount,
            spent: sumSpent
        };
    })();

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
                        <div className="flex-1 w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Typography variant="h4" className="text-gray-900 font-bold mt-2 truncate">
                                        {budget.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                    <Button size="sm" variant="text" className="mt-1">
                                        <PencilSquareIcon strokeWidth={2} className="w-6 h-6" />
                                    </Button>
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
                                <Typography className={`text-sm font-semibold ${generateAmountLeft(budget.amount, budget.spent) < 0 ? 'text-red-800' : 'text-green-800'}`}>
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
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}