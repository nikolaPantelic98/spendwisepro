import {
    Card,
    CardBody,
    Typography
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function BudgetWeeklyTopExpenses() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Top expenses
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Groceries
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $30,00
                                </Typography>
                            </div>
                        </div>
                        <Progress value={100} size="lg" className="mt-2" color="yellow" />
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Fuel
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $20,00
                                </Typography>
                            </div>
                        </div>
                        <Progress value={66} size="lg" className="mt-2" color="indigo" />
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Tobacco
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $15,00
                                </Typography>
                            </div>
                        </div>
                        <Progress value={50} size="lg" className="mt-2" color="blue-gray" />
                    </div>
                </div>

                <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                        <Typography className="text-gray-900 font-medium mt-2">
                            Snacks
                        </Typography>
                        <div className="flex gap-4 items-center">
                            <Typography className="text-gray-900 font-semibold mt-2">
                                $5,00
                            </Typography>
                        </div>
                    </div>
                    <Progress value={17} size="lg" className="mt-2" color="light-green" />
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center gap-4 font-normal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        The color of the progress bar is the color of the category.
                    </Typography>
                </div>

                <div className="h-3"></div>
            </CardBody>
        </Card>
    );
}