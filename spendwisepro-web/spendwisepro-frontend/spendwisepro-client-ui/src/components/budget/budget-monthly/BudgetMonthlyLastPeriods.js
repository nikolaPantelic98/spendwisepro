import {
    Card,
    CardBody, CardFooter, Spinner,
    Typography,

} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {
    Bar, BarChart,
    CartesianGrid, ReferenceLine, ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import axios from "axios";

export default function BudgetMonthlyLastPeriods({ id }) {

    const [monthlyBudgets, setMonthlyBudgets] = useState([]);
    const [records, setRecords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dataGraph, setDataGraph] = useState(null);

    const currentDate = new Date();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/budgets/monthly', { headers })
            .then(response => {
                setMonthlyBudgets(response.data);
            })
            .catch(error => console.error('Error fetching monthly budgets:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/all_expense_records', { headers })
            .then(response => {
                setRecords(response.data);
            })
            .catch(error => console.error('Error fetching expense records:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all', { headers })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    useEffect(() => {
        const calculateDataGraph = () => {
            const foundBudget = monthlyBudgets.find(budget => budget.id == id);

            if (!foundBudget) {
                return null;
            }

            const data = [];

            for (let i = 4; i >= 0; i--) {
                const monthsAgo = i;
                const startDate = new Date(currentDate);
                startDate.setMonth(currentDate.getMonth() - monthsAgo);
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);

                const endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 1);
                endDate.setDate(0);
                endDate.setHours(23, 59, 59, 999);

                let spentInPeriod = 0;

                for (const record of records) {
                    const recordDate = new Date(record.dateAndTime);
                    if (recordDate >= startDate && recordDate <= endDate) {
                        if (foundBudget.categories.some(budgetCategory => budgetCategory.name === record.category.name)) {
                            spentInPeriod += record.amount;
                        }
                    }
                }

                data.push({
                    startDate: startDate,
                    endDate: endDate,
                    amount: foundBudget.amount,
                    spent: spentInPeriod
                });
            }

            return data;
        };

        setDataGraph(calculateDataGraph());
    }, [monthlyBudgets, records, categories]);

    const CustomTooltipContent = ({ active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0];

            const startDate = new Date(data.payload.startDate);
            const startDay = startDate.getDate().toString().padStart(2, '0');
            const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
            const formattedStartDate = `${startDay}.${startMonth}`;

            const endDate = new Date(data.payload.endDate);
            const endDay = endDate.getDate().toString().padStart(2, '0');
            const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
            const formattedEndDate = `${endDay}.${endMonth}`;

            return (
                <div className="p-1">
                    <p className="text-center text-gray-900 border-b-2">{`${formattedStartDate} - ${formattedEndDate}`}</p>
                    <p className="font-semibold text-right text-red-400 mt-1">{`Budget: $${data.payload.amount}`}</p>
                    <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Spent: $${data.payload.spent}`}</p>
                    <p className="font-semibold text-right text-gray-900 mt-1 border-t-2">{`Total: $${(data.payload.amount) - (data.payload.spent)}`}</p>
                </div>
            );
        }

        return null;
    };


    if (dataGraph === null) {
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
                        <div className="flex justify-center items-center">
                            <Spinner color={"green"} className="h-16 w-16 text-gray-500/50" />
                        </div>

                        <CardFooter className="p-0 mt-8 flex-1 ">
                            <div className="flex justify-center">
                                <h5 className="font-semibold text-gray-600">Loading...</h5>
                            </div>
                        </CardFooter>
                    </div>
                </CardBody>
            </Card>
        );
    } else {
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
                                <BarChart className="right-4" data={dataGraph} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="startDate"
                                        interval={0}
                                        tick={({ x, y, payload }) => {
                                            const tickDate = new Date(payload.value);
                                            const endDate = new Date(dataGraph[payload.index].endDate);

                                            const formatDate = (date) => {
                                                const day = date.getDate().toString().padStart(2, '0');
                                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                return `${day}.${month}.`;
                                            };

                                            return (
                                                <g transform={`translate(${x},${y})`}>
                                                    <text x={0} y={0} dy={16} fontSize={12} textAnchor="middle" fill="#666666">
                                                        {formatDate(tickDate)}
                                                    </text>
                                                    <text x={0} y={0} dy={33} fontSize={12} textAnchor="middle" fill="#666666">
                                                        {formatDate(endDate)}
                                                    </text>
                                                </g>
                                            );
                                        }}
                                    />
                                    <YAxis />
                                    <Tooltip cursor={{fill: '#E8F5E9'}}
                                             content={<CustomTooltipContent />}
                                             wrapperStyle={{ background: 'white', border: '2px solid #ddd',  borderRadius: '8px', padding: '5px' }}
                                             offset={25}/>
                                    <Bar dataKey="spent" fill="#82ca9d" />
                                    <ReferenceLine y={dataGraph[0].amount} stroke="red" strokeDasharray="3 3" isFront={true} ifOverflow="extendDomain" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}