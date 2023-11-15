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
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function TrendCard() {

    const type = [
        {label: "Balance", value: "balance", icon: ArrowTrendingUpIcon},
        {label: "Cash", value: "cash", icon: ArrowTrendingUpIcon},
        {label: "Credit", value: "credit", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("balance");

    const [records, setRecords] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/all', { headers })
            .then(response => {
                setRecords(response.data);
            })
            .catch(error => console.error('Error fetching records:', error));
    }, []);

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
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "EXPENSE";
        });
    })();

    // Filter cash expenses before the last 30 days
    const cashExpensesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CASH";
        });
    })();

    // Filter credit card expenses before the last 30 days
    const creditCardExpensesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CREDIT_CARD";
        });
    })();

    // Filter incomes before the last 30 days
    const incomesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "INCOME";
        });
    })();

    // Filter cash incomes before the last 30 days
    const cashIncomesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CASH";
        });
    })();

    // Filter credit card incomes before the last 30 days
    const creditCardIncomesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CREDIT_CARD";
        });
    })();

    // Calculate the initial balance amount for the chart
    const startingAmountBalance = (() => {
        const totalExpenseAmountBeforeLast30Days = expensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalIncomeAmountBeforeLast30Days = incomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalIncomeAmountBeforeLast30Days - totalExpenseAmountBeforeLast30Days;
    })();

    // Calculate the initial cash amount for the chart
    const startingAmountCash = (() => {
        const totalCashExpenseAmountBeforeLast30Days = cashExpensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalCashIncomeAmountBeforeLast30Days = cashIncomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalCashIncomeAmountBeforeLast30Days - totalCashExpenseAmountBeforeLast30Days;
    })();

    // Calculate the initial credit card amount for the chart
    const startingAmountCreditCard = (() => {
        const totalCreditCardExpenseAmountBeforeLast30Days = creditCardExpensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalCreditCardIncomeAmountBeforeLast30Days = creditCardIncomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalCreditCardIncomeAmountBeforeLast30Days - totalCreditCardExpenseAmountBeforeLast30Days;
    })();

    // Filter expenses within the last 30 days
    const expensesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "EXPENSE";
        });
    })();

    // Filter cash expenses within the last 30 days
    const cashExpensesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CASH";
        });
    })();

    // Filter credit card expenses within the last 30 days
    const creditCardExpensesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CREDIT_CARD";
        });
    })();

    // Filter incomes within the last 30 days
    const incomesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "INCOME";
        });
    })();

    // Filter cash incomes within the last 30 days
    const cashIncomesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CASH";
        });
    })();

    // Filter credit card incomes within the last 30 days
    const creditCardIncomesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CREDIT_CARD";
        });
    })();


    // Calculate balance chart data
    const balanceGraph = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountBalance;
        let iterationDate = new Date(thirtyDaysAgo);

        // Iterate through each day of the last 30 days
        while (iterationDate <= currentDate) {
            const matchingExpensesThisDay = expensesLast30Days.filter(record => {
                let date = new Date(record.dateAndTime);
                return date.getDate() === iterationDate.getDate() &&
                    date.getMonth() === iterationDate.getMonth() &&
                    date.getFullYear() === iterationDate.getFullYear();
            });
            const matchingIncomesThisDay = incomesLast30Days.filter(record => {
                let date = new Date(record.dateAndTime);
                return date.getDate() === iterationDate.getDate() &&
                    date.getMonth() === iterationDate.getMonth() &&
                    date.getFullYear() === iterationDate.getFullYear();
            });

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

    // Calculate cash chart data
    // const cashGraph = (() => {
    //
    //     const amountPerDay = [];
    //     let accumulatedAmount = startingAmountCash;
    //     let iterationDate = new Date(thirtyDaysAgo);
    //
    //     // Iterate through each day of the last 30 days
    //     while (iterationDate <= currentDate) {
    //         const matchingExpensesThisDay = cashExpensesLast30Days.filter(record =>
    //             record.date.getDate() === iterationDate.getDate() &&
    //             record.date.getMonth() === iterationDate.getMonth() &&
    //             record.date.getFullYear() === iterationDate.getFullYear()
    //         );
    //         const matchingIncomesThisDay = cashIncomesLast30Days.filter(record =>
    //             record.date.getDate() === iterationDate.getDate() &&
    //             record.date.getMonth() === iterationDate.getMonth() &&
    //             record.date.getFullYear() === iterationDate.getFullYear()
    //         );
    //
    //         const expensesThisDay = matchingExpensesThisDay.reduce((total, record) => total - record.amount, 0);
    //         accumulatedAmount += expensesThisDay;
    //         const incomesThisDay = matchingIncomesThisDay.reduce((total, record) => total + record.amount, 0);
    //         accumulatedAmount += incomesThisDay;
    //
    //         amountPerDay.push({
    //             date: new Date(iterationDate),
    //             amount: accumulatedAmount
    //         });
    //
    //         // Move to the next day
    //         iterationDate.setDate(iterationDate.getDate() + 1);
    //     }
    //
    //     return amountPerDay;
    // })();
    //
    // // Calculate credit card chart data
    // const creditCardGraph = (() => {
    //
    //     const amountPerDay = [];
    //     let accumulatedAmount = startingAmountCreditCard;
    //     let iterationDate = new Date(thirtyDaysAgo);
    //
    //     // Iterate through each day of the last 30 days
    //     while (iterationDate <= currentDate) {
    //         const matchingExpensesThisDay = creditCardExpensesLast30Days.filter(record =>
    //             record.date.getDate() === iterationDate.getDate() &&
    //             record.date.getMonth() === iterationDate.getMonth() &&
    //             record.date.getFullYear() === iterationDate.getFullYear()
    //         );
    //         const matchingIncomesThisDay = creditCardIncomesLast30Days.filter(record =>
    //             record.date.getDate() === iterationDate.getDate() &&
    //             record.date.getMonth() === iterationDate.getMonth() &&
    //             record.date.getFullYear() === iterationDate.getFullYear()
    //         );
    //
    //         const expensesThisDay = matchingExpensesThisDay.reduce((total, record) => total - record.amount, 0);
    //         accumulatedAmount += expensesThisDay;
    //         const incomesThisDay = matchingIncomesThisDay.reduce((total, record) => total + record.amount, 0);
    //         accumulatedAmount += incomesThisDay;
    //
    //         amountPerDay.push({
    //             date: new Date(iterationDate),
    //             amount: accumulatedAmount
    //         });
    //
    //         // Move to the next day
    //         iterationDate.setDate(iterationDate.getDate() + 1);
    //     }
    //
    //     return amountPerDay;
    // })();

    // Get the balance amount for today
    const balanceAmountToday = balanceGraph[balanceGraph.length - 1].amount;

    // Get the cash amount for today
    // const cashAmountToday = cashGraph[cashGraph.length - 1].amount;
    //
    // // Get the credit card amount for today
    // const creditCardAmountToday = creditCardGraph[creditCardGraph.length - 1].amount;

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
                                                {/*<div className="flex-1">*/}
                                                {/*    <p className="text-sm font-medium text-gray-900 truncate">*/}
                                                {/*        TODAY*/}
                                                {/*    </p>*/}
                                                {/*    <Typography variant="h2" className="text-gray-900 mb-4">*/}
                                                {/*        {cashAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}*/}
                                                {/*    </Typography>*/}
                                                {/*</div>*/}

                                                {/*<div>*/}
                                                {/*    <ResponsiveContainer width="100%" height={220}>*/}
                                                {/*        <AreaChart className="right-4" data={cashGraph}*/}
                                                {/*                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>*/}
                                                {/*            <defs>*/}
                                                {/*                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">*/}
                                                {/*                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />*/}
                                                {/*                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />*/}
                                                {/*                </linearGradient>*/}
                                                {/*            </defs>*/}
                                                {/*            <XAxis dataKey="date"*/}
                                                {/*                   tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {*/}
                                                {/*                const date = new Date(tick);*/}
                                                {/*                const day = date.getDate().toString().padStart(2, '0');*/}
                                                {/*                const month = (date.getMonth() + 1).toString().padStart(2, '0');*/}
                                                {/*                return `${day}.${month}.`;}}*/}
                                                {/*            />*/}
                                                {/*            <YAxis tick={{fontSize: 15, dx: -3}} />*/}
                                                {/*            <CartesianGrid strokeDasharray="3 3" vertical={false} />*/}
                                                {/*            <Tooltip cursor={{fill: '#E8F5E9'}}*/}
                                                {/*                     payloadArray={cashGraph}*/}
                                                {/*                     content={<TooltipContent />}*/}
                                                {/*                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}*/}
                                                {/*                     offset={25}/>*/}
                                                {/*            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />*/}
                                                {/*        </AreaChart>*/}
                                                {/*    </ResponsiveContainer>*/}
                                                {/*</div>*/}

                                                {/*<CardFooter className="p-0 mt-8">*/}

                                                {/*    <Link to="/cash" onClick={storeScrollPosition}>*/}
                                                {/*        <Button size="sm" variant="text" className="flex items-center gap-2">*/}
                                                {/*            Show More*/}
                                                {/*            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />*/}
                                                {/*        </Button>*/}
                                                {/*    </Link>*/}
                                                {/*</CardFooter>*/}
                                            </div>
                                        </>
                                    ) : value === "credit" ? (
                                        // Content for "credit" tab
                                        <>
                                            <div>
                                                {/*<div className="flex-1">*/}
                                                {/*    <p className="text-sm font-medium text-gray-900 truncate">*/}
                                                {/*        TODAY*/}
                                                {/*    </p>*/}
                                                {/*    <Typography variant="h2" className="text-gray-900 mb-4">*/}
                                                {/*        {creditCardAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}*/}
                                                {/*    </Typography>*/}
                                                {/*</div>*/}

                                                {/*<div>*/}
                                                {/*    <ResponsiveContainer width="100%" height={220}>*/}
                                                {/*        <AreaChart className="right-4" data={creditCardGraph}*/}
                                                {/*                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>*/}
                                                {/*            <defs>*/}
                                                {/*                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">*/}
                                                {/*                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />*/}
                                                {/*                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />*/}
                                                {/*                </linearGradient>*/}
                                                {/*            </defs>*/}
                                                {/*            <XAxis dataKey="date"*/}
                                                {/*                   tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {*/}
                                                {/*                const date = new Date(tick);*/}
                                                {/*                const day = date.getDate().toString().padStart(2, '0');*/}
                                                {/*                const month = (date.getMonth() + 1).toString().padStart(2, '0');*/}
                                                {/*                return `${day}.${month}.`;}}*/}
                                                {/*            />*/}
                                                {/*            <YAxis tick={{fontSize: 15, dx: -3}} />*/}
                                                {/*            <CartesianGrid strokeDasharray="3 3" vertical={false} />*/}
                                                {/*            <Tooltip cursor={{fill: '#E8F5E9'}}*/}
                                                {/*                     payloadArray={creditCardGraph}*/}
                                                {/*                     content={<TooltipContent />}*/}
                                                {/*                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}*/}
                                                {/*                     offset={25}/>*/}
                                                {/*            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />*/}
                                                {/*        </AreaChart>*/}
                                                {/*    </ResponsiveContainer>*/}
                                                {/*</div>*/}

                                                {/*<CardFooter className="p-0 mt-8">*/}
                                                {/*    <Link to="/credit_cards" onClick={storeScrollPosition}>*/}
                                                {/*        <Button size="sm" variant="text" className="flex items-center gap-2">*/}
                                                {/*            Show More*/}
                                                {/*            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />*/}
                                                {/*        </Button>*/}
                                                {/*    </Link>*/}
                                                {/*</CardFooter>*/}
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