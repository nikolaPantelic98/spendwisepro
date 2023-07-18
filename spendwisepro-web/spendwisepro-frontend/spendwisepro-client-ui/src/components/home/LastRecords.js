import React from 'react';
import {Button} from "@material-tailwind/react";
import {ArrowLongRightIcon} from "@heroicons/react/24/outline";

const LastRecords = () => {
    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Last records</h5>
                <Button size="sm" variant="text" className="flex gap-2">
                    <a href="#">
                        View all
                    </a>
                    <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                </Button>
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
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
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                -$30,00
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Groceries
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Cash
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Market
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                -$18,72
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Phone
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Credit Card
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Phone Bill
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                -$25,50
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Bar, cafe
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Cash
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Coffee with family
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                -$8,35
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LastRecords;