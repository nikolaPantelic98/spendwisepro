import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyDollarIcon} from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function TrendCard() {

    const dataBalance = [
        {date: new Date("2023-06-21"), amount: 180},
        {date: new Date("2023-06-22"), amount: 160},
        {date: new Date("2023-06-23"), amount: 150},
        {date: new Date("2023-06-24"), amount: 130},
        {date: new Date("2023-06-25"), amount: 550},
        {date: new Date("2023-06-26"), amount: 540},
        {date: new Date("2023-06-27"), amount: 540},
        {date: new Date("2023-06-28"), amount: 540},
        {date: new Date("2023-06-29"), amount: 540},
        {date: new Date("2023-06-30"), amount: 530},
        {date: new Date("2023-07-01"), amount: 370},
        {date: new Date("2023-07-02"), amount: 370},
        {date: new Date("2023-07-03"), amount: 350},
        {date: new Date("2023-07-04"), amount: 950},
        {date: new Date("2023-07-05"), amount: 920},
        {date: new Date("2023-07-06"), amount: 920},
        {date: new Date("2023-07-07"), amount: 910},
        {date: new Date("2023-07-08"), amount: 900},
        {date: new Date("2023-07-09"), amount: 1200},
        {date: new Date("2023-07-10"), amount: 1200},
        {date: new Date("2023-07-11"), amount: 1160},
        {date: new Date("2023-07-12"), amount: 1160},
        {date: new Date("2023-07-13"), amount: 1135},
        {date: new Date("2023-07-14"), amount: 1130},
        {date: new Date("2023-07-15"), amount: 1130},
        {date: new Date("2023-07-16"), amount: 1050},
        {date: new Date("2023-07-17"), amount: 1030},
        {date: new Date("2023-07-18"), amount: 1030},
        {date: new Date("2023-07-19"), amount: 1000},
        {date: new Date("2023-07-20"), amount: 1000},
        {date: new Date("2023-07-21"), amount: 1000}
    ]

    const dataCash = [
        {date: new Date("2023-06-21"), amount: 100},
        {date: new Date("2023-06-22"), amount: 100},
        {date: new Date("2023-06-23"), amount: 100},
        {date: new Date("2023-06-24"), amount: 80},
        {date: new Date("2023-06-25"), amount: 420},
        {date: new Date("2023-06-26"), amount: 420},
        {date: new Date("2023-06-27"), amount: 420},
        {date: new Date("2023-06-28"), amount: 420},
        {date: new Date("2023-06-29"), amount: 420},
        {date: new Date("2023-06-30"), amount: 410},
        {date: new Date("2023-07-01"), amount: 300},
        {date: new Date("2023-07-02"), amount: 300},
        {date: new Date("2023-07-03"), amount: 280},
        {date: new Date("2023-07-04"), amount: 700},
        {date: new Date("2023-07-05"), amount: 680},
        {date: new Date("2023-07-06"), amount: 680},
        {date: new Date("2023-07-07"), amount: 670},
        {date: new Date("2023-07-08"), amount: 650},
        {date: new Date("2023-07-09"), amount: 1050},
        {date: new Date("2023-07-10"), amount: 1050},
        {date: new Date("2023-07-11"), amount: 1010},
        {date: new Date("2023-07-12"), amount: 1010},
        {date: new Date("2023-07-13"), amount: 975},
        {date: new Date("2023-07-14"), amount: 970},
        {date: new Date("2023-07-15"), amount: 970},
        {date: new Date("2023-07-16"), amount: 850},
        {date: new Date("2023-07-17"), amount: 830},
        {date: new Date("2023-07-18"), amount: 830},
        {date: new Date("2023-07-19"), amount: 750},
        {date: new Date("2023-07-20"), amount: 750},
        {date: new Date("2023-07-21"), amount: 700}
    ];

    const dataCredit = [
        {date: new Date("2023-06-21"), amount: 80},
        {date: new Date("2023-06-22"), amount: 60},
        {date: new Date("2023-06-23"), amount: 50},
        {date: new Date("2023-06-24"), amount: 50},
        {date: new Date("2023-06-25"), amount: 130},
        {date: new Date("2023-06-26"), amount: 120},
        {date: new Date("2023-06-27"), amount: 120},
        {date: new Date("2023-06-28"), amount: 120},
        {date: new Date("2023-06-29"), amount: 120},
        {date: new Date("2023-06-30"), amount: 120},
        {date: new Date("2023-07-01"), amount: 70},
        {date: new Date("2023-07-02"), amount: 70},
        {date: new Date("2023-07-03"), amount: 70},
        {date: new Date("2023-07-04"), amount: 250},
        {date: new Date("2023-07-05"), amount: 240},
        {date: new Date("2023-07-06"), amount: 240},
        {date: new Date("2023-07-07"), amount: 260},
        {date: new Date("2023-07-08"), amount: 250},
        {date: new Date("2023-07-09"), amount: 150},
        {date: new Date("2023-07-10"), amount: 150},
        {date: new Date("2023-07-11"), amount: 150},
        {date: new Date("2023-07-12"), amount: 150},
        {date: new Date("2023-07-13"), amount: 160},
        {date: new Date("2023-07-14"), amount: 160},
        {date: new Date("2023-07-15"), amount: 160},
        {date: new Date("2023-07-16"), amount: 200},
        {date: new Date("2023-07-17"), amount: 200},
        {date: new Date("2023-07-18"), amount: 200},
        {date: new Date("2023-07-19"), amount: 250},
        {date: new Date("2023-07-20"), amount: 250},
        {date: new Date("2023-07-21"), amount: 300},
    ];

    const type = [
        {label: "Balance", value: "balance", icon: ArrowTrendingUpIcon},
        {label: "Cash", value: "cash", icon: ArrowTrendingUpIcon},
        {label: "Credit", value: "credit", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("balance");

    const TooltipContent = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            if (data.payload.amount !== undefined) {
                const date = new Date(data.payload.date);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const formattedDate = `${day}.${month}`;

                return (
                    <div className="p-1 pl-2 pr-2">
                        <p className="text-gray-900 border-b-2">{formattedDate}</p>
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`$${(data.payload.amount).toFixed(2)}`}</p>
                    </div>
                );
            }
        }

        return null;
    };

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
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <AreaChart className="right-4" data={dataBalance}
                                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="date"
                                                                   tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {
                                                                const date = new Date(tick);
                                                                const day = date.getDate().toString().padStart(2, '0');
                                                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                return `${day}.${month}.`;}}
                                                            />
                                                            <YAxis tick={{fontSize: 15, dx: -3}} />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={dataBalance}
                                                                     content={<TooltipContent />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
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
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <AreaChart className="right-4" data={dataCash}
                                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="date"
                                                                   tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {
                                                                const date = new Date(tick);
                                                                const day = date.getDate().toString().padStart(2, '0');
                                                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                return `${day}.${month}.`;}}
                                                            />
                                                            <YAxis tick={{fontSize: 15, dx: -3}} />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={dataCash}
                                                                     content={<TooltipContent />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
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
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <AreaChart className="right-4" data={dataCredit}
                                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="date"
                                                                   tick={{fontSize: 12, dy: 6}} tickFormatter={(tick) => {
                                                                const date = new Date(tick);
                                                                const day = date.getDate().toString().padStart(2, '0');
                                                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                return `${day}.${month}.`;}}
                                                            />
                                                            <YAxis tick={{fontSize: 15, dx: -3}} />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={dataCredit}
                                                                     content={<TooltipContent />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
                                                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#chartGreen)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
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
            </CardBody>
        </Card>
    );
}