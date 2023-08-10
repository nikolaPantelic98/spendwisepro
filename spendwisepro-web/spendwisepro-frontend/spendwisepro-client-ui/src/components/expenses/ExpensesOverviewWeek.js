import {
    Card,
    CardBody,
    Typography,
    Chip
} from "@material-tailwind/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React from "react";
import {ChartBarIcon} from "@heroicons/react/24/solid";

export default function ExpensesOverviewWeek() {

    const dataWeek = [
        {"date": "15.7", "amount": 60},
        {"date": "16.7", "amount": 100},
        {"date": "17.7", "amount": 20},
        {"date": "18.7", "amount": 0},
        {"date": "19.7", "amount": 30},
        {"date": "20.7", "amount": 0},
        {"date": "21.7.", "amount": 70}
    ];

    const TooltipContentWeek = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataWeek = payload[0];
            if (dataWeek.payload.amount !== undefined) {
                return (
                    <div className="p-1 pl-2 pr-2">
                        <p className="text-gray-900 border-b-2">{`${dataWeek.payload.date}`}</p>
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Spent: $${dataWeek.payload.amount}`}</p>
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
                        <span className="mb-2">Overview</span>
                        <ChartBarIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flow-root">
                    <div className="flow-root">
                        <div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium text-gray-900 truncate">
                                        LAST 7 DAYS
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                        $280,00
                                    </Typography>
                                    <Chip size="md" value="Total" className="bg-gray-200 normal-case text-gray-900 font-semibold mb-4 text-sm" />
                                </div>
                            </div>

                            <div>
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart className="right-4" data={dataWeek} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip cursor={{fill: '#E8F5E9'}}
                                                 payloadArray={dataWeek}
                                                 content={<TooltipContentWeek />}
                                                 wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                 offset={25}/>
                                        <Bar dataKey="amount" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

            </CardBody>

        </Card>
    );
}