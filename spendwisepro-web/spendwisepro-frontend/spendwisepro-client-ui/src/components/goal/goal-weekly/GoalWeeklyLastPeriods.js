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

export default function GoalWeeklyLastPeriods() {

    const data = [
        {"startDate": "17.06", "endDate": "24.06", "saved": 100},
        {"startDate": "24.06", "endDate": "01.07", "saved": 120},
        {"startDate": "01.07", "endDate": "08.07", "saved": 80},
        {"startDate": "08.07", "endDate": "15.07", "saved": 100},
        {"startDate": "15.07", "endDate": "22.07", "saved": 80}
    ];

    const CustomTooltipContent = ({ active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="p-1">
                    <p className="text-center text-gray-900 border-b-2">{`${data.payload.startDate} - ${data.payload.endDate}`}</p>
                    <p className="font-semibold text-right text-green-900 mt-1">{`Goal: $${goalAmount}`}</p>
                    <p className={`font-semibold text-right ${data.payload.saved >= goalAmount ? 'text-green-500' : 'text-red-500'} mt-1 mb-1`}>{`Saved: $${data.payload.saved}`}</p>
                </div>
            );
        }

        return null;
    };


    const goalAmount = 100;

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
                                <Bar dataKey="saved" fill="#82ca9d" />
                                <ReferenceLine y={goalAmount} stroke="red" strokeDasharray="3 3" isFront={true} alwaysShow={true} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}