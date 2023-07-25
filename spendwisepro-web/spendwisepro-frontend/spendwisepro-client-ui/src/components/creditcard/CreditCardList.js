import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function CreditCardList() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Your Credit Cards
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a>
                            Add
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
                                    <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/visa-512.png" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                        Visa
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Banka Intesa
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Some Note1
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $120,00
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/circle-payment-methods-4/512/Mastercard-512.png" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-md font-medium text-gray-900 truncate">
                                        MasterCard
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        OTP Banka
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Some Note2
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        $50,00
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/american-express-512.png" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-md font-medium text-gray-900 truncate">
                                        American Express
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        U.S. Bank
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Some Note3
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        $130,00
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