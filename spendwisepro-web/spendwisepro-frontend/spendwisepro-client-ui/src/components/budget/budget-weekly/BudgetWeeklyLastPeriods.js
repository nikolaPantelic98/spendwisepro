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
        {"startDate": "17.6", "endDate": "24.6", "spent": 120},
        {"startDate": "24.6", "endDate": "1.7", "spent": 165},
        {"startDate": "1.7", "endDate": "8.7", "spent": 80},
        {"startDate": "8.7", "endDate": "15.7", "spent": 180},
        {"startDate": "15.7", "endDate": "22.7", "spent": 70}
    ];

    const CustomTooltipContent = ({ active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="p-1">
                    <p className="text-center text-gray-900 border-b-2">{`${data.payload.startDate} - ${data.payload.endDate}`}</p>
                    <p className="font-semibold text-right text-red-400 mt-1">{`Budget: $${budgetAmount}`}</p>
                    <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Spent: $${data.payload.spent}`}</p>
                    <p className="font-semibold text-right text-gray-900 mt-1 border-t-2">{`Total: $${(budgetAmount) - (data.payload.spent)}`}</p>
                </div>
            );
        }

        return null;
    };


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
                                <Tooltip cursor={{fill: '#E8F5E9'}}
                                         payloadArray={data}
                                         content={<CustomTooltipContent />}
                                         wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                         offset={25}/>
                                <Bar dataKey="spent" fill="#82ca9d" />
                                <ReferenceLine y={budgetAmount} stroke="red" strokeDasharray="3 3" isFront={true} alwaysShow={true} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}