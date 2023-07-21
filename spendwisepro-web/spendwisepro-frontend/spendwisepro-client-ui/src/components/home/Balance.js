import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

export default function Balance() {

    const data = [
        {
            "date": "21.6",
            "amount": 180,
        },
        {
            "date": "22.6",
            "amount": 160,
        },
        {
            "date": "23.6",
            "amount": 150,
        },
        {
            "date": "24.6",
            "amount": 130,
        },
        {
            "date": "25.6",
            "amount": 550,
        },
        {
            "date": "26.6",
            "amount": 540,
        },
        {
            "date": "27.6",
            "amount": 540,
        },
        {
            "date": "28.6",
            "amount": 540,
        },
        {
            "date": "29.6",
            "amount": 540,
        },
        {
            "date": "30.6",
            "amount": 530,
        },
        {
            "date": "1.7",
            "amount": 370,
        },
        {
            "date": "2.7",
            "amount": 370,
        },
        {
            "date": "3.7",
            "amount": 350,
        },
        {
            "date": "4.7",
            "amount": 950,
        },
        {
            "date": "5.7",
            "amount": 920,
        },
        {
            "date": "6.7",
            "amount": 920,
        },
        {
            "date": "7.7",
            "amount": 910,
        },
        {
            "date": "8.7",
            "amount": 900,
        },
        {
            "date": "9.7",
            "amount": 1200,
        },
        {
            "date": "10.7",
            "amount": 1200,
        },
        {
            "date": "11.7",
            "amount": 1160,
        },
        {
            "date": "12.7",
            "amount": 1160,
        },
        {
            "date": "13.7",
            "amount": 1135,
        },
        {
            "date": "14.7",
            "amount": 1130,
        },
        {
            "date": "15.7",
            "amount": 1130,
        },
        {
            "date": "16.7",
            "amount": 1050,
        },
        {
            "date": "17.7",
            "amount": 1030,
        },
        {
            "date": "18.7",
            "amount": 1030,
        },
        {
            "date": "19.7",
            "amount": 1000,
        },
        {
            "date": "20.7",
            "amount": 1000,
        },
        {
            "date": "21.7.",
            "amount": 1000,
        },

    ]

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        Balance Trend
                        <CurrencyDollarIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        TODAY
                    </p>
                    <Typography variant="h2" className="text-gray-900 mb-4">
                        $1.000,00
                    </Typography>
                </div>

                <div>
                    <AreaChart width={280} height={220} data={data}
                               margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" fontSize="small" />
                        <YAxis fontSize="small"/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <a className="inline-block">
                    <Button size="sm" variant="text" className="flex items-center gap-2">
                        Show More
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
}