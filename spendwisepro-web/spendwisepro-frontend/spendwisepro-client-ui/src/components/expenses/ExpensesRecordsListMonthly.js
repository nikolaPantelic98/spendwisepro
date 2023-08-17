import {
    Card,
    CardBody,
    Typography,
    ListItem, Chip,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link, useParams} from "react-router-dom";
import {ChartBarIcon} from "@heroicons/react/24/solid";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function ExpensesRecordsListMonthly() {

    const { '*': category } = useParams();

    const expenses = [
        {
            id: 1,
            categoryName: "Bills",
            amount: 230.00,
            progressColor: "cyan",
            icon: "https://i.ibb.co/Y04MgVW/tax-icon-15117.png",
            records: [
                { id: 1, name: "Gas bill", type: "Credit Card", amount: 70.00, time: "08:57", date: new Date("2023-07-28") },
                { id: 2, name: "Phone bill", type: "Cash", amount: 25.00, time: "12:30", date: new Date("2023-07-28") },
                { id: 3, name: "Electricity bill", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-07-25") },
            ]
        },
        {
            id: 2,
            categoryName: "Groceries",
            amount: 205.00,
            progressColor: "yellow",
            icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg",
            records: [
                { id: 1, name: "Bread", type: "Cash", amount: 15.00, time: "08:57", date: new Date("2023-08-03") },
                { id: 2, name: "Market", type: "Credit Card", amount: 27.00, time: "12:30", date: new Date("2023-07-29") },
                { id: 3, name: "Tomato", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-07-29") },
            ]
        },
        {
            id: 3,
            categoryName: "Fuel",
            amount: 150.00,
            progressColor: "indigo",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg",
            records: [
                { id: 1, name: "Fuel", type: "Cash", amount: 100.00, time: "08:57", date: new Date("2023-08-10") },
                { id: 2, name: "Fuel", type: "Credit Card", amount: 112.00, time: "12:30", date: new Date("2023-08-10") },
                { id: 3, name: "Fuel", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-08-10") },
            ]
        },
        {
            id: 4,
            categoryName: "Tobacco",
            amount: 55.00,
            progressColor: "blue-gray",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg",
            records: [
                { id: 1, name: "Cigarette", type: "Cash", amount: 15.00, time: "08:57", date: new Date("2023-07-22") },
                { id: 2, name: "Tobacco", type: "Credit Card", amount: 27.00, time: "12:30", date: new Date("2023-07-21") },
                { id: 3, name: "Pack", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-08-16") },
            ]
        },
        {
            id: 5,
            categoryName: "Snacks",
            amount: 40.00,
            progressColor: "light-green",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg",
            records: [
                { id: 1, name: "Chips", type: "Cash", amount: 15.00, time: "08:57", date: new Date("2023-07-29") },
                { id: 2, name: "Chips", type: "Credit Card", amount: 27.00, time: "12:30", date: new Date("2023-07-25") },
                { id: 3, name: "Tortillas", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-07-25") },
            ]
        },
        {
            id: 6,
            categoryName: "Health care",
            amount: 30.00,
            progressColor: "green",
            icon: "https://cdn-icons-png.flaticon.com/512/206/206875.png",
            records: [
                { id: 1, name: "Doctor", type: "Cash", amount: 15.00, time: "08:57", date: new Date("2023-07-21") },
                { id: 2, name: "Dentist", type: "Credit Card", amount: 27.00, time: "12:30", date: new Date("2023-07-21") },
                { id: 3, name: "Drug", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-07-18") },
            ]
        },
        {
            id: 7,
            categoryName: "Cinema",
            amount: 10.00,
            progressColor: "deep-orange",
            icon: "https://cdn.imgbin.com/18/23/22/imgbin-computer-icons-clapperboard-film-coin-paQQD9iaFxMmALcBxefZD6Uv8.jpg",
            records: [
                { id: 1, name: "Card", type: "Cash", amount: 15.00, time: "08:57", date: new Date("2023-07-21") },
                { id: 2, name: "Cinema chips", type: "Credit Card", amount: 27.00, time: "12:30", date: new Date("2023-07-21") },
                { id: 3, name: "Coca cola", type: "Credit Card", amount: 45.00, time: "12:30", date: new Date("2023-07-16") },
            ]
        }
    ]

    // Filter expenses for the selected category
    const currentExpense = expenses.filter(expense => expense.categoryName.toLowerCase().replace(/\s+/g, '_') === category);

    // Create an array of unique record dates for display
    const uniqueRecordDates = [...new Set(currentExpense.flatMap(expense => expense.records.map(record => record.date.getTime())))];
    const sortedUniqueRecordDates = uniqueRecordDates.sort((a, b) => b - a);

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options).toUpperCase();
    }

    // Function to generate data for the graph
    function generateDataForGraph(expense) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const dateToAmountMap = new Map();

        expense.records.forEach(record => {
            const recordDate = record.date.toDateString();
            if (record.date >= thirtyDaysAgo) {
                if (!dateToAmountMap.has(recordDate)) {
                    dateToAmountMap.set(recordDate, record.amount);
                } else {
                    dateToAmountMap.set(recordDate, dateToAmountMap.get(recordDate) + record.amount);
                }
            }
        });

        const dataForGraph = [];

        for (let i = 0; i <= 30; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);
            const dateString = currentDate.toDateString();

            if (dateToAmountMap.has(dateString)) {
                dataForGraph.unshift({ date: dateString, amount: dateToAmountMap.get(dateString) });
            } else {
                dataForGraph.unshift({ date: dateString, amount: 0 });
            }
        }

        return dataForGraph;
    }

    // topltip for the graph
    const TooltipContent = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            if (data.payload.amount !== undefined) {
                const date = new Date(data.payload.date);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const formattedDate = `${day}.${month}`;

                return (
                    <div className="p-1 pl-2 pr-2">
                        <p className="text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Spent: $${(data.payload.amount).toFixed(2)}`}</p>
                    </div>
                );
            }
        }

        return null;
    };

    return (
        <>
            {currentExpense.map((expense) => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 31);

                const totalAmountLast30Days = expense.records
                    .filter(record => record.date >= thirtyDaysAgo)
                    .reduce((total, record) => total + record.amount, 0);

                return (
                    <div key={expense.id}>
                        <Card className="w-full shadow-lg mt-8">
                            <CardBody>
                                <div>
                                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                                        <span className="mb-2">{expense.categoryName}</span>
                                        <ChartBarIcon className="text-green-700 w-10 h-10 mb-4" />
                                    </Typography>
                                </div>

                                <hr className="my-2 border-blue-gray-50 mb-4" />

                                <div className="flow-root">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                LAST 30 DAYS
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h2" className="text-gray-900 mb-4">
                                                {totalAmountLast30Days.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                            <Chip size="md" value="Total" className="bg-gray-200 normal-case text-gray-900 font-semibold mb-4 text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <ResponsiveContainer width="100%" height={220}>
                                            <BarChart className="right-4" data={generateDataForGraph(expense, new Date())} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date"
                                                       tick={{fontSize: 12}} tickFormatter={(tick) => {
                                                    const date = new Date(tick);
                                                    const day = date.getDate().toString().padStart(2, '0');
                                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                    return `${day}.${month}.`;}}
                                                />
                                                <YAxis />
                                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                                         payloadArray={generateDataForGraph(expense, new Date())}
                                                         content={<TooltipContent />}
                                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                         offset={25}/>
                                                <Bar dataKey="amount" fill="#82ca9d" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <div className="h-4"></div>

                        {sortedUniqueRecordDates.map((recordDate) => {
                            const date = new Date(recordDate);

                            if (date >= thirtyDaysAgo) {
                                const recordsForDate = expense.records.filter(record => record.date.getTime() === recordDate);

                                return (
                                    <Card key={recordDate} className="w-full shadow-lg mt-4">
                                        <CardBody>
                                            <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                                                {formatDate(new Date(recordDate))}
                                            </Typography>
                                            <hr className="my-2 border-blue-gray-50"/>

                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {recordsForDate.map((record) => (
                                                        <li key={record.id} className="py-3 sm:py-4">
                                                            <Link>
                                                                <ListItem
                                                                    className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="w-8 h-8 rounded-full" src={expense.icon} alt={expense.categoryName}/>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="h-2"></div>
                                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                                            {record.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 truncate">
                                                                            {record.type}
                                                                        </p>
                                                                        <div className="h-2"></div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                                            -{record.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                                        </div>
                                                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                            {record.time}
                                                                        </div>
                                                                    </div>
                                                                    <div className="ml-2">
                                                                        <ChevronRightIcon className="h-5 w-5 text-green-800"/>
                                                                    </div>
                                                                </ListItem>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardBody>
                                    </Card>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </>
    );
}