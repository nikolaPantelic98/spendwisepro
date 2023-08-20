import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function BudgetCard() {

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
            date: new Date("2023-08-03T12:30"),
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

    const recordsThisWeek = (() => {

        // Find the first day of the week (Monday) for the current date
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);

        // Find the last day of the week (Sunday) for the current date
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);

        // Filter records that occurred in the current week
        return records.filter(record => {
            return record.date >= startOfWeek && record.date <= endOfWeek;
        });
    })();

    const recordsThisMonth = (() => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Calculate the first day of the current month
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Calculate the last day of the current month
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Filter records that occurred in the current month
        return records.filter(record => {
            return record.date >= startOfMonth && record.date <= endOfMonth;
        });
    })();

    // Create a new array of weekly budgets based on the provided budgets and expense records
    const weeklyBudgets = budgets
        .filter(budget => budget.period === "weekly") // Filter budgets with "weekly" period
        .map(budget => {
            let matchingRecords = [];

            if (budget.category.some(cat => cat.categoryName === "All categories")) {
                // If budget's category is "All categories", include all expense records in current week
                matchingRecords = recordsThisWeek.filter(record => record.type === "expense");
            } else {
                // Otherwise, find expense records in the current week with matching category
                matchingRecords = recordsThisWeek.filter(record =>
                    record.category.some(category => budget.category.some(budgetCategory => budgetCategory.categoryName === category.categoryName))
                    && record.type === "expense"
                );
            }

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
    const monthlyBudgets = budgets
        .filter(budget => budget.period === "monthly") // Filter budgets with "monthly" period
        .map(budget => {
            let matchingRecords = [];

            if (budget.category.some(cat => cat.categoryName === "All categories")) {
                // If budget's category is "All categories", include all expense records in the current month
                matchingRecords = recordsThisMonth.filter(record => record.type === "expense");
            } else {
                // Otherwise, find expense records in the current month with matching category
                matchingRecords = recordsThisMonth.filter(record =>
                    record.category.some(category => budget.category.some(budgetCategory => budgetCategory.categoryName === category.categoryName))
                    && record.type === "expense"
                );
            }

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

    function generatePercentageLeft(amount, spent) {
        let percentage = ((amount - spent) / amount * 100).toFixed(0);

        if (percentage < -999) percentage = `-999` + "+";

        return percentage;
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
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Budgets
                    <Link to="/budgets" onClick={storeScrollPosition}>
                        <Button size="sm" variant="text" className="flex gap-2">
                                Show more
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Weekly
                    </Typography>

                    {weeklyBudgets
                        .map((budget) => (
                            <div key={budget.id}>
                                <Link to={`/budgets/weekly/${generatePath(budget.name)}`} onClick={storeScrollPosition}>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    {budget.name}
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        {generateAmountLeft(budget.amount, budget.spent).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                    <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                                        {generatePercentageLeft(budget.amount, budget.spent)}%
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </div>
                        )
                    )}

                    {budgets.filter(budget => budget.period === "weekly").length === 0 && (
                        <Link to="/add_budget" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2 mt-6 p-0">
                                Add budget
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Monthly
                    </Typography>

                    {monthlyBudgets
                        .map((budget) => (
                            <div key={budget.id}>
                                <Link to={`/budgets/monthly/${generatePath(budget.name)}`} onClick={storeScrollPosition}>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    {budget.name}
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        {generateAmountLeft(budget.amount, budget.spent).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                    <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                                        {generatePercentageLeft(budget.amount, budget.spent)}%
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </div>
                        )
                    )}

                    {budgets.filter(budget => budget.period === "monthly").length === 0 && (
                        <Link to="/add_budget" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2 mt-6 p-0">
                                Add budget
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <p className="text-xs flex items-center justify-center gap-4">
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span>
                            <span className="text-xxs">In limit</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-orange-500"></span>
                            <span className="text-xxs">Risk of overspent</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-red-500"></span>
                            <span className="text-xxs">Overspent</span>
                        </span>
                    </p>
                </div>

                <div className="h-6"></div>
            </CardBody>
        </Card>
    );
}