import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon, DocumentIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import getData from "../../../api/axiosInstance";

export default function BudgetWeeklyRecords({ id }) {

    const [recordsThisWeek, setRecordsThisWeek] = useState([]);
    const [weeklyBudgets, setWeeklyBudgets] = useState([]);
    const [matchingRecords, setMatchingRecords] = useState([]);
    const [sortedUniqueRecordDates, setSortedUniqueRecordDates] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            "/budgets/weekly",
            headers,
            setWeeklyBudgets,
            "Error fetching weekly budgets"
        )
    }, []);

    useEffect(() => {
        getData(
            "/records/expense_records_this_week",
            headers,
            setRecordsThisWeek,
            "Error fetching expense records this week"
        )
    }, []);

    useEffect(() => {
        const foundBudget = weeklyBudgets.find(budget => budget.id == id);

        if (foundBudget) {
            let matching = recordsThisWeek.filter(record => {
                let date = new Date(record.dateAndTime);
                return date && foundBudget.categories.some(budgetCategory => budgetCategory.name === record.category.name);
            });

            // Extracts dates without hours and minutes
            const datesWithoutTime = matching.map(record => {
                const dateWithoutTime = new Date(record.dateAndTime);
                dateWithoutTime.setHours(0, 0, 0, 0);
                return dateWithoutTime;
            });

            // Extracts unique dates records with the specific category
            const uniqueRecordDates = [...new Set(datesWithoutTime.flatMap(date => date.getTime()))];

            // Sorts unique dates in descending order
            const sortedUniqueDates = uniqueRecordDates.sort((a, b) => b - a);

            setMatchingRecords(matching);
            setSortedUniqueRecordDates(sortedUniqueDates);
        }
    }, [weeklyBudgets, recordsThisWeek]);

    // Formats a given date to a readable string
    function getFormattedDate(date) {
        return moment(date).format('LL').toUpperCase();
    }

    // Formats a given time to a readable string
    function getFormattedTime(time) {
        return moment(time).format('HH:mm');
    }

    return (
        <>
            <div className="h-2"></div>
            {sortedUniqueRecordDates.map((recordDate) => {
                const recordsForDate = matchingRecords.filter(record =>
                    new Date(record.dateAndTime).setHours(0, 0, 0, 0) === recordDate
                );
                return (
                    <Card key={recordDate} className="w-full shadow-lg mt-4">
                        <CardBody>
                            <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                                {getFormattedDate(new Date(recordDate))}
                            </Typography>
                            <hr className="my-2 border-blue-gray-50" />

                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">

                                    {recordsForDate.map((recordForSpecificDate) => (
                                        <li key={recordForSpecificDate.id} className="py-3 sm:py-4">
                                            <Link to={`/edit_record/${recordForSpecificDate.id}`}>
                                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={recordForSpecificDate.category.icon.iconPath} alt={recordForSpecificDate.category.name} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {recordForSpecificDate.category.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {recordForSpecificDate.paymentType}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {recordForSpecificDate.note}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`inline-flex items-center text-base font-semibold ${recordForSpecificDate.transactionType === 'EXPENSE' ? 'text-red-700' : 'text-green-700'}`}>
                                                            {recordForSpecificDate.transactionType === 'EXPENSE' ? '- ' : '+ '}
                                                            {recordForSpecificDate.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </div>
                                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {getFormattedTime(recordForSpecificDate.dateAndTime)}
                                                        </div>
                                                    </div>
                                                    <div className="ml-2">
                                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
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

            {sortedUniqueRecordDates.length === 0 && (
                <Card className="w-full shadow-lg mt-4">
                    <CardBody>
                        <div>
                            <div className="flex justify-center items-center flex-col mb-3">
                                <DocumentIcon className="w-20 h-20 text-green-600 mb-2"/>
                                <Typography variant="h5" className="text-gray-600 mb-2">
                                    No data to display
                                </Typography>
                                <Typography variant="h6" className="text-gray-500">
                                    Please add some records
                                </Typography>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}
        </>
    );
}