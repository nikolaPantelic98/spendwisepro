import {
    Card,
    CardBody,
    Typography,
    Chip, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyDollarIcon} from "@heroicons/react/24/solid";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";

export default function BalanceChart() {

    const dataWeek = [
        {"date": "15.7", "amount": 1130},
        {"date": "16.7", "amount": 1050},
        {"date": "17.7", "amount": 1030},
        {"date": "18.7", "amount": 1030},
        {"date": "19.7", "amount": 1000},
        {"date": "20.7", "amount": 1000},
        {"date": "21.7.", "amount": 1000}
    ];

    const dataTime = [
        {label: "7 Days", value: "7days", icon: ArrowTrendingUpIcon},
        {label: "30 Days", value: "30days", icon: ArrowTrendingUpIcon},
    ];

    const [selectedTab, setSelectedTab] = useState("30days");

    const records = [
        {
            id: 1,
            amount: 30.00,
            type: "expense",
            date: new Date("2023-08-16T08:57"),
            note: "Window repair",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
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
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 3,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-16T12:30"),
            note: "Garden maintenance",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 4,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-30T12:30"),
            note: "Tomato",
            paymentType: "Credit Card",
            category: [
                { id: 2, categoryName: "Groceries", icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" }
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
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
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
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 7,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-09-01T12:30"),
            note: "Fuel",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
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
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
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
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
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
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
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
                { id: 5, categoryName: "Snacks", icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" }
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
                { id: 6, categoryName: "Health care", icon: "https://i.ibb.co/k362Qsn/healthcare.png" }
            ]
        },
        {
            id: 13,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-09-01T08:57"),
            note: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 14,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-23T12:30"),
            note: "Cinema chips",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 15,
            amount: 600.00,
            type: "income",
            date: new Date("2023-08-01T12:30"),
            note: "Salary",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Income", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 16,
            amount: 400.00,
            type: "income",
            date: new Date("2023-08-01T12:30"),
            note: "Salary",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Income", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 17,
            amount: 300.00,
            type: "income",
            date: new Date("2023-08-28T12:30"),
            note: "Invoice",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Income", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 18,
            amount: 100.00,
            type: "expense",
            date: new Date("2023-09-06T08:57"),
            note: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        }
    ];

    const currentDate = new Date();

    const thirtyDaysAgo = (() => {
        const result = new Date(currentDate);
        result.setDate(currentDate.getDate() - 30);
        result.setHours(0, 0, 0, 0);
        return result;
    })();

    // Filter expenses before the last 30 days
    const expensesBeforeLast30Days = (() => {
        return records.filter(record => {
            return record.date < thirtyDaysAgo && record.type === "expense";
        });
    })();

    // Filter incomes before the last 30 days
    const incomesBeforeLast30Days = (() => {
        return records.filter(record => {
            return record.date < thirtyDaysAgo && record.type === "income";
        });
    })();

    // Calculate the initial balance amount for the chart
    const startingAmountBalance = (() => {
        const totalExpenseAmountBeforeLast30Days = expensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalIncomeAmountBeforeLast30Days = incomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalIncomeAmountBeforeLast30Days - totalExpenseAmountBeforeLast30Days;
    })();

    // Filter expenses within the last 30 days
    const expensesLast30Days = (() => {
        return records.filter(record => {
            return record.date >= thirtyDaysAgo && record.type === "expense";
        });
    })();

    // Filter incomes within the last 30 days
    const incomesLast30Days = (() => {
        return records.filter(record => {
            return record.date >= thirtyDaysAgo && record.type === "income";
        });
    })();

    // Calculate balance chart data
    const balanceGraph = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountBalance;
        let iterationDate = new Date(thirtyDaysAgo);

        // Iterate through each day of the last 30 days
        while (iterationDate <= currentDate) {
            const matchingExpensesThisDay = expensesLast30Days.filter(record =>
                record.date.getDate() === iterationDate.getDate() &&
                record.date.getMonth() === iterationDate.getMonth() &&
                record.date.getFullYear() === iterationDate.getFullYear()
            );
            const matchingIncomesThisDay = incomesLast30Days.filter(record =>
                record.date.getDate() === iterationDate.getDate() &&
                record.date.getMonth() === iterationDate.getMonth() &&
                record.date.getFullYear() === iterationDate.getFullYear()
            );

            const expensesThisDay = matchingExpensesThisDay.reduce((total, record) => total - record.amount, 0);
            accumulatedAmount += expensesThisDay;
            const incomesThisDay = matchingIncomesThisDay.reduce((total, record) => total + record.amount, 0);
            accumulatedAmount += incomesThisDay;

            amountPerDay.push({
                date: new Date(iterationDate),
                amount: accumulatedAmount
            });

            // Move to the next day
            iterationDate.setDate(iterationDate.getDate() + 1);
        }

        return amountPerDay;
    })();

    // Get the balance amount for today
    const balanceAmountToday = balanceGraph[balanceGraph.length - 1].amount;

    const chipAmount = (() => {
        return (balanceAmountToday - startingAmountBalance) / startingAmountBalance * 100;
    })();

    const chipColor = (() => {
        if (chipAmount >= 0) {
            return "green";
        } else {
            return "red";
        }
    })();

    // Define a Tooltip component for the charts
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
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`$${(data.payload.amount).toFixed(2)}`}</p>
                    </div>
                );
            }
        }

        return null;
    };

    return (
        <Card className="w-full shadow-lg mt-6">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Balance Trend</span>
                        <CurrencyDollarIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flow-root">
                    <div className="flow-root">
                        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>

                            <TabsHeader>
                                {dataTime.map(({ label, value, icon }) => (
                                    <Tab key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            {React.createElement(icon, { className: "w-5 h-5" })}
                                            {label}
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>

                            <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 }, }}>
                                {dataTime.map(({ value }) => (
                                    <TabPanel key={value} value={value}>
                                        {value === "30days" ? (
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                TODAY
                                                            </p>
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                VS PREVIOUS PERIOD
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Typography variant="h2" className="text-gray-900 mb-4">
                                                                {balanceAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                            <Chip size="md" value={`${(chipAmount).toFixed(0)}%`} className="mb-4 text-sm" color={chipColor} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ResponsiveContainer width="100%" height={220}>
                                                            <AreaChart className="right-4" data={balanceGraph}
                                                                       margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                                <defs>
                                                                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                                                    </linearGradient>
                                                                </defs>
                                                                <XAxis dataKey="date"
                                                                       tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {
                                                                    const date = new Date(tick);
                                                                    const day = date.getDate().toString().padStart(2, '0');
                                                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                    return `${day}.${month}.`;}}
                                                                />
                                                                <YAxis tick={{fontSize: 15, dx: -3}} />
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                         payloadArray={balanceGraph}
                                                                         content={<TooltipContent />}
                                                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                         offset={25}/>
                                                                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                TODAY
                                                            </p>
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                VS PREVIOUS PERIOD
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Typography variant="h2" className="text-gray-900 mb-4">
                                                                $1000,00
                                                            </Typography>
                                                            <Chip size="md" value="- 13%" className="bg-red-700 mb-4 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ResponsiveContainer width="100%" height={220}>
                                                            <AreaChart className="right-4" data={dataWeek}
                                                                       margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                                <defs>
                                                                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                                                    </linearGradient>
                                                                </defs>
                                                                <XAxis dataKey="date"
                                                                       tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {
                                                                    const date = new Date(tick);
                                                                    const day = date.getDate().toString().padStart(2, '0');
                                                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                    return `${day}.${month}.`;}}
                                                                />
                                                                <YAxis tick={{fontSize: 15, dx: -3}} />
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                         payloadArray={dataWeek}
                                                                         content={<TooltipContent />}
                                                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                         offset={25}/>
                                                                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>

            </CardBody>

        </Card>
    );
}