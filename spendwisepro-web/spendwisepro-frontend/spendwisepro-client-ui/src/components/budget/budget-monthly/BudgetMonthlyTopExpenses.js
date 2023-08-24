import {Card, CardBody, Progress, Typography} from "@material-tailwind/react";
import React from "react";

export default function BudgetMonthlyTopExpenses( {name} ) {

    const budgets = [
        {
            id: 1,
            period: "weekly",
            name: "General",
            amount: 140.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 2,
            period: "weekly",
            name: "Tobacco",
            amount: 50.00,
            category: [
                { id: 2, categoryName: "Tobacco" }
            ]
        },
        {
            id: 3,
            period: "monthly",
            name: "General",
            amount: 2000.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 4,
            period: "monthly",
            name: "Car",
            amount: 400.00,
            category: [
                { id: 1, categoryName: "Car" }
            ]
        },
        {
            id: 5,
            period: "monthly",
            name: "House",
            amount: 500.00,
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
                { id: 1, categoryName: "House and garden", color: "cyan" }
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
                { id: 1, categoryName: "House and garden", color: "cyan" }
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
                { id: 1, categoryName: "House and garden", color: "cyan" }
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
                { id: 2, categoryName: "Groceries", color: "yellow" }
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
                { id: 3, categoryName: "Car", color: "indigo" }
            ]
        },
        {
            id: 6,
            amount: 112.00,
            type: "expense",
            date: new Date("2023-08-21T12:30"),
            note: "Broken window repair",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Car", color: "indigo" }
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
                { id: 3, categoryName: "Car", color: "indigo" }
            ]
        },
        {
            id: 8,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-21T08:57"),
            note: "Cigarette",
            paymentType: "Cash",
            category: [
                { id: 4, categoryName: "Tobacco", color: "blue-gray" }
            ]
        },
        {
            id: 91,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-01T12:30"),
            note: "Tobacco",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco", color: "blue-gray" }
            ]
        },
        {
            id: 10,
            amount: 22.00,
            type: "expense",
            date: new Date("2023-08-05T12:30"),
            note: "Pack",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco", color: "blue-gray" }
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
                { id: 5, categoryName: "Snacks", color: "light-green" }
            ]
        },
        {
            id: 12,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-22T08:57"),
            note: "Doctor",
            paymentType: "Cash",
            category: [
                { id: 6, categoryName: "Health care", color: "green" }
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
                { id: 7, categoryName: "Cinema", color: "deep-orange" }
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
                { id: 7, categoryName: "Cinema", color: "deep-orange" }
            ]
        }
    ];

    const currentDate = new Date();

    // Filter records that occurred in the current month
    const recordsThisMonth = (() => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Calculate the first day of the current month
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Calculate the last day of the current month
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        return records.filter(record => {
            return record.date >= startOfMonth && record.date <= endOfMonth;
        });
    })();

    // Create an array of top expenses within the monthly budget
    const budgetExpenses = (() => {

        const foundBudget = budgets.find(budget =>
            budget.period === "monthly" && budget.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        let matchingRecords;

        if (foundBudget.category.some(cat => cat.categoryName === "All categories")) {
            // If budget's category is "All categories", include all expense records in the current month
            matchingRecords = recordsThisMonth.filter(record => record.type === "expense");
        } else {
            // Otherwise, find expense records in the current month with matching category
            matchingRecords = recordsThisMonth.filter(record =>
                record.category.some(category =>
                    foundBudget.category.some(budgetCategory => budgetCategory.categoryName === category.categoryName)
                ) && record.type === "expense"
            );
        }

        // Create a map to store categories and their accumulated amounts
        const categoryMap = new Map();

        // Iterate through matching records to calculate accumulated amounts
        matchingRecords.forEach(record => {
            record.category.forEach(category => {
                const categoryId = category.id;
                const categoryName = category.categoryName;
                const amount = record.amount;

                if (categoryMap.has(categoryId)) {
                    categoryMap.set(categoryId, {
                        ...categoryMap.get(categoryId),
                        amount: categoryMap.get(categoryId).amount + amount
                    });
                } else {
                    categoryMap.set(categoryId, {
                        id: categoryId,
                        name: categoryName,
                        amount: amount,
                        color: category.color
                    });
                }
            });
        });

        // Convert the map values to an array of objects
        return Array.from(categoryMap.values());
    })();

    budgetExpenses.sort((a, b) => b.amount - a.amount);

    function generateProgressValue(amount) {
        const maxAmount = Math.max(...budgetExpenses.map(expense => expense.amount));
        return (amount / maxAmount) * 100;
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Top expenses
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    {budgetExpenses.map(expense => (
                        <div className="mt-2" key={expense.id}>
                            <div className="flex items-center justify-between mb-2">
                                <Typography className="text-gray-900 font-medium mt-2">
                                    {expense.name}
                                </Typography>
                                <div className="flex gap-4 items-center">
                                    <Typography className="text-gray-900 font-semibold mt-2">
                                        ${expense.amount.toFixed(2)}
                                    </Typography>
                                </div>
                            </div>
                            <Progress value={generateProgressValue(expense.amount)} size="lg" className="mt-2" color={expense.color}/>
                        </div>
                    ))}
                </div>

                <div className="h-4"></div>
            </CardBody>
        </Card>
    );
}