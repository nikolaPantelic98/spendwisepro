import {
    Card,
    CardBody,
    Typography,
    ListItem, Chip,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";
import {ChartBarIcon} from "@heroicons/react/24/solid";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function ExpensesRecordsListMonthly() {

    const dataMonth = [
        {"date": "21.06.", "amount": 0},
        {"date": "22.06.", "amount": 0},
        {"date": "23.06.", "amount": 0},
        {"date": "24.06.", "amount": 0},
        {"date": "25.06.", "amount": 0},
        {"date": "26.06.", "amount": 0},
        {"date": "27.06.", "amount": 0},
        {"date": "28.06.", "amount": 0},
        {"date": "29.06.", "amount": 0},
        {"date": "30.06.", "amount": 0},
        {"date": "01.07.", "amount": 0},
        {"date": "02.07.", "amount": 0},
        {"date": "03.07.", "amount": 0},
        {"date": "04.07.", "amount": 0},
        {"date": "05.07.", "amount": 0},
        {"date": "06.07.", "amount": 0},
        {"date": "07.07.", "amount": 0},
        {"date": "08.07.", "amount": 0},
        {"date": "09.07.", "amount": 90},
        {"date": "10.07.", "amount": 0},
        {"date": "11.07.", "amount": 0},
        {"date": "21.07.", "amount": 0},
        {"date": "13.07.", "amount": 0},
        {"date": "14.07.", "amount": 0},
        {"date": "15.07.", "amount": 0},
        {"date": "16.07.", "amount": 45},
        {"date": "17.07.", "amount": 0},
        {"date": "18.07.", "amount": 0},
        {"date": "19.07.", "amount": 0},
        {"date": "20.07.", "amount": 0},
        {"date": "21.07.", "amount": 95}
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
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <div>
                        <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                            <span className="mb-2">Bills</span>
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
                                            $230,00
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

            <Card className="w-full shadow-lg mt-8 ">
                <CardBody>
                    <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                        21 JULY 2023
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Gas bill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Gas bill
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$70,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                08:57
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Phone bill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Phone bill
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Cash
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$25,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                12:30
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-4">
                <CardBody>
                    <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                        16 JULY 2023
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Electricity bill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Electricity bill
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$45,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                14:20
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-4">
                <CardBody>
                    <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                        9 JULY 2023
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Land tax" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Land tax
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$70,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                09:55
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Luxury tax" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Luxury tax
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$20,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                12:30
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}