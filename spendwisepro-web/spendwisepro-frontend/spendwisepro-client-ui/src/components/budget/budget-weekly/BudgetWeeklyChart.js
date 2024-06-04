import {
    Card,
    CardBody,
    Typography,
    CardFooter, Spinner,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
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
import axios from "axios";
import getData from "../../../api/axiosInstance";

export default function BudgetWeeklyChart({ id }) {

    const [weeklyBudgets, setWeeklyBudgets] = useState([]);
    const [recordsThisWeek, setRecordsThisWeek] = useState([]);
    const [categories, setCategories] = useState([]);
    const [budgetGraph, setBudgetGraph] = useState(null);

    const currentDate = new Date();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            "/budgets/weekly",
            headers,
            setWeeklyBudgets,
            "Error fetching weekly budgets"
        )
    }, []);

    useEffect(() => {
        getData(
            "/records/expense_records_this_week",
            headers,
            setRecordsThisWeek,
            "Error fetching expense records this week"
        )
    }, []);

    useEffect(() => {
        getData(
            "/categories/all",
            headers,
            setCategories,
            "Error fetching categories"
        )
    }, []);

    useEffect(() => {
        // Calculate and store budget graph data based on selected budget period and name
        const calculateBudgetGraph = () => {
            // Find the budget information based on the specified id
            const foundBudget = weeklyBudgets.find(b =>
                b.id == id
            );

            // Check if foundBudget exists
            if (!foundBudget) {
                return null;
            }

            let matchingRecords = recordsThisWeek.filter(record => {
                let date = new Date(record.dateAndTime);
                return date && foundBudget.categories.some(budgetCategory => budgetCategory.name === record.category.name);
            });

            // Determine the start date of the current week
            const weekStartDate = (() => {
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
                startOfWeek.setHours(0, 0, 0, 0);
                return startOfWeek;
            })();

            const spendingPerDay = [];
            let accumulatedSpent = 0;

            // Iterate through each day of the week
            for (let i = 0; i < 7; i++) {
                const iterationDate = new Date(weekStartDate);
                iterationDate.setDate(weekStartDate.getDate() + i);

                if (iterationDate <= new Date()) {
                    // Filter records for the current day
                    const matchingRecordsThisDay = matchingRecords.filter(record => {
                        let date = new Date(record.dateAndTime);
                        return date.getDate() === iterationDate.getDate();
                    });

                    // Calculate the total spent for the day
                    const spentThisDay = matchingRecordsThisDay.reduce((total, record) => total + record.amount, 0);
                    accumulatedSpent += spentThisDay;

                    // Store the date and accumulated spent for the day
                    spendingPerDay.push({
                        date: iterationDate,
                        spent: accumulatedSpent
                    });
                } else {

                    // Store the date for days that are in the future
                    spendingPerDay.push({
                        date: iterationDate,
                        spent: undefined
                    });
                }
            }

            // Return the budget graph data including spending information per day
            return {
                id: foundBudget.id,
                name: foundBudget.name,
                amount: foundBudget.amount,
                spendingPerDay: spendingPerDay
            };
        };

        // Call the function and update the state
        setBudgetGraph(calculateBudgetGraph());
    }, [weeklyBudgets, recordsThisWeek, categories]);

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
                        <p className="font-semibold text-green-700 mt-1 border-t-2">{`$${(budgetGraph.amount - data.payload.spent).toFixed(2)} left`}</p>
                    </div>
                );
            } else if (data.payload.spent !== undefined && (budgetGraph.amount - data.payload.spent) < 0) {
                return (
                    <div className="p-1">
                        <p className=" text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-green-chart mt-1 mb-1">{`Spent: $${data.payload.spent}`}</p>
                        <p className="font-semibold text-red-700 mt-1 border-t-2">{`$${Math.abs(budgetGraph.amount - data.payload.spent).toFixed(2)} overspent`}</p>
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
                        <p className="font-semibold text-blue-chart mt-1 mb-1">{`Prediction: $${data.payload.prediction}`}</p>
                        <p className="font-semibold text-red-700 mt-1 border-t-2">{`$${Math.abs(budgetGraph.amount - data.payload.prediction).toFixed(2)} may be overspent`}</p>
                    </div>
                );
            }
        }
    };

    if (budgetGraph === null) {
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
                        <div className="flex justify-center items-center">
                            <Spinner color={"green"} className="h-16 w-16 text-gray-500/50" />
                        </div>

                        <CardFooter className="p-0 mt-8 flex-1 ">
                            <div className="flex justify-center">
                                <h5 className="font-semibold text-gray-600">Loading...</h5>
                            </div>
                        </CardFooter>
                    </div>
                </CardBody>
            </Card>
        );
    } else {

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
                                           tick={{fontSize: 12, dy: 8}} tickFormatter={(tick) => {
                                        const date = new Date(tick);
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        return `${day}.${month}.`;}}
                                    />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
}