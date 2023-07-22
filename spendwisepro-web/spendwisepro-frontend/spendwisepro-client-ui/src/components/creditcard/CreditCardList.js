import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import React from "react";
import {CreditCardIcon} from "@heroicons/react/24/solid";

export default function CreditCardList() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Your Credit Cards
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a>
                            Add
                        </a>
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-8" />

                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <Typography variant="h5" className="text-gray-900 mb-2 mt-2 ml-8">
                            <span className="text-lg font-medium text-gray-900 truncate">VISA</span>
                        </Typography>

                        <Typography variant="h4" className="text-gray-900 font-semibold mt-2 ml-8 mb-2">
                            $70,00
                        </Typography>
                    </div>

                    <div className=" items-center text-base font-semibold text-gray-900 dark:text-white mb-4 size">
                        <Button size="lg" variant="text" className="flex gap-2">
                            <a>
                                Edit
                            </a>
                            <PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </div>
                </div>


                <hr className="my-2 border-blue-gray-50 mb-8 mt-8" />

                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <Typography variant="h5" className="text-gray-900 mb-2 mt-2 ml-8">
                            <span className="text-lg font-medium text-gray-900 truncate">MASTERCARD</span>
                        </Typography>

                        <Typography variant="h4" className="text-gray-900 font-semibold mt-2 ml-8 mb-2">
                            $230,00
                        </Typography>
                    </div>

                    <div className=" items-center text-base font-semibold text-gray-900 dark:text-white mb-4 size">
                        <Button size="lg" variant="text" className="flex gap-2">
                            <a>
                                Edit
                            </a>
                            <PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="h-8"></div>
            </CardBody>
        </Card>
    );
}