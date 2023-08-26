import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function RecordListYear() {

    const records = [
        {
            id: 1,
            amount: 30.00,
            type: "expense",
            date: new Date("2023-08-16T08:57"),
            note: "Window repair",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 2,
            amount: 25.00,
            type: "expense",
            date: new Date("2023-08-20T12:30"),
            note: "New door",
            paymentType: "Cash",
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 3,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-07-29T12:30"),
            note: "Garden maintenance",
            paymentType: "Credit Card",
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 4,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-07-30T12:30"),
            note: "Tomato",
            paymentType: "Credit Card",
            category: [
                { id: 2, categoryName: "Groceries", icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" }
            ]
        },
        {
            id: 5,
            amount: 100.00,
            type: "expense",
            date: new Date("2023-08-10T08:57"),
            note: "Car maintenance",
            paymentType: "Cash",
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 6,
            amount: 112.00,
            type: "expense",
            date: new Date("2023-08-21T12:30"),
            note: "Broken window repair",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 7,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-01T12:30"),
            note: "Fuel",
            paymentType: "Credit Card",
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 8,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-21T08:57"),
            note: "Cigarette",
            paymentType: "Cash",
            category: [
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 91,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-18T12:30"),
            note: "Tobacco",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 10,
            amount: 22.00,
            type: "expense",
            date: new Date("2023-08-17T12:30"),
            note: "Pack",
            paymentType: "Credit Card",
            category: [
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 11,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-14T12:30"),
            time: "12:30",
            note: "Chips",
            paymentType: "Credit Card",
            category: [
                { id: 5, categoryName: "Snacks", icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 12,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-22T08:57"),
            note: "Doctor",
            paymentType: "Cash",
            category: [
                { id: 6, categoryName: "Health care", icon: "https://i.ibb.co/k362Qsn/healthcare.png" }
            ]
        },
        {
            id: 13,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-01T08:57"),
            note: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 14,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-07-23T12:30"),
            note: "Cinema chips",
            paymentType: "Credit Card",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        }
    ];

    const currentDate = new Date();

    // Filter records that occurred in the last 365 days
    const recordsLastYear = records.filter(record => {
        const daysDifference = Math.floor((currentDate - record.date) / (1000 * 60 * 60 * 24));
        return daysDifference < 365;
    });

    recordsLastYear.sort((a, b) => b.date - a.date);

    // Extracts dates without hours and minutes
    const datesWithoutTime = recordsLastYear.map(record => {
        const dateWithoutTime = new Date(record.date);
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

    return (
        <>
            <div className="h-2"></div>
            {sortedUniqueRecordDates.map((recordDate) => {
                const recordsForDate = recordsLastYear.filter(record =>
                    new Date(record.date).setHours(0, 0, 0, 0) === recordDate
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

                                    {recordsForDate.map((recordForSpecificDate) => (
                                        <li key={recordForSpecificDate.id} className="py-3 sm:py-4">
                                            <Link>
                                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={recordForSpecificDate.category[0].icon} alt={recordForSpecificDate.category[0].categoryName} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {recordForSpecificDate.category[0].categoryName}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {recordForSpecificDate.paymentType}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {recordForSpecificDate.note}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                            -{recordForSpecificDate.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                        </div>
                                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {recordForSpecificDate.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
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