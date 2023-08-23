import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import React from "react";
import {
    Bar, BarChart,
    CartesianGrid, ReferenceLine, ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export default function BudgetWeeklyLastPeriods( {name} ) {

    const budgets = [
        {
            id: 1,
            period: "weekly",
            name: "General",
            amount: 140.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 2,
            period: "weekly",
            name: "Tobacco",
            amount: 50.00,
            category: [
                { id: 2, categoryName: "Tobacco" }
            ]
        },
        {
            id: 3,
            period: "monthly",
            name: "General",
            amount: 2000.00,
            category: [
                { id: 1, categoryName: "All categories" }
            ]
        },
        {
            id: 4,
            period: "monthly",
            name: "Car",
            amount: 400.00,
            category: [
                { id: 1, categoryName: "Car" }
            ]
        },
        {
            id: 5,
            period: "monthly",
            name: "House",
            amount: 500.00,
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

    const dataGraph = (() => {
        const foundBudget = budgets.find(budget =>
            budget.period === "weekly" && budget.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        const data = [];

        for (let i = 4; i >= 0; i--) {
            const daysAgo = i * 7;
            const startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - daysAgo - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() - daysAgo + (7 - currentDate.getDay()));
            endDate.setHours(23, 59, 59, 999);

            let spentInPeriod = 0;

            for (const record of records) {
                const recordDate = new Date(record.date);
                if (recordDate >= startDate && recordDate <= endDate && record.type === "expense") {
                    if (foundBudget.category.some(cat => cat.categoryName === "All categories")) {
                        spentInPeriod += record.amount;
                    } else {
                        if (record.category.some(category =>
                            foundBudget.category.some(budgetCategory => budgetCategory.categoryName === category.categoryName)
                        )) {
                            spentInPeriod += record.amount;
                        }
                    }
                }
            }

            data.push({
                startDate: startDate,
                endDate: endDate,
                amount: foundBudget.amount,
                spent: spentInPeriod
            });
        }

        return data;
    })();

    const CustomTooltipContent = ({ active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0];

            const startDate = new Date(data.payload.startDate);
            const startDay = startDate.getDate().toString().padStart(2, '0');
            const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
            const formattedStartDate = `${startDay}.${startMonth}`;

            const endDate = new Date(data.payload.endDate);
            const endDay = endDate.getDate().toString().padStart(2, '0');
            const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
            const formattedEndDate = `${endDay}.${endMonth}`;

            return (
                <div className="p-1">
                    <p className="text-center text-gray-900 border-b-2">{`${formattedStartDate} - ${formattedEndDate}`}</p>
                    <p className="font-semibold text-right text-red-400 mt-1">{`Budget: $${data.payload.amount}`}</p>
                    <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Spent: $${data.payload.spent}`}</p>
                    <p className="font-semibold text-right text-gray-900 mt-1 border-t-2">{`Total: $${(data.payload.amount) - (data.payload.spent)}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Last 5 periods</span>
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div>
                    <div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart className="right-4" data={dataGraph} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="startDate"
                                    interval={0}
                                    tick={({ x, y, payload }) => {
                                        const tickDate = new Date(payload.value);
                                        const endDate = new Date(dataGraph[payload.index].endDate);

                                        const formatDate = (date) => {
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            return `${day}.${month}.`;
                                        };

                                        return (
                                            <g transform={`translate(${x},${y})`}>
                                                <text x={0} y={0} dy={16} fontSize={12} textAnchor="middle" fill="#666666">
                                                    {formatDate(tickDate)}
                                                </text>
                                                <text x={0} y={0} dy={33} fontSize={12} textAnchor="middle" fill="#666666">
                                                    {formatDate(endDate)}
                                                </text>
                                            </g>
                                        );
                                    }}
                                />
                                <YAxis />
                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                         content={<CustomTooltipContent />}
                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                         offset={25}/>
                                <Bar dataKey="spent" fill="#82ca9d" />
                                <ReferenceLine y={dataGraph[0].amount} stroke="red" strokeDasharray="3 3" isFront={true} ifOverflow="extendDomain" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}