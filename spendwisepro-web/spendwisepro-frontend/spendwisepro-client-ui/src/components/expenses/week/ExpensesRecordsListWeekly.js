import {
    Card,
    CardBody,
    Typography,
    ListItem, Chip,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ChartBarIcon} from "@heroicons/react/24/solid";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import axios from "axios";
import moment from "moment-timezone";

export default function ExpensesRecordsListMonthly() {

    const { '*': category } = useParams();

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

    // Find expenses within this week with the specified category
    const filteredExpenseRecordsThisWeek = (() => {
        return expenseRecordsThisWeek.filter(record => {
            return record.category.name.toLowerCase().replace(/\s+/g, '_') === category;
        });
    })();

    // Generates data for a graph representing expenses for this week with the specified category
    const expenseGraph = (() => {
        const dateToAmountMap = new Map();

        // Calculate total expenses for each date within this week
        filteredExpenseRecordsThisWeek.forEach(record => {
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

    // Extracts dates without hours and minutes
    const datesWithoutTime = filteredExpenseRecordsThisWeek.map(record => {
        const dateWithoutTime = new Date(record.dateAndTime);
        dateWithoutTime.setHours(0, 0, 0, 0);
        return dateWithoutTime;
    });

    // Extracts unique dates records with the specific category
    const uniqueRecordDates = [...new Set(datesWithoutTime.flatMap(date => date.getTime()))];

    // Sorts unique dates in descending order
    const sortedUniqueRecordDates = uniqueRecordDates.sort((a, b) => b - a);

    // Formats the given date into a readable string in uppercase using moment.js
    function getFormattedDate(date) {
        return moment(date).format('LL').toUpperCase();
    }

    // Formats the given time into a 24-hour format using moment.js
    function getFormattedTime(time) {
        return moment(time).format('HH:mm');
    }

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

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Calculate the total amount spent on expenses within this week
    const totalAmountThisWeek = filteredExpenseRecordsThisWeek.reduce((total, record) => total + record.amount, 0);

    // Converts the payment type from a constant to a readable string
    function getPaymentType(paymentType) {
        if (paymentType === "CREDIT_CARD") {
            return "Credit Card";
        } else if (paymentType === "CASH") {
            return "Cash";
        }
    }

    return (
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <div>
                        <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center justify-between">
                            <span className="mb-2">{filteredExpenseRecordsThisWeek.length > 0 ? filteredExpenseRecordsThisWeek[0].category.name : 'Loading...'}</span>
                            <ChartBarIcon className="text-green-700 w-10 h-10 mb-4" />
                        </Typography>
                    </div>
                    <hr className="my-2 border-blue-gray-50 mb-4" />
                    <div className="flow-root">
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-normal text-gray-900 truncate">
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
                                <BarChart className="right-4" data={expenseGraph} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
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
                </CardBody>
            </Card>

            <div className="h-4"></div>

            {sortedUniqueRecordDates.map((recordDate) => {
                const recordsForDate = filteredExpenseRecordsThisWeek.filter(record => {
                    let date = new Date(record.dateAndTime);
                    date.setHours(0, 0, 0, 0);
                    return date.getTime() === recordDate;
                });

                return (
                    <Card key={recordDate} className="w-full shadow-lg mt-4">
                        <CardBody>
                            <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                                {getFormattedDate(new Date(recordDate))}
                            </Typography>
                            <hr className="my-2 border-blue-gray-50"/>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {recordsForDate.map((recordForSpecificDate) => (
                                        <li key={recordForSpecificDate.id} className="py-3 sm:py-4">
                                            <Link>
                                                <ListItem
                                                    className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={recordForSpecificDate.category.icon.iconPath} alt={recordForSpecificDate.category.name}/>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="h-2"></div>
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {recordForSpecificDate.category.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {getPaymentType(recordForSpecificDate.paymentType)}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {recordForSpecificDate.note}
                                                        </p>
                                                        <div className="h-2"></div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="inline-flex items-center text-base font-semibold text-red-700">
                                                            -{recordForSpecificDate.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                        </div>
                                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {getFormattedTime(recordForSpecificDate.dateAndTime)}
                                                        </div>
                                                    </div>
                                                    <div className="ml-2">
                                                        <ChevronRightIcon className="h-5 w-5 text-green-800"/>
                                                    </div>
                                                </ListItem>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </>
    );
}