import {
    Button,
    Card,
    CardBody,
} from "@material-tailwind/react";
import React from "react";
import '../../App.css';
import {ArrowLongRightIcon, PencilSquareIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

export default function CategoryList() {
    return (
        <Card className="mt-6">
            <CardBody>


                <div className="flow-root w-76">
                    <ul role="list" className="divide-y divide-gray-200">

                        <li className="py-3 sm:py-4 flex justify-end items-center mb-3">
                            <div className="">
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Link to="/add_category">
                                        <Button size="sm" variant="text" className="flex gap-2">
                                            Add New Category
                                            <PlusCircleIcon strokeWidth={2} className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </li>

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
                                        No parent category
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Button size="sm" variant="text" className="flex gap-2">
                                        <a>
                                            Edit
                                        </a>
                                        <PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
                                    </Button>
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
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        No parent category
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Button size="sm" variant="text" className="flex gap-2">
                                        <a>
                                            Edit
                                        </a>
                                        <PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
                                    </Button>
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
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        No parent category
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Button size="sm" variant="text" className="flex gap-2">
                                        <a>
                                            Edit
                                        </a>
                                        <PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
                                    </Button>
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
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        No parent category
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Button size="sm" variant="text" className="flex gap-2">
                                        <a>
                                            Edit
                                        </a>
                                        <PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}