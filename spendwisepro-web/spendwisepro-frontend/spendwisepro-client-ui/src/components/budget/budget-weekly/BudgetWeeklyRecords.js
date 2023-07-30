import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function BudgetWeeklyRecords() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Records
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" alt="Fuel" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Fuel
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Cash
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Fuel
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            -$30,00
                                        </div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            21 July 2023
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
                                        <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" alt="Groceries" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Groceries
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Cash
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Market
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            -$18,72
                                        </div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            21 July 2023
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
                                        <img className="w-8 h-8 rounded-full" src="https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png" alt="Phone" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Phone
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Credit Card
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Phone Bill
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            -$25,50
                                        </div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            20 July 2023
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
                                        <img className="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png" alt="Cafe" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Bar, cafe
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Cash
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Coffee with family
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            -$8,35
                                        </div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            19 July 2023
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
                                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" alt="Cafe" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Fuel
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Cash
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Fuel
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            -$20,00
                                        </div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            18 July 2023
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
                                        <img className="w-8 h-8 rounded-full" src="https://img.freepik.com/premium-vector/white-car-circle-with-modern-gradient-shadow-vector-illustration_515038-8894.jpg?w=2000" alt="Cafe" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Car
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Cash
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            Car maintenance
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            -$55,50
                                        </div>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            17 July 2023
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
    );
}