import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function LastRecordsCard() {

    const records = [
        {
            id: 1,
            categoryName: "Fuel",
            paymentType: "Cash",
            note: "Fuel",
            amount: 30.00,
            type: "expense",
            date: new Date("2023-07-21T14:30"),
            categoryIcon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg",
        },
        {
            id: 2,
            categoryName: "Groceries",
            paymentType: "Cash",
            note: "Market",
            amount: 18.72,
            type: "expense",
            date: new Date("2023-07-21T11:30"),
            categoryIcon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg",
        },
        {
            id: 3,
            categoryName: "Phone",
            paymentType: "Credit Card",
            note: "Phone Bill",
            amount: 25.00,
            type: "expense",
            date: new Date("2023-07-20T12:31"),
            categoryIcon: "https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png",
        },
        {
            id: 4,
            categoryName: "Bar, cafe",
            paymentType: "Cash",
            note: "Coffee with family",
            amount: 8.35,
            type: "expense",
            date: new Date("2023-07-19T18:18"),
            categoryIcon: "https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png",
        }
    ];

    // sorting by date desc
    records.sort((a, b) => new Date(b.date) - new Date(a.date));

    // shows only 4 last records
    const limitedRecords = records.slice(0, 4);

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
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

                        {limitedRecords.map((record) => (
                            <li key={record.id} className="py-3 sm:py-4">
                                <Link to={`/records/${record.id}`}>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={record.categoryIcon} alt={record.categoryName}/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {record.categoryName}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {record.paymentType}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {record.note}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                {record.type === 'expense' ? '-' : ''}{record.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {record.date.getDate()} {record.date.toLocaleString('default', { month: 'long' })} {record.date.getFullYear()}
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
}