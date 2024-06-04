import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon, DocumentIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import getData from "../../api/axiosInstance";

export default function LastRecordsCard() {

    const [lastRecords, setLastRecords] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            "/records/last_records",
            headers,
            setLastRecords,
            "Error fetching last records"
        )
    }, []);

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    function getPaymentType(paymentType) {
        if (paymentType === "CREDIT_CARD") {
            return "Credit Card";
        } else if (paymentType === "CASH") {
            return "Cash";
        }
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Last Records
                    <Link to="/records" onClick={storeScrollPosition}>
                        <Button size="sm" variant="text" className="flex gap-2">
                            View All
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4"/>
                        </Button>
                    </Link>
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        {lastRecords.map((record) => {
                            let date = new Date(record.dateAndTime);
                            return (
                                <li key={record.id} className="py-3 sm:py-4">
                                    <Link to={`/edit_record/${record.id}`}>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src={record.category.icon.iconPath} alt={record.category.icon.image}/>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {record.category.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {getPaymentType(record.paymentType)}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {record.note}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <div className={`inline-flex items-center text-base font-semibold ${record.transactionType === 'EXPENSE' ? 'text-red-700' : 'text-green-700'}`}>
                                                    {record.transactionType === 'EXPENSE' ? '- ' : '+ '}
                                                    {record.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                                <div className="h-1"></div>
                                                <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {date.getDate()} {date.toLocaleString('default', { month: 'short' })} {date.getFullYear()}
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

                        {lastRecords.length === 0 && (
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
                        )}
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}