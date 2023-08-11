import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyDollarIcon} from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function TrendCard() {

    const dataBalance = [
        {"date": "21.6", "amount": 180},
        {"date": "22.6", "amount": 160},
        {"date": "23.6", "amount": 150},
        {"date": "24.6", "amount": 130},
        {"date": "25.6", "amount": 550},
        {"date": "26.6", "amount": 540},
        {"date": "27.6", "amount": 540},
        {"date": "28.6", "amount": 540},
        {"date": "29.6", "amount": 540},
        {"date": "30.6", "amount": 530},
        {"date": "1.7", "amount": 370},
        {"date": "2.7", "amount": 370},
        {"date": "3.7", "amount": 350},
        {"date": "4.7", "amount": 950},
        {"date": "5.7", "amount": 920},
        {"date": "6.7", "amount": 920},
        {"date": "7.7", "amount": 910},
        {"date": "8.7", "amount": 900},
        {"date": "9.7", "amount": 1200},
        {"date": "10.7", "amount": 1200},
        {"date": "11.7", "amount": 1160},
        {"date": "12.7", "amount": 1160},
        {"date": "13.7", "amount": 1135},
        {"date": "14.7", "amount": 1130},
        {"date": "15.7", "amount": 1130},
        {"date": "16.7", "amount": 1050},
        {"date": "17.7", "amount": 1030},
        {"date": "18.7", "amount": 1030},
        {"date": "19.7", "amount": 1000},
        {"date": "20.7", "amount": 1000},
        {"date": "21.7.", "amount": 1000}
    ]

    const dataCash = [
        {"date": "21.6", "amount": 100},
        {"date": "22.6", "amount": 100},
        {"date": "23.6", "amount": 100},
        {"date": "24.6", "amount": 80},
        {"date": "25.6", "amount": 420},
        {"date": "26.6", "amount": 420},
        {"date": "27.6", "amount": 420},
        {"date": "28.6", "amount": 420},
        {"date": "29.6", "amount": 420},
        {"date": "30.6", "amount": 410},
        {"date": "1.7", "amount": 300},
        {"date": "2.7", "amount": 300},
        {"date": "3.7", "amount": 280},
        {"date": "4.7", "amount": 700},
        {"date": "5.7", "amount": 680},
        {"date": "6.7", "amount": 680},
        {"date": "7.7", "amount": 670},
        {"date": "8.7", "amount": 650},
        {"date": "9.7", "amount": 1050},
        {"date": "10.7", "amount": 1050},
        {"date": "11.7", "amount": 1010},
        {"date": "12.7", "amount": 1010},
        {"date": "13.7", "amount": 975},
        {"date": "14.7", "amount": 970},
        {"date": "15.7", "amount": 970},
        {"date": "16.7", "amount": 850},
        {"date": "17.7", "amount": 830},
        {"date": "18.7", "amount": 830},
        {"date": "19.7", "amount": 750},
        {"date": "20.7", "amount": 750},
        {"date": "21.7.", "amount": 700}
    ];

    const dataCredit = [
        {"date": "21.6", "amount": 80},
        {"date": "22.6", "amount": 60},
        {"date": "23.6", "amount": 50},
        {"date": "24.6", "amount": 50},
        {"date": "25.6", "amount": 130},
        {"date": "26.6", "amount": 120},
        {"date": "27.6", "amount": 120},
        {"date": "28.6", "amount": 120},
        {"date": "29.6", "amount": 120},
        {"date": "30.6", "amount": 120},
        {"date": "1.7", "amount": 70},
        {"date": "2.7", "amount": 70},
        {"date": "3.7", "amount": 70},
        {"date": "4.7", "amount": 250},
        {"date": "5.7", "amount": 240},
        {"date": "6.7", "amount": 240},
        {"date": "7.7", "amount": 260},
        {"date": "8.7", "amount": 250},
        {"date": "9.7", "amount": 150},
        {"date": "10.7", "amount": 150},
        {"date": "11.7", "amount": 150},
        {"date": "12.7", "amount": 150},
        {"date": "13.7", "amount": 160},
        {"date": "14.7", "amount": 160},
        {"date": "15.7", "amount": 160},
        {"date": "16.7", "amount": 200},
        {"date": "17.7", "amount": 200},
        {"date": "18.7", "amount": 200},
        {"date": "19.7", "amount": 250},
        {"date": "20.7", "amount": 250},
        {"date": "21.7", "amount": 300},
    ];

    const type = [
        {label: "Balance", value: "balance", icon: ArrowTrendingUpIcon},
        {label: "Cash", value: "cash", icon: ArrowTrendingUpIcon},
        {label: "Credit", value: "credit", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("balance");

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Trend</span>
                        <CurrencyDollarIcon className="text-green-700 w-10 h-10 mb-4" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flow-root">
                    <div className="flow-root">
                        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>

                            <TabsHeader>
                                {type.map(({ label, value, icon }) => (
                                    <Tab key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            {React.createElement(icon, { className: "w-5 h-5" })}
                                            {label}
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>

                            <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
                                {type.map(({ value }) => (
                                    <TabPanel key={value} value={value}>
                                        {value === "balance" ? (
                                            // Content for "balance" tab
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            TODAY
                                                        </p>
                                                        <Typography variant="h2" className="text-gray-900 mb-4">
                                                            $1.000,00
                                                        </Typography>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={250} height={210} data={dataBalance}
                                                                   margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                </linearGradient>
                                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="date" fontSize="small" />
                                                            <YAxis fontSize="small" />
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <Tooltip />
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                                        </AreaChart>
                                                    </div>

                                                    <CardFooter className="p-0 mt-8">
                                                        <Link to="/balance" onClick={storeScrollPosition}>
                                                            <Button size="sm" variant="text" className="flex items-center gap-2">
                                                                Show More
                                                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                    </CardFooter>
                                                </div>
                                            </>
                                        ) : value === "cash" ? (
                                            // Content for "cash" tab
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            TODAY
                                                        </p>
                                                        <Typography variant="h2" className="text-gray-900 mb-4">
                                                            $700,00
                                                        </Typography>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={250} height={210} data={dataCash}
                                                                   margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                </linearGradient>
                                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="date" fontSize="small" />
                                                            <YAxis fontSize="small" />
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <Tooltip />
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                                        </AreaChart>
                                                    </div>

                                                    <CardFooter className="p-0 mt-8">

                                                        <Link to="/cash" onClick={storeScrollPosition}>
                                                            <Button size="sm" variant="text" className="flex items-center gap-2">
                                                                Show More
                                                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                    </CardFooter>
                                                </div>
                                            </>
                                        ) : value === "credit" ? (
                                            // Content for "credit" tab
                                            <>
                                                <div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            TODAY
                                                        </p>
                                                        <Typography variant="h2" className="text-gray-900 mb-4">
                                                            $300,00
                                                        </Typography>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={250} height={210} data={dataCredit}
                                                                   margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                </linearGradient>
                                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="date" fontSize="small" />
                                                            <YAxis fontSize="small" />
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <Tooltip />
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                                        </AreaChart>
                                                    </div>

                                                    <CardFooter className="p-0 mt-8">
                                                        <Link to="/credit_cards" onClick={storeScrollPosition}>
                                                            <Button size="sm" variant="text" className="flex items-center gap-2">
                                                                Show More
                                                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                    </CardFooter>
                                                </div>
                                            </>
                                        ) : null}
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