import {
    Card,
    CardBody,
    Typography,
    CardFooter,
} from "@material-tailwind/react";
import React from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export default function BudgetMonthlyChart( {name} ) {

    const budgets = [
        {
            id: 1,
            period: "weekly",
            name: "General",
            amount: 140.00,
            spent: 70.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 2,
            period: "weekly",
            name: "Tobacco",
            amount: 50.00,
            spent: 55.00,
            category: [
                { id: 2, categoryName: "Tobacco" }
            ]
        },
        {
            id: 3,
            period: "monthly",
            name: "General",
            amount: 2000.00,
            spent: 1800.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 4,
            period: "monthly",
            name: "Car",
            amount: 400.00,
            spent: 260.00,
            category: [
                { id: 1, categoryName: "Car" }
            ]
        },
        {
            id: 5,
            period: "monthly",
            name: "House",
            amount: 500.00,
            spent: 250.00,
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
                { id: 1, categoryName: "House and garden" }
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
                { id: 1, categoryName: "House and garden" }
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
                { id: 1, categoryName: "House and garden" }
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
                { id: 2, categoryName: "Groceries" }
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
                { id: 3, categoryName: "Car" }
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
                { id: 3, categoryName: "Car" }
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
                { id: 3, categoryName: "Car" }
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
                { id: 4, categoryName: "Tobacco" }
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
                { id: 4, categoryName: "Tobacco" }
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
                { id: 4, categoryName: "Tobacco" }
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
                { id: 5, categoryName: "Snacks" }
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
                { id: 6, categoryName: "Health care" }
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
                { id: 7, categoryName: "Cinema" }
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
                { id: 7, categoryName: "Cinema" }
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


    // Calculate and store budget graph data based on selected budget period and name
    const budgetGraph = (() => {

        // Find the budget information based on the specified period and name
        const foundBudget = budgets.find(b =>
            b.period === "monthly" && b.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        let matchingRecords;

        if (foundBudget.category.some(cat => cat.categoryName === "All categories")) {
            // If budget's category is "All categories", include all expense records in the current week
            matchingRecords = recordsThisMonth.filter(record => record.type === "expense");
        } else {
            // Otherwise, find expense records in the current week with matching category
            matchingRecords = recordsThisMonth.filter(record =>
                record.category.some(category =>
                    foundBudget.category.some(budgetCategory => budgetCategory.categoryName === category.categoryName)
                ) && record.type === "expense"
            );
        }

        // Determine the start date of the current month
        const monthStartDate = (() => {
            const startOfMonth = new Date(currentDate);
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            return startOfMonth;
        })();

        const monthEndDate = (() => {
            const nextMonth = new Date(currentDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(0);
            nextMonth.setHours(23, 59, 59, 999);
            return nextMonth;
        })();

        const spendingPerDay = [];
        let accumulatedSpent = 0;

        const currentMonth = monthStartDate.getMonth();
        const currentYear = monthStartDate.getFullYear();
        let iterationDate = new Date(currentYear, currentMonth, 1);

        while (iterationDate <= monthEndDate) {
            if (iterationDate <= new Date()) {
                const matchingRecordsThisDay = matchingRecords.filter(record =>
                    record.date.getDate() === iterationDate.getDate() &&
                    record.date.getMonth() === currentMonth &&
                    record.date.getFullYear() === currentYear
                );

                const spentThisDay = matchingRecordsThisDay.reduce((total, record) => total + record.amount, 0);
                accumulatedSpent += spentThisDay;

                spendingPerDay.push({
                    date: new Date(iterationDate),
                    spent: accumulatedSpent
                });
            } else {
                spendingPerDay.push({
                    date: new Date(iterationDate),
                    spent: undefined
                });
            }

            // Move to the next day
            iterationDate.setDate(iterationDate.getDate() + 1);
        }

        return {
            id: foundBudget.id,
            name: foundBudget.name,
            amount: foundBudget.amount,
            spendingPerDay: spendingPerDay
        };
    })();

    let daysWithAmount = budgetGraph.spendingPerDay.filter(day => day.spent !== undefined).length;

    let spentAmount = budgetGraph.spendingPerDay.reduce((maxSpent, day) => {
        if (day.spent !== undefined && day.spent > maxSpent) {
            return day.spent;
        }
        return maxSpent;
    }, 0);


    const dailyAverage = daysWithAmount > 0 ? spentAmount / daysWithAmount : 0;
    const formattedDailyAverage = dailyAverage.toFixed(2);

    // prediction for the future, based on the records amount until the current day
    for (let i = daysWithAmount - 1; i < budgetGraph.spendingPerDay.length; i++) {
        budgetGraph.spendingPerDay[i].prediction = (spentAmount + dailyAverage * (i - daysWithAmount + 1)).toFixed(2);
    }

    let daysWithoutAmount = budgetGraph.spendingPerDay.filter(day => day.spent === undefined).length;

    const dailyRecommendedAmount = daysWithoutAmount > 0 ? (budgetGraph.amount - spentAmount) / daysWithoutAmount : 0;
    const formattedDailyRecommendedAmount = dailyRecommendedAmount.toFixed(2);

    const TooltipContent = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];

            const date = new Date(data.payload.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const formattedDate = `${day}.${month}`;

            if (data.payload.spent !== undefined && (budgetGraph.amount - data.payload.spent) >= 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-green-chart mt-1 mb-1">{`Spent: $${data.payload.spent}`}</p>
                        <p className="font-semibold text-green-700 mt-1 border-t-2">{`$${budgetGraph.amount - data.payload.spent} left`}</p>
                    </div>
                );
            } else if (data.payload.spent !== undefined && (budgetGraph.amount - data.payload.spent) < 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-green-chart mt-1 mb-1">{`Spent: $${data.payload.spent}`}</p>
                        <p className="font-semibold text-red-700 mt-1 border-t-2">{`$${Math.abs(budgetGraph.amount - data.payload.spent)} overspent`}</p>
                    </div>
                );
            } else if (data.payload.prediction !== undefined && (budgetGraph.amount - data.payload.prediction) >= 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-blue-chart mt-1 mb-1">{`Prediction: $${data.payload.prediction}`}</p>
                        <p className="font-semibold text-green-700 mt-1 border-t-2">{`$${Math.abs(budgetGraph.amount - data.payload.prediction).toFixed(2)} may left`}</p>
                    </div>
                );
            } else if (data.payload.prediction !== undefined && (budgetGraph.amount - data.payload.prediction) < 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-blue-chart mt-1 mb-1">{`Prediction: $${(data.payload.prediction)}`}</p>
                        <p className="font-semibold text-red-700 mt-1 border-t-2">{`$${Math.abs(budgetGraph.amount - data.payload.prediction).toFixed(2)} may be overspent`}</p>
                    </div>
                );
            }
        }
    };

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Trend</span>
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div>
                    <div>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart className="right-4" data={budgetGraph.spendingPerDay}
                                       margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date"
                                       tick={{fontSize: 12}} tickFormatter={(tick) => {
                                    const date = new Date(tick);
                                    const day = date.getDate().toString().padStart(2, '0');
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    return `${day}.${month}.`;}}
                                />
                                <YAxis />
                                <YAxis fontSize="small" />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                         payloadArray={budgetGraph.spendingPerDay}
                                         content={<TooltipContent />}
                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                         offset={25}/>
                                <ReferenceLine y={budgetGraph.amount} label={{ position: 'top', value: 'Budget' }} stroke="red" strokeDasharray="3 3" isFront={true} ifOverflow="extendDomain" />
                                <Area type="monotone" dataKey="spent" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                <Area type="monotone" dataKey="prediction" stroke="#8884d8" fillOpacity={1} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="container mx-auto mt-6">
                        <p className="text-xs flex items-center justify-center gap-4">
                            <span className="flex items-center">
                                <span className="w-3 h-3 inline-block mr-1 bg-red-500"></span>
                                <span className="text-xxs">Budget</span>
                            </span>
                            <span className="flex items-center">
                                <span className="w-3 h-3 inline-block mr-1 bg-green-chart"></span>
                                <span className="text-xxs">Spent</span>
                             </span>
                            <span className="flex items-center">
                                <span className="w-3 h-3 inline-block mr-1 bg-blue-chart"></span>
                                <span className="text-xxs">Prediction</span>
                            </span>
                        </p>
                    </div>

                    <CardFooter className="p-0 mt-8 flex-1 ">
                        <div className="flex justify-between">
                            <Typography className="text-lg font-semibold text-gray-800">${formattedDailyAverage}</Typography>
                            <Typography className="text-lg font-semibold text-gray-800">${formattedDailyRecommendedAmount > 0 ? formattedDailyRecommendedAmount : '0.00'}</Typography>
                        </div>
                        <div className="flex justify-between">
                            <Typography className="text-sm font-medium text-gray-600">Daily Average</Typography>
                            <Typography className="text-sm font-medium text-gray-600">Daily Recommended</Typography>
                        </div>
                    </CardFooter>
                </div>
            </CardBody>
        </Card>
    );
}