import {
    Card,
    CardBody,
    Typography,
    Chip, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyDollarIcon} from "@heroicons/react/24/solid";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useEffect, useState} from "react";
import getData from "../../api/axiosInstance";

export default function BalanceChart() {

    const dataTime = [
        {label: "7 Days", value: "7days", icon: ArrowTrendingUpIcon},
        {label: "30 Days", value: "30days", icon: ArrowTrendingUpIcon},
    ];

    const [selectedTab, setSelectedTab] = useState("30days");

    const [records, setRecords] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            '/records/all',
            headers,
            setRecords,
            'Error fetching records'
        );
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

    // Filter expenses before the last 30 days
    const expensesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "EXPENSE";
        });
    })();

    // Filter expenses before the last 7 days
    const expensesBeforeLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < sevenDaysAgo && record.transactionType === "EXPENSE";
        });
    })();

    // Filter incomes before the last 30 days
    const incomesBeforeLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < thirtyDaysAgo && record.transactionType === "INCOME";
        });
    })();

    // Filter incomes before the last 7 days
    const incomesBeforeLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date < sevenDaysAgo && record.transactionType === "INCOME";
        });
    })();

    // Calculate the initial balance amount for the chart that shows last 30 days
    const startingAmountBalance30Days = (() => {
        const totalExpenseAmountBeforeLast30Days = expensesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);
        const totalIncomeAmountBeforeLast30Days = incomesBeforeLast30Days.reduce((total, record) => total + record.amount, 0);

        return totalIncomeAmountBeforeLast30Days - totalExpenseAmountBeforeLast30Days;
    })();

    // Calculate the initial balance amount for the chart that shows last 7 days
    const startingAmountBalance7Days = (() => {
        const totalExpenseAmountBeforeLast7Days = expensesBeforeLast7Days.reduce((total, record) => total + record.amount, 0);
        const totalIncomeAmountBeforeLast7Days = incomesBeforeLast7Days.reduce((total, record) => total + record.amount, 0);

        return totalIncomeAmountBeforeLast7Days - totalExpenseAmountBeforeLast7Days;
    })();

    // Filter expenses within the last 30 days
    const expensesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "EXPENSE";
        });
    })();

    // Filter expenses within the last 7 days
    const expensesLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= sevenDaysAgo && record.transactionType === "EXPENSE";
        });
    })();

    // Filter incomes within the last 30 days
    const incomesLast30Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= thirtyDaysAgo && record.transactionType === "INCOME";
        });
    })();

    // Filter incomes within the last 7 days
    const incomesLast7Days = (() => {
        return records.filter(record => {
            let date = new Date(record.dateAndTime);
            return date >= sevenDaysAgo && record.transactionType === "INCOME";
        });
    })();

    // Calculate balance chart data
    const balanceGraphLast30Days = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountBalance30Days;
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

    // Calculate balance chart data
    const balanceGraphLast7Days = (() => {

        const amountPerDay = [];
        let accumulatedAmount = startingAmountBalance7Days;
        let iterationDate = new Date(sevenDaysAgo);

        // Iterate through each day of the last 7 days
        while (iterationDate <= currentDate) {
            const matchingExpensesThisDay = expensesLast7Days.filter(record => {
                let date = new Date(record.dateAndTime);
                return date.getDate() === iterationDate.getDate() &&
                    date.getMonth() === iterationDate.getMonth() &&
                    date.getFullYear() === iterationDate.getFullYear();
            });
            const matchingIncomesThisDay = incomesLast7Days.filter(record => {
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

    // Get the balance amount for today
    const balanceAmountToday = balanceGraphLast30Days[balanceGraphLast30Days.length - 1].amount;

    const chipAmount30Days = (() => {
        if (startingAmountBalance30Days <= 0) {
            return (balanceAmountToday / 1) * 100;
        } else {
            return (balanceAmountToday - startingAmountBalance30Days) / startingAmountBalance30Days * 100;
        }
    })();

    const chipAmount7Days = (() => {
        if (startingAmountBalance7Days <= 0) {
            return (balanceAmountToday / 1) * 100;
        } else {
            return (balanceAmountToday - startingAmountBalance7Days) / startingAmountBalance7Days * 100;
        }
    })();

    function generateChipPercentage(balanceAmountToday, startingAmountBalance) {

        let percentage = ((balanceAmountToday - startingAmountBalance) / startingAmountBalance * 100).toFixed(0);

        if (startingAmountBalance <= 0) {
            percentage = ((balanceAmountToday / 1) * 100).toFixed(0);
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
                                                            <Chip size="md" value={`${generateChipPercentage(balanceAmountToday, startingAmountBalance30Days)}%`} className="mb-4 text-sm" color={chipColor30Days} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ResponsiveContainer width="100%" height={220}>
                                                            <AreaChart className="right-4" data={balanceGraphLast30Days}
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
                                                                         payloadArray={balanceGraphLast30Days}
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
                                                                {balanceAmountToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                            <Chip size="md" value={`${generateChipPercentage(balanceAmountToday, startingAmountBalance7Days)}%`} className="mb-4 text-sm" color={chipColor7Days} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ResponsiveContainer width="100%" height={220}>
                                                            <AreaChart className="right-4" data={balanceGraphLast7Days}
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
                                                                         payloadArray={balanceGraphLast7Days}
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