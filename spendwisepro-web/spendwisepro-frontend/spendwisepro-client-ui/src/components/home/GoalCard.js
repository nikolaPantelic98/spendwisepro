import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function GoalCard() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Goals
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a>
                            Show more
                        </a>
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Weekly
                    </Typography>
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Laptop
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $20,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                    80%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={80} size="lg" className="mt-2" color="orange" />
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Aqua Park
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $0,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                    100%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={100} size="lg" className="mt-2" color="green" />
                    </div>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Monthly
                    </Typography>
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Vacation
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $100,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                    40%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={40} size="lg" className="mt-2" color="orange" />
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                House
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $450,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                    10%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={10} size="lg" className="mt-2" color="red" />
                    </div>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <p className="text-xs flex items-center justify-center gap-4">
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span>
                            <span className="text-xxs">Complete</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-orange-500"></span>
                            <span className="text-xxs">In progress</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-red-500"></span>
                            <span className="text-xxs">Not started</span>
                        </span>
                    </p>
                </div>

                <div className="h-8"></div>
            </CardBody>
        </Card>
    );
}