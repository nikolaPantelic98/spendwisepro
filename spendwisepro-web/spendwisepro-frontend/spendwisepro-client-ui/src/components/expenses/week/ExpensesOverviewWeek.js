import {
    Card,
    CardBody,
    Typography,
    Chip
} from "@material-tailwind/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React, {useEffect, useState} from "react";
import {ChartBarIcon} from "@heroicons/react/24/solid";
import axios from "axios";

export default function ExpensesOverviewWeek() {

    const [expenseRecordsThisWeek, setExpenseRecordsThisWeek] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/expense_records_this_week', { headers })
            .then(response => {
                setExpenseRecordsThisWeek(response.data);
            })
            .catch(error => console.error('Error fetching expense records this week:', error));
    }, []);

    const currentDate = new Date();

    // Find the first day of the week (Monday) for the current date
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
    startOfWeek.setHours(0, 0, 0, 0);

    // Find the last day of the week (Sunday) for the current date
    const endOfWeek = new Date(currentDate);
    if (currentDate.getDay() !== 0) {
        endOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    }
    endOfWeek.setHours(23, 59, 59, 999);

    // Generates data for a graph representing expenses for this week
    const expenseGraph = (() => {
        const dateToAmountMap = new Map();

        // Calculate total expenses for each date within this week
        expenseRecordsThisWeek.forEach(record => {
            let date = new Date(record.dateAndTime);
            const recordDate = date.toDateString();
            if (!dateToAmountMap.has(recordDate)) {
                dateToAmountMap.set(recordDate, record.amount);
            } else {
                dateToAmountMap.set(recordDate, dateToAmountMap.get(recordDate) + record.amount);
            }
        });

        const dataForGraph = [];

        // Creates data for the graph, including dates with zero expenses
        let iterationDate = new Date(startOfWeek);
        while (iterationDate <= endOfWeek) {
            const dateString = iterationDate.toDateString();
            const amount = dateToAmountMap.get(dateString) || 0;
            dataForGraph.push({ date: dateString, amount });
            iterationDate.setDate(iterationDate.getDate() + 1);
        }

        return dataForGraph;
    })();

    // tooltip used in graph
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
                        <p className="font-semibold text-right text-green-chart mt-1 mb-1">{`Spent: $${(data.payload.amount).toFixed(2)}`}</p>
                    </div>
                );
            }
        }

        return null;
    };

    // Calculate the total amount spent on expenses within this week.
    const totalAmountThisWeek = expenseRecordsThisWeek.reduce((total, record) => total + record.amount, 0);

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Overview</span>
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
                                        THIS WEEK
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="h2" className="text-gray-900 mb-4">
                                        {totalAmountThisWeek.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                    <Chip size="md" value="Total" className="bg-gray-200 normal-case text-gray-900 font-semibold mb-4 text-sm" />
                                </div>
                            </div>

                            <div>
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart className="right-4" data={expenseGraph} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date"
                                               tick={{fontSize: 12, dy: 8}} tickFormatter={(tick) => {
                                            const date = new Date(tick);
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            return `${day}.${month}.`;}}
                                        />
                                        <YAxis />
                                        <Tooltip cursor={{fill: '#E8F5E9'}}
                                                 payloadArray={expenseGraph}
                                                 content={<TooltipContent />}
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
    );
}