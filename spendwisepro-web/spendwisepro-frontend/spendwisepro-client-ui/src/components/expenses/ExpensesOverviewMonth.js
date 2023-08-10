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

export default function ExpensesOverviewMonth() {

    const dataMonth = [
        {"date": "21.06.", "amount": 10},
        {"date": "22.06.", "amount": 20},
        {"date": "23.06.", "amount": 10},
        {"date": "24.06.", "amount": 60},
        {"date": "25.06.", "amount": 10},
        {"date": "26.06.", "amount": 30},
        {"date": "27.06.", "amount": 30},
        {"date": "28.06.", "amount": 0},
        {"date": "29.06.", "amount": 0},
        {"date": "30.06.", "amount": 60},
        {"date": "01.07.", "amount": 20},
        {"date": "02.07.", "amount": 135},
        {"date": "03.07.", "amount": 0},
        {"date": "04.07.", "amount": 0},
        {"date": "05.07.", "amount": 0},
        {"date": "06.07.", "amount": 0},
        {"date": "07.07.", "amount": 0},
        {"date": "08.07.", "amount": 0},
        {"date": "09.07.", "amount": 0},
        {"date": "10.07.", "amount": 15},
        {"date": "11.07.", "amount": 20},
        {"date": "21.07.", "amount": 20},
        {"date": "13.07.", "amount": 0},
        {"date": "14.07.", "amount": 0},
        {"date": "15.07.", "amount": 60},
        {"date": "16.07.", "amount": 100},
        {"date": "17.07.", "amount": 20},
        {"date": "18.07.", "amount": 0},
        {"date": "19.07.", "amount": 30},
        {"date": "20.07.", "amount": 0},
        {"date": "21.07.", "amount": 70}
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
                                        LAST 30 DAYS
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                        $720,00
                                    </Typography>
                                    <Chip size="md" value="Total" className="bg-gray-200 normal-case text-gray-900 font-semibold mb-4 text-sm" />
                                </div>
                            </div>

                            <div>
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart className="right-4" data={dataMonth} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip cursor={{fill: '#E8F5E9'}}
                                                 payloadArray={dataMonth}
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