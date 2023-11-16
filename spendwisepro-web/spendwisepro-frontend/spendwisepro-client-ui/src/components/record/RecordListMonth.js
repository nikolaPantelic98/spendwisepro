import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";

export default function RecordListMonth() {

    const [records, setRecords] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/last_30_days', { headers })
            .then(response => {
                setRecords(response.data);
            })
            .catch(error => console.error('Error fetching records:', error));
    }, []);

    // Extracts dates without hours and minutes
    const datesWithoutTime = records.map(record => {
        let date = new Date(record.dateAndTime);
        const dateWithoutTime = new Date(date);
        dateWithoutTime.setHours(0, 0, 0, 0);
        return dateWithoutTime;
    });

    // Extracts unique dates from the records
    const uniqueRecordDates = [...new Set(datesWithoutTime.flatMap(date => date.getTime()))];

    // Sorts unique dates in descending order
    const sortedUniqueRecordDates = uniqueRecordDates.sort((a, b) => b - a);

    // Formats a given date to a readable string
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options).toUpperCase();
    }

    function getPaymentType(paymentType) {
        if (paymentType === "CREDIT_CARD") {
            return "Credit Card";
        } else if (paymentType === "CASH") {
            return "Cash";
        }
    }

    function getFormattedTime(dateAndTime) {
        return moment(dateAndTime).format('HH:mm');
    }

    return (
        <>
            <div className="h-2"></div>
            {sortedUniqueRecordDates.map((recordDate) => {
                const recordsForDate = records.filter(record =>
                    new Date(record.dateAndTime).setHours(0, 0, 0, 0) === recordDate
                );
                return (
                    <Card key={recordDate} className="w-full shadow-lg mt-4">
                        <CardBody>
                            <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                                {formatDate(new Date(recordDate))}
                            </Typography>
                            <hr className="my-2 border-blue-gray-50" />

                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">

                                    {recordsForDate.map((recordForSpecificDate) => {
                                        let date = new Date(recordForSpecificDate.dateAndTime);
                                        return (
                                            <li key={recordForSpecificDate.id} className="py-3 sm:py-4">
                                                <Link>
                                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                        <div className="flex-shrink-0">
                                                            <img className="w-8 h-8 rounded-full" src={recordForSpecificDate.category.icon.iconPath} alt={recordForSpecificDate.category.name} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {recordForSpecificDate.category.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                {getPaymentType(recordForSpecificDate.paymentType)}
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
                                        );
                                    })}
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
                            <Typography variant="h4" color="blue-gray" className="mb-2 mt-2 flex items-center justify-between">
                                <span className="mb-2 mt-2 text-gray-500">No data to display</span>
                            </Typography>
                        </div>
                    </CardBody>
                </Card>
            )}
        </>
    );
}