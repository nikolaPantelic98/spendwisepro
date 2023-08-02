import {
    Card,
    CardBody,
    Typography,
    Chip, Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from "@material-tailwind/react";
import {ArrowTrendingUpIcon, CurrencyEuroIcon} from "@heroicons/react/24/solid";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";

export default function CashChart() {

    const dataMonth = [
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

    const dataWeek = [
        {"date": "15.7", "amount": 970},
        {"date": "16.7", "amount": 850},
        {"date": "17.7", "amount": 830},
        {"date": "18.7", "amount": 830},
        {"date": "19.7", "amount": 750},
        {"date": "20.7", "amount": 750},
        {"date": "21.7.", "amount": 700}
    ];

    const dataTime = [
        {label: "7 Days", value: "7days", icon: ArrowTrendingUpIcon},
        {label: "30 Days", value: "30days", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("30days");

    const TooltipContentMonth = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataMonth = payload[0];
            if (dataMonth.payload.amount !== undefined) {
                return (
                    <div className="p-1">
                        <p className="text-center text-gray-900 border-b-2">{`${dataMonth.payload.date}`}</p>
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Amount: $${dataMonth.payload.amount}`}</p>
                    </div>
                );
            }
        }

        return null;
    };

    const TooltipContentWeek = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataWeek = payload[0];
            if (dataWeek.payload.amount !== undefined) {
                return (
                    <div className="p-1">
                        <p className="text-center text-gray-900 border-b-2">{`${dataWeek.payload.date}`}</p>
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Amount: $${dataWeek.payload.amount}`}</p>
                    </div>
                );
            }
        }

        return null;
    };

    return (
        <Card className="w-full shadow-lg mt-6">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Cash Trend</span>
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
                                                                $700,00
                                                            </Typography>
                                                            <Chip size="md" value="+ 600%" className="bg-green-700 mb-4 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={250} height={210} data={dataMonth}
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
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={dataMonth}
                                                                     content={<TooltipContentMonth />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
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
                                                                $700,00
                                                            </Typography>
                                                            <Chip size="md" value="- 28%" className="bg-red-700 mb-4 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <AreaChart width={250} height={210} data={dataWeek}
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
                                                            <Tooltip cursor={{fill: '#E8F5E9'}}
                                                                     payloadArray={dataWeek}
                                                                     content={<TooltipContentWeek />}
                                                                     wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                                                     offset={25}/>
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