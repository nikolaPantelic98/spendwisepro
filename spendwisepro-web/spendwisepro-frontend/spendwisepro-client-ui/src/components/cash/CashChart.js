import {
    Card,
    CardBody,
    Typography,
    Chip, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyEuroIcon} from "@heroicons/react/24/solid";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useEffect, useState} from "react";
import axios from "axios";
import getData from "../../api/axiosInstance";

export default function CashChart() {

    const dataTime = [
        {label: "7 Days", value: "7days", icon: ArrowTrendingUpIcon},
        {label: "30 Days", value: "30days", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("30days");

    const [records, setRecords] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            "/records/all",
            headers,
            setRecords,
            "Error fetching records"
        )
    }, []);

    const currentDate = new Date();

    const thirtyDaysAgo = (() => {
        const result = new Date(currentDate);
        result.setDate(currentDate.getDate() - 30);
        result.setHours(0, 0, 0, 0);
        return result;
    })();

    const sevenDaysAgo = (() => {
        const result = new Date(currentDate);
        result.setDate(currentDate.getDate() - 7);
        result.setHours(0, 0, 0, 0);
        return result;
    })();

    // Filter cash expenses before the last 30 days
    const cashExpensesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CASH";
        });
    })();

    // Filter cash expenses before the last 7 days
    const cashExpensesBeforeLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < sevenDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CASH";
        });
    })();

    // Filter cash incomes before the last 30 days
    const cashIncomesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CASH";
        });
    })();

    // Filter cash incomes before the last 7 days
    const cashIncomesBeforeLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < sevenDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CASH";
        });
    })();

    // Calculate the initial cash amount for the chart that shows last 30 days
    const startingAmountCash30Days = (() => {
        const totalCashExpenseAmountBeforeLast30Days = cashExpensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalCashIncomeAmountBeforeLast30Days = cashIncomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalCashIncomeAmountBeforeLast30Days - totalCashExpenseAmountBeforeLast30Days;
    })();

    // Calculate the initial cash amount for the chart that shows last 7 days
    const startingAmountCash7Days = (() => {
        const totalCashExpenseAmountBeforeLast7Days = cashExpensesBeforeLast7Days.reduce((total, record) => total + record.amount, 0);
        const totalCashIncomeAmountBeforeLast7Days = cashIncomesBeforeLast7Days.reduce((total, record) => total + record.amount, 0);

        return totalCashIncomeAmountBeforeLast7Days - totalCashExpenseAmountBeforeLast7Days;
    })();

    // Filter cash expenses within the last 30 days
    const cashExpensesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CASH";
        });
    })();

    // Filter cash expenses within the last 7 days
    const cashExpensesLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= sevenDaysAgo && record.transactionType === "EXPENSE" && record.paymentType === "CASH";
        });
    })();

    // Filter cash incomes within the last 30 days
    const cashIncomesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CASH";
        });
    })();

    // Filter cash incomes within the last 7 days
    const cashIncomesLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= sevenDaysAgo && record.transactionType === "INCOME" && record.paymentType === "CASH";
        });
    })();

    // Calculate cash chart data for the last 30 days
    const cashGraphLast30Days = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountCash30Days;
        let iterationDate = new Date(thirtyDaysAgo);

        // Iterate through each day of the last 30 days
        while (iterationDate <= currentDate) {
            const matchingExpensesThisDay = cashExpensesLast30Days.filter(record => {
                let date = new Date(record.dateAndTime);
                return date.getDate() === iterationDate.getDate() &&
                    date.getMonth() === iterationDate.getMonth() &&
                    date.getFullYear() === iterationDate.getFullYear();
            });
            const matchingIncomesThisDay = cashIncomesLast30Days.filter(record => {
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

    // Calculate cash chart data for the last 7 days
    const cashGraphLast7Days = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountCash7Days;
        let iterationDate = new Date(sevenDaysAgo);

        // Iterate through each day of the last 7 days
        while (iterationDate <= currentDate) {
            const matchingExpensesThisDay = cashExpensesLast7Days.filter(record => {
                let date = new Date(record.dateAndTime);
                return date.getDate() === iterationDate.getDate() &&
                    date.getMonth() === iterationDate.getMonth() &&
                    date.getFullYear() === iterationDate.getFullYear();
            });
            const matchingIncomesThisDay = cashIncomesLast7Days.filter(record => {
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

    // Get the cash amount for today
    const cashAmountToday = cashGraphLast30Days[cashGraphLast30Days.length - 1].amount;

    const chipAmount30Days = (() => {
        if (startingAmountCash30Days <= 0) {
            return (cashAmountToday / 1) * 100;
        } else {
            return (cashAmountToday - startingAmountCash30Days) / startingAmountCash30Days * 100;
        }
    })();

    const chipAmount7Days = (() => {
        if (startingAmountCash7Days <= 0) {
            return (cashAmountToday / 1) * 100;
        } else {
            return (cashAmountToday - startingAmountCash7Days) / startingAmountCash7Days * 100;
        }
    })();

    function generateChipPercentage(cashAmountToday, startingAmountCash) {

        let percentage = ((cashAmountToday - startingAmountCash) / startingAmountCash * 100).toFixed(0);

        if (startingAmountCash <= 0) {
            percentage = ((cashAmountToday / 1) * 100).toFixed(0);
        }

        if (percentage < -999) percentage = `-999` + "+";
        if (percentage > 999) percentage = '999' + "+";

        return percentage;
    }

    const chipColor30Days = (() => {
        if (chipAmount30Days >= 0) {
            return "green";
        } else {
            return "red";
        }
    })();

    const chipColor7Days = (() => {
        if (chipAmount7Days >= 0) {
            return "green";
        } else {
            return "red";
        }
    })();

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
                        <span className="mb-2">Cash Trend</span>
                        <CurrencyEuroIcon className="text-green-700 w-10 h-10 mb-4" />
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
                                                                {cashAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                            <Chip size="md" value={`${generateChipPercentage(cashAmountToday, startingAmountCash30Days)}%`} className="mb-4 text-sm" color={chipColor30Days} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ResponsiveContainer width="100%" height={220}>
                                                            <AreaChart className="right-4" data={cashGraphLast30Days}
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
                                                                         payloadArray={cashGraphLast30Days}
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
                                                                {cashAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                            <Chip size="md" value={`${generateChipPercentage(cashAmountToday, startingAmountCash7Days)}%`} className="mb-4 text-sm" color={chipColor7Days} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ResponsiveContainer width="100%" height={220}>
                                                            <AreaChart className="right-4" data={cashGraphLast7Days}
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
                                                                         payloadArray={cashGraphLast7Days}
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