import {
    Card,
    CardBody,
    Typography,
    Button, Chip,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function PlannedPaymentsCard() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Planned Payments
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
                                    <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-green-600 truncate dark:text-white">
                                        Gas bills
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Tax
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Credit Card
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        -$85,00
                                    </div>
                                    <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        in 3 days
                                    </div>
                                    <div>
                                        <Chip variant="ghost" color="amber" value="Planned" className="mt-1 capitalize" />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1617/1617569.png" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-green-600 truncate dark:text-white">
                                        Chips
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Snacks
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Cash
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        -$2,50
                                    </div>
                                    <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        in 7 days
                                    </div>
                                    <div>
                                        <Chip variant="ghost" color="amber" value="Planned" className="mt-1 capitalize" />
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
                                    <p className="text-sm font-medium text-green-600 truncate dark:text-white">
                                        Phone bills
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Phone
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Credit Card
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        -$35,00
                                    </div>
                                    <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        in 10 days
                                    </div>
                                    <div>
                                        <Chip variant="ghost" color="amber" value="Planned" className="mt-1 capitalize" />
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