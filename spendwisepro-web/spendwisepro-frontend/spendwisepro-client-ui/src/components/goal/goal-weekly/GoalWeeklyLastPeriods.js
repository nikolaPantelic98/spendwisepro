import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import React from "react";
import {
    Bar, BarChart,
    CartesianGrid, ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import moment from "moment-timezone";

export default function GoalWeeklyLastPeriods( {name} ) {

    const goals = [
        {
            id: 1,
            period: "weekly",
            name: "Laptop",
            amount: 1700.00,
            startDate: new Date("2023-06-05"),
            endDate: new Date("2023-12-10")
        },
        {
            id: 2,
            period: "weekly",
            name: "Aqua Park",
            amount: 260.00,
            startDate: new Date("2023-07-03"),
            endDate: new Date("2023-09-10")
        },
        {
            id: 3,
            period: "monthly",
            name: "Vacation",
            amount: 1200.00,
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-12-29")
        },
        {
            id: 4,
            period: "monthly",
            name: "House",
            amount: 3500.00,
            startDate: new Date("2023-03-01"),
            endDate: new Date("2023-10-18")
        }
    ]

    const goalRecords = [
        {
            id: 1,
            amount: 10.00,
            date: new Date("2023-08-15"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 2,
            amount: 20.00,
            date: new Date("2023-08-19"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 3,
            amount: 5.00,
            date: new Date("2023-08-26"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 4,
            amount: 8.00,
            date: new Date("2023-08-26"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 5,
            amount: 15.00,
            date: new Date("2023-08-20"),
            goal: [
                { id: 2, period: "weekly", name: "Aqua Park"}
            ]
        },
        {
            id: 6,
            amount: 30.00,
            date: new Date("2023-08-22"),
            goal: [
                { id: 3, period: "monthly", name: "Vacation"}
            ]
        },
        {
            id: 7,
            amount: 55.00,
            date: new Date("2023-08-23"),
            goal: [
                { id: 3, period: "monthly", name: "Vacation"}
            ]
        },
        {
            id: 8,
            amount: 20.00,
            date: new Date("2023-08-25"),
            goal: [
                { id: 3, period: "monthly", name: "Vacation"}
            ]
        },
        {
            id: 9,
            amount: 100.00,
            date: new Date("2023-08-13"),
            goal: [
                { id: 4, period: "monthly", name: "House"}
            ]
        },
        {
            id: 10,
            amount: 250.00,
            date: new Date("2023-08-26"),
            goal: [
                { id: 4, period: "monthly", name: "House"}
            ]
        },
    ]

    const currentDate = new Date();

    const dataGraph = (() => {
        const foundGoal = goals.find(goal =>
            goal.period === "weekly" && goal.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        const matchingGoalRecords = goalRecords.filter((goalRecord) => goalRecord.goal.some((record) => record.id === foundGoal.id));

        const data = [];

        for (let i = 4; i >= 0; i--) {
            const daysAgo = i * 7;
            const startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - daysAgo - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() - daysAgo + (7 - currentDate.getDay()));
            if (currentDate.getDay() !== 0) {
                endDate.setHours(23, 59, 59, 999);

            }

            let savedInPeriod = 0;

            for (const goalRecord of matchingGoalRecords) {
                const recordDate = new Date(goalRecord.date);
                if (recordDate >= startDate && recordDate <= endDate) {
                    savedInPeriod += goalRecord.amount;
                }
            }

            const goalRecordsBeforeThisWeek = goalRecords.filter((record) => record.date < startDate && record.goal[0].period === "weekly");
            const matchingGoalRecordsBeforeThisWeek = goalRecordsBeforeThisWeek.filter((goalRecord) => goalRecord.goal.some((record) => record.id === foundGoal.id));
            const totalSavedAmountBeforeThisWeek = matchingGoalRecordsBeforeThisWeek.reduce((sum, record) => sum + record.amount, 0);

            const remainingWeeksForGoal = (() => {
                const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const goalEndTime = moment.tz(foundGoal.endDate, userTimezone).endOf('day');
                const goalStartTime = moment.tz(startDate, userTimezone).startOf('day');
                const timeDifferenceInHours = goalEndTime.diff(goalStartTime, 'hours');
                const hoursPerWeek = 24 * 7;

                return Math.ceil(timeDifferenceInHours / hoursPerWeek);
            })();

            const amountToBeSavedCurrentWeek = (foundGoal.amount - totalSavedAmountBeforeThisWeek) / remainingWeeksForGoal;

            data.push({
                startDate: startDate,
                endDate: endDate,
                amount: amountToBeSavedCurrentWeek,
                savedAmount: savedInPeriod
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
                    <p className="font-semibold text-right text-green-600 mt-1">{`Goal: $${(data.payload.amount).toFixed(2)}`}</p>
                    <p className="font-semibold text-right text-gray-900 mt-1 mb-1">{`Saved: $${(data.payload.savedAmount).toFixed(2)}`}</p>
                </div>
            );
        }

        return null;
    };


    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex item*-center justify-between">
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
                                <Bar dataKey="savedAmount" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}