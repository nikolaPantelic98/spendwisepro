import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function ExpensesRecordsListMonthly() {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <div className="mt-2">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 w-0">
                                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                                    Bills
                                    <Typography  className="uppercase text-sm font-medium text-gray-700">
                                        Last 30 days
                                    </Typography>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-8 ">
                <CardBody>
                    <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                        21 JULY 2023
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Gas bill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Gas bill
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$70,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                08:57
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Phone bill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Phone bill
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Cash
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$25,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                12:30
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-4">
                <CardBody>
                    <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                        16 JULY 2023
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Electricity bill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Electricity bill
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$45,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                14:20
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-4">
                <CardBody>
                    <Typography variant="h6" className="mb-4 flex items-center justify-between text-gray-600">
                        9 JULY 2023
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Land tax" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Land tax
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$70,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                09:55
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Luxury tax" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Luxury tax
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Credit Card
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                -$20,00
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                12:30
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}