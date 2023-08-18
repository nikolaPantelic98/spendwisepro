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

    const records = [
        {
            id: 1,
            amount: 70.00,
            type: "expense",
            date: new Date("2023-08-11T08:57"),
            name: "Gas bill",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "Bills", color: "cyan", icon: "https://i.ibb.co/Y04MgVW/tax-icon-15117.png" }
            ]
        },
        {
            id: 2,
            amount: 25.00,
            type: "expense",
            date: new Date("2023-08-12T12:30"),
            name: "Phone bill",
            paymentType: "Cash",
            category: [
                { id: 1, categoryName: "Bills", color: "cyan", icon: "https://i.ibb.co/Y04MgVW/tax-icon-15117.png" }
            ]
        },
        {
            id: 3,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-15T12:30"),
            name: "Electricity bill",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "Bills", color: "cyan", icon: "https://i.ibb.co/Y04MgVW/tax-icon-15117.png" }
            ]
        },
        {
            id: 4,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-03T08:57"),
            name: "Bread",
            paymentType: "Cash",
            category: [
                { id: 2, categoryName: "Groceries", color: "yellow", icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" }
            ]
        },
        {
            id: 5,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-18T12:30"),
            name: "Market",
            paymentType: "Credit Card",
            category: [
                { id: 2, categoryName: "Groceries", color: "yellow", icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" }
            ]
        },
        {
            id: 6,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-18T12:30"),
            name: "Tomato",
            paymentType: "Credit Card",
            category: [
                { id: 2, categoryName: "Groceries", color: "yellow", icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" }
            ]
        },
        {
            id: 7,
            amount: 100.00,
            type: "expense",
            date: new Date("2023-08-11T08:57"),
            name: "Fuel",
            paymentType: "Cash",
            category: [
                { id: 3, categoryName: "Fuel", color: "indigo", icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 8,
            amount: 112.00,
            type: "expense",
            date: new Date("2023-08-15T12:30"),
            name: "Fuel",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Fuel", color: "indigo", icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 9,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-18T12:30"),
            name: "Fuel",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Fuel", color: "indigo", icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 10,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-12T08:57"),
            name: "Cigarette",
            paymentType: "Cash",
            category: [
                { id: 4, categoryName: "Tobacco", color: "blue-gray", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 11,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-11T12:30"),
            name: "Tobacco",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco", color: "blue-gray", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 12,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-16T12:30"),
            name: "Pack",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco", color: "blue-gray", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 13,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-12T08:57"),
            name: "Chips",
            paymentType: "Cash",
            category: [
                { id: 5, categoryName: "Snacks", color: "light-green", icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 14,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-15T12:30"),
            time: "12:30",
            name: "Chips",
            paymentType: "Credit Card",
            category: [
                { id: 5, categoryName: "Snacks", color: "light-green", icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 15,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-16T12:30"),
            name: "Tortillas",
            paymentType: "Credit Card",
            category: [
                { id: 5, categoryName: "Snacks", color: "light-green", icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 16,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-17T08:57"),
            name: "Doctor",
            paymentType: "Cash",
            category: [
                { id: 6, categoryName: "Health care", color: "green", icon: "https://cdn-icons-png.flaticon.com/512/206/206875.png" }
            ]
        },
        {
            id: 17,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-12T12:30"),
            name: "Dentist",
            paymentType: "Credit Card",
            category: [
                { id: 6, categoryName: "Health care", color: "green", icon: "https://cdn-icons-png.flaticon.com/512/206/206875.png" }
            ]
        },
        {
            id: 18,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-12T12:30"),
            name: "Drug",
            paymentType: "Credit Card",
            category: [
                { id: 6, categoryName: "Health care", color: "green", icon: "https://cdn-icons-png.flaticon.com/512/206/206875.png" }
            ]
        },
        {
            id: 19,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-15T08:57"),
            name: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema", color: "deep-orange", icon: "https://cdn.imgbin.com/18/23/22/imgbin-computer-icons-clapperboard-film-coin-paQQD9iaFxMmALcBxefZD6Uv8.jpg" }
            ]
        },
        {
            id: 20,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-15T12:30"),
            name: "Cinema chips",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema", color: "deep-orange", icon: "https://cdn.imgbin.com/18/23/22/imgbin-computer-icons-clapperboard-film-coin-paQQD9iaFxMmALcBxefZD6Uv8.jpg" }
            ]
        },
        {
            id: 21,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-15T12:30"),
            name: "Coca cola",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema", color: "deep-orange", icon: "https://cdn.imgbin.com/18/23/22/imgbin-computer-icons-clapperboard-film-coin-paQQD9iaFxMmALcBxefZD6Uv8.jpg" }
            ]
        }
    ];

    const currentDate = new Date();

    // Filter records that occurred in the last 7 days
    const filteredRecords = records.filter(record => {
        const daysDifference = Math.floor((currentDate - record.date) / (1000 * 60 * 60 * 24));
        return daysDifference < 7;
    });

    // Create a new array to hold unique expenses
    const expenses = filteredRecords.reduce((acc, record) => {
        const existingExpense = acc.find(expense => expense.categoryName === record.category[0].categoryName);
        if (existingExpense) {
            existingExpense.amount += record.amount;
        } else {
            acc.push({
                categoryName: record.category[0].categoryName,
                amount: record.amount,
                color: record.category[0].color
            });
        }
        return acc;
    }, []);

    expenses.sort((a, b) => b.amount - a.amount);

    function generatePath(categoryName) {
        return categoryName.toLowerCase().replace(/\s+/g, '_');
    }

    function generateProgressValue(amount) {
        const maxAmount = Math.max(...expenses.map(expense => expense.amount));
        return (amount / maxAmount) * 100;
    }

    function storeScrollPositionAndTab() {
        const tab = "7days";
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

                <div>
                    {expenses.map((expense) => (
                        <div key={expense.categoryName}>
                            <Link to={`/expenses/week/${generatePath(expense.categoryName)}`} onClick={storeScrollPositionAndTab}>
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
                                        <Progress value={generateProgressValue(expense.amount)} size="lg" className="mt-2 mb-2" color={expense.color} />
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