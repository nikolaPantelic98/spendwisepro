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

export default function BudgetWeeklyLastPeriods() {

    const data = [
        {
            "startDate": "17.6",
            "endDate": "24.6",
            "Spent": 120,
        },
        {
            "startDate": "24.6",
            "endDate": "1.7",
            "Spent": 165,
        },
        {
            "startDate": "1.7",
            "endDate": "8.7",
            "Spent": 80,
        },
        {
            "startDate": "8.7",
            "endDate": "15.7",
            "Spent": 180,
        },
        {
            "startDate": "15.7",
            "endDate": "22.7",
            "Spent": 70,
        },
    ];


    const budgetAmount = 140;

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

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
                            <BarChart className="right-4" data={data} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="startDate"
                                    interval={0}
                                    tick={({ x, y, payload }) => (
                                        <g transform={`translate(${x},${y})`}>
                                            <text
                                                x={0}
                                                y={0}
                                                dy={16}
                                                fontSize={13}
                                                textAnchor="middle"
                                                fill="#666666"
                                            >
                                                {payload.value}
                                            </text>
                                            <text
                                                x={0}
                                                y={0}
                                                dy={33}
                                                fontSize={13}
                                                textAnchor="middle"
                                                fill="#666666"
                                            >
                                                {data[payload.index].endDate}
                                            </text>
                                        </g>
                                    )}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Spent" fill="#82ca9d" />
                                <ReferenceLine y={budgetAmount} stroke="red" strokeDasharray="3 3" isFront={true} alwaysShow={true} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}