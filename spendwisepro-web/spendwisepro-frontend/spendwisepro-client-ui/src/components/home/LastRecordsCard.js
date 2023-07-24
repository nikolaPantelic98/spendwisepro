import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function LastRecordsCard() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Last Records
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a>
                            View All
                        </a>
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Fuel
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Cash
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Fuel
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        -$30,00
                                    </div>
                                    <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        21 July 2023
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" />
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
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png" />
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
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png" />
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
                            </div>
                        </li>

                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}