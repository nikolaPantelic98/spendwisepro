import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyDollarIcon} from "@heroicons/react/24/solid";
import {ArrowLongRightIcon} from "@heroicons/react/24/outline";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function TrendCard() {

    const dataCredit = [
        {date: new Date("2023-06-21"), amount: 80},
        {date: new Date("2023-06-22"), amount: 60},
        {date: new Date("2023-06-23"), amount: 50},
        {date: new Date("2023-06-24"), amount: 50},
        {date: new Date("2023-06-25"), amount: 130},
        {date: new Date("2023-06-26"), amount: 120},
        {date: new Date("2023-06-27"), amount: 120},
        {date: new Date("2023-06-28"), amount: 120},
        {date: new Date("2023-06-29"), amount: 120},
        {date: new Date("2023-06-30"), amount: 120},
        {date: new Date("2023-07-01"), amount: 70},
        {date: new Date("2023-07-02"), amount: 70},
        {date: new Date("2023-07-03"), amount: 70},
        {date: new Date("2023-07-04"), amount: 250},
        {date: new Date("2023-07-05"), amount: 240},
        {date: new Date("2023-07-06"), amount: 240},
        {date: new Date("2023-07-07"), amount: 260},
        {date: new Date("2023-07-08"), amount: 250},
        {date: new Date("2023-07-09"), amount: 150},
        {date: new Date("2023-07-10"), amount: 150},
        {date: new Date("2023-07-11"), amount: 150},
        {date: new Date("2023-07-12"), amount: 150},
        {date: new Date("2023-07-13"), amount: 160},
        {date: new Date("2023-07-14"), amount: 160},
        {date: new Date("2023-07-15"), amount: 160},
        {date: new Date("2023-07-16"), amount: 200},
        {date: new Date("2023-07-17"), amount: 200},
        {date: new Date("2023-07-18"), amount: 200},
        {date: new Date("2023-07-19"), amount: 250},
        {date: new Date("2023-07-20"), amount: 250},
        {date: new Date("2023-07-21"), amount: 300},
    ];

    const type = [
        {label: "Balance", value: "balance", icon: ArrowTrendingUpIcon},
        {label: "Cash", value: "cash", icon: ArrowTrendingUpIcon},
        {label: "Credit", value: "credit", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("balance");

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

    const expensesBeforeLast30Days = (() => {
        return records.filter(record => {
            return record.date < thirtyDaysAgo && record.type === "expense";
        });
    })();

    const cashExpensesBeforeLast30Days = (() => {
        return records.filter(record => {
            return record.date < thirtyDaysAgo && record.type === "expense" && record.paymentType === "Cash";
        });
    })();

    const incomesBeforeLast30Days = (() => {
        return records.filter(record => {
            return record.date < thirtyDaysAgo && record.type === "income";
        });
    })();

    const cashIncomesBeforeLast30Days = (() => {
        return records.filter(record => {
            return record.date < thirtyDaysAgo && record.type === "income" && record.paymentType === "Cash";
        });
    })();

    const startingAmountBalance = (() => {

        const totalExpenseAmountBeforeLast30Days = expensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalIncomeAmountBeforeLast30Days = incomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalIncomeAmountBeforeLast30Days - totalExpenseAmountBeforeLast30Days;
    })();

    const startingAmountCash = (() => {

        const totalCashExpenseAmountBeforeLast30Days = cashExpensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalCashIncomeAmountBeforeLast30Days = cashIncomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalCashIncomeAmountBeforeLast30Days - totalCashExpenseAmountBeforeLast30Days;
    })();

    const expensesLast30Days = (() => {
        return records.filter(record => {
            return record.date >= thirtyDaysAgo && record.type === "expense";
        });
    })();

    const cashExpensesLast30Days = (() => {
        return records.filter(record => {
            return record.date >= thirtyDaysAgo && record.type === "expense" && record.paymentType === "Cash";
        });
    })();

    const incomesLast30Days = (() => {
        return records.filter(record => {
            return record.date >= thirtyDaysAgo && record.type === "income";
        });
    })();

    const cashIncomesLast30Days = (() => {
        return records.filter(record => {
            return record.date >= thirtyDaysAgo && record.type === "income" && record.paymentType === "Cash";
        });
    })();


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

    const cashGraph = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountCash;
        let iterationDate = new Date(thirtyDaysAgo);

        // Iterate through each day of the last 30 days
        while (iterationDate <= currentDate) {
            const matchingExpensesThisDay = cashExpensesLast30Days.filter(record =>
                record.date.getDate() === iterationDate.getDate() &&
                record.date.getMonth() === iterationDate.getMonth() &&
                record.date.getFullYear() === iterationDate.getFullYear()
            );
            const matchingIncomesThisDay = cashIncomesLast30Days.filter(record =>
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

    const balanceAmountToday = balanceGraph[balanceGraph.length - 1].amount;
    const cashAmountToday = cashGraph[cashGraph.length - 1].amount;

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

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Trend</span>
                        <CurrencyDollarIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flow-root">
                    <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>

                        <TabsHeader>
                            {type.map(({ label, value, icon }) => (
                                <Tab key={value} value={value}>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(icon, { className: "w-5 h-5" })}
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>

                        <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
                            {type.map(({ value }) => (
                                <TabPanel key={value} value={value}>
                                    {value === "balance" ? (
                                        // Content for "balance" tab
                                        <>
                                            <div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        TODAY
                                                    </p>
                                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                                        {balanceAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                </div>

                                                <div>
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <AreaChart className="right-4" data={balanceGraph}
                                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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

                                                <CardFooter className="p-0 mt-8">
                                                    <Link to="/balance" onClick={storeScrollPosition}>
                                                        <Button size="sm" variant="text" className="flex items-center gap-2">
                                                            Show More
                                                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </div>
                                        </>
                                    ) : value === "cash" ? (
                                        // Content for "cash" tab
                                        <>
                                            <div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        TODAY
                                                    </p>
                                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                                        {cashAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                </div>

                                                <div>
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <AreaChart className="right-4" data={cashGraph}
                                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={cashGraph}
                                                                     content={<TooltipContent />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>

                                                <CardFooter className="p-0 mt-8">

                                                    <Link to="/cash" onClick={storeScrollPosition}>
                                                        <Button size="sm" variant="text" className="flex items-center gap-2">
                                                            Show More
                                                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </div>
                                        </>
                                    ) : value === "credit" ? (
                                        // Content for "credit" tab
                                        <>
                                            <div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        TODAY
                                                    </p>
                                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                                        $300,00
                                                    </Typography>
                                                </div>

                                                <div>
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <AreaChart className="right-4" data={dataCredit}
                                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={dataCredit}
                                                                     content={<TooltipContent />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>

                                                <CardFooter className="p-0 mt-8">
                                                    <Link to="/credit_cards" onClick={storeScrollPosition}>
                                                        <Button size="sm" variant="text" className="flex items-center gap-2">
                                                            Show More
                                                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </div>
                                        </>
                                    ) : null}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
            </CardBody>
        </Card>
    );
}