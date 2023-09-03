import {
    Card,
    CardBody,
    Typography,
    Chip
} from "@material-tailwind/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React from "react";
import {ChartBarIcon} from "@heroicons/react/24/solid";

export default function ExpensesOverviewMonth() {

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
            date: new Date("2023-09-03T08:57"),
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
            date: new Date("2023-09-02T12:30"),
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
            date: new Date("2023-09-01T12:30"),
            name: "Coca cola",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema", color: "deep-orange", icon: "https://cdn.imgbin.com/18/23/22/imgbin-computer-icons-clapperboard-film-coin-paQQD9iaFxMmALcBxefZD6Uv8.jpg" }
            ]
        }
    ];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate the first day of the current month
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Calculate the last day of the current month
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const expensesThisMonth = (() => {
        return records.filter(record => {
            return record.date >= startOfMonth && record.date <= endOfMonth && record.type === "expense";
        });
    })();

    // Generates data for a graph representing expenses for this month
    const expenseGraph = (() => {
        const dateToAmountMap = new Map();

        // Calculate total expenses for each date within this month
        expensesThisMonth.forEach(record => {
            const recordDate = record.date.toDateString();
            if (!dateToAmountMap.has(recordDate)) {
                dateToAmountMap.set(recordDate, record.amount);
            } else {
                dateToAmountMap.set(recordDate, dateToAmountMap.get(recordDate) + record.amount);
            }
        });

        const dataForGraph = [];

        // Creates data for the graph, including dates with zero expenses
        let iterationDate = new Date(startOfMonth);
        while (iterationDate <= endOfMonth) {
            const dateString = iterationDate.toDateString();
            const amount = dateToAmountMap.get(dateString) || 0;
            dataForGraph.push({ date: dateString, amount });
            iterationDate.setDate(iterationDate.getDate() + 1);
        }

        return dataForGraph;
    })();

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

    // Calculate the total amount spent on expenses within this month.
    const totalAmountThisMonth = expensesThisMonth.reduce((total, record) => total + record.amount, 0);

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Overview</span>
                        <ChartBarIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flow-root">
                    <div className="flow-root">
                        <div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium text-gray-900 truncate">
                                        THIS MONTH
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                        {totalAmountThisMonth.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                    <Chip size="md" value="Total" className="bg-gray-200 normal-case text-gray-900 font-semibold mb-4 text-sm" />
                                </div>
                            </div>

                            <div>
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart className="right-4" data={expenseGraph} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date"
                                               tick={{fontSize: 12, dy: 8}} tickFormatter={(tick) => {
                                            const date = new Date(tick);
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            return `${day}.${month}.`;}}
                                        />
                                        <YAxis />
                                        <Tooltip cursor={{fill: '#E8F5E9'}}
                                                 payloadArray={expenseGraph}
                                                 content={<TooltipContent />}
                                                 wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                 offset={25}/>
                                        <Bar dataKey="amount" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}