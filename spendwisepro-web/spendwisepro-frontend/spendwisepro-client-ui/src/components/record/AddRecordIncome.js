import {
    Card,
    CardBody,
    Chip, ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function AddRecordExpense() {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/189/189715.png" alt="Electricity bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Amount
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Type
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/107/107073.png" alt="Chips" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Category
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Select
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Circle-icons-creditcard.svg/480px-Circle-icons-creditcard.svg.png" alt="Phone bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Payment type
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Select
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn1.iconfinder.com/data/icons/ui-5/502/calendar-512.png" alt="Phone bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Date and time
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Select
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/190/190703.png" alt="Phone bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Note
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Type
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}