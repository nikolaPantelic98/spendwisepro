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

export default function GoalWeeklyChart() {

    const dataMoneySaved = [
        {"date": "15.7", "amount": 0},
        {"date": "16.7", "amount": 0},
        {"date": "17.7", "amount": 50},
        {"date": "18.7", "amount": 50},
        {"date": "19.7", "amount": 80},
        {"date": "20.7", "amount": 80},
        {"date": "21.7."}
    ];

    let daysWithAmount = 0;
    let savedAmount = 0;
    for (const item of dataMoneySaved) {
        if (item.amount !== undefined) {
            daysWithAmount++;
            if (item.amount > savedAmount) {
                savedAmount = item.amount;
            }
        }
    }

    const dailyAverage = daysWithAmount > 0 ? savedAmount / daysWithAmount : 0;
    const formattedDailyAverage = dailyAverage.toFixed(2);

    for (let i = daysWithAmount - 1; i < dataMoneySaved.length; i++) {
        dataMoneySaved[i].prediction = savedAmount + dailyAverage * (i - daysWithAmount + 1);
    }

    const goalAmount = 100;

    let daysWithoutAmount = 0;
    for (const item of dataMoneySaved) {
        if (item.amount === undefined) {
            daysWithoutAmount++;
        }
    }

    const dailyRecommendedAmount = daysWithoutAmount > 0 ? (goalAmount - savedAmount) / daysWithoutAmount : 0;
    const formattedDailyRecommendedAmount = dailyRecommendedAmount.toFixed(2);

    const CustomTooltipContent = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataMoneySaved = payload[0];
            if (dataMoneySaved.payload.amount !== undefined) {
                return (
                    <div className="p-1">
                        <p className="text-center text-gray-900 border-b-2">{`${dataMoneySaved.payload.date}`}</p>
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Saved: $${(dataMoneySaved.payload.amount).toFixed(2)}`}</p>
                        <p className="font-semibold text-right text-gray-900 mt-1 border-t-2">{`$${(goalAmount - dataMoneySaved.payload.amount).toFixed(2)} left`}</p>
                    </div>
                );
            } else if (dataMoneySaved.payload.prediction !== undefined) {
                return (
                    <div className="p-1">
                        <p className="text-center text-gray-900 border-b-2">{`${dataMoneySaved.payload.date}`}</p>
                        <p className="font-semibold text-right text-blue-chart mt-1 mb-1">{`Prediction: $${(dataMoneySaved.payload.prediction).toFixed(2)}`}</p>
                        <p className="font-semibold text-right text-gray-900 mt-1 border-t-2">{`$${(goalAmount - dataMoneySaved.payload.prediction).toFixed(2)} may left`}</p>
                    </div>
                );
            }
        }

        return null;
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
                            <AreaChart className="right-4" data={dataMoneySaved}
                                       margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" fontSize="small" />
                                <YAxis fontSize="small" />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                         payloadArray={dataMoneySaved}
                                         content={<CustomTooltipContent />}
                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                         offset={25}/>
                                <ReferenceLine y={goalAmount} label={{ position: 'top', value: 'Goal' }} stroke="green" strokeDasharray="3 3" isFront={true} alwaysShow={true} />
                                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                <Area type="monotone" dataKey="prediction" stroke="#8884d8" fillOpacity={1} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="container mx-auto mt-6">
                        <p className="text-xs flex items-center justify-center gap-4">
                            <span className="flex items-center">
                                <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span>
                                <span className="text-xxs">Goal</span>
                            </span>
                            <span className="flex items-center">
                                <span className="w-3 h-3 inline-block mr-1 bg-green-chart"></span>
                                <span className="text-xxs">Saved</span>
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
                            <Typography className="text-lg font-semibold text-gray-800">${formattedDailyRecommendedAmount}</Typography>
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