import {
    Card,
    CardBody,
    Typography,
    Chip, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyEuroIcon} from "@heroicons/react/24/solid";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";

export default function CreditCardChartCard() {

    const dataMonth = [
        {
            "date": "21.6",
            "amount": 80,
        },
        {
            "date": "22.6",
            "amount": 60,
        },
        {
            "date": "23.6",
            "amount": 50,
        },
        {
            "date": "24.6",
            "amount": 50,
        },
        {
            "date": "25.6",
            "amount": 130,
        },
        {
            "date": "26.6",
            "amount": 120,
        },
        {
            "date": "27.6",
            "amount": 120,
        },
        {
            "date": "28.6",
            "amount": 120,
        },
        {
            "date": "29.6",
            "amount": 120,
        },
        {
            "date": "30.6",
            "amount": 120,
        },
        {
            "date": "1.7",
            "amount": 70,
        },
        {
            "date": "2.7",
            "amount": 70,
        },
        {
            "date": "3.7",
            "amount": 70,
        },
        {
            "date": "4.7",
            "amount": 250,
        },
        {
            "date": "5.7",
            "amount": 240,
        },
        {
            "date": "6.7",
            "amount": 240,
        },
        {
            "date": "7.7",
            "amount": 260,
        },
        {
            "date": "8.7",
            "amount": 250,
        },
        {
            "date": "9.7",
            "amount": 150,
        },
        {
            "date": "10.7",
            "amount": 150,
        },
        {
            "date": "11.7",
            "amount": 150,
        },
        {
            "date": "12.7",
            "amount": 150,
        },
        {
            "date": "13.7",
            "amount": 160,
        },
        {
            "date": "14.7",
            "amount": 160,
        },
        {
            "date": "15.7",
            "amount": 160,
        },
        {
            "date": "16.7",
            "amount": 200,
        },
        {
            "date": "17.7",
            "amount": 200,
        },
        {
            "date": "18.7",
            "amount": 200,
        },
        {
            "date": "19.7",
            "amount": 250,
        },
        {
            "date": "20.7",
            "amount": 250,
        },
        {
            "date": "21.7.",
            "amount": 300,
        },
    ];

    const dataWeek = [
        {
            "date": "15.7",
            "amount": 160,
        },
        {
            "date": "16.7",
            "amount": 200,
        },
        {
            "date": "17.7",
            "amount": 200,
        },
        {
            "date": "18.7",
            "amount": 200,
        },
        {
            "date": "19.7",
            "amount": 250,
        },
        {
            "date": "20.7",
            "amount": 250,
        },
        {
            "date": "21.7.",
            "amount": 300,
        },
    ];

    const dataTime = [
        {
            label: "7 Days",
            value: "7days",
            icon: ArrowTrendingUpIcon
        },
        {
            label: "30 Days",
            value: "30days",
            icon: ArrowTrendingUpIcon
        },
    ];

    const [selectedTab, setSelectedTab] = useState("30days");

    return (
        <Card className="w-full shadow-lg mt-6">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Credit Card Trend</span>
                        <CurrencyEuroIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flow-root">
                    <div className="flow-root">
                        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>

                            <TabsHeader>
                                {dataTime.map(({ label, value, icon }) => (
                                    <Tab key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            {React.createElement(icon, { className: "w-5 h-5" })}
                                            {label}
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>

                            <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 }, }}>
                                {dataTime.map(({ value }) => (
                                    <TabPanel key={value} value={value}>
                                        {value === "30days" ? (
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                TODAY
                                                            </p>
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                VS PREVIOUS PERIOD
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Typography variant="h2" className="text-gray-900 mb-4">
                                                                $300,00
                                                            </Typography>
                                                            <Chip size="md" value="+ 275%" className="bg-green-700 mb-4 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={280} height={220} data={dataMonth}
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
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                TODAY
                                                            </p>
                                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                                VS PREVIOUS PERIOD
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Typography variant="h2" className="text-gray-900 mb-4">
                                                                $300,00
                                                            </Typography>
                                                            <Chip size="md" value="+ 175%" className="bg-green-700 mb-4 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={280} height={220} data={dataWeek}
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
                                                </div>
                                            </>
                                        )}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>

            </CardBody>

        </Card>
    );
}