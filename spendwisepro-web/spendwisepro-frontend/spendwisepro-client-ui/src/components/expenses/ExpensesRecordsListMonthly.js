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

    const records = [
        {
            id: 1,
            amount: 70.00,
            type: "expense",
            date: new Date("2023-07-28T08:57"),
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
            date: new Date("2023-07-28T12:30"),
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
            date: new Date("2023-07-25T12:30"),
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
            date: new Date("2023-07-29T12:30"),
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
            date: new Date("2023-07-29T12:30"),
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
            date: new Date("2023-08-10T08:57"),
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
            date: new Date("2023-08-10T12:30"),
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
            date: new Date("2023-08-10T12:30"),
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
            date: new Date("2023-07-22T08:57"),
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
            date: new Date("2023-07-21T12:30"),
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
            date: new Date("2023-07-29T08:57"),
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
            date: new Date("2023-07-25T12:30"),
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
            date: new Date("2023-07-25T12:30"),
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
            date: new Date("2023-07-21T08:57"),
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
            date: new Date("2023-07-21T12:30"),
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
            date: new Date("2023-07-18T12:30"),
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
            date: new Date("2023-07-21T08:57"),
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
            date: new Date("2023-07-21T12:30"),
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
            date: new Date("2023-07-16T12:30"),
            name: "Coca cola",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema", color: "deep-orange", icon: "https://cdn.imgbin.com/18/23/22/imgbin-computer-icons-clapperboard-film-coin-paQQD9iaFxMmALcBxefZD6Uv8.jpg" }
            ]
        }
    ];

    // Filter expenses/records for the selected category and expense type
    const currentExpense = records.filter(record =>
        record.category[0].categoryName.toLowerCase().replace(/\s+/g, '_') === category &&
        record.type === "expense"
    );

    // Extracts dates without hours and minutes
    const datesWithoutTime = currentExpense.map(record => {
        const dateWithoutTime = new Date(record.date);
        dateWithoutTime.setHours(0, 0, 0, 0);
        return dateWithoutTime;
    });

    // Extracts unique dates records with the specific category
    const uniqueRecordDates = [...new Set(datesWithoutTime.flatMap(date => date.getTime()))];

    // Sorts unique dates in descending order
    const sortedUniqueRecordDates = uniqueRecordDates.sort((a, b) => b - a);

    // Formats a given date to a readable string
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options).toUpperCase();
    }

    // Generates data for a graph representing expenses over the last 30 days
    function generateDataForGraph(expense) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const dateToAmountMap = new Map();

        // Calculate total expenses for each date within the last 30 days
        expense.forEach(record => {
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

        // Creates data for the graph, including dates with zero expenses
        for (let i = 0; i < 30; i++) {
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

    // tooltip used in graph
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

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Calculate the total amount spent on expenses within the last 30 days.
    const totalAmountLast30Days = currentExpense
        .filter(r => r.date >= thirtyDaysAgo)
        .reduce((total, r) => total + r.amount, 0);

    return (
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <div>
                        <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                            <span className="mb-2">{currentExpense[0].category[0].categoryName}</span>
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
                                <BarChart className="right-4" data={generateDataForGraph(currentExpense)} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
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
                                             payloadArray={generateDataForGraph(currentExpense)}
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
                    const recordsForDate = currentExpense.filter(record =>
                        new Date(record.date).setHours(0, 0, 0, 0) === recordDate
                    );
                    return (
                        <Card key={recordDate} className="w-full shadow-lg mt-4">
                            <CardBody>
                                <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                                    {formatDate(new Date(recordDate))}
                                </Typography>
                                <hr className="my-2 border-blue-gray-50"/>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {recordsForDate.map((recordForSpecificDate) => (
                                            <li key={recordForSpecificDate.id} className="py-3 sm:py-4">
                                                <Link>
                                                    <ListItem
                                                        className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                        <div className="flex-shrink-0">
                                                            <img className="w-8 h-8 rounded-full" src={recordForSpecificDate.category[0].icon} alt={recordForSpecificDate.category[0].categoryName}/>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="h-2"></div>
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {recordForSpecificDate.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                {recordForSpecificDate.paymentType}
                                                            </p>
                                                            <div className="h-2"></div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                                -{recordForSpecificDate.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                            </div>
                                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                {recordForSpecificDate.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
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
                return null;
            })}
        </>
    );
}