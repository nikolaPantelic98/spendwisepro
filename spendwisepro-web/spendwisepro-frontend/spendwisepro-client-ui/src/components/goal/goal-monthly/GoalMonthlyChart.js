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
import moment from "moment-timezone";

export default function GoalMonthlyChart( {name} ) {

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
        }
    ]

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate the first day of the current month
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Calculate the last day of the current month
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const goalRecordsThisMonth = (() => {
        return goalRecords.filter(record => {
            return record.date >= startOfMonth && record.date <= endOfMonth && record.goal[0].period === "monthly";
        });
    })();

    const goalRecordsBeforeThisMonth = goalRecords.filter((record) => record.date < startOfMonth && record.goal[0].period === "monthly");

    // Calculate and store goal graph data based on selected goal period and name
    const goalGraph = (() => {

        // Find the budget information based on the specified period and name
        const foundGoal = goals.find(g =>
            g.period === "monthly" && g.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        const matchingGoalRecordsCurrentMonth = goalRecordsThisMonth.filter((goalRecord) => goalRecord.goal.some((record) => record.id === foundGoal.id));

        const savingPerDay = [];
        let accumulatedSave = 0;
        let iterationDate = new Date(currentYear, currentMonth, 1);

        // Iterate through each day of the week
        while (iterationDate <= endOfMonth) {
            if (iterationDate <= new Date()) {
                const matchingRecordsThisDay = matchingGoalRecordsCurrentMonth.filter(record =>
                    record.date.getDate() === iterationDate.getDate() &&
                    record.date.getMonth() === currentMonth &&
                    record.date.getFullYear() === currentYear
                );

                const saveThisDay = matchingRecordsThisDay.reduce((total, record) => total + record.amount, 0);
                accumulatedSave += saveThisDay;

                savingPerDay.push({
                    date: new Date(iterationDate),
                    savedAmount: accumulatedSave
                });
            } else {
                savingPerDay.push({
                    date: new Date(iterationDate),
                    savedAmount: undefined
                });
            }

            // Move to the next day
            iterationDate.setDate(iterationDate.getDate() + 1);
        }

        const matchingGoalRecordsBeforeThisMonth = goalRecordsBeforeThisMonth.filter((goalRecord) => goalRecord.goal.some((record) => record.id === foundGoal.id));
        const totalSavedAmountBeforeThisMonth = matchingGoalRecordsBeforeThisMonth.reduce((sum, record) => sum + record.amount, 0);

        const remainingMonthsForGoal = (() => {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const goalEndTimeOfDay = moment.tz(foundGoal.endDate, userTimezone).endOf('day');

            const startOfMonthStartOfDay = moment.tz(startOfMonth, userTimezone).startOf('day');

            const timeDifferenceInMonths = goalEndTimeOfDay.diff(startOfMonthStartOfDay, 'months') + 1;

            return Math.ceil(timeDifferenceInMonths);
        })();

        const amountToBeSavedCurrentMonth = (foundGoal.amount - totalSavedAmountBeforeThisMonth) / remainingMonthsForGoal;


        // Return the goal graph data including saving information per day
        return {
            id: foundGoal.id,
            name: foundGoal.name,
            amount: amountToBeSavedCurrentMonth,
            savingPerDay: savingPerDay
        };
    })();

    let daysWithAmount = goalGraph.savingPerDay.filter(day => day.savedAmount !== undefined).length;

    let amountSaved = goalGraph.savingPerDay.reduce((maxSave, day) => {
        if (day.savedAmount !== undefined && day.savedAmount > maxSave) {
            return day.savedAmount;
        }
        return maxSave;
    }, 0);

    const dailyAverage = daysWithAmount > 0 ? amountSaved / daysWithAmount : 0;
    const formattedDailyAverage = dailyAverage.toFixed(2);

    // prediction for the future, based on the records amount until the current day
    for (let i = daysWithAmount - 1; i < goalGraph.savingPerDay.length; i++) {
        goalGraph.savingPerDay[i].prediction = (amountSaved + dailyAverage * (i - daysWithAmount + 1)).toFixed(2);
    }

    let daysWithoutAmount = goalGraph.savingPerDay.filter(day => day.savedAmount === undefined).length + 1;

    const dailyRecommendedAmount = () => {
        if (daysWithoutAmount > 0) {
            return (goalGraph.amount - amountSaved) / daysWithoutAmount;
        } else if (daysWithoutAmount === 0 && goalGraph.amount > amountSaved) {
            return goalGraph.amount - amountSaved;
        } else {
            return 0;
        }
    }

    const recommendedAmount = dailyRecommendedAmount();
    const formattedDailyRecommendedAmount = recommendedAmount.toFixed(2);

    const TooltipContent = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];

            const date = new Date(data.payload.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const formattedDate = `${day}.${month}`;

            if (data.payload.savedAmount !== undefined && (goalGraph.amount - data.payload.savedAmount) >= 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-green-chart mt-1 mb-1">{`Saved: $${(data.payload.savedAmount).toFixed(2)}`}</p>
                        <p className="font-semibold text-gray-900 mt-1 border-t-2">{`$${(goalGraph.amount - data.payload.savedAmount).toFixed(2)} left`}</p>
                    </div>
                );
            } else if (data.payload.savedAmount !== undefined && (goalGraph.amount - data.payload.savedAmount) < 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-green-chart mt-1 mb-1">{`Saved: $${data.payload.savedAmount}`}</p>
                        <p className="font-semibold text-green-600 mt-1 border-t-2">{`$${Math.abs(goalGraph.amount - data.payload.savedAmount).toFixed(2)} oversaved`}</p>
                    </div>
                );
            } else if (data.payload.prediction !== undefined && (goalGraph.amount - data.payload.prediction) >= 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-blue-chart mt-1 mb-1">{`Prediction: $${data.payload.prediction}`}</p>
                        <p className="font-semibold text-gray-900 mt-1 border-t-2">{`$${Math.abs(goalGraph.amount - data.payload.prediction).toFixed(2)} may left`}</p>
                    </div>
                );
            } else if (data.payload.prediction !== undefined && (goalGraph.amount - data.payload.prediction) < 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-blue-chart mt-1 mb-1">{`Prediction: $${data.payload.prediction}`}</p>
                        <p className="font-semibold text-green-600 mt-1 border-t-2">{`$${Math.abs(goalGraph.amount - data.payload.prediction).toFixed(2)} may be oversaved`}</p>
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
                            <AreaChart className="right-4" data={goalGraph.savingPerDay}
                                       margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date"
                                       tick={{fontSize: 12, dy: 8}} tickFormatter={(tick) => {
                                    const date = new Date(tick);
                                    const day = date.getDate().toString().padStart(2, '0');
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    return `${day}.${month}.`;}}
                                />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                         payloadArray={goalGraph.savingPerDay}
                                         content={<TooltipContent />}
                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                         offset={25}/>
                                <ReferenceLine y={goalGraph.amount} label={{ position: 'top', value: 'Goal' }} stroke="red" strokeDasharray="3 3" isFront={true} ifOverflow="extendDomain" />
                                <Area type="monotone" dataKey="savedAmount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
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